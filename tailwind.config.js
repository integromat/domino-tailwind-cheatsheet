module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
    important: 'tw-cheatsheet',
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: 'var(--dmo-color-primary-500)',
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
