import * as Prismic from "@prismicio/client";
import { render, screen } from "@testing-library/react";
import { GetStaticPropsContext } from "next";
import Home, { getStaticProps } from "../pages";

type HeaderData = {
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

interface HomeProps{
  header_data: HeaderData;
}

const mockedHomeProps = {} as HomeProps
const mockedHeaderData = {} as HeaderData;

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getSingle: () => ({
        data: mockedHeaderData,
      }),
    } as jest.MockedFunction<typeof Prismic.Client>)
);

describe("Home", () => {
  // beforeAll(() => {});
  beforeEach(() => render(<Home {...mockedHomeProps} />));
  test("it should be able to return data from CMS", async () => {
    const value = await getStaticProps({} as GetStaticPropsContext);
    expect(value).toEqual({
      props: {
        header_data: { ...mockedHeaderData },
      },
    });
  });
});
