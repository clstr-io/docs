// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/** @type {import('@shikijs/types').ThemeRegistrationRaw} */
const clstrDark = {
	name: 'clstr-dark',
	type: 'dark',
	colors: {
		'editor.background': '#141414',
		'editor.foreground': '#e8e8e8',
		'editorLineNumber.foreground': '#3a3a3a',
		'editorLineNumber.activeForeground': '#666666',
		'editor.selectionBackground': '#2a2a2a',
		'editor.lineHighlightBackground': '#1a1a1a',
	},
	tokenColors: [
		{
			scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
			settings: { foreground: '#3a3a3a', fontStyle: 'italic' },
		},
		{
			scope: [
				'keyword', 'keyword.control', 'keyword.operator.new',
				'storage.type', 'storage.modifier',
			],
			settings: { foreground: '#c8ef60' },
		},
		{
			scope: ['string', 'string.quoted', 'string.template', 'string.regexp'],
			settings: { foreground: '#fbbf24' },
		},
		{
			scope: ['constant.numeric', 'constant.language', 'constant.character'],
			settings: { foreground: '#60a5fa' },
		},
		{
			scope: [
				'entity.name.type', 'entity.name.class',
				'support.type', 'support.class',
			],
			settings: { foreground: '#a78bfa' },
		},
		{
			scope: ['entity.name.function', 'support.function', 'meta.function-call'],
			settings: { foreground: '#666666' },
		},
		{
			scope: ['punctuation', 'meta.brace', 'meta.bracket'],
			settings: { foreground: '#666666' },
		},
		{
			scope: ['variable', 'variable.other', 'variable.parameter'],
			settings: { foreground: '#e8e8e8' },
		},
	],
};

export default defineConfig({
	devToolbar: { enabled: false },
	integrations: [
		starlight({
			title: 'clstr.io',
			logo: { src: './src/assets/logo.svg' },
			components: {
				PageTitle: './src/components/PageTitle.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/clstr-io' },
				{ icon: 'twitter', label: 'Twitter', href: 'https://x.com/clstrio' },
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/stephenmwangi.com' },
				{ icon: 'comment-alt', label: 'Forum', href: 'https://github.com/orgs/clstr-io/discussions' },
			],
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				themes: [clstrDark],
				styleOverrides: {
					borderRadius: '2px',
					borderColor: '#1f1f1f',
					codeFontFamily: "'IBM Plex Mono', monospace",
					codeFontSize: '0.8rem',
					codeLineHeight: '1.6',
					frames: {
						frameBoxShadowCssValue: 'none',
						editorBackground: '#141414',
						terminalBackground: '#141414',
						terminalTitlebarBackground: '#141414',
						terminalTitlebarBorderBottomColor: '#1f1f1f',
						editorTabBarBackground: '#141414',
						editorTabBarBorderBottomColor: '#1f1f1f',
					},
				},
			},
			sidebar: [
				{ label: 'How It Works', slug: 'how-it-works' },
				{
					label: 'Key-Value Store',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'kv-store' },
						{ label: 'HTTP API', slug: 'kv-store/http-api' },
						{ label: 'Persistence', slug: 'kv-store/persistence' },
						{ label: 'Crash Recovery', slug: 'kv-store/crash-recovery' },
						{ label: 'Leader Election', slug: 'kv-store/leader-election' },
						{ label: 'Log Replication', slug: 'kv-store/log-replication' },
						{ label: 'Membership Changes', slug: 'kv-store/membership-changes' },
						{ label: 'Fault Tolerance', slug: 'kv-store/fault-tolerance' },
						{ label: 'Log Compaction', slug: 'kv-store/log-compaction' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'CLI', slug: 'guides/cli' },
						{ label: 'CI/CD', slug: 'guides/ci-cd' },
					],
				},
				{
					label: 'Reference',
					collapsed: true,
					items: [
						{ label: 'Testing', slug: 'reference/testing' },
						{ label: 'Writing Style', slug: 'reference/writing-style' },
					],
				},
			],
		}),
	],
});
