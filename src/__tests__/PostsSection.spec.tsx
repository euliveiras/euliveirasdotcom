import { render, screen } from "@testing-library/react";
import { PostsSection } from "../components";

type PostsSectionData = {
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

const mockedPostsSectionData = [
  {
    data: {},
    uid: "1",
    first_publication_date: "09/15/11",
    last_publication_date: "00000",
  },
] as PostsSectionData[];

describe("PostsSection", () => {
  test("it should render PostsSection component", () => {
    render(<PostsSection posts={mockedPostsSectionData} />);
  });

  test("it should render at least one article element", () => {
    render(<PostsSection posts={mockedPostsSectionData} />);

    expect(screen.getAllByRole("article")[0]).toBeInTheDocument();
  });
});
