import Prismic from "@prismicio/client";

const repoEndpoint = process.env.PRISMIC_REPO_ENDPOINT;

export function getPrismicClient(req?: unknown) {
    const prismic = Prismic.createClient(repoEndpoint) 
  
    return prismic;
  }
