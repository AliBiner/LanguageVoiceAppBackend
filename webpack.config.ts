import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const config: webpack.Configuration = {
  resolveLoader: { fallback: { os: require.resolve("os-browserify/browser") } },
  mode: "production",
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};
