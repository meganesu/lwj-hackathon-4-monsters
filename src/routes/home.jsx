import { Authenticated, Unauthenticated, useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import React, { useState, useEffect } from "react";
import "./home.css"

const Home = () => {
  return (
    <>
      <Authenticated>
        <h1>Browse Profiles</h1>
        <Content />
      </Authenticated>
      <Unauthenticated>
        <h1>
          Welcome to Monster Match!
        </h1>
        <h2>
          Bridging Two Worlds, One Connection at a Time
        </h2>
        <p id="emojis">🧟🧡🧑🏽‍⚕️</p>
        <p>
          In a world where monsters are real, it's time to go beyond fear and embrace understanding. Monster Match is the first-ever inter-species cultural exchange program, designed to help humans and monsters learn from each other in a unique, immersive way.
        </p>
        <p>
        Browse profiles, find your perfect match—whether it's a towering troll, a mischievous imp, or a curious human. Connect, swap places, and step into each other's lives for a while. Just like a student exchange program, Monster Match offers a chance to experience a new perspective, foster empathy, and create lasting bonds between two worlds.
        </p>
        <p>
        Dare to discover the unfamiliar and see that maybe, we’re not so different after all. Start your adventure today with Monster Match!
        </p>
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
  const getUsersBySpeciesAction = useAction(api.users.getUsersBySpeciesAction)

  useEffect(() => {
    const getUsersByOppositeSpecies = async () => {
      const speciesToShow = currentSpecies === "human" ? "monster": "human"

      const usersToShow = await getUsersBySpeciesAction({
        species: speciesToShow
      })
      setUsers(usersToShow)
    }

    if (currentUser) {
      setCurrentSpecies(currentUser[0].species)
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
          <Profile name={user.name} email={user.email} />
        ))
      }
    </ul>
  )
}

const Profile = ({ name, email }) => {
  const [shouldShowEmail, setShouldShowEmail] = useState(false)

  const handleClick = () => {
    setShouldShowEmail(true)
  }

  return (
    <li>
      <div>
        <p>{name}</p>
        {
          !shouldShowEmail &&
          <button onClick={handleClick}>Connect!</button>
        }
        {
          shouldShowEmail && 
          <p>{email}</p>
        }
      </div>
    </li>
  )
}


export default Home;