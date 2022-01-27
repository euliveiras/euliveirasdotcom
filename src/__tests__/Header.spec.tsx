import { render, screen } from "@testing-library/react";
import { Header } from "../components";

type HeaderProps = {
  profile_img: {
    alt: string;
    url: string;
  };
  profile_name: {
    text: string;
  }[];
  profile_about: {
    text: string;
  }[];
};

const data: HeaderProps = {
  profile_about: [{ text: "Full stack noob" }],
  profile_img: { alt: "Matheus Oliveira", url: "/path-to-pic" },
  profile_name: [{ text: "Matheus Oliveira" }],
};

describe("Header", () => {
  beforeEach(() => render(<Header data={data} />));
  test("it should render Header component", () => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
  test(`it should render an image element with alt text: ${data.profile_img.alt}`, () => {
    expect(screen.getByAltText(data.profile_img.alt)).toBeInTheDocument();
  });
  test(`it should render an element with text: ${data.profile_about[0].text}`, () => {
    expect(screen.getByText(data.profile_about[0].text)).toBeInTheDocument();
  });
  test(`it should render an element with text: ${data.profile_name[0].text}`, () => {
    expect(screen.getByText(data.profile_name[0].text)).toBeInTheDocument();
  })
});
