const PROXY_CONFIG =[
  {
    context: [
      '/',
    ],
    "target": "localhost:27017",
    "secure": false,
    changeOrigin: true,
    pathRewrite: {
      "^/": ""
    }
  }
]

module.exports = PROXY_CONFIG;