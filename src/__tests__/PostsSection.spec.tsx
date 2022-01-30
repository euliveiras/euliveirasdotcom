import { render, screen } from "@testing-library/react";
import * as Prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

import Posts, { Post } from "../utils/posts";
import { PostsSection } from "../components";
import { getStaticProps } from "../pages/posts/[slug]";

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getByUID: (type: string, uid: string) => {
        const post = Posts.find((post) => post.uid === uid);
        return { ...post };
      },
    } as jest.MockedFunction<any>)
);
const asTextHelper = jest.spyOn(prismicH, "asText");
const asHTMLHelper = jest.spyOn(prismicH, "asHTML");

describe("PostsSection", () => {
  beforeAll(() => render(<PostsSection posts={Posts} />));

  test("it should render at least one article element with the role group", () => {
    expect(screen.getAllByRole("group")[0]).toHaveAttribute("role", "group");
  });

  test("it should return data of the post with the given slug", async () => {
    const slug = "uid-do-meu-outro-post";
    const context = {
      params: { slug },
    };
    const { data, uid, first_publication_date } = Posts.find(
      (post) => post.uid === slug
    );
    asHTMLHelper.mockReturnValue(data.post_content[0].text);
    asTextHelper
      .mockReturnValueOnce(data.post_title[0].text)
      .mockReturnValueOnce(data.post_excerpt[0].text);

    const value = await getStaticProps(context);
    const post = {
      uid,
      title: data.post_title[0].text,
      content: data.post_content[0].text,
      excerpt: data.post_excerpt[0].text,
      banner: {
        url: data.post_banner.url,
        altText: data.post_banner.alt,
      },
      published_at: new Date(first_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };

    expect(value).toEqual({ props: { postData: { ...post } } });
  });

  // test("it should render post title", async () => {
  //   const context = {
  //     params: { slug: "uid-do-meu-outro-post" },
  //   };
  //   const value = await getStaticProps(context);
  // });
  test("it should return the estimated read time correctly from a post", () => {
    const { data, first_publication_date, uid, last_publication_date } =
      Posts[0];

    asHTMLHelper.mockReturnValue(data.post_content[0].text);
    asTextHelper
      .mockReturnValueOnce(data.post_excerpt[0].text)
      .mockReturnValueOnce(data.post_title[0].text);

    const excerpt = data.post_excerpt[0].text;
    const title = data.post_title[0].text;
    const timeToRead =
      data.post_content[0].text.split(" ").length +
      excerpt.split(" ").length +
      title.split(" ").length;

    const posts: Post[] = [
      {
        data,
        first_publication_date,
        uid,
        last_publication_date,
      },
    ];

    render(<PostsSection posts={posts} />);

    expect(
      screen.getByText(`${Math.ceil(timeToRead / 200)} min to read`)
    ).toBeInTheDocument();
  });
});
