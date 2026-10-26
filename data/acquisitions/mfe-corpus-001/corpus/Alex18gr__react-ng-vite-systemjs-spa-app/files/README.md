# Single-spa app with React Angular Vite and SystemJS
This is a microfrontend architecture poc based on example [nitinreddy3/react-ng-spa-app](https://github.com/nitinreddy3/react-ng-spa-app) repository ([MIT LICENSE](https://github.com/nitinreddy3/react-ng-spa-app/blob/main/LICENSE)).

## Install the npm packages
The applications node version required for each application is different. You need to navigate to the root-config, react-app, and angular-app folders and run the command
```js
$ npm install
```

## Run the application

- Angular application. Requires Node 16. Navigate to the angular-app folder and run the below command
  ```js
  $ npm run serve:single-spa:angular-app
  ```
- React application. Requires Node 16. Navigate to the react-app folder and run the below command
  ```js
  $ npm start
  ```
- Navigate to the root-config folder and run the below command
  ```js
  $ npm start
  ```
- Navigate to the react-vite-app folder and run the below command
  ```js
  $ npm run dev:single-spa
  ```

  In the browser open the application at http://localhost:9000
  
  Now in the top navigation bar click on **React**, you will be routed to the React app, on click of **Angular** you will be redirected to angular app
  
  **http://localhost:9000/react** -> React App
  **http://localhost:9000/angular/** -> Angular App


