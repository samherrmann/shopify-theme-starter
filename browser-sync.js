const browserSync = require('browser-sync');

browserSync({
  files: '.theme.update',
  proxy: process.env['THEME_PREVIEW_URL'],
  // Disable pop-over notification in browser for updates.
  notify: false,
  // By default browser-sync injects its script after the opening <body> tag.
  // This appears to conflict with scripts from Shopify. To solve this, the
  // browser-sync script is now being injected before the closing </body> tag:
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet, match) => {
        return snippet + match;
      }
    }
  },
  // The reloadDelay value was determined experimentally, ensuring that the code
  // changes were processed and deployed by Shopify by the time browser-sync
  // refreshes the browser.
  // https://github.com/Shopify/themekit/issues/688
  reloadDelay: 1500
});