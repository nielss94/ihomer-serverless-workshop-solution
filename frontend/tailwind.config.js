module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6AB4D4',
                    defused: '#a3cdd0',
                    darker: '#4e869f',
                },
                secondary: {
                    DEFAULT: '#FF3366',
                    defused: '#f88aa4',
                    darker: '#c1254c',
                },
                dark: '#12161b',
                darker: '#0c0e11',
                light: '#F6F7F8',
                body: '#f3f3f4',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
