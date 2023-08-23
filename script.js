//Cambiar el color del fondo
function cambiarColor(color) {
    switch (color) {
        case 1:
            document.body.style.backgroundColor = "#0d6efd";
            break;
        case 2:
            document.body.style.backgroundColor = "#6c757d";
            break;
        case 3:
            document.body.style.backgroundColor = "#198754";
            break;
        case 4:
            document.body.style.backgroundColor = "#0dcaf0";
            break;
        case 5:
            document.body.style.backgroundColor = "#ffc107";
            break;
        case 6:
            document.body.style.backgroundColor = "#dc3545";
            break;
        case 7:
            document.body.style.backgroundColor = "#212529";
            break;
        case 8:
            document.body.style.backgroundColor = "#ffffff";
            break;
    }
}




window.onload = () => {
    /* Pomodoro */
    let workTime;
    let breakTime;
    let resTime;
    let timesCompleted; /*Cuantos tiempos completados*/
    let cyclesGoal;
    let cyclesCompleted = 0;
    function pomodoroController(){
        if(isRestTime()){
            cyclesCompleted++;
            if(!goalReached()){
                currentTime = resTime;
                timer();
                timesCompleted = 0;
            }else{
                console.log("Pomodoro finished");
            }
            return;
        }
        if(timesCompleted % 2 == 0){
            currentTime = workTime; /* Toca work */
            timesCompleted++;
            timer();
            console.log( "Time to work! TC:" + timesCompleted);
        }else{
            currentTime = breakTime; /* Toca rest */
            timesCompleted++;
            timer();
            console.log( "Time to break! TC:" + timesCompleted);
        }
    }
    function isRestTime(){
        return timesCompleted == 7;
    }
    function goalReached(){
        return cyclesGoal == cyclesCompleted;
    }

    /*Frontend Connection */
let clock = document.getElementById("clock");
let cyclesInput = document.getElementById("cycles-input");
let startButton = document.getElementById("start-button");
let workTimeInput = document.getElementById("work-time");
let breakTimeInput = document.getElementById("break-time");
let restTimeInput = document.getElementById("reset-time");
/*Button functionality */
startButton.onclick = () => {
    populateVariables();
    startPomodoro();
};
function startPomodoro(){
    console.log("started Pomodoro");
    pomodoroController();
};
function populateVariables(){
    console.log("populated variables");
    workTime = workTimeInput.value; /*Minutes*/
    breakTime = breakTimeInput.value; /*Minutes*/
    resTime = restTimeInput.value; /*Minutes*/
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
};
/* CLock */
let clockMinutes;
let clockSeconds;
function updateClock(){
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
}
function formatNumbers(time){
    let formattedDigits;
    if(time < 10){
        formattedDigits = "0" + time;
    }else{
        formattedDigits = time;
    }
    return formattedDigits;
}


    /* Timer */
    let currentTime; /*tiempo que dura cada pomodoro*/
    let seconds = 0;

    function timer(){
        if(currentTime > 0 || seconds > 0){
            if(seconds == 0){
                seconds = 59;
                currentTime--;
            }else{
                seconds--;
            }
            updateClock();
            console.log(currentTime,seconds);
            interval = setTimeout(timer, 1000);
        }else{
            clearInterval(interval); // Detener el intervalo al llegar a 0
            console.log("El temporizador terminó");
        }
    }
    let interval = setInterval(timer, 1000);

    timer();
};  
