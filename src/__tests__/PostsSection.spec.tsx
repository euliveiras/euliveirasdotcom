import { render, screen } from "@testing-library/react";
import * as Prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

import { PostsSection } from "../components";
import { getStaticProps } from "../pages/posts/[slug]";

type PostsSectionProps = {
  uid: string;
  first_publication_date: string;
  last_publication_date: string;
  data: {
    post_title: [];
    post_excerpt: [];
    post_banner: {};
    post_content: [];
  };
};

const Posts = [
  {
    data: {
      post_title: [],
      post_banner: {},
      post_content: [],
      post_excerpt: [{ text: "" }],
    },
    first_publication_date: "",
    last_publication_date: "",
    uid: "uid-do-meu-post",
  },
  {
    data: {
      post_title: [{ text: "Olá" }],
      post_banner: {
        url: "path-to-my-image",
        alt: "photo",
      },
      post_content: [{ text: "poqpweopwq" }, {}],
      post_excerpt: [{ text: "Resumo" }],
    },
    first_publication_date: "11111",
    last_publication_date: "2222222",
    uid: "uid-do-meu-outro-post",
  },
];

const mockedPostsSectionProps = [
  {
    data: {},
    uid: "1",
    first_publication_date: "09/15/11",
    last_publication_date: "00000",
  },
] as PostsSectionProps[];
{
  text: "Olá";
}
const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getByUID: (type, uid) => {
        const post = Posts.find((post) => post.uid === uid);
        return { ...post };
      },
    } as jest.MockedFunction<typeof Prismic.Client>)
);
const asTextHelper = jest.spyOn(prismicH, "asText");
const asHTMLHelper = jest.spyOn(prismicH, "asHTML");

describe("PostsSection", () => {
  beforeEach(() => render(<PostsSection posts={mockedPostsSectionProps} />));

  test("it should render at least one article element", () => {
    expect(screen.getAllByRole("group")[0]).toBeInTheDocument();
  });

  test("it should render an element with text: 'Carregando' when posts props is undefined", () => {
    render(<PostsSection posts={undefined} />);
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  test("it should return data of the post with the given slug", async () => {
    const slug = "uid-do-meu-outro-post";
    const context = {
      params: { slug },
    };
    const { data, uid, first_publication_date } = Posts.find(
      (post) => post.uid === slug
    );
    asHTMLHelper.mockReturnValue(data.post_content[0],);
    asTextHelper.mockReturnValue(data.post_title[0].text)

    const value = await getStaticProps(context);
    const post = {
      uid,
      title: data.post_title[0].text,
      content: data.post_content[0],
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
  test("it should return the estimated read time correctly", () => {
    
  })
});
