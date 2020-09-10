module.exports = {
  plugins: [
		require('postcss-import'),
		require('postcss-apply'),
		require('postcss-custom-media'),
		require('stylelint'),
		require('postcss-reporter'),
    require('postcss-preset-env')({
			stage: 1,
			autoprefixer: {
				grid: true,
			}
		}),
		require('cssnano')
  ]
}