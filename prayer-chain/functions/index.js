const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.database();
const messaging = admin.messaging();

exports.sendPrayerNotification = functions.database.ref("/prayers/{prayerId}")
    .onCreate(async (snapshot, context) => {
        const prayerData = snapshot.val();
        
        // Construct the notification payload
        const payload = {
            notification: {
                title: "New Prayer Request",
                body: `${prayerData.name || "Anonymous"}: ${prayerData.message}`,
                click_action: "https://david-jockisch.github.io/Bible/FSBC/prayer-chain/prayer" // Change if needed
            }
        };

        try {
            // Get all registered FCM tokens
            const tokensSnapshot = await db.ref("/fcmTokens").once("value");
            const tokens = tokensSnapshot.val();

            if (tokens) {
                const tokenList = Object.values(tokens);
                await messaging.sendToDevice(tokenList, payload);
                console.log("Notification sent to devices:", tokenList);
            }
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    });
