import { CountryInfo } from '../types';
import { POPULAR_COUNTRIES } from '../data/mockTips';

/**
 * Detect country by timezone
 */
export function detectCountryByTimezone(): CountryInfo {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    if (tz.includes('Dar_es_Salaam') || tz.includes('Tanzania')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'TZ') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Nairobi') || tz.includes('Kenya')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'KE') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Kampala') || tz.includes('Uganda')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'UG') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Kigali') || tz.includes('Rwanda')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'RW') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Bujumbura') || tz.includes('Burundi')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'BI') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Johannesburg') || tz.includes('South_Africa')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'ZA') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Lagos') || tz.includes('Nigeria')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'NG') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('Accra') || tz.includes('Ghana')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'GH') || POPULAR_COUNTRIES[0];
    }
    if (tz.includes('London') || tz.includes('Europe/London') || tz.includes('GB')) {
      return POPULAR_COUNTRIES.find(c => c.code === 'GB') || POPULAR_COUNTRIES[0];
    }
  } catch (error) {
    console.error('Error detecting timezone', error);
  }
  
  // Default fallback
  return POPULAR_COUNTRIES[0]; // Tanzania
}

/**
 * Query external API for geolocation with timeout fallback
 */
export async function fetchGeoCountry(): Promise<CountryInfo | null> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 2500); // 2.5s and out

  try {
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(id);
    if (response.ok) {
      const data = await response.json();
      const countryCode = data.country_code; // e.g. "TZ", "KE", "UG"
      if (countryCode) {
        const found = POPULAR_COUNTRIES.find(c => c.code.toUpperCase() === countryCode.toUpperCase());
        if (found) return found;
      }
    }
  } catch (err) {
    console.log('Geo IP fetch bypassed or failed, using timezone.', err);
  }
  return null;
}
