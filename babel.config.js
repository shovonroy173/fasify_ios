module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      // [
      //   "module-resolver",
      //   {
      //     root: ["./src"],
      //     extensions: [".js", ".jsx", ".ts", ".tsx"],
      //     alias: {
      //       "@": "./src",
      //     },
      //   },
      // ],
    ],
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'nativewind/babel',
//     //   'react-native-reanimated/plugin',
//     //   [
//     //     'module-resolver',
//     //     {
//     //       root: ['./src'],
//     //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//     //       alias: {
//     //         '@': './src',
//     //       },
//     //     },
//     //   ],
//     ],
//   };
// };

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'nativewind/babel',
//       'react-native-reanimated/plugin', // if you use Reanimated
//       'react-native-worklets/plugin',  // only if required
//     ],
//   };
// };

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],

//   };
// };
