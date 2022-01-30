module.exports = {
  "presets": [

    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    [
      "@babel/preset-typescript"
    ],
    [
      "@babel/preset-react"
    ],
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties"
    ],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@uixkit/core": "./src/components",
        "@uixkit/plugins": "./src/components/_third-party-plugins"
      }
    }]

  ]
};
