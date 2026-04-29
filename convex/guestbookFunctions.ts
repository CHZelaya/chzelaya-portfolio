import { v } from "convex/values";
import { query, mutation } from "./_generated/server";


// Convex Query to list all guestbook entries, ordered by creation time (most recent first).
export const listGuestbookEntries = query({
    args: { guestbook: v.id("guestbook") },
    handler: async (ctx) => {
        const entries = await ctx.db
            .query("guestbook")
            .withIndex("createdAt")
            .order("desc")
            .take(100) // Limit to the 100 most recent entries
        return entries;
    }
})

// Convex Mutation to add a new guestbook entry.
export const addGuestbookEntry = mutation({
    args: {
        authorId: v.string(),
        authorName: v.string(),
        authorAvatar: v.string(),
        authorPlatform: v.string(),
        comment: v.string(),
    },
    handler: async (ctx, args) => {

        //Auth check: only authenticated users can leave comments
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to leave a comment.");
        }

        // Rate Limit check: Limit to one comment per minute per user
        const oneMinuteAgo = Date.now() - 60 * 1000;
        const recentEntries = await ctx.db
            .query("guestbook")
            .withIndex("by_authorId", (q) => q.eq("authorId", identity.subject))
            .order("desc")
            .first();

        if (recentEntries && recentEntries.by_createdAt > oneMinuteAgo) {
            throw new Error("Please wait a minute before leaving another entry.");
        }

        // Insert the new guestbook entry into the database
        await ctx.db.insert("guestbook", {
            authorId: args.authorId,
            authorName: args.authorName,
            authorAvatar: args.authorAvatar,
            authorPlatform: args.authorPlatform,
            comment: args.comment,
            by_createdAt: Date.now(),
        });
    }
})