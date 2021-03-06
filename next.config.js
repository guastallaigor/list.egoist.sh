module.exports = () => ({
  // target: 'serverless',
  webpack(config) {
    config.module.rules.push({
      test: /\.gql$/,
      use: {
        loader: 'graphql-tag/loader',
      },
    })
    return config
  },
  images: {
    domains: ['s4.anilist.co'],
  },
})
