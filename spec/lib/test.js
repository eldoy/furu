const assert = require('assert')
const request = require('../lib/request.js')

module.exports = async function test(name) {
  try {
    return await require(`../tests/${name}.test.js`)({
      request, test: assert
    })
  } catch (e) {
    console.log(`\n* Test "${name}" failed:\n`)
    console.log(e.message)
    console.log()
  }
}