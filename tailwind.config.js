/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
				primary: '#6750A4',
				'primary-container': '#EADDFF',
        		'on-primary': '#FFFFFF',
        		'on-primary-container': '#21005D',
        		secondary: '#625B71',
        		'secondary-container': '#E8DEF8',
        		'on-secondary': '#FFFFFF',
        		'on-secondary-container': '#1D192B',
        		background: '#FFFBFE',
        		'on-background': '#1C1B1F',
        		surface: '#FFFBFE',
        		'on-surface': '#1C1B1F',
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
  }