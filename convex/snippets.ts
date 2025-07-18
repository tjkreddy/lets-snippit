import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSnippets = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("snippets")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

export const addSnippet = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    code: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const snippet = {
      title: args.title,
      description: args.description || "",
      code: args.code,
      tags: args.tags,
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
