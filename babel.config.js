module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
