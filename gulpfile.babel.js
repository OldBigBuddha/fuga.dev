import del from 'del'
import pug from 'gulp-pug'
import stylus from 'gulp-stylus'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'

const { src, dest, series, parallel, watch } = require('gulp')

const browsersync = require('browser-sync').create()

const config = {
  src: {
    root: './src',
    html: './src/**/*pug',
    style: './src/style/**/*.styl',
    script: './src/script/**/*.js'
  },
  dist: {
    root: './dist',
    style: './dist/style',
    script: './dist/script'
  }
}

const targetBrowser = {
  'presets': [
    ['@babel/preset-env', {
      'targets': {
        'browsers': [
          '>0.25%',
          'not ie 11'
        ]
      }
    }]
  ]
}

// BrowserSync
const browserSync = cb => {
  browsersync.init({
    server: {
      baseDir: config.dist.root
    },
    port: 3000
  })
  cb()
}

const reload = cb => {
  browsersync.reload()
  cb()
}

const clean = cb => {
  del(config.dist.root)
  cb()
}

const html = cb => {
  console.log('Task: HTML')
  const option = {
    pretty: true
  }
  src(config.src.html)
    .pipe(pug(option))
    .pipe(dest(config.dist.root))
  cb()
}

const css = cb => {
  console.log('Task: CSS')
  src(
    config.src.style,
    {
      ignore: ['**/_*.styl']
    }
  )
    .pipe(stylus())
    .pipe(cleanCss())
    .pipe(autoprefixer(targetBrowser))
    .pipe(dest(config.dist.style))
  cb()
}

const script = cb => {
  console.log('Task: JavaScript')
  src(config.src.script)
    .pipe(babel())
    .pipe(dest(config.dist.script))
  cb()
}

// Watch files
const watchFiles = () => {
  watch(config.src.html, series(html, reload))
  watch(config.src.style, css)
  watch(config.src.script, script)
}

// definition tasks
exports.clean = clean
exports.build = series(clean, parallel(html, css, script))
exports.default = parallel(watchFiles, browserSync)
