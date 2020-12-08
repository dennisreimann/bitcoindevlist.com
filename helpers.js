// configure markdown-it
const transformer = require('jstransformer')
const { _tr: mdTransformer } = transformer(require('jstransformer-markdown-it'))

const config = {
  typographer: true,
}

// monkey-patch render function to pass custom options
const { render: renderMd } = mdTransformer

mdTransformer.render = str => renderMd(str, config)

const slugify = str => str.toLowerCase().replace(/\W/, '-')
const truncate = (str, wordCount) => {
  const words = str.split(' ')
  const truncated = words.length > wordCount
  const res = truncated ? words.splice(0, wordCount).join(' ') : str
  return [res, truncated]
}

module.exports = {
  slugify,
  truncate,
  renderMarkdown: mdTransformer.render,
}
