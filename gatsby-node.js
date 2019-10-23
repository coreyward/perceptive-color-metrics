const path = require("path")

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // Configure imports to be relative to `src`
      modules: [path.resolve(__dirname, "src"), "node_modules"],

      // Ensure all dependencies use the same instance of React
      alias: { react: path.resolve("./node_modules/react") },
    },
  })
}
