import { Box, Image, Text } from "@chakra-ui/react";
import * as prismicH from "@prismicio/helpers";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { getPrismicClient } from "../../services/prismic";

type PostProps = {
  postData: {
    uid: string;
    title: string;
    content: string;
    excerpt: string;
    banner: {
      url: string;
      altText: string;
    };
    published_at: string;
  };
};

export default function Post({ postData }: PostProps) {
  // console.log(postData?.excerpt);
  if (Object.is(postData, undefined)) {
    return <Text>carregando</Text>;
  }

  return (
    <Box w="720px" m="0 auto">
      <Text as="h1" _first={{ textAlign: "center" }} marginBlock={4}>
        {postData.title}
      </Text>
      <Text>publicado em {postData.published_at}</Text>
      <Text mt={2}>{postData.excerpt}</Text>
      <Image
        src={postData.banner.url}
        alt={postData.banner.altText}
        maxW={"100%"}
        marginBlock={6}
      />
      <Box dangerouslySetInnerHTML={{ __html: postData?.content }} />;
    </Box>
  );
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

  const { data, first_publication_date } = await Prismic.getByUID(
    "post",
    String(uid),
    {}
  );

  console.log(uid, data, first_publication_date);

  const post = {
    uid,
    title: prismicH.asText(data.post_title),
    content: prismicH.asHTML(data.post_content),
    excerpt: data.post_excerpt[0].text,
    banner: {
      url: data.post_banner.url,
      altText: data.post_banner.alt,
    },
    published_at: new Date(first_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return {
    props: {
      postData: post,
    },
  };
};
