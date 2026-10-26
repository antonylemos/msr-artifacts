// IMPORTANT: This file uses a dynamic import to start the app asynchronously.
//
// Why? Webpack Module Federation loads remote modules (the MFEs) asynchronously.
// If we put React.render() directly here, the remotes might not be ready yet.
// By using import('./bootstrap'), we ensure everything is initialized before
// the app starts — this is the standard pattern for Module Federation.
import('./bootstrap');
