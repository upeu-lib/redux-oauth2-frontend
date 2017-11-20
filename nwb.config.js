module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReduxOAuth2Frontend',
      externals: {
        react: 'React'
      }
    }
  }
}
