module.exports = async function({ t, r }) {
  const { data, code } = await r()
  t.deepEqual(code, 200)
}
