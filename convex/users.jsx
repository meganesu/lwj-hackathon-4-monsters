import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: { },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated!")
    }

    console.log("identity inside getCurrentUser", identity);

    return await ctx.db
      .query("users")
      .filter(user => user.eq(user.field("clerkId"), identity.subject))
      .collect()
  }
});

export const createUser = mutation({
  args: { 
    // clerkId: v.string(),
    species: v.string() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const newUserId = await ctx.db.insert("users", { 
      clerkId: identity.subject,
      species: args.species 
    })

    return newUserId;
  }
})

/*
  NEXT TODO: Write api.users.updateUser
*/
