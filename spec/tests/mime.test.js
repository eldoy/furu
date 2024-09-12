it('should support xml files', async ({ t }) => {
  var response = await fetch('http://localhost:9090/sitemap.xml', {
    method: 'GET'
  })
  var data = await response.text()
  t.equal(data, '<xml></xml>')
  t.equal(response.headers.get('content-type'), 'application/xml')
})
