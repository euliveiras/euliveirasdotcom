import { render, screen } from "@testing-library/react";
import { MainSection } from "../components";

type MainSectionData = {
  posts: {
    uid: string;
    first_publication_date: string;
    last_publication_date: string;
    data: {
      post_title: [];
      post_excerpt: [];
      post_banner: {};
      post_content: [];
    };
  }[]
};

const mockedMainSectionData = {} as MainSectionData;

describe("MainSection", () => {
  test("it should render MainSection component", () => {
    render(<MainSection {...mockedMainSectionData} />);
  });

  test("it should render at least one article element", () => {
    render(<MainSection {...mockedMainSectionData} />);

    expect(screen.getAllByRole("article")[0]).toBeInTheDocument();
  });
});
