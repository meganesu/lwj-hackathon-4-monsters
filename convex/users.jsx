import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: { },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }

    const identityName = identity.name;
    console.log("identity name", identityName)

    console.log("identity inside getCurrentUser", identity);

    return await ctx.db
      .query("users")
      .filter(user => user.eq(user.field("email"), identity.email))
      .collect()
  }
});

export const getUsersBySpecies = query({
  args: { species: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }
    console.log("identity from getUsersBySpecies", identity)

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
