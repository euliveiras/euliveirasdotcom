import * as Prismic from "@prismicio/client";
import { render, screen } from "@testing-library/react";
import { GetStaticPropsContext } from "next";
import Home, { getStaticProps } from "../pages";

type PostsData = {
  uid: string;
  first_publication_date: string;
  last_publication_date: string;
  data: {
    post_title: [];
    post_excerpt: [];
    post_banner: {};
    post_content: [];
  };
};

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

export type HomeProps = {
  header_data: HeaderData;
  posts_section_data: PostsData[];
};

const mockedHomeProps = {} as HomeProps;
const mockedHeaderData = {} as HeaderData;
const mockedPostsSectionData = [
  {
    data: {},
    first_publication_date: "10/20/2010",
    last_publication_date: "10/20/2010",
    uid: "10/20/2010",
  },
  {
    data: {},
    first_publication_date: "11/20/2011",
    last_publication_date: "11/20/2011",
    uid: "11/20/2011",
  },
] as PostsData[];

const spy = jest.spyOn(Prismic, "createClient").mockImplementation(
  () =>
    ({
      getSingle: () => ({
        data: mockedHeaderData,
      }),
      getByType: () => ({
        results: [
          {
            data: {},
            first_publication_date: "10/20/2010",
            last_publication_date: "10/20/2010",
            uid: "10/20/2010",
          },
          {
            data: {},
            first_publication_date: "11/20/2011",
            last_publication_date: "11/20/2011",
            uid: "11/20/2011",
          },
        ],
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
        posts_section_data: mockedPostsSectionData ,
      },
    });
  });
});
