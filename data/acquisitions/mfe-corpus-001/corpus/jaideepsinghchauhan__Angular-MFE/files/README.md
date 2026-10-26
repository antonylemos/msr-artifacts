# This Repo include 1 host/Appshell and 2 MFE's and 2 Libraries
  1 Library is for data sharing between MFEs and another is for shared html components(common used resources)
  an example also includes 1 mfes which has 2 independent separate component being export and both lazyloaded based on the route.

# Install NX vscode extention for faster and easier use of NX


# AngularMonorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve angular-monorepo
```

To create a production bundle:

```sh
npx nx build angular-monorepo
```

To see all available targets to run for a project, run:

```sh
npx nx show project angular-monorepo
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


# Steps i have taken to install

npx create-nx-workspace@latest angular-monorepo --preset=angular-monorepo

From <https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial> 

Use - PowerShell

√ Application name · angular-monorepo
√ Which bundler would you like to use? · webpack
√ Default stylesheet format · css
√ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? · No
√ Which unit test runner would you like to use? · none
√ Test runner to use for end to end (E2E) tests · cypress
√ Which CI provider would you like to use? · skip
√ Would you like remote caching to make your build faster? · skip

 NX   Creating your v21.2.0 workspace.


	2. Generate a Host angular app
		a. Click on the NX in vscode and click generate search for host app and create a name host and directory appshell/host

Now we can see the mapping in host module federation config file for both mfes
but that is for localhost , if we want to set it for production level , then we need to add the url mapping there in prod mfe config file as well.

How is the host/appshell connected with mfe
we have an remote entry module that we export from mfe and map to module federation config file in host

along with that we use lazy loading to import and that mapping is in general available in host/appshell app routes, so that we only load mfe which we want to navigate to. 

we can create one more mfe2 for similar case.

Instead of exporting 1 single module, we can also export multiple smaller modules from and app and then give then as an individual mfe

We need to create a component, for easy demo lets take a standalone component rather than a module

Create a folder greeting and 2 files  (greeting.component.ts and greeting.routes.ts)

//greeting.component.ts
// apps/mfe1/src/app/greeting/greeting.component.ts
import { Component } from '@angular/core';
@Component({
  selector: 'mfe1-greeting',
  standalone: true,
  template: `<h2>Hello from Greeting Component!</h2>`,
})
export class GreetingComponent {}


// greeting.routes.ts
import { Route } from '@angular/router';
export const greetingRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./greeting.component').then((m) => m.GreetingComponent),
  },
];

Update mfe1 module federation with this new route 

add this line : 


'./GreetingRoutes': 'appshell/mfe1/src/app/greeting/greeting.routes.ts',

full file :


import { ModuleFederationConfig } from '@nx/module-federation';
const config: ModuleFederationConfig = {
  name: 'mfe1',
  exposes: {
    './Routes': 'appshell/mfe1/src/app/remote-entry/entry.routes.ts',
    './GreetingComponent':
      'appshell/mfe1/src/app/greeting/greeting.component.ts',
  },
};
export default config;


in app.routes.ts add this entry below so that it works as a standalone component as well.


  {
    path: 'greeting',
    loadChildren: () =>
      import('./greeting/greeting.routes').then((m) => m.greetingRoutes),
  },


Now lets head towards  host/appshell folder 

under host/src/app/app.route.ts

add this entry :


  {
    path: 'greeting',
    loadChildren: () =>
      import('mfe1/GreetingRoutes').then((m) => m.greetingRoutes),
  },

If you encounter this error Cannot find module 'mfe1/GreetingRoutes' or its corresponding type declarations

then we need to follow these steps

1. Create a remotes.d.ts in host/src/
This tells TypeScript about the remote modules you've exposed.

ts
CopyEdit
// host/src/remotes.d.ts
declare module 'mfe1/Routes' {
  import { Route } from '@angular/router';
  export const remoteRoutes: Route[];
}
declare module 'mfe1/GreetingRoutes' {
  import { Route } from '@angular/router';
  export const greetingRoutes: Route[];
}
You can include declarations for any other exposed modules (like mfe2/Routes) here too if needed.

🔹 2. Make sure remotes.d.ts is included in tsconfig.app.json
Normally this happens automatically, but just confirm:

json
CopyEdit
// host/tsconfig.app.json
{
  "compilerOptions": {
    "types": ["node"]
  },
  "files": ["src/remotes.d.ts"], //need to add this particular line
  "include": ["src/**/*"]
}

Now we need to restart the server and see that it works as an independent standalone mfe.

Why am I not updating the module federation config for host ? 

Lets take a look at how we share data between components/mfe's in appshell/host

Lets go to Nx plugin in vscode and click generate and select nx/angular library

create a directory libs/shared/ui and name as 'button' click generate


Now we will have a libs folder next to appshell folder which has button component as standalone. And Now a library is created

we can check the tsconfig.base.json for the library to see the button address and import that button in hosts/appshell app.component.ts or app.ts and put it into imports module. 


sample : 


import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Button } from '@angular-monorepo/button';
@Component({
  imports: [NxWelcome, RouterModule, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'host';
}

If I want to import and use this button in mfe1 or mfe2 I can simple import that into entry module of mfe1 and use the same import statement from tsconfig.base.json 

So after I imported and save I got this error :


8     <lib-button [label]="'Click Me'"></lib-button>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: appshell/mfe1/src/app/remote-entry/nx-welcome.ts:8:17 - error NG8002: Can't bind to 'label' since it isn't a known property of 'lib-button'.
1. If 'lib-button' is an Angular component and it has 'label' input, then verify that it is included in the '@Component.imports' of this component.
2. If 'lib-button' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@Component.schemas' of this component. 

To resolve this :  Do I need to restart the host server Or fix some issues in the import

there is no issue we need to refresh the setup and also restart the host server again.

to not restart everything we can simply update the base module and save , it should update the whole.

To Share the data across the MFE, we need to create one more library using nx angular library

the path will be same libs/shared/data but don’t enter any name, now we need to create a service using nx generate service within the libs/shared/data/src/lib/

Now we might not see the lib Data because we need to refresh this workspace

Below is the user service


import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggenIn = signal(false);
  constructor() {}
  login() {
    this.isLoggenIn.set(true);
  }
  logout() {
    this.isLoggenIn.set(false);
  }
  get isLoggedIn() {
    return this.isLoggenIn;
  }
}

We need to inject this into app.ts (not import into the array) and inject it sample:



import { UserService } from '@angular-monorepo/data';
@Component({
  imports: [NxWelcome, RouterModule, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public readonly userService = inject(UserService);

No we can use this methods inside app.ts

So let's say logout and login works, now how do I use this service in a mfe , we can simply inject the same service in mfe and work with it, we do need to restart the server once.


I will go to mfe


Example in mfe1 nx-welcome component.ts



import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@angular-monorepo/data';
@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `

      isLogged In {{ isLoggedIn }}

      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome mfe1 👋
          </h1>
        </div>
        </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {
  public userService = inject(UserService);
  get isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
![image](https://github.com/user-attachments/assets/d79fb3c0-f699-41a9-a906-474e0a5decd8)
