import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy path — the Creative Corner now lives at /off-the-clock.
export const Route = createFileRoute("/creative")({
  beforeLoad: () => {
    throw redirect({ to: "/off-the-clock" });
  },
});
