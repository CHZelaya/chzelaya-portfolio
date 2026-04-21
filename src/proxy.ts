import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()
//TODO: Clerk middleware by diffuclt will not protect any routes. All routes are public and protected routes are opt-in. Visit https://clerk.com/docs/reference/nextjs/clerk-middleware for details on how to protect routes with Clerk middleware.
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}