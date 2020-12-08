const { slugify, truncate, renderMarkdown } = require('./helpers')

module.exports = {
  basedir: './includes',
  siteData: require('./site-data'),
  slugify,
  truncate,
  renderMarkdown,
}
