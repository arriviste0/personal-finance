export { default } from "next-auth/middleware"

// Add routes that should be protected by authentication
export const config = {
  matcher: [
    "/dashboard",
    "/budget",
    "/expenses",
    "/savings-goals",
    "/investments",
    "/emergency-fund",
    "/tax-planner",
    "/ai-assistant",
    // Add any other authenticated routes here
    // "/api/some-protected-endpoint", // Example API route protection
 ],
}
