import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react"

function EditProfile() {
  return (
    <>
      <Authenticated>
        <Content />
      </Authenticated>
    </>
  )
}

function Content() {
  const [selectedSpecies, setSelectedSpecies] = useState();

  const handleSpeciesChange = (event) => {
    console.log(event)
    setSelectedSpecies(event.target.id)
  }

  const currentUser = useQuery(api.users.getCurrentUser)
  console.log("currentUser", currentUser)

  const createUser = useMutation(api.users.createUser)

  function handleClick(event) {
    event.preventDefault()
    
    // If the currently signed in user isn't in the users db, add them
    if (currentUser.length === 0) {
      createUser({
        species: selectedSpecies
      })
    }
    // If the current user is already in the users db
    //  update their existing document
    else {
      // NEXT TODO: 
      /*
        If there is a match:
          Make a Convex call to api.users.updateUser
            Call db.replace()
      */
    }
  }

  return (
    <>
      <h1>Edit Profile</h1>
      <form>
        <fieldset>
          <legend>What's your species?</legend>
        
          <input type="radio" id="human" name="species" onChange={handleSpeciesChange} />
          <label htmlFor="human">Human</label>

          <input type="radio" id="monster" name="species" onChange={handleSpeciesChange}/>
          <label htmlFor="monster">Monster</label>
        </fieldset>

        <button type="submit" onClick={handleClick}>Save Changes</button>
      </form>
    </>
  )
}

export default EditProfile;