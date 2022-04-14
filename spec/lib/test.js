const assert = require('assert')
const request = require('../lib/request.js')

module.exports = async function(file) {
  const tests = require(`../tests/${file}.test.js`)

  for (const name in tests) {
    try {
      return await tests[name]({ request, test: assert })
    } catch (e) {
      console.log(`\n* it['${name}'] in '${file}' failed:\n`)
      console.log(e.message)
      console.log()
    }
  }
}