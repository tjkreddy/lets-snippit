import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  snippets: defineTable({
    title: v.string(),
    description: v.string(),
    code: v.string(),
    tags: v.array(v.string()),
    teamId: v.optional(v.id("teams")), 
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_created_at", ["_creationTime"])
    .index("by_team", ["teamId"]),

  teams: defineTable({
    teamName: v.string(),
    passcode: v.string(),
    createdAt: v.number(),
  }).index("by_team_name", ["teamName"]),
});
