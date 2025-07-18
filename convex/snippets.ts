import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get snippets for a specific team
export const getSnippets = query({
  args: { teamId: v.optional(v.id("teams")) },
  handler: async (ctx, { teamId }) => {
    if (teamId) {
      return await ctx.db
        .query("snippets")
        .withIndex("by_team", (q) => q.eq("teamId", teamId))
        .order("desc")
        .collect();
    } else {
      // Return all snippets if no team specified (for demo/testing)
      return await ctx.db
        .query("snippets")
        .withIndex("by_created_at")
        .order("desc")
        .collect();
    }
  },
});

export const addSnippet = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    code: v.string(),
    tags: v.array(v.string()),
    teamId: v.optional(v.id("teams")),
  },
  handler: async (ctx, args) => {
    const snippet = {
      title: args.title,
      description: args.description || "",
      code: args.code,
      tags: args.tags,
      teamId: args.teamId,
      createdAt: Date.now(),
    };
    
    const id = await ctx.db.insert("snippets", snippet);
    return id;
  },
});

export const updateSnippet = mutation({
  args: {
    id: v.id("snippets"),
    title: v.string(),
    description: v.optional(v.string()),
    code: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      description: updates.description || "",
      updatedAt: Date.now(),
    });
  },
});

export const deleteSnippet = mutation({
  args: { id: v.id("snippets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
