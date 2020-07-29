const mediaVariables = require('postcss-media-variables')

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nesting'),
    mediaVariables,
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    mediaVariables
  ]
}
