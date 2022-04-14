const it = {}

it['should do some stuff'] = async function({ test, request }) {
  const { data, code } = await request({ path: '/hello'})
  test.deepEqual(code, 200)
  test.deepEqual(data.hello, 'world')
}

module.exports = it
