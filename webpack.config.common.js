const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  cache: false,
  entry:
  {
    index: {
      import: 'src\\index.ts',
      dependOn: 'shared'
    },
    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    another: {
      import: './src/map/another-module.ts',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  // https://webpack.js.org/guides/code-splitting/#entry-dependencies
  optimization: {
    runtimeChunk: 'single',
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Удалите все комментарии
          },
        },
        extractComments: false, // Не сохранять комментарии в отдельный файл
      }),
    ],

  },
  target: 'web',
  module: {
    rules: [
    
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins:[
    
    new CleanWebpackPlugin(), 
    new ESLintPlugin({
      files: path.resolve(__dirname, 'src/'),

    }),
  ],
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "node_modules"),
    ],
    alias: {
      "@interfeces": path.resolve(__dirname, "src/interfaces.ts"),
      "reduxToolkit": path.resolve(__dirname, "src/reduxs"),
      "pictures": path.resolve(__dirname, "src/pictures"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
    
  },
}