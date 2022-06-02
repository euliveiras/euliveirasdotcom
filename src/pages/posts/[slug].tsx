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
    last_modified: string;
  };
};

export default function Post({ postData }: PostProps) {
  const router = useRouter();
  const variant = useBreakpointValue({ lg: true });
  const hasData = typeof postData !== "undefined" ? postData : null;

  useEffect(() => {
    async function countFirstVisit() {
      await fetchService("/api/postClick", "post", {
        uid: hasData.uid,
        first_visit: true,
      })
        .then((data) => console.log("first visit", data))
        .catch((err) => console.log(err));
    }
    if (hasData !== null) countFirstVisit();
  }, [hasData]);

  useEffect(() => {
    const excerpt = hasData.excerpt;
    const title = hasData.title;
    const content = hasData.content;
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
        uid: hasData.uid,
        visit_retained: true,
      })
        .then((data) => console.log("visit retained", data))
        .catch((err) => console.log(err));
    }, timeToTimeOut);
    return () => clearTimeout(timeOut);
  });

  if (Object.is(router.isFallback, true) || typeof postData === "undefined") {
    return <Text>Carregando</Text>;
  }

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Box w={["95%", "720px"]} margin={"0 auto 10%"}>
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
          textAlign="center"
          fontFamily={"heading"}
          fontWeight={"bold"}
          fontSize={["3xl", "5xl"]}
          letterSpacing={"0.125rem"}
        >
          {postData.title}
        </Text>
        <Text
          color="gray.600"
          fontStyle={"italic"}
          fontSize={["sm", "md"]}
          marginBlock={4}
        >
          publicado em {postData.published_at}
        </Text>
        <Text
          color="gray.600"
          fontStyle={"italic"}
          fontSize={["sm", "md"]}
          marginBlock={4}
        >
          modificado em {postData.last_modified}
        </Text>
        <Text mt={2} fontWeight={"semibold"} fontSize={["lg"]}>
          {postData.excerpt}
        </Text>
        <Image
          src={postData.banner.url}
          alt={postData.banner.alt}
          maxW={"100%"}
          marginBlockStart={4}
          marginBlockEnd={8}
        />
        <Box
          fontSize="lg"
          lineHeight={"tall"}
          sx={{
            h2: {
              fontSize: ["xl", "3xl"],
              fontWeight: "bold",
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
            "p + p": {
              marginBlockStart: "1rem",
            },
            a: {
              textDecoration: "underline",
            },
          }}
          dangerouslySetInnerHTML={{ __html: postData.content }}
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
    params: { slug: result.uid },
  }));
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

  const {
    data,
    first_publication_date,
    last_publication_date: last_modified,
  } = await Prismic.getByUID<any>("post", String(uid), {});

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
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    last_modified: new Date(last_modified).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  return {
    props: {
      postData: post,
    },
    revalidate: 60 * 60 * 24,
  };
};
