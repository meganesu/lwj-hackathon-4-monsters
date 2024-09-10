import { Authenticated, Unauthenticated, useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import React, { useState, useCallback, useEffect } from "react";

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
  // state
  const [currentSpecies, setCurrentSpecies] = useState();
  const [users, setUsers] = useState([]);

  // hooks
  const currentUser = useQuery(api.users.getCurrentUser)
  console.log("currentUser", currentUser)
  const getUsersBySpeciesAction = useAction(api.users.getUsersBySpeciesAction)

  useEffect(() => {
    const getUsersByOppositeSpecies = async () => {
      const speciesToShow = currentSpecies === "human" ? "monster": "human"
      console.log("speciesToShow", speciesToShow)

      const usersToShow = await getUsersBySpeciesAction({
        species: speciesToShow
      })
      setUsers(usersToShow)
      console.log("users to show", usersToShow)
    }

    if (currentUser) {
      setCurrentSpecies(currentUser[0].species)
      console.log("currentSpecies", currentSpecies)
      getUsersByOppositeSpecies().catch(error => { console.log("ERROR:", error)})
    }
  }, [currentUser, currentSpecies, getUsersBySpeciesAction])

  if (!currentUser || currentUser.length === 0) {
    return <LoadingPlaceholder />
  }

  return (
    <ul>
      {
        users.map(user => (
          <li>{user.name}</li>
        ))
      }
    </ul>
  )
}

export default Home;