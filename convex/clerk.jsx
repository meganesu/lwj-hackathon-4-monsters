import { action } from "./_generated/server"
import { v } from "convex/values"
import { createClerkClient } from "@clerk/backend";

export const getUsersByEmail = action({
  args: { emails: v.array(v.string()) },
  returns: v.array(v.any()),
  handler: async (_, args) => {
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    try {
      const { data, totalCount } = await clerkClient.users.getUserList({
        emailAddress: args.emails
      })
      console.log("usersFromClerk", data)
      return data
    } catch (error) {
      console.log("ERROR FROM CLERK", error)
    }

    return [] // or throw an error instead?
  }
})