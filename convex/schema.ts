import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    guestbook_posts: defineTable({
        userId: v.string(),
        name: v.string(),
        avatarUrl: v.string(),
        provider: v.string(),
        message: v.string(),
        createdAt: v.number(),
    }),
});

