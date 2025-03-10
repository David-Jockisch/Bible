importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Firebase config (ensure it's the same as your main app)
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/Bible/prayer-chain/')
    );
});
