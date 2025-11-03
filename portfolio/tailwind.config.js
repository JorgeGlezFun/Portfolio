const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');
const textShadow = require('@designbycode/tailwindcss-text-shadow');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                '3xl': '1920px', // min-width: 1920px
                '4xl': '2560px', // min-width: 2560px
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
        })
    ],
};
