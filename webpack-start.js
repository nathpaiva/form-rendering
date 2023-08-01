'use strict'

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack/dev.config';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(2000, () => {
  console.log('====================================');
  console.log('Server running at :2000');
  console.log('====================================');
});
