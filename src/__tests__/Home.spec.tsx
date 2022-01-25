import * as Prismic from "@prismicio/client";
import { render, screen } from "@testing-library/react";
import { GetStaticPropsContext } from "next";
import Home, { getStaticProps } from "../pages";

type ProfileData = {
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
  profile_data: ProfileData;
}

const mockedHomeProps = { } as HomeProps
const mockedProfileData = {} as ProfileData;

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getSingle: () => ({
        data: mockedProfileData,
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
        profile_data: { ...mockedProfileData },
      },
    });
  });
});
