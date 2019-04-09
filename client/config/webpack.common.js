const map = require('lodash/map');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineJSRule, defineMediaRule, defineSCSSRule } = require('./rules');
const {
  entryPath,
  imagesFolder,
  faviconPath,
  fontsFolder,
  globalCSS,
  localCSS,
  nodeModules,
  templatePath,
} = require('./paths');
const { inDevelopment, requiresSourceMap } = require('./envs');

// =============================================================== //
// COMMON RULES                                                    //
// =============================================================== //
const folders = [
  'actions',
  'components',
  'containers',
  'images',
  'reducers',
  'root',
  'routes',
  'styles',
  'types',
  'utils',
];

const aliasedFolders = map(folders, folder => ({
  [folder]: `./src/${folder}`,
}));

/* webpack module rules */
const rules = [
  /* lints JS files on compilation */
  defineJSRule({
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      emitWarning: inDevelopment,
    },
  }),
  /* handle React JS files */
  defineJSRule({
    loader: 'babel-loader',
    options: {
      cacheDirectory: inDevelopment,
      cacheCompression: false,
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              ...aliasedFolders,
            },
          },
        ],
      ],
    },
  }),
  /* handle image assets */
  defineMediaRule({
    test: /\.(png|jpg|gif|svg)$/,
    outputPath: imagesFolder,
  }),
  /* handle font assets */
  defineMediaRule({
    test: /\.(woff2|ttf|woff|eot)$/,
    outputPath: fontsFolder,
  }),
  /* handles SCSS imports that are component-level or partials */
  defineSCSSRule({
    include: [localCSS],
    exclude: [globalCSS],
    modules: true,
  }),
  /* handles SCSS imports that are global only */
  defineSCSSRule({ include: [globalCSS, nodeModules] }),
];

/* utilizes source mapping */
const devtool = requiresSourceMap ? 'cheap-module-source-map' : false;

/* current webpack environment */
const mode = inDevelopment ? 'development' : 'production';

/* webpack resolves component/module imports with extensions */
const resolve = {
  modules: ['src', 'node_modules'],
};

/* webpack plugins */
const plugins = [
  /* shows a compilation bar instead of the default compile message */
  new WebpackBar({
    minimal: false,
    compiledIn: false,
  }),
  /* simplifies creation of HTML files to serve your webpack bundles */
  new HtmlWebpackPlugin({
    template: templatePath,
    favicon: faviconPath,
  }),
];

// =============================================================== //
// COMMON OPTIONS                                                  //
// =============================================================== //
module.exports = {
  devtool,
  mode,
  entry: entryPath,
  module: { rules },
  resolve,
  plugins,
};
