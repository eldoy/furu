const it = {}

it['should do some stuff'] = async function({ test, request }) {
  const { data, code } = await request()
  test.deepEqual(code, 200)
}

module.exports = it
