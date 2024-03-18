
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
    important: 'tw-cheatsheet',
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: 'var(--dmo-color-primary-500)',
                neutral: {
                    50: 'var(--dmo-color-neutral-50)',
                    100: 'var(--dmo-color-neutral-100)',
                    200: 'var(--dmo-color-neutral-200)',
                    300: 'var(--dmo-color-neutral-300)',
                    400: 'var(--dmo-color-neutral-400)',
                    500: 'var(--dmo-color-neutral-500)',
                    600: 'var(--dmo-color-neutral-600)',
                    700: 'var(--dmo-color-neutral-700)',
                    800: 'var(--dmo-color-neutral-800)',
                    900: 'var(--dmo-color-neutral-900)',
                }
            },
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
};
