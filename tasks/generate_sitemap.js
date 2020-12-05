const pug = require('pug')
const glob = require('glob')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

const html = glob.sync(resolve(__dirname, '..', `dist/**/*.html`))
const pages = html.map(file => file.replace(/.*\/dist/, 'https://nanodevlist.com'))
const now = (new Date()).toISOString()
const file = resolve(__dirname, '..', `includes/sitemap.pug`)
const rendered = pug.renderFile(file, { pages, now, pretty: true })
const dst = resolve(__dirname, '..', 'dist', 'sitemap.xml')

writeFileSync(dst, rendered)
