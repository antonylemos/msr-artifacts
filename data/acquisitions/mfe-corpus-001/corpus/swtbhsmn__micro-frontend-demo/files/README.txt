Microfrontend Webpack Module Federation demo
-------------------------------------------
Two apps:
 - app1 (host)  -> http://localhost:3001
 - app2 (remote) -> http://localhost:3002

Run steps:
  1) Open terminal, cd to /app2, run:
       npm install
       npm start
  2) Open another terminal, cd to /app1, run:
       npm install
       npm start
  3) app1 will open at http://localhost:3001 and load remote component from app2

Notes:
 - This is a minimal demo. Use Node >= 18 and npm.
 - If ports conflict, adjust webpack devServer ports in webpack.config.js
