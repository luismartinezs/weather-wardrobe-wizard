importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyC3DkTRkK9A49IyMSGg_RoPwoHXdttfjQA",
  authDomain: "weather-wardrobe-wizard.firebaseapp.com",
  projectId: "weather-wardrobe-wizard",
  storageBucket: "weather-wardrobe-wizard.appspot.com",
  messagingSenderId: "757546456944",
  appId: "1:757546456944:web:6852e7b369c184177061b5",
  measurementId: "G-Y0S6HCQX1K",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});