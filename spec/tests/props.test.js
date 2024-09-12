it('should support extra properties', async ({ t }) => {
  var response = await fetch('http://localhost:9090/props', {
    method: 'POST'
  })
  var data = await response.json()
  t.equal(data.file, 'props')
  t.equal(data.ip, '::1')
})
