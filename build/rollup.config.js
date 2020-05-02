import defaultsDeep from 'lodash/defaultsDeep'
import rollupPluginBabel from 'rollup-plugin-babel'
import rollupPluginCleanup from 'rollup-plugin-cleanup'
import rollupPluginCommonjs from '@rollup/plugin-commonjs'
import rollupPluginScss from 'rollup-plugin-scss'
import { terser as rollupPluginTerser } from 'rollup-plugin-terser'
import rollupPluginTypescript from 'rollup-plugin-typescript2'
import rollupPluginVue from 'rollup-plugin-vue'
import typescript from 'typescript'

const defaultOptions = {
  input: 'src/index.ts',
  output: {
    name: 'VueFormBuilder',
    exports: 'named',
    sourcemap: !process.env.ROLLUP_WATCH
  },
  plugins: [
    rollupPluginTypescript({
      typescript,
      tsconfig: 'tsconfig.json'
    }),
    rollupPluginCommonjs(),
    rollupPluginVue({
      css: false
    }),
    rollupPluginBabel({
      runtimeHelpers: true
    }),
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
      file: 'dist/vue-form-builder.umd.js',
      format: 'umd'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.esm.js',
      format: 'esm'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.js',
      format: 'iife'
    }
  }, defaultOptions),
  defaultsDeep({
    output: {
      file: 'dist/vue-form-builder.min.js',
      format: 'iife'
    },
    plugins: [
      rollupPluginTerser()
    ]
  }, defaultOptions)
]
