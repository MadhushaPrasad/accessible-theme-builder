const devtools = (typeof browser !== "undefined")
  ? browser.devtools
  : chrome.devtools;

devtools.panels.create(
  "Accessible Theme Builder",
  "images/darkMode.png",
  "index.html",
  function (panel) {
    console.log("Accessible Theme Builder panel created!");
  }
);
