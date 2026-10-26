// Babel configuration for the host app.
// @babel/preset-env: compile modern JS to browser-compatible JS
// @babel/preset-react: compile JSX syntax to regular JS function calls
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
    '@babel/preset-react',
  ],
};
