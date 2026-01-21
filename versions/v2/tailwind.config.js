/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
                'star-movement-top': 'star-movement-top linear infinite alternate',
            },
            keyframes: {
                'star-movement-bottom': {
                    '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
                    '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
                },
                'star-movement-top': {
                    '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
                    '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
                },
            },
            colors: {
                navy: "#0a192f",
                "light-navy": "#112240",
                "lightest-navy": "#233554",
                "dark-navy": "#020c1b",
                slate: "#8892b0",
                "light-slate": "#a8b2d1",
                "lightest-slate": "#ccd6f6",
                white: "#e6f1ff",
                green: "#64ffda",
                "green-tint": "rgba(100, 255, 218, 0.1)",
                pink: "#f57dff",
                blue: "#57cbff",
            },
            fontFamily: {
                sans: [
                    "Calibre",
                    "Inter",
                    "San Francisco",
                    "SF Pro Text",
                    "-apple-system",
                    "system-ui",
                    "sans-serif",
                ],
                mono: [
                    "SF Mono",
                    "Fira Code",
                    "Fira Mono",
                    "Roboto Mono",
                    "monospace",
                ],
            },
            fontSize: {
                xxs: "12px",
                xs: "13px",
                sm: "14px",
                md: "16px",
                lg: "18px",
                xl: "20px",
                xxl: "22px",
                heading: "32px",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
