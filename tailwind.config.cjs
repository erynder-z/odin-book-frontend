/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                regularFont: ['Outfit', 'sans-serif'],
            },

            colors: {
                transparent: 'transparent',
                background1: '#e8e8e8',
                background1Dark: '#15202b',
                background2: '#f4f4f4',
                background2Dark: '#1a2734',
                card: '#eff1f5',
                cardDark: '#23303c',
                navbar: '#eff1f5',
                navbarDark: '#23303c',
                regularText: '#020202',
                regularTextDark: '#e4e6ea',
                highlight: '#0598BC',
                highlightDark: '#BC05BC',
                highlightHover: '#04758F',
                highlightDarkHover: '#9D049D',
                button: '#0598BC',
                buttonHover: '#04788F',
                buttonDark: '#05bc85',
                buttonDarkHover: '#04775C',
                friendCardHighlight: '#CD3232',
                friendSuggestionCardHighlight: '#0752A8',
                friendRandomCardHighlight: '#0598BC',
                cBlack: '#020202',
                cRed: '#CD3232',
                cGreen: '#00BC00',
                cYellow: '#A5A900',
                cBlue: '#0752A8',
                cPink: '#BC05BC',
                cCyan: '#0598BC ',
                cWhite: '#343434',
            },
            keyframes: {
                inAnimation: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                outAnimation: {
                    '0%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
                popInAnimation: {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                    '70%': {
                        transform: 'scale(1.1)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
                popOutAnimation: {
                    '0%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                    '70%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                },
                gradientBorderAnimation: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
            animation: {
                inAnimation: 'inAnimation 150ms ease-in',
                outAnimation: 'outAnimation 170ms ease-out',
                popInAnimation: 'popInAnimation 200ms ease-in-out',
                popOutAnimation: 'popOutAnimation 220ms ease-in-out',
                gradientBorderAnimation:
                    'gradientBorderAnimation 5s ease infinite',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
