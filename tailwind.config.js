const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '385px',
      },
      fontFamily: {
        primary: ['var(--font-poppins)', fontFamily.sans],
        secondary: ['var(--font-inter)', fontFamily.sans],
      },
      fontSize: {
        mid: ['15px', '22px'],
        macro: ['17px', '26px'],
      },
      borderRadius: {
        ml: '10px',
      },
      colors: {
        primary: {
          50: '#f5f6fa',
          100: '#eaebf4',
          200: '#d0d4e7',
          300: '#a6b0d3',
          400: '#7686ba',
          500: '#6374ae',
          600: '#414f88',
          700: '#36406e',
          800: '#30395c',
          900: '#2c324e',
          950: '#1d2034',
        },
        secondary: {
          50: '#f2f9f9',
          100: '#ddeff0',
          200: '#bfe0e2',
          300: '#92cace',
          400: '#5faab1',
          500: '#438e96',
          600: '#3b757f',
          700: '#356169',
          800: '#325158',
          900: '#2d464c',
          950: '#1a2c32',
        },
        maroon: {
          50: '#ffeeee',
          100: '#ffdada',
          200: '#ffbbbb',
          300: '#ff8b8b',
          400: '#ff4949',
          500: '#ff1111',
          600: '#ff0000',
          700: '#e70000',
          800: '#be0000',
          900: '#800000',
          950: '#560000',
        },
        base: {
          dark: '#212121',
          icon: '#9AA2B1',
          subtle: '#2f2f33',
          black: '#31393C',
          light: '#ebebeb',
          white: '#f8f8f8',
          secondary: '#707070',
          tertiary: '#515151',
          lightgray: '#f0f0f0',
          placeholder: '#9a9a9a',
          darkgray: '#8892a0',
          darkgrayhover: '#ededf7',
          bluegray: '#f3f5f7',
        },
      },
      boxShadow: {
        error: '0 0 3px rgba(255, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
