import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
		"!./src/pages/og-image/[slug].png.ts",
	],
	darkMode: ["class", '[data-theme="dark"]'],
	corePlugins: {
		// disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
		aspectRatio: false,
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	theme: {
		extend: {
			colors: {
				bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
				"bg-elevated": "hsl(var(--theme-bg-elevated) / <alpha-value>)",
				"bg-sunken": "hsl(var(--theme-bg-sunken) / <alpha-value>)",
				"bg-inverse": "hsl(var(--theme-bg-inverse) / <alpha-value>)",
				textColor: "hsl(var(--theme-text) / <alpha-value>)",
				"text-muted": "hsl(var(--theme-text-muted) / <alpha-value>)",
				"text-subtle": "hsl(var(--theme-text-subtle) / <alpha-value>)",
				"text-inverse": "hsl(var(--theme-text-inverse) / <alpha-value>)",
				link: "hsl(var(--theme-link) / <alpha-value>)",
				accent: "hsl(var(--theme-accent) / <alpha-value>)",
				"accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
				"accent-hover": "hsl(var(--theme-accent-hover) / <alpha-value>)",
				"accent-soft": "hsl(var(--theme-accent-soft) / <alpha-value>)",
				quote: "hsl(var(--theme-quote) / <alpha-value>)",
				border: "hsl(var(--theme-border) / <alpha-value>)",
				"border-subtle": "hsl(var(--theme-border-subtle) / <alpha-value>)",
				"border-strong": "hsl(var(--theme-border-strong) / <alpha-value>)",
			},
			fontFamily: {
				sans: ["Geist", "Inter", ...fontFamily.sans],
				serif: ["Instrument Serif", ...fontFamily.serif],
				mono: ["Geist Mono", "JetBrains Mono", ...fontFamily.mono],
			},
			transitionProperty: {
				height: "height",
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				cactus: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-links": theme("colors.link / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.text-muted / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-hr": "1px solid hsl(var(--theme-border))",
						"--tw-prose-th-borders": "hsl(var(--theme-border))",
					},
				},
				DEFAULT: {
					css: {
						a: {
							"@apply cactus-link no-underline": "",
						},
						strong: {
							fontWeight: "600",
						},
						code: {
							border: "1px solid hsl(var(--theme-border))",
							borderRadius: "4px",
							backgroundColor: "hsl(var(--theme-bg-sunken))",
							padding: "0.125rem 0.375rem",
						},
						blockquote: {
							borderLeftWidth: "2px",
							borderLeftColor: "hsl(var(--theme-accent))",
							color: "hsl(var(--theme-text-muted))",
							fontStyle: "normal",
						},
						hr: {
							borderTopStyle: "solid",
							borderColor: "hsl(var(--theme-border))",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							fontWeight: "600",
							borderBottom: "1px solid hsl(var(--theme-border))",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px solid hsl(var(--theme-border))",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"@apply bg-none": "",
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"&:before": {
									content: "'['",
								},
								"&:after": {
									content: "']'",
								},
							},
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
		plugin(function ({ addComponents }) {
			addComponents({
				".cactus-link": {
					color: "hsl(var(--theme-link))",
					textDecoration: "none",
					borderBottom: "1px solid hsl(var(--theme-border))",
					transition: "border-color 120ms ease, color 120ms ease",
					"&:hover": {
						borderBottomColor: "hsl(var(--theme-link))",
					},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
			});
		}),
	],
} satisfies Config;
