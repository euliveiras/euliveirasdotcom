import { render, screen } from "@testing-library/react";
import * as Router from "next/router";

import Posts from "../utils/posts";
import SlugPage, { PostProps } from "../pages/posts/[slug]";

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

const postData = {
  banner: {
    alt: "alt text",
    url: "url",
  },
  content: "",
  excerpt: "",
  published_at: "",
  title: "",
  uid: "",
};

describe("Slug", () => {
  test("it should render an element with text: 'Carregando' when router is fallback method is true", () => {
    render(<SlugPage postData={postData} />);
    expect(screen.getByText("carregando")).toBeInTheDocument();
  });
});
