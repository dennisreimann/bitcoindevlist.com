const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { basename, join, resolve } = require('path')

const dir = resolve(__dirname, '..')
const dst = join(dir, 'site-data.json')

const donatees = readdirSync(join(dir, 'donatees')).map(filename => {
  const filePath = join(dir, 'donatees', filename)
  const donatee = require(filePath)
  donatee.id = basename(filename, '.json')
  return donatee
})

const data = {
  donatees,
  date: (new Date()).toJSON().split('T')[0]
}
const json = JSON.stringify(data, null, 2)

writeFileSync(dst, json)

// eslint-disable-next-line no-console
console.log('✅  Generated site-data.json')
