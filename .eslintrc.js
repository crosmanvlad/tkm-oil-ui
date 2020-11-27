module.exports = {
  root: true,
  // It uses behind the hood: @typescript-eslint/parser and @typescript-eslint/eslint-plugin
  // eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react and eslint-plugin-react-hooks
  // eslint-config-airbnb-typescript, eslint-config-prettier
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    createDefaultProgram: true
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['__test__/*', 'dist'],
  // some airbnb rules can be excluded as following if it's too strict:
  rules: {
    //   'react/prop-types': 0,
    //   'react/destructuring-assignment': 0,
    //   'react/static-property-placement': 0,
    //   'jsx-a11y/alt-text': 0,
    //   'react/jsx-props-no-spreading': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline'
      }
    ]
  }
};
