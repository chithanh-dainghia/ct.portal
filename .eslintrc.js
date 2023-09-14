module.exports = {
	root: true,
	extends: ["@portal/eslint-config-root"],
	settings: {
		next: {
			rootDir: ["apps/*/", "packages/*/"],
		},
	},
	rules: {
		"@next/next/no-html-link-for-pages": "off",
		"no-html-link-for-pages": "off",
	},
}
