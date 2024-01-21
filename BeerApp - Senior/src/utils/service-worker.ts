// more information on https://developer.chrome.com/docs/workbox/modules/workbox-window
export async function registerServiceWorker() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const { Workbox } = await import('workbox-window');

    const wb = new Workbox('/service-worker.js');

    wb.addEventListener('activated', event => {
      if (!event.isUpdate) {
        console.log('Service worker activated for the first time!');
      }
    });

    wb.register();
  }
}
