const loadCookieNotice = async () => {
    await import('../vendor/cookienoticepro.script.js?v=1.0.1');

    if (window.cookieNoticePro?.init) {
        window.cookieNoticePro.init();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    void loadCookieNotice();
});
