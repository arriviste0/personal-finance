
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
    "/api/budget/:path*",
    "/api/emergency-fund/:path*",
    "/api/expenses/:path*",
    "/api/investments/:path*",
    "/api/savings-goals/:path*",
 ],
}
