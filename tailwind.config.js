import  plugin  from 'tailwind-scrollbar';

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontWeight: {
        'super-bold': '900',  
        'super-boldest': '950',  
        'light-bold': '650', 
      },
      letterSpacing: {
        'extra-wide': '0.15em',
        'super-wide': '0.25em',
      },
      fontFamily: {
        panda: ['PandaBeta', 'sans-serif'],
        monospace: ['"Courier New"', 'Courier', 'monospace'],
        merriweather: ['Merriweather', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        garamond: ['EB Garamond', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },fontSize: {
        'sm-en': '12px',
        'md-en': '18px',
        'lg-en': '25px',
        'xl-en': '35px',
        'sm-ar': '12px',
        'md-ar': '18px',
        'lg-ar': '25px',
        'xl-ar': '35px',
      },
      animation: {
      gradient: 'gradient 3s ease infinite',
    },
    keyframes: {
      
      gradient: {
        '0%, 100%': {
          backgroundSize: '200% 200%',
          backgroundPosition: 'left center',
        },
        '50%': {
          backgroundSize: '200% 200%',
          backgroundPosition: 'right center',
        },
      },
    },
      colors: {
        primary:'#E84133',
        secondary:'#1a5631',
        white:'#ffffff',
        black:'#000000',  
        headerItemsColor: 'var(--header-item-color)',
        headerItemsHoverColor:'var(--header-item-hover-color)',
        headerMenuItemColor: 'var(--header-menu-icon-color)',
        headerMenuItemBackgroundColor: 'var(--header-menu-icon-background-color)',
        heroSectionTextColor: 'var(--hero-section-text-color)',
        heroSectionItemsColor: 'var(--hero-section-Items-color)',
        yellowGreenDark:'#a0c23b',
        yellowGreenLight:"#EEF4DC",
        InputFieldsFocusColor:'#a0c23b',
        updatesLabelBackgroundColor:'#E1EBE6',
        updatesLabelTextColor:'#7EA994',
      },
    },
  },
  plugins: [plugin({ nocompatible: true })],
};
