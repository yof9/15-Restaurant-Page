
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
        host: '0.0.0.0', // This allows the server to be accessible from other devices on the same network
        port: 8080, // The port number on which the server will run
        historyApiFallback: true, // Enables fallback for single page apps
        client: {
            logging: 'info', // Sets the log level in the browser
            overlay: {
                errors: true, // Shows a full-screen overlay in the browser when there are compiler errors
                warnings: false, // Disables warnings overlay
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                type: "asset/inline",
            },
            
        ],
    },
}