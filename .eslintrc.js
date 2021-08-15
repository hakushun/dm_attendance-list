module.exports = {
	root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
  },
  plugins: [
    'import',
    'react',
    'immutable',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    		// Possible Errors
		'no-console': 'off',
		'no-unexpected-multiline': 'error',

		// Best Practices
		'class-methods-use-this': 'off',
		'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
		'dot-location': ['error', 'property'],
		'no-implicit-globals': 'error',
		'no-invalid-this': 'error',
		'no-param-reassign': ['error', { props: false }],
		'no-unmodified-loop-condition': 'error',
		'no-useless-call': 'error',
		'no-void': 'off',
		'no-else-return': 'off', // for type refinements

		'no-catch-shadow': 'error',
		'no-label-var': 'error',
		'no-shadow': [
			'error',
			{ allow: ['cb', 'next', 'req', 'res', 'err', 'error'] },
		],
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-use-before-define': ['error', 'nofunc'],
		'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-use-before-define': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

		// Node.js
		'callback-return': 'error',
		'no-path-concat': 'error',

		// Stylistic Issues
		// 'linebreak-style': ['error', 'unix'],
		'no-plusplus': 'off',
		'quotes': ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],

		// ES2015
    'arrow-body-style': 'off',
		'constructor-super': 'error',
		'generator-star-spacing': ['error', 'after'],
		'no-this-before-super': 'error',
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'prefer-spread': 'error',
		'prefer-template': 'off',

		// React
		'react/display-name': 'off',
		'react/no-danger': 'error',
		'react/no-deprecated': 'error',
		'react/no-did-mount-set-state': 'error',
		'react/no-did-update-set-state': 'error',
		'react/no-direct-mutation-state': 'error',
		'react/no-is-mounted': 'error',
		'react/no-set-state': 'error',
		'react/no-string-refs': 'error',
		'react/prefer-stateless-function': 'error',
		'react/prop-types': 'off',
		'react/self-closing-comp': 'off',
		'react/destructuring-assignment': 'off',
		'react/jsx-filename-extension': 'off',
		'react/button-has-type': 'off',

		// JSX
		'react/jsx-equals-spacing': 'error',
		'react/jsx-props-no-spreading': 'off',
		//"react/jsx-indent": ["error", 2],
		'react/jsx-key': 'error',
		'react/jsx-max-props-per-line': [
			'error',
			{ maximum: 1, when: 'multiline' },
		],
		'react/jsx-no-duplicate-props': 'error',
		'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
		'react/jsx-closing-bracket-location': [
			'error',
			{ selfClosing: 'tag-aligned', nonEmpty: 'after-props' },
		],
		'react/no-unused-state': 'off',
		'react/jsx-wrap-multilines': [
			'error',
			{
				assignment: 'ignore',
			},
		],

		// TypeScript
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/no-non-null-assertion': 'off',

		// a11y
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/anchor-is-valid': 'off',

		// import
		'import/no-cycle': 'error',
		'import/no-unresolved': ['off', { caseSensitive: true }],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/prefer-default-export': 'off',
		'import/no-mutable-exports': 'off',
		'import/no-dynamic-require': 'off',
		'import/extensions': 'off',
  }
};
