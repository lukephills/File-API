#FILE API - LOAD & DECODE AUDIO

Drag and drop and audio file in the container and it will be decoded into an AudioBuffer ready for use with the Web Audio API.


### Development

Install the node modules:
`npm install`

Install Webpack:
`npm install -g webpack`

Run webpack watch:
`webpack --watch`

Every time a typescript file is saved, Webpack will bundle all dependencies into a minified `bundle.js` file and create sourcemaps for debugging. In dev tools look at `webpack://` in the Sources panel.
