import { cleanup, render, screen } from "@testing-library/react";
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
mockedRouter
  .mockImplementation(
    () =>
      ({
        isFallback: false,
      } as Router.NextRouter)
  )
  .mockImplementationOnce(
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
  published_at: "1",
  title: "Título do post",
  uid: "uid-do-post",
  last_modified: "",
};

describe("Slug", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(<SlugPage postData={postData} />);
  });
  test("it should render an element with text: 'Carregando' when router is fallback method is true", () => {
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });
  test("it should return correct paths from getStaticPaths in posts/slug page component", async () => {
    const context = {};
    const { paths } = await getStaticPaths(context);
    const params = Posts.map((post) => ({
      params: { slug: post.uid },
    }));
    expect(paths).toEqual(params);
  });
  test("it should render an element with the title text from a given post", () => {
    expect(screen.getByText(postData.title)).toBeInTheDocument();
  });

  test("it should render an element with the published_at text from a given post", () => {
    expect(
      screen.getByText(`publicado em ${postData.published_at}`)
    ).toBeInTheDocument();
  });

  test("it should render an element with the excerpt text from a given post", () => {
    expect(screen.getByText(postData.excerpt)).toBeInTheDocument();
  });

  test("it should render an Image with alt text from a given post", () => {
    expect(screen.getByAltText(postData.banner.alt)).toBeInTheDocument();
  });

  test("it should render an text content from a given post", () => {
    expect(screen.getByText(postData.content)).toBeInTheDocument();
  });
});
