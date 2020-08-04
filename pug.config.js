// initialize markdown rendering
const renderMarkdown = require('./markdown')

const slugify = str => str.toLowerCase().replace(/\W/, '-')

module.exports = {
  basedir: './includes',
  siteData: require('./site-data'),
  slugify,
  renderMarkdown,
}
