# Module Federation 2.0 React Example

An example app designed with micro frontend architectural pattern using **Module Federation 2.0** 

- `header-app` — remote, exposes `./Header`, runs on port 4001, publishes `mf-manifest.json`
  and generated `.d.ts` types for everything it exposes

<img width="1400" height="530" alt="image" src="https://github.com/user-attachments/assets/10951605-06e5-4f8a-90f8-b04c85f4b099" />

  
- `home-app` — host, consumes `HeaderApp/Header` via the remote's manifest and gets full
  IDE/`tsc` type checking on that import, even though it's a separate build

<img width="1400" height="505" alt="image" src="https://github.com/user-attachments/assets/3b450d44-dbb3-4ef1-95ed-c89eaebc2cb1" />


## Getting started

Start `header-app` first — `home-app` fetches both its runtime bundle *and* its types from it
on startup:

```
cd header-app && npm install && npm start
cd home-app && npm install && npm start
```

Open [http://localhost:4000](http://localhost:4000) to view the host (Home App)\
Open [http://localhost:4001](http://localhost:4001) to view the remote (Header App)

Type-check either app on its own with `npm run typecheck`.

