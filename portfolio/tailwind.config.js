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
        },
    },
    plugins: [
        forms,
        require("@designbycode/tailwindcss-text-shadow"
        )
        ({
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: "0px",
            shadowOffsetX: "-0.1px",
            shadowOffsetY: "0.1px",
            shadowOpacity: "1",
            shadowSpread: "0px",
            experimental: true
        })
    ],
};
