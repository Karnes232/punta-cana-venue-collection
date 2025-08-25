'use client'
import React, { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import pluginConfig from './CookieConsentConfig';
import "vanilla-cookieconsent/dist/cookieconsent.css";

interface CookieConsentComponentProps {
  locale: string;
}

const CookieConsentComponent = ({ locale }: CookieConsentComponentProps) => {
  useEffect(() => {
    // Create a new config with the current locale
    const configWithLocale = {
      ...pluginConfig,
      language: {
        ...pluginConfig.language,
        default: locale,
      }
    };
    
    // Run cookie consent with the updated config
    CookieConsent.run(configWithLocale);
  }, [locale]); // Re-run when locale changes

  const linkText = locale === 'es' ? 'Mostrar preferencias de cookies' : 'Show Cookie Preferences';

  return (
    <a href="#" onClick={CookieConsent.showPreferences}>
      {linkText}
    </a>
  );
};

export default CookieConsentComponent;
