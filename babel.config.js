module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
    development: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
