import React, { useState } from "react";
import { userState } from "@myapp/common-lib-webpack";
// import { Button } from "styleguide";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App({ name }) {
  return (
    <Router>
      <div>
        <p>{name} is mounted</p>
        <nav>
          <ul>
            <li>
              <Link to="/react">Home</Link>
            </li>
            <li>
              <Link to="/react/about">About</Link>
            </li>
            <li>
              <Link to="/react/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/react/about">
            <About />
          </Route>
          <Route path="/react/users">
            <Users />
          </Route>
          <Route path="/react">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  const [userStateValue, setUserStateValue] = React.useState(
    userState.getUser()
  );
  React.useEffect(() => {
    const subscription = userState.user$.subscribe((user) => {
      setUserStateValue(user);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <h2>About user {userStateValue}</h2>;
}

function Users() {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username submitted: ${username}`);
    userState.setUser(username); // Update the user state in common-lib-webpack
    setUsername(""); // Clear the input field after submission
    // You can replace this with any other submit logic
  };

  return (
    <>
      <h2>Users</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          User:{" "}
          <input
            type="text"
            value={username}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        {/* <Button>Submit</Button> */}
      </form>
    </>
  );
}
