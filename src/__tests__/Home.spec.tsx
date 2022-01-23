import { render, screen } from "@testing-library/react";
import Home from "../pages";
import { getPrismicClient } from "../services/prismic";

jest.mock("@prismicio/client");
jest.mock("../services/prismic");

describe("Home", () => {
  beforeEach(() => render(<Home />));
  test("it should be able to return posts info from getStaticProps", async () => {});
});
