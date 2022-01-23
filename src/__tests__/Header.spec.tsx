import { render, screen } from "@testing-library/react";
import { Header } from "../components";

describe("Header", () => {
    beforeEach(() => render(<Header/>));
    test("it should render Header component", () => {
        expect(screen.getByRole("banner")).toBeInTheDocument()
    });
    test("it should render an Image element with alt text 'Matheus Oliveira'", () => {
        expect(screen.getByRole("img")).toBeInTheDocument();
    })

});