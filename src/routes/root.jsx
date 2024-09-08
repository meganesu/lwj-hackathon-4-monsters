import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import "./root.css";
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <div id="page-wrapper">
      <header>
        <Link to={`/`}>Monster Cultural Exchange Program</Link>
        <nav>
          <Authenticated>
            <Link to={`editProfile`}>Edit My Profile</Link>
            <Link to={`matches`}>My Connections</Link>
            <UserButton />
          </Authenticated>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        👩‍💻 This app was created as part of the Learn with Jason Web Dev Challenge Hackathon #4.
      </footer>
    </div>
  )
}

export default Layout;