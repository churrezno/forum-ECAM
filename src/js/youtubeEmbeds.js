const MARKETING_COOKIE = 'marketing';

const hasMarketingConsent = () => {
    return window.cookieNoticePro?.isPreferenceAccepted?.(MARKETING_COOKIE) === true;
};

const loadEmbed = (container) => {
    if (!container || container.dataset.loaded === 'true') {
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = container.dataset.src ?? '';
    iframe.title = container.dataset.title ?? 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = container.dataset.allow ?? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = container.dataset.referrerpolicy ?? 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;

    container.innerHTML = '';
    container.appendChild(iframe);
    container.dataset.loaded = 'true';
    container.dataset.pending = 'false';
};

const openCookieSettings = () => {
    if (window.cookieNoticePro?.reinit) {
        window.cookieNoticePro.reinit();
    }
};

const setMessage = (container, text) => {
    const message = container.querySelector('.youtube-consent-message');
    if (message && text) {
        message.textContent = text;
    }
};

const wireEmbed = (container) => {
    const loadButton = container.querySelector('.youtube-consent-load');
    const settingsButton = container.querySelector('.youtube-consent-settings');

    loadButton?.addEventListener('click', () => {
        if (hasMarketingConsent()) {
            loadEmbed(container);
            return;
        }

        container.dataset.pending = 'true';
        setMessage(container, container.dataset.pendingMessage);
        openCookieSettings();
    });

    settingsButton?.addEventListener('click', () => {
        openCookieSettings();
    });
};

const initializeYouTubeEmbeds = () => {
    document.querySelectorAll('[data-youtube-embed]').forEach((container) => {
        wireEmbed(container);
    });

    window.addEventListener('cookieNotice:accepted', () => {
        document.querySelectorAll('[data-youtube-embed][data-pending="true"]').forEach((container) => {
            if (hasMarketingConsent()) {
                loadEmbed(container);
            }
        });
    });

    window.addEventListener('cookieNotice:rejected', () => {
        document.querySelectorAll('[data-youtube-embed]').forEach((container) => {
            container.dataset.pending = 'false';
            if (container.dataset.loaded !== 'true') {
                setMessage(container, container.dataset.message);
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', initializeYouTubeEmbeds);
