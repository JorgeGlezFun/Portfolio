const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');
const textShadow = require('@designbycode/tailwindcss-text-shadow');

module.exports = {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',

        // 👇 Agrega estas líneas para Flowbite
        './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                '3xl': '1920px',
                '4xl': '2560px',
            },
            boxShadow: {
                'blur': '-8px 8px 0 rgba(0, 0, 0, 1)',
            }
        },
    },
    plugins: [
        forms,
        require("@designbycode/tailwindcss-text-shadow")({
            shadowColor: "rgba(0, 0, 0, 1)",
            shadowBlur: "0px",
            shadowOffsetX: "-0.4px",
            shadowOffsetY: "0.4px",
            shadowOpacity: "1",
            shadowSpread: "0px",
            experimental: true
        }),

        // 👇 Importante: añade el plugin de Flowbite aquí
        require('flowbite/plugin'),
    ],
};
