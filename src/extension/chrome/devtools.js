/**
 * chrome.devtools.panels.create(title, iconPath, pagePath, callback)
 */
chrome.devtools.panels.create(
  'Accessible Theme Builder', // The name of the tab in DevTools
  './images/darkMode.png', // Path to the icon
  './../index.html', // The UI to load (Your compiled Vue app)
  function (panel) {
    console.log('Accessible Accessible Theme Builder panel created!')
  },
)
