//Llaves de encriptacion
/**
 * La letra "e" es convertida para "enter"
 * La letra "i" es convertida para "imes"
 * La letra "a" es convertida para "ai"
 * La letra "o" es convertida para "ober"
 * La letra "u" es convertida para "ufat" 
 */

/* Obtenemos el texto del input textarea */
const text = document.getElementById('txt__encriptar');
const btn__encriptar = document.getElementById('btn__encriptar');
const btn__desencriptar = document.getElementById('btn__desencriptar');
const content__default = document.getElementById('content__defecto');
const btn__copiar = document.getElementById('btn__copiar');
const bg__result = document.getElementById('resultado');
const result = document.getElementById('result__text');
const warning = document.getElementById('warning');

//Expresion regular para validar que el texto solo contenga letras minúsculas y sin acentos españoles
//regex que no permita caracteres especiales, numeros y mayusculas
const regex = /^[a-z\s]*$/;
//Default Text
const textDefaultWarning = `<i class="fas fa-exclamation-circle"></i> Solo letras minúsculas y sin acentos`;

// funcion de encriptar text utilizado las llaves de encriptacion
const encriptar = (text) => {
    let newText = text.replace(/e/g, 'enter');
    newText = newText.replace(/i/g, 'imes');
    newText = newText.replace(/a/g, 'ai');
    newText = newText.replace(/o/g, 'ober');
    newText = newText.replace(/u/g, 'ufat');
    return newText;
}

// funcion de desencriptar text utilizado las llaves de encriptacion
const desencriptar = (text) => {
    let newText = text.replace(/enter/g, 'e');
    newText = newText.replace(/imes/g, 'i');
    newText = newText.replace(/ai/g, 'a');
    newText = newText.replace(/ober/g, 'o');
    newText = newText.replace(/ufat/g, 'u');
    return newText;
}

//funcion de copiar
const copiar = () => {
    let copyText = document.getElementById('result__text').innerText;
    navigator.clipboard.writeText(copyText);
    success("Texto copiado correctamente al portapapeles");
    setTimeout(() => {
        warning.innerHTML = textDefaultWarning;
    }, 5000);
}

/* Evento de click en el boton de encriptar */
btn__encriptar.addEventListener('click', () => {
    if(!regex.test(text.value)){
        warning.innerHTML = textDefaultWarning;
        warning.style.color = 'red';
    }else{
        //verificar si el warning esta en rojo
        if(warning.style.color === 'red'){
            warning.style.color = 'black';
        }
        const newText = encriptar(text.value);
        hide_show(content__default, bg__result, result__text, newText);
        text.value = "";
        success("Texto encriptado correctamente");
    }
});

/* Evento de click en el boton de desencriptar */
btn__desencriptar.addEventListener('click', () => {
    if(!regex.test(text.value)) {
        warning.innerHTML = textDefaultWarning;
        warning.style.color = 'red';
    }else{
        //verificar si el warning esta en rojo
        if(warning.style.color === 'red'){
            warning.style.color = 'black';
        }
        const newText = desencriptar(text.value);
        result__text.innerHTML = newText;
        success("Texto desencriptado correctamente");
    }
});

// Evento de click en el boton de copiar 
btn__copiar.addEventListener('click', () => {
    copiar();
    //pegar la informacion de resultado en el text
    text.value = result__text.innerText;
});

//Transiciones de ocultar y mostrar elementos
const hide_show = (element_hide, element_show, element_show_text, newText) => {
    //ocultamos el primer elemento
    element_hide.style.opacity = 0;
    element_hide.style.transform = 'translateX(-5%)';
    setTimeout(() => {
        element_hide.style.display = 'none';
    }, 200);
    element_hide.style.transition = 'all 0.2s ease-in-out';
    /* mostramos el segundo elemento */
    setTimeout(() => {
        element_show_text.innerHTML = newText;
        element_show.style.opacity = 1;
        element_show.style.transform = 'translateX(0%)';
        element_show.style.transition = 'all 0.2s ease-in-out';
    }, 400);
}

//Eventos warning
const success = (texto) => {
    warning.innerHTML = `<i class="fas fa-check-circle"></i> ${texto}`;
    warning.style.color = 'green';
    //ocultamos el warning despues de 3 segundos
    setTimeout(() => {
        warning.innerHTML = textDefaultWarning;
        warning.style.color = 'black';
    }, 3000);
}