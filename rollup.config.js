import autoExternal from 'rollup-plugin-auto-external';
import livescript from 'rollup-plugin-livescript';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';

const config = {
  input: 'src/index.ls',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'default',
    sourcemap: true,
  }],
  plugins: [
    autoExternal(),
    livescript(),
    commonjs({
      extensions: ['.js', '.ls'],
    }),
    builtins(),
    resolve({
      extensions: ['.js', '.ls'],
    }),
  ],
};

export default config;

