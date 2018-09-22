# Live Site
https://5ba649a3b3127434cb4008ce.zen-keller-b0448d.netlify.com/

# Development Environment
* `macos - 10.13.6`
* `node.js - 10.10.0`
* `npm - 6.4.1`
* `chrome - 69.0.3497.100`

# Build Steps
1. `npm i --save` to install all dependencies, including dev-dependencies
2. `npm run test` to run tests
3. `npm start` to start a local server and access on web browser
4. (optional) `npm run build` to build a production build

# Implemented Features
* All mandatory features
* Most of the optional features
    * Response design when it's on smaller screens
    * Content list refresh button
    * Basic Error Handlings, using the interceptor of axios to handle all responses from server
    * Persistent storage of watched items in localstorage
    * Some basic unit tests