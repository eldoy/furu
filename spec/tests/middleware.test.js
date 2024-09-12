it('should support middleware', async ({ t }) => {
  var response = await fetch('http://localhost:9090/middle', {
    method: 'GET'
  })
  var data = await response.text()
  t.equal(data, 'middle')
})
