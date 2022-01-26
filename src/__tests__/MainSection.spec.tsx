import { render, screen } from "@testing-library/react";
import { MainSection } from "../components";

describe("MainSection", () => {
  test("it should render MainSection component", () => {
    render(<MainSection />);
  });

  test("it should render at least one article element", () => {
    render(<MainSection />);

    expect(screen.getAllByRole("article")[0]).toBeInTheDocument();
  });


});
