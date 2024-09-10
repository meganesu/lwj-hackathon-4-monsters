import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {
  return (
    <>
      <Authenticated>
        <h1>Browse Profiles</h1>
        <Content />
      </Authenticated>
      <Unauthenticated>
        <p>This is a test!</p>
      </Unauthenticated>
    </>
  )
}

const LoadingPlaceholder = () => {
  return (
    <p>Loading user data...</p>
  )
}

const Content = () => {
  // Get the current user's species
  const currentUser = useQuery(api.users.getCurrentUser)
  console.log("currentUser", currentUser)

  if (!currentUser || currentUser.length === 0) {
    return <LoadingPlaceholder />
  }

  const currentSpecies = currentUser[0].species
  console.log("currentSpecies", currentSpecies)

  // Get the list of user profiles for the current user to browse
  // (if current user is a human, show monsters)
  // (if current user is a monster, show humans)
  const speciesToShow = currentSpecies === "human" ? "monster": "human"
  let users = useQuery(api.users.getUsersBySpecies, { species: speciesToShow }) || []
  console.log("users from Convex", users)

  /*

  // Make a list of emails
  const emails = users.map(user => user.email)
  console.log("emails", emails)
  
  const getUsersByEmail = useAction(api.clerk.getUsersByEmail)
  const clerkData = getUsersByEmail({
    emails: emails
  })
  console.log("usersFromClerk", clerkData)

  const profiles = []
  */

  /*
  // useEffect(() => {

  //   const fetchData = async () => {
  //     // Get a list of all my users from Clerk
  //     const { data, totalCount } = await clerkClient.users.getUserList({
  //       emailAddress: emails
  //     })
  //     console.log("usersFromClerk", data)
  //   }

  //   fetchData();

  //   // Map over the users array & Add in the name from Clerk
  // }, [])
  */

  return (
      <ul>
        {/*
          for each user that we get back
          render the:
          - user's name
          - a button to connect
        */}
      </ul>
  )
}

export default Home;