export default {
  head: {
    htmlAttrs: { lang: 'ko' },
    title: 'Leon\'s Notion!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Leon\'s Notion!' },
      { hid: 'og:title', property: 'og:title', content: 'Leon\'s Notion!' },
      { hid: 'og:description', property: 'og:description', content: 'CSS(SCSS) + Vue.js in Programmers' },
      { hid: 'og:image', property: 'og:image', content: 'https://avatars.githubusercontent.com/u/87857358?v=4' },
      { hid: 'og:url', property: 'og:url', content: process.env.CLIENT_URL }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap' },
    ]
  },
  components: true,
  build: {
    babel: {
      presets: ['@babel/preset-env'],
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: 3
        }]
      ]
    },
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
  buildModules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~/scss/_variables.scss'
    ]
  },
  serverMiddleware: [
    {
      path: '/api/workspace',
      handler: '~/server-middleware/workspace.js'
    }
  ]
}
