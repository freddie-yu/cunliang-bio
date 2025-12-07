/**
 * Utility functions for handling static asset paths with proper base URL support
 * This ensures compatibility with GitHub Pages deployment where the base path includes the repository name
 */

/**
 * Get the base URL for static assets
 */
export const getBaseUrl = (): string => {
  return import.meta.env.BASE_URL || '/';
};

/**
 * Construct a full asset path by combining base URL with asset path
 * @param path - The asset path (e.g., "terminal.png", "about.png")
 * @returns Full asset URL with base path
 */
export const getAssetUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine base URL with path, ensuring no double slashes
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};

/**
 * Get specific asset URLs for common images
 */
export const assetUrls = {
  terminal: getAssetUrl('terminal.png'),
  projects: getAssetUrl('projects.png'),
  about: getAssetUrl('about.png'),
  mail: getAssetUrl('mail.png'),
  folders: getAssetUrl('folders.png'),
  preferences: getAssetUrl('preferences.png'),
  appleLogo: getAssetUrl('apple-logo.png'),
  favicon: getAssetUrl('favicon.ico'),
  androidChrome192: getAssetUrl('android-chrome-192x192.png'),
  androidChrome512: getAssetUrl('android-chrome-512x512.png'),
  appleTouchIcon: getAssetUrl('apple-touch-icon.png'),
  favicon16: getAssetUrl('favicon-16x16.png'),
  favicon32: getAssetUrl('favicon-32x32.png'),
};

export default {
  getBaseUrl,
  getAssetUrl,
  assetUrls,
};