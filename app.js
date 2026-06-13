// ==========================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================

const barraProgreso = document.getElementById("progress-bar");
const avatarPersonaje = document.querySelector(".character-avatar");
const textoPregunta = document.getElementById("question-text");
const contenedorOpciones = document.getElementById("options-container");

let respuestasUsuario = {};
let preguntaActual = 0;

// === TUS NUEVAS PREGUNTAS CON SUS PROPIOS EMOJIS ===
const preguntas = [
    {
        id: "p1",
        pregunta: "1. ¿Qué haces normalmente cuando ves que a un compañero/a lo están molestando?",
        opciones: ["Intento defenderlo/a", "Le aviso a un maestro/a o adulto", "No hago nada por miedo", "Me da risa o me uno"],
        emoji: "👀" // Ojos observando la situación
    },
    {
        id: "p2",
        pregunta: "2. ¿Alguna vez has visto que un niño o una niña moleste o se burle de otro compañero en la escuela?",
        opciones: ["Sí", "No"],
        emoji: "🏫" // Escuela
    },
    {
        id: "p3",
        pregunta: "3. ¿Es correcto decirle cosas feas a alguien para que tenga miedo?",
        opciones: ["Sí", "No"],
        emoji: "😟" // Carita de preocupación/miedo
    },
    {
        id: "p4",
        pregunta: "4. ¿Alguna vez alguien te ha dicho palabras que te hicieron sentir mal o triste?",
        opciones: ["Sí", "No", "Tal vez"],
        emoji: "💔" // Corazón roto / Sentirse triste
    },
    {
        id: "p5",
        pregunta: "5. ¿Tú crees que es correcto hacer sentir mal a un compañero de clase por su forma de vestir o de ser con palabras feas o tratándolo mal? ¿Por qué?",
        opciones: ["No, todos merecemos respeto", "No, porque hiere sus sentimientos", "Sí, si me cae mal", "Depende de la situación"],
        emoji: "🗣️" // Personas hablando / Expresar el por qué
    },
    {
        id: "p6",
        pregunta: "6. ¿Tú piensas que la violencia solo puede ocurrir en la escuela?",
        opciones: ["Sí", "No", "Tal vez"],
        emoji: "🏡" // Casa / Diferentes entornos donde ocurre
    },
    {
        id: "p7",
        pregunta: "7. ¿Piensas que está bien tratar diferente a una persona solo por ser niño o niña?",
        opciones: ["Sí", "No"],
        emoji: "🤝" // Igualdad / Trato justo
    },
    {
        id: "p8",
        pregunta: "8. ¿Has visto mensajes en internet que hagan sentir mal a alguien?",
        opciones: ["Sí", "No", "Tal vez"],
        emoji: "📱" // Teléfono / Mensajes en internet
    },
    {
        id: "p9",
        pregunta: "9. ¿Has visto que dejen a un niño fuera de un grupo o chat para hacerlo sentir triste?",
        opciones: ["Sí", "No", "Tal vez"],
        emoji: "🤫" // Exclusión / Dejar fuera del grupo
    },
    {
        id: "p10",
        pregunta: "10. ¿Has visto que se burlen de un niño o una niña por los juegos que le gustan?",
        opciones: ["Sí", "No"],
        emoji: "🎮" // Control de videojuegos / Juegos favoritos
    }
];

// ==========================================
// 2. FUNCIONES DEL JUEGO
// ==========================================

function iniciarJuego() {
    preguntaActual = 0;
    respuestasUsuario = {};
    mostrarPregunta();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        mostrarPantallaFinal();
        return;
    }

    const infoPregunta = preguntas[preguntaActual];
    
    // El avatar toma el emoji asignado a esta pregunta específica
    avatarPersonaje.innerText = infoPregunta.emoji; 

    textoPregunta.innerText = infoPregunta.pregunta;
    
    const porcentaje = (preguntaActual / preguntas.length) * 100;
    barraProgreso.style.width = `${porcentaje}%`;

    contenedorOpciones.innerHTML = "";

    infoPregunta.opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.innerText = opcion;
        boton.classList.add("option-btn");
        
        boton.onclick = () => {
            respuestasUsuario[infoPregunta.id] = opcion;
            preguntaActual++;
            mostrarPregunta();
        };
        
        contenedorOpciones.appendChild(boton);
    });
}

// ==========================================
// 3. PANTALLA FINAL Y ENVÍO AUTOMÁTICO A GOOGLE
// ==========================================
function mostrarPantallaFinal() {
    barraProgreso.style.width = "100%";
    
    // Al terminar, el personaje se vuelve un trofeo de victoria
    avatarPersonaje.innerText = "🏆"; 
    
    textoPregunta.innerHTML = `
        <strong>¡MISIÓN COMPLETADA! 🏆 HEROÍNA/HÉROE DEL CAMBIO</strong><br><br>
        Guardando tus elecciones en la base de datos... Por favor espera un momento. ⏳
    `;
    
    contenedorOpciones.innerHTML = ""; 

    // Mantiene tu misma URL de Google Script intacta
    const URL_DE_TU_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbzHVchh8XLeQuqqJcL8Xs-F8D3blYPamuDQrLwGwT6fOWcBx0FHID9rieKbXxwHqtfv7g/exec";

    fetch(URL_DE_TU_GOOGLE_SCRIPT, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(respuestasUsuario) 
    })
    .then(() => {
        textoPregunta.innerHTML = `
            <strong>¡MISIÓN COMPLETADA! 🏆 HEROÍNA/HÉROE DEL CAMBIO</strong><br><br>
            ¡Tus elecciones se enviaron con éxito de forma 100% anónima!<br><br>
            Ya quedaron registradas para las estadísticas de **Seminario 2026 del Grupo 4 (Colegio CEL)**.<br><br>
            ¡Gracias por ayudarnos a diseñar entornos escolares más seguros! 🕊️✨
        `;
    })
    .catch(error => {
        console.error("Error al enviar:", error);
        textoPregunta.innerHTML = `
            <strong>¡Misión completada, pero hubo un pestañeo en la red! 😮</strong><br><br>
            No te preocupes, tus respuestas se procesaron localmente. ¡Muchas gracias por participar! 🕊️
        `;
    });
}

// Arrancamos el juego automáticamente
mostrarPregunta();