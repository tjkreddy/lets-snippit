import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new team
export const createTeam = mutation({
  args: {
    teamName: v.string(),
    passcode: v.string(),
  },
  handler: async (ctx, { teamName, passcode }) => {
    // Check if team name already exists
    const existingTeam = await ctx.db
      .query("teams")
      .withIndex("by_team_name", (q) => q.eq("teamName", teamName))
      .first();
    
    if (existingTeam) {
      throw new Error("Team name already exists. Please choose a different name.");
    }

    // Create the team
    const teamId = await ctx.db.insert("teams", {
      teamName,
      passcode,
      createdAt: Date.now(),
    });

    return {
      id: teamId,
      teamName,
      createdAt: Date.now(),
    };
  },
});

// Join a team (login)
export const joinTeam = mutation({
  args: {
    teamName: v.string(),
    passcode: v.string(),
  },
  handler: async (ctx, { teamName, passcode }) => {
    const team = await ctx.db
      .query("teams")
      .withIndex("by_team_name", (q) => q.eq("teamName", teamName))
      .first();

    if (!team) {
      throw new Error("Team not found. Please check the team name.");
    }

    if (team.passcode !== passcode) {
      throw new Error("Invalid passcode. Please check your team passcode.");
    }

    return {
      id: team._id,
      teamName: team.teamName,
      createdAt: team.createdAt,
    };
  },
});

// Get team by ID
export const getTeam = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, { teamId }) => {
    const team = await ctx.db.get(teamId);
    if (!team) return null;
    
    return {
      id: team._id,
      teamName: team.teamName,
      createdAt: team.createdAt,
    };
  },
});