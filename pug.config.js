const { slugify, truncate, assetUrl, assetPath, renderMarkdown } = require('./helpers')

module.exports = {
  basedir: './includes',
  siteData: require('./site-data'),
  slugify,
  truncate,
  assetUrl,
  assetPath,
  renderMarkdown,
}
