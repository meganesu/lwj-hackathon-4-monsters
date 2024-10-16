import { query, mutation, action } from "./_generated/server";
import { api } from "../convex/_generated/api"
import { v } from "convex/values";

export const getCurrentUser = query({
  args: { },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }

    return await ctx.db
      .query("users")
      .filter(user => user.eq(user.field("email"), identity.email))
      .collect()
  }
});

export const getUsersBySpeciesAction = action({
  args: { species: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }

    const users = await ctx.runQuery(api.users.getUsersBySpecies, {
      species: args.species
    })

    return users
  }
})

export const getUsersBySpecies = query({
  args: { species: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }

    const users = await ctx.db
      .query("users")
      .filter(user => user.eq(user.field("species"), args.species))
      .collect()

    return users
  }
})

export const createUser = mutation({
  args: { 
    // clerkId: v.string(),
    species: v.string() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const newUserId = await ctx.db.insert("users", { 
      email: identity.email,
      species: args.species 
    })

    return newUserId;
  }
})

/*
  NEXT TODO: Write api.users.updateUser
*/
