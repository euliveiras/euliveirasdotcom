import { Box } from "@chakra-ui/react";
import * as prismicH from "@prismicio/helpers";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getPrismicClient } from "../../services/prismic";

type PostProps = {
  postData: {
    uid: string;
    title: string;
    content: string;
    banner: {
      url: string;
      altText: string;
    };
    updatedAt: string;
  };
};

export default function Post({ postData }: PostProps) {
  console.log(postData?.content);
  if (postData) {
    return <Box dangerouslySetInnerHTML={{ __html: postData?.content }} />;
  }
}

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const Prismic = getPrismicClient();
  const uid = context.params.slug;

  const { data, last_publication_date } = await Prismic.getByUID(
    "post",
    String(uid),
    {}
  );
  const post = {
    uid,
    title: prismicH.asText(data.post_title),
    content: prismicH.asHTML(data.post_content),
    banner: {
      url: data.post_banner.url,
      altText: data.post_banner.alt,
    },
    updatedAt: new Date(last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  console.log(post);

  return {
    props: {
      postData: post,
    },
  };
};
