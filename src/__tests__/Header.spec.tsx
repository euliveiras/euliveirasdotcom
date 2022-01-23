import { render, screen } from "@testing-library/react";
import { Header } from "../components";

describe("Header", () => {
    test("it should render Header component", () => {
        render(<Header/>)
        expect(screen.getByRole("banner")).toBeInTheDocument()
    });
    test("it should render an Image element with alt text 'Matheus Oliveira'", () => {
        render(<Header/>);
        expect(screen.getByAltText(/matheus\soliveira/i)).toBeInTheDocument();
    })

});