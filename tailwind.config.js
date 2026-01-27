
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
    important: 'tw-cheatsheet',
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
};
