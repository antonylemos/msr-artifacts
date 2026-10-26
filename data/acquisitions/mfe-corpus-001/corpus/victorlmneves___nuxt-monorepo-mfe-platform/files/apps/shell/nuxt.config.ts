import { defineNuxtConfig } from "nuxt/config";

// const sidebaseConfig = {
//   isEnabled: true,
//   provider: {
//     type: "authjs",
//     options: {
//       providers: [
//         {
//           provider: "auth0",
//           options: {
//             clientId: process.env.NUXT_AUTH0_CLIENT_ID,
//             clientSecret: process.env.NUXT_AUTH0_CLIENT_SECRET,
//             issuer: process.env.NUXT_AUTH0_ISSUER_BASE_URL,
//             encryption: {
//               secret: process.env.NUXT_AUTH0_ENCRYPTION_SECRET,
//             },
//           },
//         },
//       ],
//       callbacks: {
//         async jwt({ token, account, profile }) {
//           if (account) {
//             token.accessToken = account.access_token;
//             token.sub = profile?.sub;
//           }
//           return token;
//         },
//         async session({ session, token }) {
//           session.accessToken = token.accessToken;
//           session.user.id = token.sub;
//           return session;
//         },
//       },
//     },
//   },
//   sessionRefresh: {
//     enablePeriodically: false,
//     enableOnWindowFocus: false,
//   },
//   disableServerSideAuth: true,
//   exclude: ["/auth/logout"],
// };

const sidebaseConfig = {
    isEnabled: true,
    provider: {
        type: 'authjs',
    },
    sessionRefresh: {
        enablePeriodically: false,
        enableOnWindowFocus: false,
    },
    disableServerSideAuth: false,
    exclude: ['/auth/logout'],
};

export default defineNuxtConfig({
  ssr: true,
  modules: ["@sidebase/nuxt-auth", "@pinia/nuxt"],

  auth: { ...sidebaseConfig },

  // No ModuleFederationPlugin needed on the shell.
  // Remotes are loaded at runtime by useMfeLoader via dynamic <script> injection
  // — the shell never statically imports any remote module.

  runtimeConfig: {
    AUTH0_AUDIENCE: "",
    AUTH0_CLIENT_ID: "",
    AUTH0_CLIENT_SECRET: "",
    AUTH0_ENCRYPTION_SECRET: "",
    AUTH0_ISSUER_BASE_URL: "",
    AUTH0_SCOPE: "openid profile email offline_access",
    public: {
      AUTH0_ISSUER_BASE_URL: process.env.NUXT_AUTH0_ISSUER_BASE_URL,
      AUTH_ORIGIN: "",
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "MFE Platform",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
