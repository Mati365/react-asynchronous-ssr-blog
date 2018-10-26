const {resolve} = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

require('dotenv').config({
  path: resolve(__dirname, '../.env'),
});

const OUTPUT_FOLDER = resolve(__dirname, '../dist');

const createConfig = ({
  entry,
  target,
  externals,
  outputFile,
  plugins,
  alias,
}) => ({
  target,
  entry,
  externals,
  plugins,
  node: {
    constants: false,
    global: true,
    process: true,
    Buffer: true,
    __dirname: false,
    __filename: true,
  },
  output: {
    path: OUTPUT_FOLDER,
    filename: outputFile,
    publicPath: '/',
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve(__dirname, '../node_modules'),
      resolve(__dirname, '../src'),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ], // polyfill for new browser
              '@babel/preset-react', // react jsx compiler
            ],
            plugins: [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-logical-assignment-operators',
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-proposal-function-bind',
              [
                '@babel/plugin-proposal-pipeline-operator',
                {
                  proposal: 'minimal',
                },
              ],
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
              [
                '@babel/transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});

const GLOBAL_ALIASES = {
  '@client': resolve(__dirname, '../src/client/'),
  '@server': resolve(__dirname, '../src/server/'),
};

module.exports = [
  // client stuff
  createConfig({
    alias: GLOBAL_ALIASES,
    target: 'web',
    entry: resolve(__dirname, '../src/client/index.jsx'),
    outputFile: 'public/client-[hash].js',
    plugins: [
      new ManifestPlugin,
      new CleanWebpackPlugin(
        ['dist/'],
        {
          root: resolve(__dirname, '../'),
        },
      ),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
      }),
    ],
  }),

  // server stuff
  createConfig({
    alias: GLOBAL_ALIASES,
    target: 'node',
    entry: resolve(__dirname, '../src/server/index.jsx'),
    outputFile: 'server.js',
    externals: [
      nodeExternals({
        whitelist: [
          /^@client.*/,
        ],
      }),
    ],
    plugins: [
      new NodemonPlugin,
    ],
  }),
];
