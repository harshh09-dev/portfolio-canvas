import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy path — the Signature Book was merged into the Guestbook.
export const Route = createFileRoute("/signature-book")({
  beforeLoad: () => {
    throw redirect({ to: "/guestbook" });
  },
});
