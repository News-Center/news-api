module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin", "import", "eslint-plugin-tsdoc", "jest"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:jest/recommended"],
    env: {
        jest: true,
        node: true,
    },
    rules: {
        "no-console": "error",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-dupe-class-members": ["error"],
        "@typescript-eslint/no-useless-constructor": ["error"],
        "@typescript-eslint/no-inferrable-types": ["off"],
    },
};
