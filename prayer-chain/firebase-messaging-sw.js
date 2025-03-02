importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_5MWAYSC-7nYHzWzcC99rP9xOb85-cvs",
    authDomain: "fsbc-rushville.firebaseapp.com",
    databaseURL: "https://fsbc-rushville-default-rtdb.firebaseio.com",
    projectId: "fsbc-rushville",
    storageBucket: "fsbc-rushville.firebasestorage.app",
    messagingSenderId: "363958219468",
    appId: "1:363958219468:web:63f4f4be8e7e827d4c4869",
    measurementId: "G-JEHC1TWY12"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Extract notification data
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',  // Optionally add a notification icon
        badge: '/firebase-badge.png', // Optionally add a notification badge
    };

    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();  // Close the notification
    // Handle the click event, e.g., open a URL or navigate
    event.waitUntil(
        clients.openWindow('https://david-jockisch.github.io/Bible/FSBC/prayer-chain/prayer')  // Adjust URL to where you want users to go
    );
});
