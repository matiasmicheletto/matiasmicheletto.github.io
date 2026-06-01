const fbApp = firebase.initializeApp({
    apiKey: "AIzaSyAzPXh2y3txdmjnuX695g_l1uNCutdMaMU",
    authDomain: "sendevo-mailing.firebaseapp.com",
    databaseURL: "https://sendevo-mailing-default-rtdb.firebaseio.com",
    projectId: "sendevo-mailing",
    storageBucket: "sendevo-mailing.appspot.com",
    messagingSenderId: "602162181087",
    appId: "1:602162181087:web:ac3f237c8243765e83ca6a"
});

const app = () => {
    const svg = document.getElementById("timelineSVG");
    svg.innerHTML = ""; // dimensions are set by makeTimeline

    // Firebase fetch
    const database = firebase.database();
    const dataRef = database.ref('events_data');
    dataRef.once('value').then(snapshot => {
        const result = snapshot.val();
        const normalized = normalizeEventsData(result && result.data ? result.data : {});

        if (normalized.quality.invalidDateKeys || normalized.quality.invalidValues) {
            console.warn("Se ignoraron registros inválidos de Firebase", normalized.quality);
        }

        makeTimeline(normalized.data);
        makeCharts(normalized.data);
        printEventsCount(normalized.data, normalized.quality);
        printLastUpdate(result.last_update);
    }).catch(error => {
        console.error("Error loading JSON data:", error);
    });

    /* // Local JSON fetch
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(result => {
            makeTimeline(result.data);
            makeCharts(result.data);  
            printEventsCount(result.data);
            printLastUpdate(result.last_update);
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
        });
    */
};

app();