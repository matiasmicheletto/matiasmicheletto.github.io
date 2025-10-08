const mailingApp = firebase.initializeApp({
    apiKey: "AIzaSyAzPXh2y3txdmjnuX695g_l1uNCutdMaMU",
    authDomain: "sendevo-mailing.firebaseapp.com",
    databaseURL: "https://sendevo-mailing-default-rtdb.firebaseio.com",
    projectId: "sendevo-mailing",
    storageBucket: "sendevo-mailing.appspot.com",
    messagingSenderId: "602162181087",
    appId: "1:602162181087:web:ac3f237c8243765e83ca6a"
});

$("#contact-form").submit(function(e) {    
    e.preventDefault();
    const formData = $(this).serializeArray();    
    if(formData.length > 0 && formData.every(el => el.value !== "")){
        const formObject = formData.reduce((a,b) => ({...a, [b.name]: b.value}), {});
        formObject.date = new Date().toISOString();
        formObject.read = false;
        
        const database = firebase.database();
        database.ref("portfolio_messages")
        .push(formObject)
        .then(res => {
            console.log({type:"success", message:"Gracias por su mensaje. Le responderemos a la brevedad"});
            //$("#contact-form")[0].reset();
            $("#name")[0].value = "";
            $("#email")[0].value = "";
            $("#subject")[0].value = "";
            $("#message")[0].value = "";
        })
        .catch(console.warn);
    }
});
