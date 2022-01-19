const path = require('path')

module.exports={
  mode:"development",
  entry:'./src/app.js',
  output: {
    filename: 'app.js',
    path:path.resolve(__dirname, 'assets','scripts'), //Needs an absolute path to sassets/cripts
    publicPath:"assets/scripts/"
  },
  devServer: {
    contentBase: './'
  }
}