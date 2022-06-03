const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  entry: "./src/index",
  target: "web",
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button/Button",
        "./Header": "./src/components/Header/Header",
        "./Page": "./src/components/Page/Page",
      },
      shared: {
        react: {
          requiredVersion: false,
          singleton: true,
        },
      },
    }),
  ],
};
