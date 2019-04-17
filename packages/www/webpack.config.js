const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeWasmPlugin = require('optimize-wasm-webpack-plugin');
const path = require('path');

const commonConfig = {
  mode: "production",
  devtool: 'source-map',
}

const appConfig = {
  ...commonConfig,
  entry: [
    "./src/index.ts",
    "./src/main.css",
    "./vendor/ga.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm']
  },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       test: /\.js(\?.*)?$/i,
  //     }),
  //     new OptimizeWasmPlugin()
  //   ],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // new OptimizeCssAssetsPlugin({}),
    new CopyWebpackPlugin(['src/favicon.ico']),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }, 
      {
        test: /\.worker-import.ts$/,
        // use: 'file-loader',
        loaders: ['file-loader', 'ts-loader'],
        exclude: /node_modules/
      }, 
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /\.worker-import.ts$/
        ]
      }, 
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }, 
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
};

// const appConfig = {
//   entry: "./app/main.js",
//   devServer: {
//     contentBase: dist
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "index.html"
//     })
//   ],
//   resolve: {
//     extensions: [".js"]
//   },
//   output: {
//     path: dist,
//     filename: "app.js"
//   }
// };

const workerConfig = {
  ...commonConfig,
  entry: "./src/worker/index.ts",
  target: "webworker",
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new OptimizeWasmPlugin()
    ],
  },
  // plugins: [
  //   new WasmPackPlugin({
  //     crateDirectory: path.resolve(__dirname, "../crate-wasm")
  //   })
  // ],
  resolve: {
    extensions: [".js", ".ts", ".wasm"]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.wasm$/,
      type: "webassembly/experimental"
    }]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};

// module.exports = [appConfig, workerConfig];
module.exports = [appConfig];
