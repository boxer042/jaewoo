module.exports = {
	"extends": ["airbnb-base", "plugin:flowtype/recommended"],
	"settings": {
	  "import/resolver": {
		"node": {
		  "moduleDirectory": ["node_modules", "src/"]
		}
	  }
	},
	"rules": {
		"import/prefer-default-export": 0,
		"no-console": 0,
		"consistent-return": 0,
		"arrow-body-style": 0,
		"class-methods-use-this": 0,
		"no-plusplus": 0,
		"func-names": 0,
		"object-property-newline": 0,
		"no-unused-vars": 0,
		"no-confusing-arrow": 0,
		"no-continue": 0,
		"no-await-in-loop": 0,
		"no-param-reassign": 0,
		"linebreak-style": 0,
		"import/newline-after-import": 0,
		"eol-last": 0,
		"quotes": 0,
		"indent": 0,
		"no-useless-return": 0,
		"camelcase": 0,
    "prefer-const": 0,
	},
	"plugins": [
	  "flowtype"
	]
  };