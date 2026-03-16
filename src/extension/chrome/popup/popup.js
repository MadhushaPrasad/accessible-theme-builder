document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeBtn');
    const shortcutHint = document.getElementById('shortcutHint');

    // 1. Detect OS and set the correct instruction
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const macShortcut = "Cmd + Opt + I";
    const winShortcut = "F12 or Ctrl + Shift + I";
    
    const activeShortcut = isMac ? macShortcut : winShortcut;
    
    // Update the UI text immediately
    shortcutHint.innerHTML = `Shortcut: Press ${activeShortcut}`;

    // 2. Handle Button Click
    closeBtn.addEventListener('click', () => {
        // Log the correct shortcut to the console for the user to see if they have it open
        console.log(
            "%c Theme Builder Instructions ", 
            "color: white; background: #10b981; font-weight: bold; padding: 4px; border-radius: 4px;"
        );
        console.log(`To open DevTools on your device, press: ${activeShortcut}`);
        console.log("Then, click the 'Theme Builder' tab.");

        // Small delay so they might see the console log before it closes, 
        // though window.close() is usually instant.
        setTimeout(() => {
            window.close();
        }, 100);
    });
});
