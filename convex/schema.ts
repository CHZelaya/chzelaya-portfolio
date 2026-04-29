import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  guestbook: defineTable({
    authorId: v.string(),
    authorName: v.string(),
    authorAvatar: v.string(),
    authorPlatform: v.string(),
    comment: v.string(),
    by_createdAt: v.number(),
  }).index("createdAt", ["by_createdAt"])
    .index("by_authorId", ["authorId"]),

});
