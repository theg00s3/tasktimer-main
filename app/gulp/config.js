module.exports = {
  paths: {
    js: ['src/**/*.js'],
    stylus: ['src/**/*.styl'],
    jade: ['src/**/*.jade'],
    test: ['src/**/*.test.js'],
    assets: ['src/assets/**/*'],
    dest: './www'
  },
  entryFiles: {
    browserify: 'src/index.js',
    stylus: 'src/index.styl',
    jade: 'src/index.jade',
  }
}