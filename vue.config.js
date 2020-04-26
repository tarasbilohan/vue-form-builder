module.exports = {
  pluginOptions: {
    storybook: {
      allowedPlugins: [
        'define'
      ]
    }
  },
  chainWebpack: (config) => {
    // Discussed here https://github.com/vuejs/vue-cli/issues/1081
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap((opts) => ({
          ...opts,
          transpileOnly: false
        }))
    }
  },
  parallel: false
}
