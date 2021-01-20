// configure markdown-it
const transformer = require('jstransformer')
const { _tr: mdTransformer } = transformer(require('jstransformer-markdown-it'))

const config = {
  typographer: true,
  html: true
}

// monkey-patch render function to pass custom options
const { render: renderMd } = mdTransformer

mdTransformer.render = str => renderMd(str, config)

const slugify = str => str.toLowerCase().replace(/\W/, '-')
const truncate = (str, wordCount) => {
  const words = str.trim().split(/\s(?![^\[]*\])/g)
  const head = words.splice(0, wordCount).join(' ')
  const tail = words.join(' ')
  return [head, tail]
}
const assetPath = path => {
  let revs
  try { revs = require('./rev-manifest.json') } catch (error) { }
  return `${(revs && revs[path]) || path}`
}
const assetUrl = (path, protocol = 'https') => {
  return `${protocol}://bitcoindevlist.com/${assetPath(path)}`
}

module.exports = {
  slugify,
  truncate,
  assetUrl,
  assetPath,
  renderMarkdown: mdTransformer.render
}
