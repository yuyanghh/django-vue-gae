module.exports = {
  // mode: 'jit',
  // FIXME: alter to match project structure
  // purge: ['./public/**/*.html', './src/**/*.vue'],
  content: ['./frontend/**/*.{html,vue,js}'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
