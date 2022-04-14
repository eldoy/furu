module.exports = async function({ test, request }) {
  const { data, code } = await request()
  test.deepEqual(code, 200)
}
