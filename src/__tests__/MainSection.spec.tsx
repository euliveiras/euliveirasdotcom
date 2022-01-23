import { render, screen } from "@testing-library/react";
import { MainSection } from "../components";

describe("MainSection", () => {
    test("it shound render MainSection component", () => {
        render(<MainSection/>);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
