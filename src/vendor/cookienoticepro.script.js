/*
 * Copyright (c) 2024 Flerosoft (https://flerosoft.com)
 * Software Name: Cookie Notice Pro - jQuery Plugin
 * Product Page : https://cookienoticepro.flerosoft.com
 * Documentation: https://cookienoticepro.flerosoft.com/docs
 * Description: Cookie Notice Pro, a lightweight jQuery plugin, helps you to comply with GDPR.
Make your own cookie information popup in minutes.
 * Changelog: https://cookienoticepro.flerosoft.com/docs/getting-started#item-1-4
*/

;(function ($) {
  'use strict'

  const settingsIcon =
    '<?xml version="1.0" ?><svg height="16px" version="1.1" viewBox="0 0 20 20" width="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#bfb9b9" id="Core" transform="translate(-464.000000, -380.000000)"><g id="settings" transform="translate(464.000000, 380.000000)"><path d="M17.4,11 C17.4,10.7 17.5,10.4 17.5,10 C17.5,9.6 17.5,9.3 17.4,9 L19.5,7.3 C19.7,7.1 19.7,6.9 19.6,6.7 L17.6,3.2 C17.5,3.1 17.3,3 17,3.1 L14.5,4.1 C14,3.7 13.4,3.4 12.8,3.1 L12.4,0.5 C12.5,0.2 12.2,0 12,0 L8,0 C7.8,0 7.5,0.2 7.5,0.4 L7.1,3.1 C6.5,3.3 6,3.7 5.4,4.1 L3,3.1 C2.7,3 2.5,3.1 2.3,3.3 L0.3,6.8 C0.2,6.9 0.3,7.2 0.5,7.4 L2.6,9 C2.6,9.3 2.5,9.6 2.5,10 C2.5,10.4 2.5,10.7 2.6,11 L0.5,12.7 C0.3,12.9 0.3,13.1 0.4,13.3 L2.4,16.8 C2.5,16.9 2.7,17 3,16.9 L5.5,15.9 C6,16.3 6.6,16.6 7.2,16.9 L7.6,19.5 C7.6,19.7 7.8,19.9 8.1,19.9 L12.1,19.9 C12.3,19.9 12.6,19.7 12.6,19.5 L13,16.9 C13.6,16.6 14.2,16.3 14.7,15.9 L17.2,16.9 C17.4,17 17.7,16.9 17.8,16.7 L19.8,13.2 C19.9,13 19.9,12.7 19.7,12.6 L17.4,11 L17.4,11 Z M10,13.5 C8.1,13.5 6.5,11.9 6.5,10 C6.5,8.1 8.1,6.5 10,6.5 C11.9,6.5 13.5,8.1 13.5,10 C13.5,11.9 11.9,13.5 10,13.5 L10,13.5 Z" id="Shape"/></g></g></g></svg>'

  const cookieIcon =
    '<svg id="cookieIcon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"> <g fill="none" fill-rule="evenodd"> <circle cx="20" cy="20" r="20" fill="#D5A150"></circle> <path fill="#AD712C" d="M32.44 4.34a19.914 19.914 0 0 1 4.34 12.44c0 11.046-8.954 20-20 20a19.914 19.914 0 0 1-12.44-4.34C8.004 37.046 13.657 40 20 40c11.046 0 20-8.954 20-20 0-6.343-2.954-11.996-7.56-15.66z"> </path> <path fill="#C98A2E" d="M10.903 11.35c-.412 0-.824-.157-1.139-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.749z"> </path> <circle cx="12.894" cy="7.749" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M10.09 7.48l-.003.032a1.566 1.566 0 0 0 1.624 1.683 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.624-1.683 2.823 2.823 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M4.464 24.227c-.412 0-.824-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.398 4.398 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="6.456" cy="20.626" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M3.651 20.356a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M10.098 32.276c-.412 0-.824-.158-1.138-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.749z"> </path> <circle cx="12.089" cy="28.674" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M9.285 28.405a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M18.95 37.91c-.411 0-.823-.158-1.137-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.182 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.277 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="20.942" cy="34.308" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M18.138 34.038l-.002.033a1.566 1.566 0 0 0 1.623 1.684 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M20.56 15.385c-.411 0-.823-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.75z"> </path> <circle cx="22.552" cy="11.784" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M19.748 11.514l-.003.033a1.566 1.566 0 0 0 1.624 1.683 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.624-1.683 2.823 2.823 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M30.219 29.861c-.412 0-.824-.157-1.139-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.75z"> </path> <circle cx="32.21" cy="26.26" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M29.406 25.99a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M29.414 14.57c-.412 0-.824-.158-1.139-.472a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.295.46 3.13 1.297a1.61 1.61 0 0 1-2.276 2.276 1.2 1.2 0 0 0-.853-.353 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.748z"> </path> <circle cx="31.405" cy="10.968" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M28.601 10.698a1.566 1.566 0 0 0 1.62 1.716 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.622-1.683 2.824 2.824 0 0 0-2.7 2.546z"> </path> <path fill="#C98A2E" d="M17.341 24.227c-.412 0-.824-.157-1.138-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.297a1.61 1.61 0 0 1-2.276 2.276 1.2 1.2 0 0 0-.854-.354 1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.138 2.75z"> </path> <circle cx="19.333" cy="20.626" r="2.817" fill="#674230"></circle> <path fill="#7A5436" d="M16.529 20.356l-.003.033a1.566 1.566 0 0 0 1.623 1.684 2.824 2.824 0 0 0 2.703-2.578 1.566 1.566 0 0 0-1.623-1.684 2.824 2.824 0 0 0-2.7 2.546z"> </path> <g fill="#AD712C" transform="translate(2.656 1.875)"> <circle cx="7.485" cy="21.143" r="1"></circle> <circle cx="11.509" cy="21.143" r="1"></circle> <circle cx="9.497" cy="17.521" r="1"></circle> <circle cx="2.253" cy="24.765" r="1"></circle> <circle cx="10.301" cy="33.618" r="1"></circle> <circle cx="12.716" cy="30.399" r="1"></circle> <circle cx="16.74" cy="25.57" r="1"></circle> <circle cx="23.179" cy="23.155" r="1"></circle> <circle cx="21.569" cy="24.765" r="1"></circle> <circle cx="23.984" cy="27.179" r="1"></circle> <circle cx="23.984" cy="32.008" r="1"></circle> <circle cx="32.837" cy="15.107" r="1"></circle> <circle cx="30.422" cy="31.203" r="1"></circle> <circle cx="18.35" cy=".62" r="1"></circle> <circle cx="3.863" cy="7.863" r="1"></circle> <circle cx=".644" cy="12.692" r="1"></circle> <circle cx="9.899" cy="13.9" r="1"></circle> <circle cx="12.314" cy="12.692" r="1"></circle> <circle cx="9.899" cy="11.485" r="1"></circle> <circle cx="21.167" cy="17.521" r="1"></circle> <circle cx="15.935" cy="5.449" r="1"></circle> <circle cx="23.581" cy="12.692" r="1"></circle> <circle cx="24.788" cy="16.314" r="1"></circle> <circle cx="27.203" cy="16.314" r="1"></circle> <circle cx="27.203" cy="18.729" r="1"></circle> <circle cx="22.776" cy="4.242" r="1"></circle> <circle cx="25.191" cy="3.034" r="1"></circle> </g> </g></svg>'

  const closeIcon =
    '<?xml version="1.0" ?><svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g fill="#bfb9b9"><path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/><path d="M64.2422,31.7578a5.9979,5.9979,0,0,0-8.4844,0L48,39.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844L39.5156,48l-7.7578,7.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L48,56.4844l7.7578,7.7578a5.9994,5.9994,0,0,0,8.4844-8.4844L56.4844,48l7.7578-7.7578A5.9979,5.9979,0,0,0,64.2422,31.7578Z"/></g></svg>'

  /*
   *--------------------------------------------------------------------------
   * CONFIG OR SETTINGS - Customize the popup banner START
   *--------------------------------------------------------------------------
   */
  const config = {
    themeSettings: {
      primaryColor: '#E52350', // Primary Color of Popup Banner
      darkColor: '#3b3e4a', // Dark Theme Color
      lightColor: '#ffffff', // Light Theme Color
      themeMode: 'light', // Theme Mode (light|dark)
    },
    enableGoogleConsentMode: false, // Add support for Google consent mode v2 (https://cookiebannergenerator.com/implementing-google-consent-mode-v2-with-cookie-notice-pro-a-step-by-step-guide/)
    enableMinimize: false, // Enable minimized floating cookie icon to adjust preferences
    showCookieIcon: true, // Hide or show the cookie icon
    showSettingsBtn: true, // Hide or show the preference settings(true|false)
    showCloseIcon: false, // Hide or show the popup close icon(true|false)
    showDeclineBtn: true, // Hide or show the cookie decline button(true|false)
    fullWidth: false, // Full width popup works only when "displayPosition" is set to top/bottom
    allCheckboxesChecked: true, // The setting checkboxes should be checked by default initially or not(true|false)
    displayPosition: 'left', // Where popup should appear(top|right|bottom|left)
    minimizedIconDisplayPosition: 'left', // Where the minimized cookie icon should appear(right|left)
    settingsBtnLabel: 'Configurar', // Text of settings button
    delay: 1000, // After how much time should popup appear(2000 is equal to 2 seconds)
    expires: 365, // Expiry date of cookie(365 is equal to 365 days)
    title: 'Consentimiento de Cookies', // Title of popup bannner
    description:
      'Este sitio web utiliza cookies o tecnologías similares para mejorar su experiencia de navegación y brindar recomendaciones personalizadas. Al continuar utilizando nuestro sitio web, acepta nuestra  ', // Message
    acceptBtnLabel: 'Aceptar', // Accept cookie button text
    declineInfoBtnLabel: 'Rechazar', // Decline cookie button text
    moreInfoBtnLink: '/politica-privacidad.html', // Learn more link(default: privacy policy page)
    moreInfoBtnLabel: 'Política de Privacidad', // More info link text
    cookieTypesTitle: 'Elige las cookies a aceptar', // Title of cookie preference options
    necessaryCookieTypeLabel: 'Necesarias', // Label text of Necessary cookie item
    floatingIconTooltip: 'Ajustar mis preferencias', // Tooltip of floating cookie icon (Minimized)
    necessaryCookieTypeDesc: 'Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas.', // Hover text of necessary cookies
    onConsentAccept: () => {
      // It will inject scripts in head if cookie preferences menu(showSettingsBtn) is enabled
      console.log('¡Consentimiento aceptado!')
      config.showSettingsBtn? injectScripts() : null;
    },
    onConsentReject: () => {
      // This code will run on cookie reject/decline
      console.log('¡Consentimiento Rechazado!')
    },
    cookieTypes: [
      // Cookie types, value and description (Cookie Preferences Selection)
      /* {
        type: 'Preferencias',
        value: 'preferences', // WARNING: DO NOT EDIT THIS VALUE
        description:
          'Las cookies de preferencias permiten que un sitio web recuerde información que cambia la forma en que se comporta o se ve el sitio web, como su idioma preferido o la región en la que se encuentra.',
      }, */
      {
        type: 'Marketing',
        value: 'marketing', // WARNING: DO NOT EDIT THIS VALUE
        description:
          'Las cookies de marketing se utilizan para mostrar un pop-up de suscripción a nuestra lista de correo.',
      },
      /* {
        type: 'Analíticas',
        value: 'analytics', // WARNING: DO NOT EDIT THIS VALUE
        description:
          'Las cookies analíticas nos permiten contar las visitas y las fuentes de tráfico, para que podamos medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y las menos populares y a ver cómo se mueven los visitantes por el sitio.',
      }, */
    ],
  }
  /*
   *--------------------------------------------------------------------------
   * CONFIG OR SETTINGS - Customize the popup banner END
   *--------------------------------------------------------------------------
   */

  const COOKIE_CONSENT = 'cnp_consent' // WARNING: DO NOT EDIT THIS VALUE
  const COOKIE_CONSENT_PREFS = 'cnp_prefs' // WARNING: DO NOT EDIT THIS VALUE
  const GOOGLE_CONSENT_MODE_AD_PREFS = 'cnp_gconsent_ad_prefs' // WARNING: DO NOT EDIT THIS VALUE
  const GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE = 'cnp_gconsent_analytics_storage' // WARNING: DO NOT EDIT THIS VALUE

  $.fn.cookieNoticePro = (event) => {
    typeof event === 'object' ? $.extend(true, config, event) : null
    changeRootVariables()
    let cookieConsentExists = cookieExists(COOKIE_CONSENT)
    let cookiePrefsValue = accessCookie(COOKIE_CONSENT_PREFS)

    // If consent is not accepted
    if (!cookieConsentExists || event == 'open') {
      $('#cookieNoticePro').remove()
      $('#cookieMinimizeIcon').remove()

      let cookieTypes =
        '<li><input type="checkbox" name="gdprPrefItem" value="necessary" checked="checked" disabled="disabled" data-compulsory="on"> <label title="' +
        config.necessaryCookieTypeDesc +
        '">' +
        config.necessaryCookieTypeLabel +
        '</label></li>'

      const preferences = JSON.parse(cookiePrefsValue)
      $.each(config.cookieTypes, (index, field) => {
        if (field.type !== '' && field.value !== '') {
          let cookieTypeDescription = ''
          if (field.description !== false) {
            cookieTypeDescription = ' title="' + field.description + '"'
          }
          cookieTypes +=
            '<li><input type="checkbox" id="gdprPrefItem' +
            field.value +
            '" name="gdprPrefItem" value="' +
            field.value +
            '" data-compulsory="on"> <label for="gdprPrefItem' +
            field.value +
            '"' +
            cookieTypeDescription +
            '>' +
            field.type +
            '</label></li>'
        }
      })

      let cookieNotice =
        '<div id="cookieNoticePro" class="' +
        config.themeSettings.themeMode +
        ' display-' +
        config.displayPosition +
        ' full-width-' +
        config.fullWidth +
        '"><div id="closeIcon">' +
        closeIcon +
        '</div><div class="title-wrap">' +
        cookieIcon +
        '<h4>' +
        config.title +
        '</h4></div><div class="content-wrap"><div class="msg-wrap"><p>' +
        config.description +
        ' <a style="color:' +
        config.themeSettings.primaryColor +
        ';" href="' +
        config.moreInfoBtnLink +
        '">' +
        config.moreInfoBtnLabel +
        '</a></p><div id="cookieSettings">' +
        settingsIcon +
        config.settingsBtnLabel +
        '</div><div id="cookieTypes" style="display:none;"><h5>' +
        config.cookieTypesTitle +
        '</h5><ul>' +
        cookieTypes +
        '</ul></div></div><div class="btn-wrap"><button id="cookieAccept" style="color:' +
        config.themeSettings.lightColor +
        ';background:' +
        config.themeSettings.primaryColor +
        ';border: 1px solid ' +
        config.themeSettings.primaryColor +
        ';" type="button">' +
        config.acceptBtnLabel +
        '</button><button id="cookieReject" style="color:' +
        config.themeSettings.primaryColor +
        ';border: 1px solid ' +
        config.themeSettings.primaryColor +
        ';" type="button">' +
        config.declineInfoBtnLabel +
        '</button></div>'

      setTimeout(
        () => {
          $('body').append(cookieNotice)
          $('#cookieNoticePro')
            .hide()
            .fadeIn('slow', () => {
              if (event == 'open') {
                $('#cookieSettings').trigger('click')
                $.each(preferences, (index, field) => {
                  $('input#gdprPrefItem' + field).prop('checked', true)
                })
              }
            })
          if (!config.showSettingsBtn) {
            $('#cookieNoticePro #cookieSettings').hide()
          }
          if (!config.showDeclineBtn) {
            $('#cookieNoticePro #cookieReject').hide()
          }
          if (!config.showCookieIcon) {
            $('#cookieNoticePro #cookieIcon').hide()
          }
          if (!config.showCloseIcon) {
            $('#cookieNoticePro #closeIcon').hide()
          }
        },
        event === 'open' ? 0 : config.delay,
      )
      $('body').on('click', '#cookieAccept', () => {
        hideCookieBanner(true, config.expires)
        $('input[name="gdprPrefItem"][data-compulsory="on"]').prop('checked', true)
        let prefs = []
        $.each($('input[name="gdprPrefItem"]').serializeArray(), (i, field) => {
          prefs.push(field.value)
        })
        createCookie(COOKIE_CONSENT_PREFS, encodeURIComponent(JSON.stringify(prefs)), {
          expires: daysToUTC(365),
          path: '/',
        })
        config.onConsentAccept.call(this)
        config.showSettingsBtn ? typeof injectScripts === 'function' && injectScripts() : null
        if (config.enableGoogleConsentMode) {
          googleConsentModeHandler()
        }
      })
      $('body').on('click', '#cookieSettings', () => {
        if (event === 'open') {
          $('input[name="gdprPrefItem"]:not(:disabled)').attr('data-compulsory', 'off').prop('checked', false)
          $('#cookieTypes').slideDown('fast', function () {
            $('#cookieSettings').prop('disabled', true)
          })
        } else {
          $('input[name="gdprPrefItem"]:not(:disabled)').attr('data-compulsory', 'off').prop('checked', config.allCheckboxesChecked)
          $('#cookieTypes').toggle('fast', function () {
            $('#cookieSettings').prop('disabled', false)
          })
        }
      })
      $('body').on('click', '#closeIcon', () => {
        $('#cookieNoticePro').remove()
      })
      $('body').on('click', '#cookieReject', () => {
        hideCookieBanner(false, config.expires)
        config.onConsentReject.call(this)
        if (config.enableGoogleConsentMode) {
          googleConsentModeHandler()
        }
        // Delete prefs cookie from brower on reject
        createCookie(COOKIE_CONSENT_PREFS, '', {
          expires: daysToUTC(-365),
          path: '/',
        })
      })
    }
    // If already consent is accepted, inject preferences
    else {
      config.showSettingsBtn ? typeof injectScripts === 'function' && injectScripts() : null
			//config.showSettingsBtn? injectScripts() : null;
      if (config.enableMinimize) {
        minimizeCookieBanner()
      }
      if (config.enableGoogleConsentMode) {
        googleConsentModeHandler()
      }
    }
  }

  /**
   * Check if cookie exists
   * @param {string} cookieName
   */
  const cookieExists = (cookieName) => {
    if (document.cookie.indexOf(cookieName) > -1) {
      return true
    }
    return false
  }

  /**
   * Create the cookie and hide the banner
   * @param {string} value
   * @param {string} expiryDays
   */
  const hideCookieBanner = (value, expiryDays) => {
    createCookie(COOKIE_CONSENT, value, {
      expires: daysToUTC(expiryDays),
      path: '/',
    })
    $('#cookieNoticePro').fadeOut('fast', () => {
      $('body').off('click', '#cookieSettings')
      $('body').off('click', '#cookieReject')
      $('body').off('click', '#closeIcon')
      $('body').off('click', '#cookieAccept')
      $(this).remove()
    })
    if (config.enableMinimize) {
      minimizeCookieBanner()
    }
  }

  /**
   * Minimize the cookie banner and show a minimized icon.
   */
  const minimizeCookieBanner = () => {
    // Remove any existing minimize icon before appending a new one.
    $('#cookieMinimizeIcon').remove()

    // Minimize the banner and show an icon instead.
    let minimizeIcon = $(`
      <div id="cookieMinimizeIcon" class="zoomIn ${config.minimizedIconDisplayPosition}">
        ${cookieIcon}
        <div class="floating-text">
          ${config.floatingIconTooltip}
        </div>
      </div>
    `)
    $('body').append(minimizeIcon)

    // Define the click behavior for the minimize icon.
    $('#cookieMinimizeIcon').on('click', function () {
      if ($(this).hasClass('zoomIn')) {
        $(this).removeClass('zoomIn').addClass('zoomOut')
        setTimeout(() => {
          $.fn.cookieNoticePro('open') // Reopen the cookie notice
        }, 200) // Match the timeout to the animation duration
      } else {
        $(this).removeClass('zoomOut').addClass('zoomIn')
      }
    })
  }

  /**
   * Set Cookie
   * @param {string} name -  Cookie Name
   * @param {string} value - Cookie Value
   * @param {string} expiryDays - Expiry Date of cookie
   */
  const createCookie = (name, value, options = {}) => {
    document.cookie = `${name}=${value}${Object.keys(options).reduce((acc, key) => {
      return acc + `;${key.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase())}=${options[key]}`
    }, '')}`
  }

  /**
   * Converts Days Into UTC String
   * @param {number} days - Name of the cookie
   * @return {string} UTC date string
   */
  const daysToUTC = (days) => {
    const newDate = new Date()
    newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000)
    return newDate.toUTCString()
  }

  /**
   * Get Cookie By Name
   * @param {string} name - Name of the cookie
   * @return {string(number|Array)} Value of the cookie
   */
  const accessCookie = (name) => {
    const cookies = document.cookie.split(';').reduce((acc, cookieString) => {
      const [key, value] = cookieString.split('=').map((s) => s.trim())
      if (key && value) {
        acc[key] = decodeURIComponent(value)
      }
      return acc
    }, {})
    return name ? cookies[name] || false : cookies
  }

  /**
   * Updates Google Consent Mode based on user consent and preferences.
   */
  const googleConsentModeHandler = () => {
    if (!config.enableGoogleConsentMode) return
    const consent = JSON.parse(accessCookie(COOKIE_CONSENT))
    const preferences = JSON.parse(accessCookie(COOKIE_CONSENT_PREFS))
    const googleConsentAnalyticsStorage = JSON.parse(accessCookie(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE))
    const googleConsentAdPrefs = JSON.parse(accessCookie(GOOGLE_CONSENT_MODE_AD_PREFS))

    try {
      // if consent is accepted
      if (consent === true) {
        /** GOOGLE CONSENT ANALYTICS STORAGE */
        // if analytics is accepted and google consent analytics storage does not exist
        if (preferences.indexOf('analytics') > -1 && !cookieExists(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE)) {
          createCookie(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE, encodeURIComponent(true), {
            expires: daysToUTC(365),
            path: '/',
          })
          gtag('consent', 'update', {
            analytics_storage: 'granted',
          })
        }
        // if analytics is accepted and google consent analytics storage exist
        else if (preferences.indexOf('analytics') > -1 && cookieExists(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE)) {
          if (googleConsentAnalyticsStorage === true) {
            gtag('consent', 'update', {
              analytics_storage: 'granted',
            })
          }
          if (googleConsentAnalyticsStorage === false) {
            createCookie(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE, encodeURIComponent(true), {
              expires: daysToUTC(365),
              path: '/',
            })
            gtag('consent', 'update', {
              analytics_storage: 'granted',
            })
          }
        }
        //  if analytics is removed and google consent analytics storage exist
        else if (preferences.indexOf('analytics') === -1 && cookieExists(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE)) {
          if (googleConsentAnalyticsStorage === true) {
            createCookie(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE, encodeURIComponent(false), {
              expires: daysToUTC(365),
              path: '/',
            })
            gtag('consent', 'update', {
              analytics_storage: 'denied',
            })
          }
        }

        /** GOOGLE CONSENT AD PREFS */
        // if marketing is accepted and google consent ad prefs storage does not exist
        if (preferences.indexOf('marketing') > -1 && !cookieExists(GOOGLE_CONSENT_MODE_AD_PREFS)) {
          createCookie(GOOGLE_CONSENT_MODE_AD_PREFS, encodeURIComponent(true), {
            expires: daysToUTC(365),
            path: '/',
          })
          gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          })
        }
        // if marketing is accepted and google consent ad prefs storage exist
        else if (preferences.indexOf('marketing') > -1 && cookieExists(GOOGLE_CONSENT_MODE_AD_PREFS)) {
          if (googleConsentAdPrefs === true) {
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
            })
          }
          if (googleConsentAdPrefs === false) {
            createCookie(GOOGLE_CONSENT_MODE_AD_PREFS, encodeURIComponent(true), {
              expires: daysToUTC(365),
              path: '/',
            })
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
            })
          }
        }
        //  if marketing is removed and google consent ad prefs storage exist
        else if (preferences.indexOf('marketing') === -1 && cookieExists(GOOGLE_CONSENT_MODE_AD_PREFS)) {
          if (googleConsentAdPrefs === true) {
            createCookie(GOOGLE_CONSENT_MODE_AD_PREFS, encodeURIComponent(false), {
              expires: daysToUTC(365),
              path: '/',
            })
            gtag('consent', 'update', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            })
          }
        }
      } else {
        if (cookieExists(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE)) {
          if (googleConsentAnalyticsStorage === true) {
            createCookie(GOOGLE_CONSENT_MODE_ANALYTICS_STORAGE, '', {
              expires: daysToUTC(-365),
              path: '/',
            })
            gtag('consent', 'update', {
              analytics_storage: 'denied',
            })
          }
        }
        if (cookieExists(GOOGLE_CONSENT_MODE_AD_PREFS)) {
          if (googleConsentAdPrefs === true) {
            createCookie(GOOGLE_CONSENT_MODE_AD_PREFS, '', {
              expires: daysToUTC(-365),
              path: '/',
            })
            gtag('consent', 'update', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            })
          }
        }
      }
    } catch (error) {
      console.warn('CookieNoticePro: Error initializing Google Consent Mode. Ensure gtag.js is correctly installed:', error)
    }
  }

  const changeRootVariables = () => {
    $(':root').css('--cookieNoticeProLight', config.themeSettings.lightColor)
    $(':root').css('--cookieNoticeProDark', config.themeSettings.darkColor)
  }

  return (window.cookieNoticePro = {
    init: (config) => {
      $.fn.cookieNoticePro(config)
    },
    /**
     * Reopens the cookie notice banner
     */
    reinit: () => {
      $.fn.cookieNoticePro('open')
    },

    /**
     * Returns true if consent is given else false
     */
    isAccepted: () => {
      let consent = accessCookie(COOKIE_CONSENT)
      return JSON.parse(consent)
    },

    /**
     * Returns the value of the cookieConsentPrefs cookie
     */
    getPreferences: () => {
      let preferences = accessCookie(COOKIE_CONSENT_PREFS)
      return JSON.parse(preferences)
    },

    /**
     * Check if a particular preference is accepted
     * @param {string} cookieName
     */
    isPreferenceAccepted: (cookieTypeValue) => {
      let consent = JSON.parse(accessCookie(COOKIE_CONSENT))
      let preferences = accessCookie(COOKIE_CONSENT_PREFS)
      preferences = JSON.parse(preferences)
      if (consent === false) {
        return false
      }
      if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
        return false
      }
      return true
    },
  })
})(jQuery)

// Inject MAILCHIMP script on Marketing cookie accept by user
const injectScripts = function injectScripts(){

	if (cookieNoticePro.isPreferenceAccepted("marketing") === true) {

		var GTMscript = document.createElement('script');

    const scriptId = "mcjs";
    // Check if the script is already loaded
    const scriptExists = document.querySelector(`head script#${scriptId}`) !== null;

    if (!scriptExists) {
        GTMscript.setAttribute('id','mcjs');
        GTMscript.innerHTML = '!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/cce61024264528dbcaf2fbe21/60b769ae253e61d9b0c11450c.js");'    
        document.head.appendChild(GTMscript);
    } else {
        console.log("The script is already loaded.");
    }

		
		
	}
}