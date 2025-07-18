import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  snippets: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    code: v.string(),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_created_at", ["createdAt"]),
});
