const getToken = () => localStorage.getItem('token');
const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
};

export { getToken, setToken, getTheme, setTheme };