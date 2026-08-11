import { createServerFn } from "@tanstack/react-start";

export const getGithubActivity = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchLatestActivity } = await import("./github.server");
  return fetchLatestActivity("A-verse");
});
