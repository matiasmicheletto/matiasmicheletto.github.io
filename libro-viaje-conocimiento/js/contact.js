const mailingApp = firebase.initializeApp({
    apiKey: "AIzaSyAzPXh2y3txdmjnuX695g_l1uNCutdMaMU",
    authDomain: "sendevo-mailing.firebaseapp.com",
    databaseURL: "https://sendevo-mailing-default-rtdb.firebaseio.com",
    projectId: "sendevo-mailing",
    storageBucket: "sendevo-mailing.appspot.com",
    messagingSenderId: "602162181087",
    appId: "1:602162181087:web:ac3f237c8243765e83ca6a"
});

function submitEmail(){    
    const email = document.getElementById("emailInput").value;
    console.log("Submitting email:", email);
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = email && email.trim() !== "" && emailRegex.test(email.trim());
    
    if(isValidEmail){
        const db = mailingApp.database().ref("book_subscribers");
        const newEmailRef = db.push();
        newEmailRef.set({
            email: email,
            date: new Date().toISOString()
        }).then(() => {
            showToast("Gracias por suscribirte!", "success");
            document.getElementById("emailInput").value = "";
        }).catch((error) => {
            showToast("Error al suscribirte. Intenta nuevamente.", "error");
            console.error("Error adding email: ", error);
        });
    } else {
        showToast("Por favor ingresa un correo válido.", "warning");
    }
};