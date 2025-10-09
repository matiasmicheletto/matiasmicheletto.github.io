const mailingApp = firebase.initializeApp({
    apiKey: "AIzaSyAzPXh2y3txdmjnuX695g_l1uNCutdMaMU",
    authDomain: "sendevo-mailing.firebaseapp.com",
    databaseURL: "https://sendevo-mailing-default-rtdb.firebaseio.com",
    projectId: "sendevo-mailing",
    storageBucket: "sendevo-mailing.appspot.com",
    messagingSenderId: "602162181087",
    appId: "1:602162181087:web:ac3f237c8243765e83ca6a"
});

function submitMessage(){    
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;
    console.log("Submitting message:", message, "from email:", email);
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = email && email.trim() !== "" && emailRegex.test(email.trim());
    
    if(isValidEmail){
        try{
            const db = mailingApp.database().ref("book_messages");
            const newEmailRef = db.push();
            newEmailRef.set({
                email: email,
                message: message,
                read: false,
                date: new Date().toISOString()
            }).then(() => {
                showToast("Gracias por contactarme!", "success");
                document.getElementById("emailInput").value = "";
            }).catch((error) => {
                showToast("Error al enviar el mensaje. Intenta nuevamente.", "error");
                console.error("Error adding email: ", error);
            });
        } catch (error) {
            showToast("Error al enviar el mensaje. Intenta nuevamente.", "error");
            console.error("Error adding email: ", error);
        }
    } else {
        showToast("Por favor ingresa un correo válido.", "warning");
    }
};