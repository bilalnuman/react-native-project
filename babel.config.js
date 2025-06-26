module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigation': './src/navigation',
          '@types': './src/types',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@assets': './src/assets',
          '@shared': './src/shared',
          '@store': './src/store',
          '@widgest': './src/widgest',
          '@features': './src/features',
          '@lib': './src/lib',
        },
      },
    ],
    'react-native-reanimated/plugin', // 👈 should always come last
  ],
};
