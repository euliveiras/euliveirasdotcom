import { Box, Image, Text } from "@chakra-ui/react";
import { RichTextField } from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getPrismicClient } from "../../services/prismic";
import { useRouter } from "next/router";

export type PostProps = {
  postData: {
    uid: string;
    title: string;
    content: string;
    excerpt: string;
    banner: {
      url: string;
      alt: string;
    };
    published_at: string;
  };
};

export default function Post({ postData }: PostProps) {
  const router = useRouter();

  if (Object.is(router.isFallback, true)) {
    return <Text>carregando</Text>;
  }

  return (
    <Box w="720px" m="0 auto 10%">
      <Text as="h1" _first={{ textAlign: "center" }} marginBlock={4}>
        {postData.title}
      </Text>
      <Text>publicado em {postData.published_at}</Text>
      <Text mt={2}>{postData.excerpt}</Text>
      <Image
        src={postData.banner.url}
        alt={postData.banner.alt}
        maxW={"100%"}
        marginBlock={6}
      />
      <Box
        sx={{
          "> h2, h3": { color: "green.500", marginBlock: "1em" },
        }}
        dangerouslySetInnerHTML={{ __html: postData?.content }}
      />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const Prismic = getPrismicClient();
  const document = await Prismic.getByType("post", { pageSize: 5 });
  const params = document.results.map((result) => ({
    params: { slug: result.id },
  }));
  // console.log(document)
  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const Prismic = getPrismicClient();
  const uid = context.params.slug;

  const { data, first_publication_date } = await Prismic.getByUID<any>(
    "post",
    String(uid),
    {}
  );

  // console.log(uid, data, first_publication_date);

  const post = {
    uid,
    title: prismicH.asText(data.post_title as RichTextField),
    content: prismicH.asHTML(data.post_content as RichTextField),
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
