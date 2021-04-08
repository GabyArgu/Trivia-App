// seleccionando todos los elementos requeridos
const japan_btn = document.querySelector(".japan_btn");
const china_btn = document.querySelector(".china_btn");
const korea_btn = document.querySelector(".korea_btn");
const info_box = document.querySelector(".info_box");
const name_box = document.querySelector(".name_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const beginning = document.getElementById("beginning");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const name = document.querySelector("input");
let cout = 0;

// si se hace clic en el botón startQuiz
japan_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // mostrar cuadro de información
    cout = 0;
}

china_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // mostrar cuadro de información
    cout = 1;
}

korea_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // mostrar cuadro de información
    cout = 2;
}

// si se hace clic en el botón exitQuiz
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // ocultar cuadro de información
}

// si se hace clic en el botón continueQuiz
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // ocultar cuadro de información
    name_box.classList.add("activeName"); // mostrar cuadro de prueba
    beginning.setAttribute("type", "button");
}

beginning.onclick = ()=>{
    if (name.value === "") {
        
    }else{
    name_box.classList.remove("activeName"); // ocultar cuadro de información
    quiz_box.classList.add("activeQuiz"); // mostrar cuadro de prueba
    showQuetions(0); // llamando a la función showQestions
    queCounter(1); // pasando 1 parámetro a queCounter
    startTimer(15); // llamando a la función startTimer
    startTimerLine(0); // llamando a la función startTimerLine
    }
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// si se hace clic en el botón restartQuiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // mostrar cuadro de prueba
    result_box.classList.remove("activeResult"); // ocultar el cuadro de resultados
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // llamando a la función showQestions
    queCounter(que_numb); // pasando el valor de que_numb a queCounter
    clearInterval(counter); //limpiar el contenedor
    clearInterval(counterLine); //limpiar counterLine
    startTimer(timeValue); // llamando a la función startTimer
    startTimerLine(widthValue); // llamando a la función startTimerLine
    timeText.textContent = "Time Left"; // cambia el texto de timeText a Time Left
    next_btn.classList.remove("show"); // ocultar el siguiente botón
}

// si se hace clic en el botón quitQuiz
quit_quiz.onclick = ()=>{
    window.location.reload(); // recarga la ventana actual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// si se hace clic en el botón Next Que
next_btn.onclick = ()=>{
    if(que_count < questions[cout].length - 1){ // si el recuento de preguntas es menor que la longitud total de la pregunta
        que_count++; // incrementa el valor de que_count
        que_numb++; // incrementa el valor de que_numb
        showQuetions(que_count); // llamando a la función showQestions
        queCounter(que_numb); // pasando el valor de que_numb a queCounter
        clearInterval(counter); //limpiar el contenedor
        clearInterval(counterLine); //limpiar counterLine
        startTimer(timeValue); // llamando a la función startTimer
        startTimerLine(widthValue); // llamando a la función startTimerLine
        timeText.textContent = "Tiempo "; // cambia el timeText a Time Left
        next_btn.classList.remove("show"); // ocultar el siguiente botón
    }else{
        clearInterval(counter); //limpiar el contenedor
        clearInterval(counterLine); //limpiar counterLine
        showResult(); // llamando a la función showResult
    }
}

// obteniendo preguntas y opciones de la matriz
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // creando una nueva etiqueta span y div para la pregunta y la opción y pasando el valor usando el índice de matriz
    let que_tag = '<span>'+ questions[cout][index].numb + ". " + questions[cout][index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[cout][index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[cout][index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[cout][index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[cout][index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // agregando una nueva etiqueta span dentro de que_tag
    option_list.innerHTML = option_tag; // agregando una nueva etiqueta div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // establece el atributo onclick en todas las opciones disponibles
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creando las nuevas etiquetas div que para los iconos
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Si la usuario hace clic en la opción
function optionSelected(answer){
    clearInterval(counter); //limpiar el contenedor
    clearInterval(counterLine); //limpiar counterLine
    let userAns = answer.textContent; // obteniendo la opción seleccionada por el usuario
    let correcAns = questions[cout][que_count].answer; // obteniendo la respuesta correcta de la matriz
    const allOptions = option_list.children.length; // obteniendo todos los elementos opcionales
    
    if(userAns == correcAns){ // si la opción seleccionada por el usuario es igual a la respuesta correcta de la matriz
        userScore += 1; // mejorar el valor de la puntuación con 1
        answer.classList.add("correct"); // agregando color verde para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); // agregando el icono de marca para corregir la opción seleccionada
    }else{
        answer.classList.add("incorrect"); // agregando color rojo para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); // agregando el icono de cruz para corregir la opción seleccionada

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // si hay una opción que coincide con una respuesta de matriz 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // una vez que el usuario selecciona una opción y luego deshabilita todas las opciones
    }
    next_btn.classList.add("show"); // muestra el siguiente botón si el usuario seleccionó alguna opción
}

function showResult(){
    info_box.classList.remove("activeInfo"); // ocultar cuadro de información
    quiz_box.classList.remove("activeQuiz"); // ocultar cuadro de prueba
    result_box.classList.add("activeResult"); // muestra el cuadro de resultados
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // si el usuario obtuvo más de 3
        // crear una nueva etiqueta de intervalo y pasar el número de puntuación del usuario y el número total de preguntas
        let scoreTag = '<span>¡Felicidades <p>' + name.value + '</p>! 🎉, obtuviste <p>'+ userScore +'</p> puntos de <p>'+ questions[cout].length +'</p></span>';
        scoreText.innerHTML = scoreTag;  // agregando una nueva etiqueta span dentro de score_Text
    }
    else if(userScore > 1){ // si el usuario puntuó más de 1
        let scoreTag = '<span> Muy bien <p>' + name.value + '</p> 😎, obtuviste <p>'+ userScore +'</p> puntos de <p>'+ questions[cout].length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // si el usuario obtuvo menos de 1
        let scoreTag = '<span> Lo lamento <p>' + name.value + '</p> 😐, obtuviste <p>'+ userScore +'</p> puntos de <p>'+ questions[cout].length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // cambiando el valor de timeCount con el valor de tiempo
        time--; // decrementa el valor del tiempo
        if(time < 9){ // si el temporizador es menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; // agrega un 0 antes del valor de tiempo
        }
        if(time < 0){ // si el temporizador es menor que 0
            clearInterval(counter); //limpiar contador
            timeText.textContent = "Finalizado"; // cambia el texto de la hora a tiempo libre
            const allOptions = option_list.children.length; // obteniendo todos los elementos opcionales
            let correcAns = questions[cout][que_count].answer; // obteniendo la respuesta correcta de la matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ // si hay una opción que coincide con una respuesta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); // agregando color verde a la opción combinada
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // agregando el ícono de marca a la opción correspondiente
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // una vez que el usuario selecciona una opción y luego deshabilita todas las opciones
            }
            next_btn.classList.add("show"); // muestra el siguiente botón si el usuario seleccionó alguna opción
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; // actualizando el valor de tiempo con 1
        time_line.style.width = time + "px"; // aumentando el ancho de time_line con px por valor de tiempo
        if(time > 549){ // si el valor de tiempo es mayor que 549
            clearInterval(counterLine); //limpiar counterLine
        }
    }
}

function queCounter(index){
   // creando una nueva etiqueta de intervalo y pasando el número de pregunta y la pregunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions[cout].length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // agregando una nueva etiqueta span dentro de bottom_ques_counter
}

