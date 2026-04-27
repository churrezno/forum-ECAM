/*
 * Project-specific vanilla replacement for Cookie Notice Pro.
 * Keeps the public API used by the site without requiring jQuery.
 */

const settingsIcon =
  '<?xml version="1.0" ?><svg height="16px" version="1.1" viewBox="0 0 20 20" width="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#bfb9b9" id="Core" transform="translate(-464.000000, -380.000000)"><g id="settings" transform="translate(464.000000, 380.000000)"><path d="M17.4,11 C17.4,10.7 17.5,10.4 17.5,10 C17.5,9.6 17.5,9.3 17.4,9 L19.5,7.3 C19.7,7.1 19.7,6.9 19.6,6.7 L17.6,3.2 C17.5,3.1 17.3,3 17,3.1 L14.5,4.1 C14,3.7 13.4,3.4 12.8,3.1 L12.4,0.5 C12.5,0.2 12.2,0 12,0 L8,0 C7.8,0 7.5,0.2 7.5,0.4 L7.1,3.1 C6.5,3.3 6,3.7 5.4,4.1 L3,3.1 C2.7,3 2.5,3.1 2.3,3.3 L0.3,6.8 C0.2,6.9 0.3,7.2 0.5,7.4 L2.6,9 C2.6,9.3 2.5,9.6 2.5,10 C2.5,10.4 2.5,10.7 2.6,11 L0.5,12.7 C0.3,12.9 0.3,13.1 0.4,13.3 L2.4,16.8 C2.5,16.9 2.7,17 3,16.9 L5.5,15.9 C6,16.3 6.6,16.6 7.2,16.9 L7.6,19.5 C7.6,19.7 7.8,19.9 8.1,19.9 L12.1,19.9 C12.3,19.9 12.6,19.7 12.6,19.5 L13,16.9 C13.6,16.6 14.2,16.3 14.7,15.9 L17.2,16.9 C17.4,17 17.7,16.9 17.8,16.7 L19.8,13.2 C19.9,13 19.9,12.7 19.7,12.6 L17.4,11 L17.4,11 Z M10,13.5 C8.1,13.5 6.5,11.9 6.5,10 C6.5,8.1 8.1,6.5 10,6.5 C11.9,6.5 13.5,8.1 13.5,10 C13.5,11.9 11.9,13.5 10,13.5 L10,13.5 Z" id="Shape"/></g></g></g></svg>';

const cookieIcon =
  '<svg id="cookieIcon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"> <g fill="none" fill-rule="evenodd"> <circle cx="20" cy="20" r="20" fill="#D5A150"></circle> <path fill="#AD712C" d="M32.44 4.34a19.914 19.914 0 0 1 4.34 12.44c0 11.046-8.954 20-20 20a19.914 19.914 0 0 1-12.44-4.34C8.004 37.046 13.657 40 20 40c11.046 0 20-8.954 20-20 0-6.343-2.954-11.996-7.56-15.66z"> </path> <path fill="#C98A2E" d="M10.903 11.35c-.412 0-.824-.157-1.139-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.749z"> </path> <circle cx="12.894" cy="7.749" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M10.09 7.48l-.003.032a1.566 1.566 0 0 0 1.624 1.683 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.624-1.683 2.823 2.823 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M4.464 24.227c-.412 0-.824-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.398 4.398 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="6.456" cy="20.626" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M3.651 20.356a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M10.098 32.276c-.412 0-.824-.158-1.138-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.749z"> </path> <circle cx="12.089" cy="28.674" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M9.285 28.405a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M18.95 37.91c-.411 0-.823-.158-1.137-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="20.942" cy="34.308" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M18.138 34.038l-.002.033a1.566 1.566 0 0 0 1.623 1.684 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M20.56 15.385c-.411 0-.823-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.75z"> </path> <circle cx="22.552" cy="11.784" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M19.748 11.514l-.003.033a1.566 1.566 0 0 0 1.624 1.683 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.624-1.683 2.823 2.823 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M30.219 29.861c-.412 0-.824-.157-1.139-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.75z"> </path> <circle cx="32.21" cy="26.26" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M29.406 25.99a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M29.414 14.57c-.412 0-.824-.158-1.139-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.295.46 3.13 1.297a1.61 1.61 0 0 1-2.276 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="31.405" cy="10.968" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M28.601 10.698a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M17.341 24.227c-.412 0-.824-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.276 2.276 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.75z"> </path> <circle cx="19.333" cy="20.626" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M16.529 20.356l-.003.033a1.566 1.566 0 0 0 1.623 1.684 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <g fill="#AD712C" transform="translate(2.656 1.875)"> <circle cx="7.485" cy="21.143" r="1"></circle> <circle cx="11.509" cy="21.143" r="1"></circle> <circle cx="9.497" cy="17.521" r="1"></circle> <circle cx="2.253" cy="24.765" r="1"></circle> <circle cx="10.301" cy="33.618" r="1"></circle> <circle cx="12.716" cy="30.399" r="1"></circle> <circle cx="16.74" cy="25.57" r="1"></circle> <circle cx="23.179" cy="23.155" r="1"></circle> <circle cx="21.569" cy="24.765" r="1"></circle> <circle cx="23.984" cy="27.179" r="1"></circle> <circle cx="23.984" cy="32.008" r="1"></circle> <circle cx="32.837" cy="15.107" r="1"></circle> <circle cx="30.422" cy="31.203" r="1"></circle> <circle cx="18.35" cy=".62" r="1"></circle> <circle cx="3.863" cy="7.863" r="1"></circle> <circle cx=".644" cy="12.692" r="1"></circle> <circle cx="9.899" cy="13.9" r="1"></circle> <circle cx="12.314" cy="12.692" r="1"></circle> <circle cx="9.899" cy="11.485" r="1"></circle> <circle cx="21.167" cy="17.521" r="1"></circle> <circle cx="15.935" cy="5.449" r="1"></circle> <circle cx="23.581" cy="12.692" r="1"></circle> <circle cx="24.788" cy="16.314" r="1"></circle> <circle cx="27.203" cy="16.314" r="1"></circle> <circle cx="27.203" cy="18.729" r="1"></circle> <circle cx="22.776" cy="4.242" r="1"></circle> <circle cx="25.191" cy="3.034" r="1"></circle> </g> </g></svg>';

const closeIcon =
  '<?xml version="1.0" ?><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g fill="#bfb9b9"><path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/><path d="M64.2422,31.7578a5.9979,5.9979,0,0,0-8.4844,0L48,39.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844L39.5156,48l-7.7578,7.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L48,56.4844l7.7578,7.7578a5.9994,5.9994,0,0,0,8.4844-8.4844L56.4844,48l7.7578-7.7578A5.9979,5.9979,0,0,0,64.2422,31.7578Z"/></g></svg>';

const config = {
  themeSettings: {
    primaryColor: '#E52350',
    darkColor: '#3b3e4a',
    lightColor: '#ffffff',
    themeMode: 'light',
  },
  enableMinimize: false,
  showCookieIcon: true,
  showSettingsBtn: true,
  showCloseIcon: false,
  showDeclineBtn: true,
  fullWidth: false,
  allCheckboxesChecked: true,
  displayPosition: 'left',
  minimizedIconDisplayPosition: 'left',
  settingsBtnLabel: 'Configurar',
  delay: 1000,
  expires: 365,
  title: 'Consentimiento de Cookies',
  description:
    'Este sitio web utiliza cookies o tecnologias similares para mejorar su experiencia de navegacion y brindar recomendaciones personalizadas. Al continuar utilizando nuestro sitio web, acepta nuestra  ',
  acceptBtnLabel: 'Aceptar',
  declineInfoBtnLabel: 'Rechazar',
  moreInfoBtnLink: '/politica-privacidad.html',
  moreInfoBtnLabel: 'Politica de Privacidad',
  cookieTypesTitle: 'Elige las cookies a aceptar',
  necessaryCookieTypeLabel: 'Necesarias',
  floatingIconTooltip: 'Ajustar mis preferencias',
  necessaryCookieTypeDesc:
    'Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas.',
  onConsentAccept: () => {
    console.log('Consentimiento aceptado');
    if (config.showSettingsBtn) {
      injectScripts();
    }
  },
  onConsentReject: () => {
    console.log('Consentimiento rechazado');
  },
  cookieTypes: [
    {
      type: 'Marketing',
      value: 'marketing',
      description:
        'Las cookies de marketing se utilizan para mostrar un pop-up de suscripcion a nuestra lista de correo.',
    },
  ],
};

const COOKIE_CONSENT = 'cnp_consent';
const COOKIE_CONSENT_PREFS = 'cnp_prefs';

const emitCookieNoticeEvent = (name, detail = {}) => {
  window.dispatchEvent(new CustomEvent(`cookieNotice:${name}`, { detail }));
};

const mergeConfig = (target, source) => {
  Object.entries(source).forEach(([key, value]) => {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      mergeConfig(target[key], value);
    } else {
      target[key] = value;
    }
  });
};

const cookieExists = (cookieName) => document.cookie.indexOf(cookieName) > -1;

const createCookie = (name, value, options = {}) => {
  document.cookie = `${name}=${value}${Object.keys(options).reduce((acc, key) => {
    return acc + `;${key.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase())}=${options[key]}`;
  }, '')}`;
};

const daysToUTC = (days) => {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
  return newDate.toUTCString();
};

const accessCookie = (name) => {
  const cookies = document.cookie.split(';').reduce((acc, cookieString) => {
    const [key, value] = cookieString.split('=').map((part) => part.trim());
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
  return name ? cookies[name] || false : cookies;
};

const parseJsonCookie = (name, fallback = false) => {
  const value = accessCookie(name);
  if (value === false) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const changeRootVariables = () => {
  document.documentElement.style.setProperty('--cookieNoticeProLight', config.themeSettings.lightColor);
  document.documentElement.style.setProperty('--cookieNoticeProDark', config.themeSettings.darkColor);
};

const removeNode = (selector) => {
  document.querySelector(selector)?.remove();
};

const fadeIn = (element) => {
  element.style.display = '';
};

const fadeOutAndRemove = (element) => {
  if (!element) {
    return;
  }
  element.remove();
};

const getPreferencesFromInputs = () => {
  return Array.from(document.querySelectorAll('input[name="gdprPrefItem"]:checked')).map((input) => input.value);
};

const setPreferenceInputs = (preferences = []) => {
  document.querySelectorAll('input[name="gdprPrefItem"]').forEach((input) => {
    input.checked = preferences.includes(input.value);
  });
};

const setOptionalInputs = (checked) => {
  document.querySelectorAll('input[name="gdprPrefItem"]:not(:disabled)').forEach((input) => {
    input.dataset.compulsory = 'off';
    input.checked = checked;
  });
};

const toggleCookieTypes = (forceOpen = null) => {
  const cookieTypes = document.getElementById('cookieTypes');
  const settingsButton = document.getElementById('cookieSettings');
  if (!cookieTypes || !settingsButton) {
    return;
  }

  const shouldOpen = forceOpen === null ? cookieTypes.style.display === 'none' || cookieTypes.style.display === '' : forceOpen;
  settingsButton.disabled = true;
  cookieTypes.style.display = shouldOpen ? 'block' : 'none';
  window.setTimeout(() => {
    settingsButton.disabled = false;
  }, 200);
};

const buildCookieTypes = () => {
  let cookieTypes =
    `<li><input type="checkbox" name="gdprPrefItem" value="necessary" checked="checked" disabled="disabled" data-compulsory="on"> <label title="${config.necessaryCookieTypeDesc}">${config.necessaryCookieTypeLabel}</label></li>`;

  config.cookieTypes.forEach((field) => {
    if (field.type !== '' && field.value !== '') {
      const description = field.description !== false ? ` title="${field.description}"` : '';
      cookieTypes += `<li><input type="checkbox" id="gdprPrefItem${field.value}" name="gdprPrefItem" value="${field.value}" data-compulsory="off"> <label for="gdprPrefItem${field.value}"${description}>${field.type}</label></li>`;
    }
  });

  return cookieTypes;
};

const buildBannerMarkup = () => {
  return `<div id="cookieNoticePro" class="${config.themeSettings.themeMode} display-${config.displayPosition} full-width-${config.fullWidth}">
    <div id="closeIcon">${closeIcon}</div>
    <div class="title-wrap">${cookieIcon}<h4>${config.title}</h4></div>
    <div class="content-wrap">
      <div class="msg-wrap">
        <p>${config.description} <a style="color:${config.themeSettings.primaryColor};" href="${config.moreInfoBtnLink}">${config.moreInfoBtnLabel}</a></p>
        <div id="cookieSettings">${settingsIcon}${config.settingsBtnLabel}</div>
        <div id="cookieTypes" style="display:none;"><h5>${config.cookieTypesTitle}</h5><ul>${buildCookieTypes()}</ul></div>
      </div>
      <div class="btn-wrap">
        <button id="cookieAccept" style="color:${config.themeSettings.lightColor};background:${config.themeSettings.primaryColor};border: 1px solid ${config.themeSettings.primaryColor};" type="button">${config.acceptBtnLabel}</button>
        <button id="cookieReject" style="color:${config.themeSettings.primaryColor};border: 1px solid ${config.themeSettings.primaryColor};" type="button">${config.declineInfoBtnLabel}</button>
      </div>
    </div>
  </div>`;
};

const minimizeCookieBanner = () => {
  removeNode('#cookieMinimizeIcon');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<div id="cookieMinimizeIcon" class="zoomIn ${config.minimizedIconDisplayPosition}">
    ${cookieIcon}
    <div class="floating-text">${config.floatingIconTooltip}</div>
  </div>`;

  const icon = wrapper.firstElementChild;
  if (!icon) {
    return;
  }

  icon.addEventListener('click', () => {
    if (icon.classList.contains('zoomIn')) {
      icon.classList.remove('zoomIn');
      icon.classList.add('zoomOut');
      window.setTimeout(() => {
        window.cookieNoticePro.reinit();
      }, 200);
    } else {
      icon.classList.remove('zoomOut');
      icon.classList.add('zoomIn');
    }
  });

  document.body.appendChild(icon);
};

const hideCookieBanner = (value, expiryDays) => {
  createCookie(COOKIE_CONSENT, value, {
    expires: daysToUTC(expiryDays),
    path: '/',
  });

  fadeOutAndRemove(document.getElementById('cookieNoticePro'));

  if (config.enableMinimize) {
    minimizeCookieBanner();
  }
};

const bindBannerEvents = (event) => {
  const acceptButton = document.getElementById('cookieAccept');
  const settingsButton = document.getElementById('cookieSettings');
  const closeButton = document.getElementById('closeIcon');
  const rejectButton = document.getElementById('cookieReject');

  acceptButton?.addEventListener('click', () => {
    document.querySelectorAll('input[name="gdprPrefItem"][data-compulsory="on"]').forEach((input) => {
      input.checked = true;
    });

    const prefs = getPreferencesFromInputs();
    createCookie(COOKIE_CONSENT_PREFS, encodeURIComponent(JSON.stringify(prefs)), {
      expires: daysToUTC(365),
      path: '/',
    });

    hideCookieBanner(true, config.expires);
    config.onConsentAccept();
    emitCookieNoticeEvent('accepted', { preferences: prefs });
    if (config.showSettingsBtn) {
      injectScripts();
    }
  });

  settingsButton?.addEventListener('click', () => {
    if (event === 'open') {
      setOptionalInputs(false);
      toggleCookieTypes(true);
    } else {
      setOptionalInputs(config.allCheckboxesChecked);
      toggleCookieTypes();
    }
  });

  closeButton?.addEventListener('click', () => {
    removeNode('#cookieNoticePro');
  });

  rejectButton?.addEventListener('click', () => {
    hideCookieBanner(false, config.expires);
    config.onConsentReject();
    emitCookieNoticeEvent('rejected');
    createCookie(COOKIE_CONSENT_PREFS, '', {
      expires: daysToUTC(-365),
      path: '/',
    });
  });
};

const renderCookieNotice = (event) => {
  changeRootVariables();

  const consentExists = cookieExists(COOKIE_CONSENT);
  const preferences = parseJsonCookie(COOKIE_CONSENT_PREFS, []);

  if (!consentExists || event === 'open') {
    removeNode('#cookieNoticePro');
    removeNode('#cookieMinimizeIcon');

    window.setTimeout(() => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = buildBannerMarkup();
      const banner = wrapper.firstElementChild;

      if (!banner) {
        return;
      }

      document.body.appendChild(banner);
      fadeIn(banner);

      if (event === 'open') {
        setPreferenceInputs(preferences);
        toggleCookieTypes(true);
      }

      if (!config.showSettingsBtn) {
        document.querySelector('#cookieNoticePro #cookieSettings')?.setAttribute('style', 'display:none;');
      }
      if (!config.showDeclineBtn) {
        document.querySelector('#cookieNoticePro #cookieReject')?.setAttribute('style', 'display:none;');
      }
      if (!config.showCookieIcon) {
        document.querySelector('#cookieNoticePro #cookieIcon')?.setAttribute('style', 'display:none;');
      }
      if (!config.showCloseIcon) {
        document.querySelector('#cookieNoticePro #closeIcon')?.setAttribute('style', 'display:none;');
      }

      bindBannerEvents(event);
    }, event === 'open' ? 0 : config.delay);

    return;
  }

  if (config.showSettingsBtn) {
    injectScripts();
  }
  if (config.enableMinimize) {
    minimizeCookieBanner();
  }
};

window.cookieNoticePro = {
  init: (nextConfig) => {
    if (nextConfig && typeof nextConfig === 'object') {
      mergeConfig(config, nextConfig);
    }
    renderCookieNotice();
  },
  reinit: () => {
    renderCookieNotice('open');
  },
  isAccepted: () => {
    return parseJsonCookie(COOKIE_CONSENT);
  },
  getPreferences: () => {
    return parseJsonCookie(COOKIE_CONSENT_PREFS);
  },
  isPreferenceAccepted: (cookieTypeValue) => {
    const consent = parseJsonCookie(COOKIE_CONSENT);
    const preferences = parseJsonCookie(COOKIE_CONSENT_PREFS, []);

    if (consent === false) {
      return false;
    }
    if (!Array.isArray(preferences) || preferences.indexOf(cookieTypeValue) === -1) {
      return false;
    }
    return true;
  },
};

const injectScripts = function injectScripts() {
  if (window.cookieNoticePro.isPreferenceAccepted('marketing') === true) {
    const scriptId = 'mcjs';
    const scriptExists = document.querySelector(`head script#${scriptId}`) !== null;

    if (!scriptExists) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('id', scriptId);
      gtmScript.innerHTML =
        '!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/cce61024264528dbcaf2fbe21/60b769ae253e61d9b0c11450c.js");';
      document.head.appendChild(gtmScript);
    } else {
      console.log('The script is already loaded.');
    }
  }
};
