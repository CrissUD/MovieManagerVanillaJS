module.exports = {
  plugins: [
		require('postcss-apply'),
		require('postcss-custom-media'),
    require('postcss-preset-env')({
			stage: 1,
			autoprefixer: {
				grid: true,
			}
		})
  ]
}