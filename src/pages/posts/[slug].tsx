import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import { RichTextField } from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { getPrismicClient } from "../../services/prismic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchService } from "../../services/fetchService";

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
  const variant = useBreakpointValue({ lg: true });

  const excerpt = postData.excerpt;
  const title = postData.title;
  const content = postData.content;

  useEffect(() => {
    const timeToTimeOut =
      Math.ceil(
        (content.split(" ").length +
          excerpt.split(" ").length +
          title.split(" ").length) /
          200
      ) *
      60 *
      1000;

    console.log(timeToTimeOut);
    const timeOut = setTimeout(() => {
      fetchService("/api/postClick", "post", {
        uid: postData.uid,
        visit_retained: true,
      }).then((data) => console.log(data));
    }, timeToTimeOut);
    return () => clearTimeout(timeOut);
  });

  if (Object.is(router.isFallback, true)) {
    return <Text>carregando</Text>;
  }

  return (
    <>
    <Head>
      <title>{postData.title}</title>
    </Head>
      <Box w="720px" m="0 auto 10%">
        {variant && (
          <ArrowBackIcon
            marginBlockStart={4}
            boxSize={14}
            borderRadius="full"
            position="absolute"
            left={20}
            onClick={() => router.push("/")}
            cursor="pointer"
            transition={"background 0.2s linear"}
            _hover={{ backgroundColor: "pink.200" }}
          />
        )}
        <Text
          as="h1"
          _first={{ textAlign: "center" }}
          marginBlock={4}
          fontFamily={"heading"}
          fontWeight={"bold"}
          fontSize={["5xl"]}
          letterSpacing={"0.125rem"}
        >
          {postData.title}
        </Text>
        <Text color="gray.600" fontStyle={"italic"}>
          first published in {postData.published_at}
        </Text>
        <Text mt={2} fontWeight={"semibold"} fontSize={["xl"]}>
          {postData.excerpt}
          asduhqudhuqhdushkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        </Text>
        <Image
          src={postData.banner.url}
          alt={postData.banner.alt}
          maxW={"100%"}
          marginBlockStart={4}
          marginBlockEnd={8}
        />
        <Box
          fontSize={"lg"}
          lineHeight={"8"}
          sx={{
            h2: {
              fontSize: "1.7em",
              fontFamily: "heading",
              letterSpacing: "0.125rem",
              marginBlockEnd: "1.7rem",
            },
            "p + h2": {
              marginBlock: "1.7rem",
            },
            strong: {
              color: "pink.500",
            },
          }}
          dangerouslySetInnerHTML={{ __html: postData?.content }}
        />
      </Box>
    </>
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
