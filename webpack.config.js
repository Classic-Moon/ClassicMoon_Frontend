module.exports = (config, context) => {
  return {
    ...config,
    node: {
      global: true,
    },
    resolve: {
      fallback: {
        'process/browser': require.resolve('process/browser')
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          enforce: 'pre',
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
            "source-map-loader"
          ],
        },
      ],
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};