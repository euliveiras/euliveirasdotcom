import { screen } from "@testing-library/react";
import axios from "axios";
import Posts from "../utils/posts";
import { fetchService } from "../services/fetchService";

const mockedAxios = jest
  .spyOn(axios, "post")
  .mockImplementation(async (path, options) => {
    const findPost = Posts.find((post) => post.uid === options);
    if (Object.is(findPost, undefined)) {
      throw new Error("Post with the given uid was not found");
    }
    if (findPost) return { ok: true };
  });

describe("FetchService", () => {
  test("it should return ok: 'true' when finded a post with the given uid", async () => {
    const uid = Posts[0].uid;
    await expect(fetchService("path-to-my-api", "post", uid)).resolves.toEqual({
      response: { ok: true },
    });
  });
  test("it should a Error when not finded a post with the given uid", async () => {
    await expect(
      fetchService("path-to-my-api", "post", "fake-uid")
    ).rejects.toEqual(Error("Post with the given uid was not found"));
  });
});
