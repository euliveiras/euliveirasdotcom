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
  beforeEach(() => render(<PostsSection posts={mockedPostsSectionData} />));
  test("it should render PostsSection component", () => {
  });

  test("it should render at least one article element", () => {
    expect(screen.getAllByRole("article")[0]).toBeInTheDocument();
  });
  test("it should render an element with text: 'Carregando' when posts props is undefined", () => {
    render(<PostsSection posts={undefined}/>)
    expect(screen.getByText("Carregando")).toBeInTheDocument()
  })
});
