import { type RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const name = 'is-json-ts'
const config: RollupOptions = {
	input: 'index.ts',
	output: [
		{
			file: `dist/${name}.mjs`,
			format: 'esm',
		},
		{
			file: `dist/${name}.js`,
			format: 'cjs',
		},
	],
	plugins: [
		typescript(),
		nodeResolve(),
		commonjs(),
		terser({
			ecma: 2020,
			module: true,
		}),
	],
}

export default config
