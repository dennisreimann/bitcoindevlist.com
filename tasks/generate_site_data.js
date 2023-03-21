const { readdirSync, writeFileSync } = require('fs')
const { basename, join, resolve } = require('path')
const { slugify } = require('../helpers')

const dir = resolve(__dirname, '..')
const dst = join(dir, 'site-data.json')

const donatees = readdirSync(join(dir, 'donatees')).map(filename => {
  const filePath = join(dir, 'donatees', filename)
  const donatee = require(filePath)
  donatee.id = basename(filename, '.json')
  return donatee
})

// tags
const tagsUsage = donatees.reduce((res, donatee) => {
  if (donatee.tags) {
    donatee.tags.forEach(tag => {
      const slug = slugify(tag)
      res[slug] = (res[slug] || 0) + 1
    })
  }
  return res
}, {})

const tags = Object.entries(tagsUsage).sort((a, b) =>
  a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0
)

const descriptionLengths = donatees
  .reduce((res, d) => res.concat([[d.id, d.description.length]]), [])
  .sort((a, b) => (a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0))
const averageDescriptionLength = Math.round(
  descriptionLengths.reduce((res, d) => res + d[1], 0) /
    descriptionLengths.length
)

const stats = {
  descriptionLengths,
  averageDescriptionLength,
  tags
}

const data = {
  donatees,
  stats,
  tagsUsage,
  date: new Date().toJSON().split('T')[0]
}
const json = JSON.stringify(data, null, 2)

writeFileSync(dst, json)
