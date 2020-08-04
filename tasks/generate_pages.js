const pug = require('pug')
const { readFileSync, mkdirSync, writeFileSync } = require('fs')
const { dirname, join, resolve } = require('path')
const { donatees } = require('../site-data.json')
const config = require('../pug.config')

const renderPage = (tmpl, out, data = {}) => {
  const file = resolve(__dirname, '..', `src/${tmpl}.pug`)
  const options = Object.assign({}, config, data)
  const rendered = pug.renderFile(file, options)
  const dst = resolve(__dirname, '..', 'dist', `${out}.html`)
  const dir = dirname(dst)

  mkdirSync(dir, { recursive: true })
  writeFileSync(dst, rendered)
}

const byTag = donatees.reduce((res, donatee) => {
  if (donatee.tags) {
    donatee.tags.forEach(tag => {
      const slug = config.slugify(tag)
      res[slug] = res[slug] || { slug, tag, donatees: [] }
      res[slug].donatees.push(donatee)
    })
  }
  return res
}, {})

// home
renderPage('index', 'index')

// donatees
donatees.forEach(donatee => {
  const data = donatees.reduce((res, d) =>
    Object.assign(res, d.id === donatee.id
      ? { ['feature']: d }
      : { ['other']: res.other.concat(d) }
    )
  , { feature: null, other: [] })

  renderPage('donatee', `${donatee.id}/index`, data)
})

// tags
Object.values(byTag).forEach(({ slug, tag, donatees: feature }) => {
  const data = donatees.reduce((res, d) =>
    Object.assign(res, feature.includes(d)
      ? {}
      : { ['other']: res.other.concat(d) }
    )
  , { other: [] })

  data.tag = tag
  data.feature = feature

  renderPage('tag', `tag/${slug}/index`, data)
})
