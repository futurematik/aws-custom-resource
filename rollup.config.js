import typescript from '@fmtk/rollup-plugin-ts';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'lib/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'lib/bundle.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: id => {
    return !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0');
  },
  plugins: [resolve({ preferBuiltins: true }), commonjs(), typescript()],
};
