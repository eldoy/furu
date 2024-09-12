it('should block favicon requests', async ({ t }) => {
  var response = await fetch('http://localhost:9090/favicon.ico')
  t.equal(response.status, 404)
})
