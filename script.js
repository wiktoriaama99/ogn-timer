const locations = [
    "Teleporter",
    "Mały Wulkan",
    "Duży Wulkan",
    "Plac"
];

const app = document.getElementById("app");
const sectionTemplate = document.getElementById("sectionTemplate");
const channelTemplate = document.getElementById("channelTemplate");
const nextLocation = document.getElementById("nextLocation");
const nextChannel = document.getElementById("nextChannel");
const nextTime = document.getElementById("nextTime");
let defaultMinutes = Number(localStorage.getItem("defaultMinutes")) || 30;

const input = document.getElementById("defaultMinutes");
input.value = defaultMinutes;

document.getElementById("saveDefault").onclick = () => {
    defaultMinutes = Number(input.value);

    if (defaultMinutes <= 0) {
        alert("Podaj poprawną liczbę minut.");
        return;
    }

    localStorage.setItem("defaultMinutes", defaultMinutes);
};

const timers = {};

locations.forEach(location => {

    const section = sectionTemplate.content.cloneNode(true);

    section.querySelector(".section-title").textContent = location;

    const channels = section.querySelector(".channels");

    for (let ch = 1; ch <= 5; ch++) {

        const card = channelTemplate.content.cloneNode(true);

        const cardElement = card.querySelector(".channel-card");

        const channelName = card.querySelector(".channel-name");
        const timerText = card.querySelector(".timer");

        const startBtn = card.querySelector(".start");
        const resetBtn = card.querySelector(".reset");

        channelName.textContent = `CH${ch}`;

        const key = `${location}-CH${ch}`;

        timers[key] = {
            end: 0,
            interval: null,
            element: timerText,
            card: cardElement
        };

        function update() {

            const left = timers[key].end - Date.now();

            if (left <= 0) {

                clearInterval(timers[key].interval);

                timers[key].interval = null;

                timerText.textContent = "RESP!";

                cardElement.classList.add("finished");

                localStorage.removeItem(key);
updateNextMetin();

                return;
            }

            const total = Math.floor(left / 1000);

            const m = Math.floor(total / 60);

            const s = total % 60;



//d
            
// Usuń stare kolory
cardElement.classList.remove("green");
cardElement.classList.remove("orange");
cardElement.classList.remove("red");

// Zmień kolor w zależności od czasu
if (total <= 60) {

    cardElement.classList.add("red");

}
else if (total <= 300) {

    cardElement.classList.add("orange");

}
else {

    cardElement.classList.add("green");

}


//d

            






            
            timerText.textContent =
                String(m).padStart(2, "0") +
                ":" +
                String(s).padStart(2, "0");


updateNextMetin();


            
        }

        startBtn.onclick = () => {

            clearInterval(timers[key].interval);

            timers[key].card.classList.remove("finished");

            timers[key].end =
                Date.now() + defaultMinutes * 60000;

            localStorage.setItem(key, timers[key].end);

            update();

            timers[key].interval = setInterval(update, 1000);
updateNextMetin();
        };

        resetBtn.onclick = () => {

            clearInterval(timers[key].interval);
//d
            cardElement.classList.remove("green");
cardElement.classList.remove("orange");
cardElement.classList.remove("red");
cardElement.classList.remove("finished");
//d


            
            timers[key].interval = null;

            timerText.textContent = "00:00";





            

            timers[key].card.classList.remove("finished");

            localStorage.removeItem(key);
updateNextMetin();
        };

        const saved = localStorage.getItem(key);

        if (saved) {

            timers[key].end = Number(saved);

            update();

            timers[key].interval = setInterval(update, 1000);
    updateNextMetin();

        }

        channels.appendChild(card);

    }

    app.appendChild(section);

});


function updateNextMetin(){

    let best = null;

    for(const key in timers){

        if(timers[key].interval === null)
            continue;

        const left = timers[key].end - Date.now();

        if(left <= 0)
            continue;

        if(best === null || left < best.left){

            const split = key.split("-CH");

            best = {
                location: split[0],
                channel: "CH" + split[1],
                left: left
            };

        }

    }

    if(best === null){

        nextLocation.textContent = "Brak aktywnych timerów";
        nextChannel.textContent = "";
        nextTime.textContent = "";

        return;

    }

    const total = Math.floor(best.left / 1000);

    const m = Math.floor(total / 60);
    const s = total % 60;

    nextLocation.textContent = "📍 " + best.location;
    nextChannel.textContent = "📺 " + best.channel;
    nextTime.textContent = "⏳ Za " +
        String(m).padStart(2,"0") +
        ":" +
        String(s).padStart(2,"0");

}
// =================== MAPA ===================

const openMapBtn = document.getElementById("openMap");
const mapModal = document.getElementById("mapModal");
const closeMapBtn = document.getElementById("closeMap");

openMapBtn.addEventListener("click", () => {
    mapModal.style.display = "flex";
});

closeMapBtn.addEventListener("click", () => {
    mapModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === mapModal) {
        mapModal.style.display = "none";
    }
});
