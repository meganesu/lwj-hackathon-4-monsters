# Monster Match

Welcome to the Monster Match!

This app was created as part of the Learn with [Jason Web Dev Challenge Hackathon #4](https://www.learnwithjason.dev/blog/web-dev-challenge-hackathon-monsters).

To run locally, run `npm run dev`.

## Goal

Monsters are real! And they're real misunderstood!

As a way to build empathy between monsters and humans, Monster Match seeks to create the first-ever inter-species cultural exchange program.


## Test Credentials

You can sign in as a monster or as a user. (The passwords and emails are the same. Don't tell.)

Monster accounts:

- `monster+clerk_test@example.com`
- `monster2+clerk_test@example.com`
- `monster3@example.com`

Human accounts:

- `human+clerk_test@example.com`
- `human2@example.com`
- `human3@example.com`

## How to Test

On the home page, use the Sign In button in the header to log into one of the accounts above.

After you sign in, the home page will show a list of users of the opposite species. (Humans will see monsters, monsters will see humans.)

Click the "Connect!" button for a user to get their email address! (I know this is super bad practice from a security standpoint. Someday I'd like to add a chat feature so that users can talk in the app without needing to exchange personal information.)

### Known bugs

- Currently, names are hard-coded into Clerk via the dashboard. If you create a new account, you won't have a name set, so you'll probably see some errors or unexpected behavior. Use one of the accounts provided to avoid this.

- Species can be set once but not edited. All the test accounts already have their species set in the Convex database. Using the Edit Profile page to submit an updated species value won't actually do anything. (I meant to add this but ran out of time.)


## Tools I used

- Vite & React
- Convex (for database)
- Clerk (for auth)
- React Router (for routes)
- pnpm (for package management)
- Netlify (for hosting)
- ChatGPT (to generate the home page text, & for debugging)

## Plans for v2 and Beyond

There were a bunch of features I wanted to add, but ran out of time for.

- **Better styling**
    - I spent most of my time on the functionality (getting the data to talk nicely between the React components & Convex functions), so I didn't have a chance to do much in the way of styling.
- **Additional profile fields**
    - Users should be able to add an "About Me" section to display on their profiles.
    - Users should be able to edit their names and species. (Known bugs: Currently, names are hard-coded into Clerk via the dashboard. Species can be set once but not edited.)
- **Connection requests** (instead of exposing contact info directly, like how dating apps work 😅).
    - A monster and human must both press connect on each other's profiles before they'll exchange contact information.
    - The My Matches page shows you a list of the users you've matched with.
- **Chat**
    - After a monster/human connection is made, they should be able to chat with each other to make plans. 