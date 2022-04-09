// Can we do autolang? If route starts with /[a-z]{2}/ then that is the language?
// What if we want to override it?
// /[a-z]{2}/ paths is only convenient for static sites

// FEATURE: Must support link lookup

// Currently in Waveorb

[
  '/hello': 'no@hello',
  '/en/hello': 'en@hello'
]

// Flipped language
[
  '/hello': 'hello@no',
  '/en/hello': 'hello@en'
]

// Alternative 1, verbose array
[
  {
    path: '/hello',
    file: './pages/hello.js'
  },
  {
    // Array for path
    path: [
      '/hello',
      '/en/hello'
    ],
    file: './pages/hello.js'
  }
]

// Path: file
// Doesn't work for multiple
[
  '/hello': 'pages/hello'

  // Error: doesn't work
  [
    '/hello',
    '/en/hello'
  ]
]

// File: path
[
  'pages/hello': 'hello',
  'pages/hello': [
    '/hello',
    '/en/hello'
  ]
]


// Named object
// Can extract paths into set for fast lookup
{
  hello_page: {
    path: '/hello',
    file: 'hello',
    method: 'get',
    type: 'json'
  },
  edit_site_comment: {
    path: '/site/:site_name/comment/:comment_id/edit',
    file: 'comment/edit'
  }
}

// Db style, use with configdb internally?
// Con: VERY verbose
[
  // Hello page - Norwegian
  {
    path: '/hello',
    file: 'pages/hello',
    method: 'get',
    type: 'html',
    lang: 'no'
  },

  // Hello page - English
  {
    path: '/en/hello',
    file: 'pages/hello',
    method: 'get',
    type: 'html',
    lang: 'en'
  }
]
