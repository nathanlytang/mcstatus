module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": 0
    }
};
