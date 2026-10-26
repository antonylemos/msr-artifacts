const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  singleSpaWebpackConfig.externals = {
    ...singleSpaWebpackConfig.externals,
    "@myapp/common-lib-webpack": "@paok/common-lib-webpack",
  };

  // console.log(singleSpaWebpackConfig);
  const configModules = singleSpaWebpackConfig.module;
  const scssRule = config.module.rules.find((rule) =>
    rule.test.toString().includes("scss")
  ).rules[0];

  console.log(scssRule);
  console.log(JSON.stringify(scssRule));

  // scssRule.oneOf.unshift({
  //   resourceQuery: /\?unmountable/,
  //   use: [
  //     {
  //       loader: "style-loader",
  //       options: {
  //         injectType: "lazySingletonStyleTag",
  //       },
  //     },
  //     // Take the other loaders that Angular uses internally.
  //     // Since we replaced the `mini-css-extract-plugin` loader with the
  //     // `style-loader` (which is at index 0), we slice the list by 1 index.
  //     ...scssRule.oneOf[0].use.slice(1),
  //   ],
  // });

  const cssIncludeRule = scssRule.oneOf.filter(
    (oneOfElement) => oneOfElement.include
  );
  console.log(cssIncludeRule);
  console.log(JSON.stringify(cssIncludeRule));

  const styleLoaderUse = cssIncludeRule[0].use.find((useElement) =>
    useElement.loader.includes("style-loader")
  );
  styleLoaderUse["options"] = {
    // injectType: 'lazyStyleTag',
    attributes: {
      paokOle: "12345678",
    },
  };
  console.log(styleLoaderUse);

  console.log(JSON.stringify(scssRule));
  // console.log(JSON.stringify(scssRule));

  // console.log(singleSpaWebpackConfig.module);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
