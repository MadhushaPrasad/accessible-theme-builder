chrome.devtools.panels.create(
  'Accessible Theme Builder', // The name of the tab in DevTools
  'images/darkMode.png', // Path to the icon
  'index.html',
  function (panel) {
    console.log('Accessible Accessible Theme Builder panel created!')
  },
)
