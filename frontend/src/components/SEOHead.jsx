import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEOHead = ({ 
  title = 'VaranasiHub - Create Your Business Website in Minutes',
  description = 'Help your Varanasi business go online. Create a professional website in minutes with zero coding skills.',
  image = '/og-image.jpg',
  url,
  type = 'website',
  businessName,
  businessAddress,
  businessPhone,
  businessCategory,
}) => {
  const location = useLocation();
  const currentUrl = url || `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'VaranasiHub', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Business-specific structured data
    if (businessName) {
      let structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: businessName,
        description: description,
        url: currentUrl,
      };

      if (businessAddress) {
        structuredData.address = {
          '@type': 'PostalAddress',
          streetAddress: businessAddress,
          addressLocality: 'Varanasi',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        };
      }

      if (businessPhone) {
        structuredData.telephone = businessPhone;
      }

      if (businessCategory) {
        structuredData['@type'] = getBusinessType(businessCategory);
      }

      // Remove existing structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    } else {
      // Default organization structured data
      const defaultStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VaranasiHub',
        description: 'Platform for Varanasi businesses to create professional websites',
        url: window.location.origin,
        logo: `${window.location.origin}/logo.png`,
        sameAs: [
          'https://facebook.com/varanasihub',
          'https://instagram.com/varanasihub',
        ],
      };

      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(defaultStructuredData);
      document.head.appendChild(script);
    }
  }, [title, description, image, currentUrl, type, businessName, businessAddress, businessPhone, businessCategory]);

  return null;
};

const getBusinessType = (category) => {
  const typeMap = {
    'Restaurant': 'Restaurant',
    'Hotel': 'Hotel',
    'Clinic': 'MedicalBusiness',
    'Shop': 'Store',
    'Library': 'Library',
    'Services': 'LocalBusiness',
  };
  return typeMap[category] || 'LocalBusiness';
};

