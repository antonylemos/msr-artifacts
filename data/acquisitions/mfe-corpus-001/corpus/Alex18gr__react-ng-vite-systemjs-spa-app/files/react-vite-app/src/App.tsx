import { FormEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { userState } from "@myapp/common-lib-webpack";
import { Button, MyMaterialRadio } from "styleguide";

function App() {
  const [count, setCount] = useState(0);
  const [userStateValue, setUserStateValue] = useState(userState.getUser());
  // const [buttonComponent, setButtonComponent] = useState(null);

  useEffect(() => {
    const subscription = userState.user$.subscribe((user: string) => {
      setUserStateValue(user);
    });
    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {

  //   const getButtonComponent = async () => {
  //     // Dynamically import the Button component from the styleguide
  //     console.log('Importing styleguide...');
  //     // @ts-ignore
  //     const md = await System.import('styleguide');
  //     console.log('md:', md);
  //     const Button = md.Button;
  //     console.log('Button component:', Button);
  //     setButtonComponent(() => Button);
  //   };
  //   getButtonComponent();

  // }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log("Form data:", formJson);
    // Set the user state
    userState.setUser(formJson.userName as string);
    console.log("User from common-lib-webpack:", formJson.userName);
    // Clear the form
    form.reset();
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn morer
      </p>
      <h2>Curre user value {userStateValue}</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          User: <input name="userName" defaultValue="Alex" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* {buttonComponent && React.createElement(buttonComponent, { data: { label: 'test' } })} */}
      <Button label="Test" onClick={() => console.log("Test button clicked")} />
      <MyMaterialRadio
        label="Option A"
        checked={true}
        onChange={() => alert("A")}
        myExtraProp="custom-info"
      />
    </>
  );
}

export default App;
