const places=[
"Teleporter",
"Mały Wulkan",
"Duży Wulkan",
"Plac"
];

const app=document.getElementById("timers");

places.forEach(place=>{

const section=document.createElement("div");
section.className="section";

section.innerHTML=`<h2>${place}</h2>`;

for(let i=1;i<=5;i++){

const timer=document.createElement("div");

timer.className="timer";

timer.innerHTML=`
<div class="channel">CH${i}</div>
<div class="time">--:--</div>
`;

timer.onclick=()=>{

const minutes=prompt("Podaj liczbę minut");

if(minutes===null)return;

alert(`Tutaj uruchomimy timer na ${minutes} minut.`);

};

section.appendChild(timer);

}

app.appendChild(section);

});
