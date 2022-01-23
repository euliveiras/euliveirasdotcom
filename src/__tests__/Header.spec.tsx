import { render, screen } from "@testing-library/react";
import { Header } from "../components";

describe("Header", () => {
    test("it should render Header component", () => {
        render(<Header/>)
    });
    
});