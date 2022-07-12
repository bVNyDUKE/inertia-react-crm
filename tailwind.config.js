const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.200", "currentColor"),
      }),
      boxShadow: (theme) => ({
        outline: "0 0 0 2px " + theme("colors.indigo.500"),
      }),
      fill: (theme) => theme("colors"),
      fontFamily: {
        sans: ["Cerebri Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        indigo: {
          100: "#e6e8ff",
          300: "#b2b7ff",
          400: "#7886d7",
          500: "#6574cd",
          600: "#5661b3",
          800: "#2f365f",
          900: "#191e38",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
