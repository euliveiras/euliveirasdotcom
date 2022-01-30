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
    post_content: [{ text: string }];
  };
};

const Posts = [
  {
    data: {
      post_title: [{ text: ""}],
      post_banner: {},
      post_content: [
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Turpis massa tincidunt dui ut ornare lectus sit. At auctor urna nunc id. Amet nulla facilisi morbi tempus. Vel pharetra vel turpis nunc eget lorem. Sit amet purus gravida quis blandit turpis cursus in hac. Magna sit amet purus gravida quis blandit turpis cursus in. Libero nunc consequat interdum varius sit. Sed blandit libero volutpat sed cras ornare. Nunc non blandit massa enim. Arcu dictum varius duis at consectetur. Euismod lacinia at quis risus sed vulputate odio ut enim. Nullam ac tortor vitae purus. Proin nibh nisl condimentum id venenatis. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. At elementum eu facilisis sed odio morbi quis commodo odio. Tristique senectus et netus et malesuada fame. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Ultrices neque ornare aenean euismod elementum nisi. Rhoncus dolor purus non enim praesent elementum facilisis leo. Neque laoreet suspendisse interdum consectetur libero. Dignissim suspendisse in est ante. Duis tristique sollicitudin nibh sit amet. Gravida dictum fusce ut placerat. Lorem donec massa sapien faucibus et molestie ac. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Elementum eu facilisis sed odio morbi. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Convallis a cras semper auctor neque vitae tempus quam. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Commodo sed egestas egestas fringilla phasellus faucibus. Sodales neque sodales ut etiam. Turpis egestas integer eget aliquet nibh praesent tristique magna. Sed arcu non odio euismod lacinia at. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Varius vel pharetra vel turpis nunc eget lorem dolor. Quis ipsum suspendisse ultrices gravida. Sodales ut eu sem integer vitae. Habitant morbi tristique senectus et netus et malesuada fames. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Odio pellentesque diam volutpat commodo sed egestas egestas. Arcu vitae elementum curabitur vitae nunc sed velit. Ut lectus arcu bibendum at varius vel pharetra. Sit amet commodo nulla facilisi nullam vehicula ipsum. Nunc lobortis mattis aliquam faucibus purus in. Sit amet nisl suscipit adipiscing bibendum est. Amet commodo nulla facilisi nullam vehicula. Duis convallis convallis tellus id interdum velit laoreet id. Aliquet enim tortor at auctor urna nunc. Lorem sed risus ultricies tristique nulla aliquet enim tortor at.",
        },
      ],
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
      post_content: [{ text: "poqpweopwq" }],
      post_excerpt: [{ text: "Resumo" }],
    },
    first_publication_date: "11111",
    last_publication_date: "2222222",
    uid: "uid-do-meu-outro-post",
  },
];

const mockedPostsSectionProps = [
  {
    data: {
      post_banner: {},
      post_excerpt: [],
      post_title: [],
      post_content: [{ text: "" }],
    },
    uid: "1",
    first_publication_date: "09/15/11",
    last_publication_date: "00000",
  },
] as PostsSectionProps[];

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getByUID: (type, uid) => {
        const post = Posts.find((post) => post.uid === uid);
        return { ...post };
      },
    } as jest.MockedFunction<any>)
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

    const posts = [
      {
        data,
        first_publication_date,
        uid,
        last_publication_date,
      },
    ] as PostsSectionProps[];

    render(<PostsSection posts={posts} />);

    expect(
      screen.getByText(`${Math.ceil(timeToRead / 200)} min to read`)
    ).toBeInTheDocument();
  });
});
