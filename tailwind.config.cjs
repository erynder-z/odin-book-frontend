/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                /*   regularFont: ['Outfit', 'sans-serif'], */
                regularFont: ['Cabin', 'sans-serif'],
                monospaceFont: ['Red Hat Mono', 'monospace'],
            },

            colors: {
                transparent: 'transparent',
                background1: '#d8dee9',
                background1Dark: '#15202b',
                background2: '#e5e9f0',
                background2Dark: '#1a2734',
                card: '#eceff4',
                cardDark: '#23303c',
                navbar: '#eceff4',
                navbarDark: '#23303c',
                regularText: '#020202',
                regularTextDark: '#e4e6ea',
                highlight: '#cc69c8',
                highlightDark: '#BC05BC',
                highlightHover: '#04758F',
                highlightDarkHover: '#9D049D',
                button: '#4e7cbf',
                buttonHover: '#3A64A0',
                buttonDark: '#2d57ac',
                buttonDarkHover: '#4488ff',
                friendCardHighlight: '#99cc99',
                friendCardHighlightDark: '#8c9440',
                friendSuggestionCardHighlight: '#86bdc9',
                friendSuggestionCardHighlightDark: '#5f819d',
                friendRandomCardHighlight: '#f7dcb4',
                friendRandomCardHighlightDark: '#a54242',
                loading: '#00000066',
                loadingDark: '#ffffff66',
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
                colorChangeAnimationBright: {
                    '0%, 100%': {
                        'background-color': 'lightSteelBlue  ',
                    },
                    '50%': {
                        'background-color': 'orangeRed ',
                    },
                },
                colorChangeAnimationDark: {
                    '0%, 100%': {
                        'background-color': 'gray',
                    },
                    '50%': {
                        'background-color': 'gold',
                    },
                },
                postReactionAnimation: {
                    '0%': {
                        transform: 'scale(1)',
                        filter: 'invert(0%)',
                    },
                    '70%': {
                        transform: 'scale(1.5)',
                        filter: 'invert(100%)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        filter: 'invert(0%)',
                    },
                },
                squish: {
                    '50%': {
                        transform: 'scaleX(1.2) scaleY(0.8)',
                    },
                },
            },
            animation: {
                inAnimation: 'inAnimation 150ms ease-in',
                outAnimation: 'outAnimation 170ms ease-out',
                popInAnimation: 'popInAnimation 200ms ease-in-out',
                popOutAnimation: 'popOutAnimation 220ms ease-in-out',
                postReactionAnimation:
                    'postReactionAnimation 300ms ease-in-out',
                squish: 'squish 300ms ease-in-out',
                colorChangeAnimationBright:
                    'colorChangeAnimationBright 5s ease infinite',
                colorChangeAnimationDark:
                    'colorChangeAnimationDark 3s ease infinite',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
