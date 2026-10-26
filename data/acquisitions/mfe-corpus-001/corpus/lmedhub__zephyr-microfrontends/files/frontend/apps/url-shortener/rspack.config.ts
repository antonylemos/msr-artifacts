const rspack = require("@rspack/core");
const path = require("path");
const { withZephyr } = require("zephyr-webpack-plugin");

module.exports = withZephyr()({
  context: __dirname,
  entry: {
    main: "./src/index.ts",
  },

  devServer: {
    port: 3003,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  resolve: {
    extensions: [".js", ".ts", ".vue", ".json"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },

  experiments: {
    css: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        type: "javascript/auto",
        use: [
          {
            loader: "vue-loader",
            options: {
              experimentalInlineMatchResource: true,
              compilerOptions: {
                isCustomElement: (tag: any) => tag.includes("-"),
              },
            },
          },
        ],
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        type: "css",
      },
    ],
  },

  plugins: [
    new (require("vue-loader").VueLoaderPlugin)(),
    new rspack.container.ModuleFederationPlugin({
      name: "url_shortener",
      filename: "remoteEntry.js",
      exposes: {
        "./Shortener": "./src/Shortener.vue",
      },
      shared: {
        vue: {
          singleton: true,
          eager: true,
          requiredVersion: "^3.4.0",
        },
      },
    }),
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
  ],
});

export {};
