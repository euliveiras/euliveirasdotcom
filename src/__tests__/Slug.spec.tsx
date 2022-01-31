import { render, screen } from "@testing-library/react";
import * as Router from "next/router";
import * as Prismic from "@prismicio/client";

import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
  GetStaticProps,
} from "next";

import Posts, { Post } from "../utils/posts";
import SlugPage, { getStaticPaths } from "../pages/posts/[slug]";

const mockedRouter: jest.SpyInstance<Router.NextRouter> = jest.spyOn(
  Router,
  "useRouter"
);
mockedRouter.mockImplementation(
  () =>
    ({
      isFallback: true,
    } as Router.NextRouter)
);

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getByType: (type: string, limit: { pageSize: number }): any => {
        const posts = Posts.slice(0, limit.pageSize);
        return { results: [...posts] };
      },
    } as jest.MockedFunction<any>)
);

const postData = {
  banner: {
    alt: "alt text",
    url: "url",
  },
  content: "Conteúdo do Post",
  excerpt: "Resumo do Post",
  published_at: "",
  title: "Título do post",
  uid: "uid-do-post",
};

describe("Slug", () => {
  // beforeEach(() => render(<SlugPage postData={postData} />));
  test("it should render an element with text: 'Carregando' when router is fallback method is true", () => {
    render(<SlugPage postData={postData} />);
    expect(screen.getByText("carregando")).toBeInTheDocument();
  });
  test("it should return correct paths from getStaticPaths in posts/slug page component", async () => {
    const context = {};
    const { paths } = await getStaticPaths(context);
    const params = Posts.map((post) => ({
      params: { slug: post.id },
    }));
    expect(paths).toEqual(params);
  });
  test("it should render an element with the title text from a given post", () => {
    mockedRouter.mockImplementation(
      () =>
        ({
          isFallback: false,
        } as Router.NextRouter)
    );
    render(<SlugPage postData={postData} />);
    expect(screen.getByText(postData.title)).toBeInTheDocument();
  });
});
