const { slugify, renderMarkdown } = require('./helpers')

module.exports = {
  basedir: './includes',
  siteData: require('./site-data'),
  slugify,
  renderMarkdown,
}
