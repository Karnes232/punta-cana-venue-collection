import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  onFirstConsent: function () {
    console.log('onFirstAction fired');
  },

  onConsent: function ({ cookie }) {
    console.log('onConsent fired ...');
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log('onChange fired ...');
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
  },

  language: {
    default: 'en',

    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly. <a href="/privacy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          //closeIconLabel: 'Close',
          footer: `
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          `,
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/privacy" class="cc__link">privacy policy</a>.',
            },
            {
              title: 'Strictly necessary cookies',
              description: 'Description',
              linkedCategory: 'necessary',
            },
            {
              title: 'Performance and Analytics cookies',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Service',
                  description: 'Description',
                  expiration: 'Expiration',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'Google Analytics',
                    description:
                      'Cookie set by <a href="#das">Google Analytics</a>.',
                    expiration: 'Expires after 12 days',
                  },
                  {
                    name: '_gid',
                    domain: 'Google Analytics',
                    description:
                      'Cookie set by <a href="#das">Google Analytics</a>',
                    expiration: 'Session',
                  },
                ],
              },
            },
            {
              title: 'More information',
              description:
                'For any queries in relation to my policy on cookies and your choices, please <a class="cc__link" href="/contact">contact me</a>.',
            },
          ],
        },
      },
      es: {
        consentModal: {
          title: "Hola viajero, es hora de las cookies!",
          description:
            'Nuestro sitio web utiliza cookies de seguimiento para entender cómo interactúa con él. El seguimiento se habilitará solo si acepta explícitamente. <a href="/privacy" data-cc="show-preferencesModal" class="cc__link">Gestionar preferencias</a>',
          acceptAllBtn: 'Aceptar todos',
          acceptNecessaryBtn: 'Rechazar todos',
          showPreferencesBtn: 'Gestionar preferencias',
          footer: `
            <a href="/privacy">Política de privacidad</a>
            <a href="/terms">Términos de servicio</a>
            <a href="/contact">Contacto</a>
            `,
        },
        preferencesModal: {
            title: 'Preferencias de cookies',
            acceptAllBtn: 'Aceptar todos',
            acceptNecessaryBtn: 'Rechazar todos',
            savePreferencesBtn: 'Guardar preferencias',
            closeIconLabel: 'Cerrar',
            sections: [
                {
                    title: 'Uso de cookies',
                    description: 'Utilizo cookies para garantizar las funcionalidades básicas del sitio web y mejorar tu experiencia en línea. Puedes elegir para cada categoría optar por aceptar/rechazar en cualquier momento. Para más detalles sobre las cookies y otros datos sensibles, por favor lee la <a href="/privacy" class="cc__link">política de privacidad</a>.',
                },
                {
                    title: 'Cookies estrictamente necesarias',
                    description: 'Descripción',
                    linkedCategory: 'necessary',
                },
                
                {
                    title: 'Cookies de rendimiento y análisis',
                    linkedCategory: 'analytics',
                },
                
                {
                    title: 'Más información',
                    description: 'Para cualquier consulta sobre mi política de cookies y tus opciones, por favor <a class="cc__link" href="/contact">contacta conmigo</a>.',
                },      
            ],
            
            
        },  
      },
    },
  },
};

export default pluginConfig;
