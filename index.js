// Register service worker to control making site work offline
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/usa-trip-2020/sw.js', {scope: '/usa-trip-2020/'})
           .then(function(reg) { 
             console.log('Service Worker Registered');
             reg.addEventListener('updatefound', () => {
               console.log('update found!');
              // A wild service worker has appeared in reg.installing!
              newWorker = reg.installing;
      
              newWorker.addEventListener('statechange', () => {
                // Has network.state changed?
                switch (newWorker.state) {
                  case 'installed':
                    if (navigator.serviceWorker.controller) {
                      // new update available
                      showUpdateBar();
                    }
                    // No update available
                    break;
                }
              });
            });
            })
           .catch(function(err) {
             console.log('failed to register service worker');
             navigator.serviceWorker
               .register('/sw_local.js', {scope: '/'})
               .then(function() { console.log('Service Worker Registered for localhost'); })
               .catch(function(err) {
                 console.log('failed to register service worker for localhost');
               });
           });

  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

// Handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('#add-button');
addBtn.style.display = 'none';
addBtn.addEventListener('click', (e) => {
  console.log('click!')
})

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
