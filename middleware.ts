import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/api/habits/:path*", "/api/areas/:path*"],
};
