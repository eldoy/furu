const assert = require('assert')
const request = require('../lib/request.js')

module.exports = async function test(name) {
  try {
    const result = await require(`../tests/${name}.test.js`)({
      t: assert,
      r: request
    })
    return result
  } catch (e) {
    console.log(`\n* Test "${name}" failed:\n`)
    console.log(e.message)
    console.log()
  }
}