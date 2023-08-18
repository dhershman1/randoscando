import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: './src/index.js',
    plugins: [
      babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
      terser(),
      filesize({
        showMinifiedSize: false
      })
    ],
    external: [
      'kyanite'
    ],
    output: {
      file: 'dist/randoscando.min.js',
      format: 'es',
      name: 'randoscando'
    }
  }, {
    input: './src/index.js',
    plugins: [
      babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
      terser(),
      filesize({
        showMinifiedSize: false
      })
    ],
    external: [
      'kyanite'
    ],
    output: {
      file: 'dist/randoscando.min.cjs',
      format: 'cjs',
      name: 'randoscando'
    }
  },
  {
    input: './src/index.js',
    plugins: [
      babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
      terser(),
      nodeResolve({ browser: true }),
      filesize({
        showMinifiedSize: false
      })
    ],
    output: {
      file: 'dist/randoscando.iife.min.js',
      format: 'iife',
      name: 'randoscando'
    }
  }
]
