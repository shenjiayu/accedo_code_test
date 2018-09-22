# Live Site
https://5ba649a3b3127434cb4008ce.zen-keller-b0448d.netlify.com

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
* Extra Features
    * History list clear button
* Features not implemented
    * Image Caching, I tried to cache the image by converting the image loaded from the server, convert it to base64 data and store it into localstorage, but it keeps throwing CORS error. Due to the time constraint, I didn't implement this feature.

# Known Bugs
1. I have noticed that the cover image for each movie is randomly generated rather than a unchanged image, so the image is not showing correctly for the right movie in the history section.
2. The url of each movie is the same, so the video src is not changed every time a new movie container is clicked.

Be sure to let me know if there're any more bugs when you are reviewing this test

# To be improved
1. The error handlers could be more informative or prettier such as using nice pop-ups and more cases can be token into considerations
2. More unit tests can be done to improve code coverage
3. The arrows control might not following the standard
4. State management / Persistent storage can be improved using any state management libraries
