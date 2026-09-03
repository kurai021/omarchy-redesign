// Presets del theme cycler.
//
// Cada preset sobreescribe las mismas variables --rgb-* que ya define
// src/styles/global.css (background-night, background-storm, win, black,
// green, terminal-black/blue/cyan/white, turquoise, white). No inventamos
// tokens nuevos: reusamos el sistema semántico que ya existe.
//
// CONFIRMADO: "tokyo-night" es una copia exacta de los valores actuales de
// global.css, que ya coinciden con la paleta oficial de Omarchy (se puede
// verificar: --rgb-background-night 26,27,38 = #1a1b26, --rgb-terminal-blue
// 122,162,247 = #7aa2f7, etc. — son los hex reales de tokyonight.nvim que
// usa el tema).
//
// SIN CONFIRMAR CONTRA EL REPO REAL: nord / gruvbox / catppuccin-mocha /
// rose-pine usan los hex *canónicos upstream* de cada paleta (Nord Docs,
// gruvbox-community, Catppuccin Mocha spec, Rosé Pine spec), no un dump de
// los alacritty.toml / neovim.lua que Omarchy realmente empaqueta en
// themes/<nombre>/. Suelen coincidir casi exactamente porque Omarchy es fiel
// a las paletas originales, pero hay que confirmarlo contra el repo antes de
// dar esto por "producción final".
//
// PENDIENTE (quedan ~14 temas oficiales sin agregar, completar con el repo
// real — omacom/omarchy/themes/<nombre>/):
// everforest, osaka-jade, kanagawa, matte-black, ristretto,
// catppuccin-latte, miasma, hackerman, lumon, ethereal, vantablack,
// retro-82, flexoki-light, white

export const themes = [
	{
		id: "tokyo-night",
		label: "Tokyo Night",
		swatch: "122, 162, 247", // terminal-blue
		vars: {
			"background-night": "26, 27, 38",
			"background-storm": "36, 40, 59",
			black: "0, 0, 0",
			green: "158, 206, 106",
			win: "30, 30, 46",
			"terminal-black": "65, 72, 104",
			"terminal-blue": "122, 162, 247",
			"terminal-cyan": "125, 207, 255",
			"terminal-white": "192, 202, 245",
			turquoise: "180, 249, 248",
			white: "255, 255, 255",
		},
	},
	{
		id: "nord",
		label: "Nord",
		swatch: "136, 192, 208", // frost accent
		vars: {
			"background-night": "46, 52, 64", // nord0
			"background-storm": "59, 66, 82", // nord1
			black: "0, 0, 0",
			green: "163, 190, 140", // nord14 aurora green
			win: "67, 76, 94", // nord2
			"terminal-black": "76, 86, 106", // nord3
			"terminal-blue": "129, 161, 193", // nord9
			"terminal-cyan": "136, 192, 208", // nord8
			"terminal-white": "216, 222, 233", // nord4
			turquoise: "143, 188, 187", // nord7
			white: "236, 239, 244", // nord6
		},
	},
	{
		id: "gruvbox",
		label: "Gruvbox",
		swatch: "184, 187, 38", // bright green
		vars: {
			"background-night": "40, 40, 40", // bg0
			"background-storm": "60, 56, 54", // bg1
			black: "0, 0, 0",
			green: "184, 187, 38", // bright_green
			win: "80, 73, 69", // bg2
			"terminal-black": "102, 92, 84", // bg4
			"terminal-blue": "131, 165, 152", // bright_blue
			"terminal-cyan": "142, 192, 124", // bright_aqua
			"terminal-white": "235, 219, 178", // fg1
			turquoise: "250, 189, 47", // bright_yellow, used as highlight here
			white: "251, 241, 199", // fg0
		},
	},
	{
		id: "catppuccin-mocha",
		label: "Catppuccin",
		swatch: "203, 166, 247", // mauve
		vars: {
			"background-night": "30, 30, 46", // base
			"background-storm": "49, 50, 68", // surface0
			black: "0, 0, 0",
			green: "166, 227, 161", // green
			win: "69, 71, 90", // surface1
			"terminal-black": "108, 112, 134", // overlay0
			"terminal-blue": "137, 180, 250", // blue
			"terminal-cyan": "137, 220, 235", // sky
			"terminal-white": "205, 214, 244", // text
			turquoise: "148, 226, 213", // teal
			white: "255, 255, 255",
		},
	},
	{
		id: "rose-pine",
		label: "Rosé Pine",
		swatch: "156, 207, 216", // foam
		vars: {
			"background-night": "25, 23, 36", // base
			"background-storm": "31, 29, 46", // surface
			black: "0, 0, 0",
			// Rosé Pine no tiene un "verde" real; usamos gold como acento
			// semánticamente equivalente (CTA / highlight), no es 1:1.
			green: "246, 193, 119", // gold
			win: "38, 35, 58", // overlay
			"terminal-black": "110, 106, 134", // muted
			"terminal-blue": "49, 116, 143", // pine
			"terminal-cyan": "156, 207, 216", // foam
			"terminal-white": "224, 222, 244", // text
			turquoise: "196, 167, 231", // iris
			white: "255, 255, 255",
		},
	},
];
