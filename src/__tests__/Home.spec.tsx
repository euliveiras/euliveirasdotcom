import { render, screen } from "@testing-library/react"
import Home from "../pages"

describe("Home", () => {
    test("it should be able to render Home component", () => {
        render(<Home/>);
    });
});