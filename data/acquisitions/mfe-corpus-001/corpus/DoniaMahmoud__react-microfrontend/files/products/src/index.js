// Adding import of bootstrap instead of directly using index.js
// Allow webpack to load the bootstrap file asynchronously
// Lets webpack have the opportunity to load the faker module used in bootstrap.js
import("./bootstrap");
