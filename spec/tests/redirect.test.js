it('should support redirects', async ({ t }) => {
  var response = await fetch('http://localhost:9090/redirect', {
    redirect: 'manual'
  })
  t.equal(response.status, 302)
  t.equal(response.headers.get('location'), '/')
})

it('should support redirects with cookies', async ({ t }) => {
  var response = await fetch('http://localhost:9090/redirectcookies', {
    redirect: 'manual'
  })
  t.ok(response.headers.get('set-cookie').startsWith('name=value'))
  t.equal(response.status, '302')
  t.equal(response.headers.get('location'), '/')
})
