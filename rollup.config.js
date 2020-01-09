import defaultsDeep from 'lodash/defaultsDeep'
import rollupPluginBabel from 'rollup-plugin-babel'
import rollupPluginCommonjs from '@rollup/plugin-commonjs'
import rollupPluginCleanup from 'rollup-plugin-cleanup'
import rollupPluginScss from 'rollup-plugin-scss'
import rollupPluginTypescript from 'rollup-plugin-typescript2'
import rollupPluginVue from 'rollup-plugin-vue'
import typescript from 'typescript'

const defaultOptions = {
  input: 'src/main.ts',
  output: {
    name: 'VueFormBuilder',
    exports: 'named',
    sourcemap: !process.env.ROLLUP_WATCH
  },
  plugins: [
    rollupPluginTypescript({
      typescript,
      objectHashIgnoreUnknownHack: true,
      tsconfig: 'tsconfig.json'
    }),
    rollupPluginCommonjs(),
    rollupPluginVue(),
    rollupPluginBabel(),
    rollupPluginCleanup({
      lineEndings: 'unix',
      extensions: ['.js', '.ts', '.d.ts', '.vue']
    }),
    rollupPluginScss()
  ]
}

module.exports = [
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.cjs.js',
      format: 'cjs'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.umd.js',
      format: 'umd'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.iife.js',
      format: 'iife'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.esm.js',
      format: 'es'
    }
  }, defaultOptions)
]
