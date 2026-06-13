// ==========================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================

const barraProgreso = document.getElementById("progress-bar");
const avatarPersonaje = document.querySelector(".character-avatar");
const textoPregunta = document.getElementById("question-text");
const contenedorOpciones = document.getElementById("options-container");

let respuestasUsuario = {};
let preguntaActual = 0;

// === TUS 20 PREGUNTAS CON SUS PROPIOS EMOJIS ===
const preguntas = [
    {
        id: "p1",
        pregunta: "1. ¿Consideras que en el colegio se promueve un ambiente de respeto y Cultura de Paz?",
        opciones: ["Sí, siempre", "A veces", "Casi nunca", "No, para nada"],
        emoji: "🕊️" // Paloma de la paz
    },
    {
        id: "p2",
        pregunta: "2. ¿Has presenciado o recibido alguna charla sobre prevención de la violencia escolar este año?",
        opciones: ["Sí", "No", "No recuerdo"],
        emoji: "📢" // Megáfono de anuncios/charlas
    },
    {
        id: "p3",
        pregunta: "3. ¿Te sientes seguro/a en los entornos comunes del establecimiento (patios, pasillos, baños)?",
        opciones: ["Totalmente seguro", "Algo seguro", "Inseguro", "Muy insecure"],
        emoji: "🛡️" // Escudo de seguridad
    },
    {
        id: "p4",
        pregunta: "4. ¿Consideras que el acoso escolar (bullying) es un problema frecuente entre los estudiantes?",
        opciones: ["Sí, mucho", "Moderado", "Poco", "No, no existe"],
        emoji: "😟" // Carita de preocupación
    },
    {
        id: "p5",
        pregunta: "5. ¿Conoces los canales o a qué autoridad acudir si sufres o eres testigo de un acto de violencia?",
        opciones: ["Sí, perfectamente", "Tengo una idea", "No, no sé a quién acudir"],
        emoji: "🔍" // Lupa de buscar ayuda/información
    },
    {
        id: "p6",
        pregunta: "6. ¿Cómo calificas la comunicación entre los profesores y los alumnos ante un conflicto?",
        opciones: ["Excelente", "Buena", "Regular", "Mala"],
        emoji: "🗣️" // Dos personas hablando
    },
    {
        id: "p7",
        pregunta: "7. ¿Crees que las redes sociales influyen en el aumento de malentendidos o violencia en el entorno escolar?",
        opciones: ["Sí, influyen mucho", "A veces influyen", "No influyen para nada"],
        emoji: "📱" // Teléfono celular / Redes sociales
    },
    {
        id: "p8",
        pregunta: "8. ¿En tu salón de clases se practican valores como la empatía, la tolerancia y el compañerismo?",
        opciones: ["Siempre", "Frecuentemente", "Raras veces", "Nunca"],
        emoji: "🤝" // Apretón de manos / Compañerismo
    },
    {
        id: "p9",
        pregunta: "9. ¿Has visto situaciones de exclusión social (ignorar o apartar a alguien) en tu grado?",
        opciones: ["Seguido", "Pocas veces", "Nunca lo he visto"],
        emoji: "💔" // Corazón roto por la exclusión
    },
    {
        id: "p10",
        pregunta: "10. ¿Consideras que las sanciones del colegio ante conductas violentas son justas y formativas?",
        opciones: ["Sí", "Deberían mejorar", "No son justas", "No conozco las sanciones"],
        emoji: "⚖️" // Balanza de la justicia/reglamentos
    },
    {
        id: "p11",
        pregunta: "11. ¿Te han enseñado estrategias para resolver conflictos pacíficamente mediante el diálogo?",
        opciones: ["Sí, muchas veces", "Una o dos veces", "Nunca"],
        emoji: "💡" // Idea / Estrategia
    },
    {
        id: "p12",
        pregunta: "12. ¿Crees que el estrés académico o la presión escolar genera conductas agresivas en los jóvenes?",
        opciones: ["Totalmente de acuerdo", "En parte", "En desacuerdo"],
        emoji: "🤯" // Cabeza explotando por estrés académico
    },
    {
        id: "p13",
        pregunta: "13. ¿Participas activamente en actividades de integración, deportes o talleres organizados por el plantel?",
        opciones: ["Sí, en la mayoría", "Solo si es obligatorio", "No participo"],
        emoji: "⚽" // Pelota de fútbol / Actividades de integración
    },
    {
        id: "p14",
        pregunta: "14. ¿Consideras que la opinión y los sentimientos de los estudiantes son tomados en cuenta por la dirección?",
        opciones: ["Siempre", "A veces", "Casi nunca"],
        emoji: "📝" // Nota / Buzón de sugerencias opiniones
    },
    {
        id: "p15",
        pregunta: "15. ¿Has escuchado insultos, apodos ofensivos o burlas en los pasillos de forma recurrente?",
        opciones: ["A diario", "Ocasionalmente", "Casi nunca o nunca"],
        emoji: "🤫" // Silencio / Secretos ofensivos
    },
    {
        id: "p16",
        pregunta: "16. ¿Crees que las familias de los estudiantes se involucran lo suficiente en fomentar la no violencia?",
        opciones: ["Sí, se involucran", "Falta apoyo de los padres", "No se involucran nada"],
        emoji: "🏡" // Casa / Entorno familiar
    },
    {
        id: "p17",
        pregunta: "17. ¿Te sentirías cómodo/a participando en un comité estudiantil dedicado a la mediación de conflictos?",
        opciones: ["Sí, me gustaría", "Tal vez", "No me llama la atención"],
        emoji: "🙋‍♂️" // Persona levantando la mano para participar
    },
    {
        id: "p18",
        pregunta: "18. ¿Qué tipo de violencia consideras que es la más común u oculta en el colegio?",
        opciones: ["Verbal (insultos)", "Psicológica (exclusión)", "Física (empujones)", "Cibernética"],
        emoji: "👀" // Ojos observando lo oculto
    },
    {
        id: "p19",
        pregunta: "19. ¿Consideras que las campañas visuales (afiches, murales) ayudan a concientizar sobre la Cultura de Paz?",
        opciones: ["Sí, ayudan bastante", "Tienen poco impacto", "No sirven para nada"],
        emoji: "🎨" // Paleta de pintor / Murales y afiches visuales
    },
    {
        id: "p20",
        pregunta: "20. ¿Estás dispuesto/a a comprometerte activamente para mantener un entorno escolar libre de violencia?",
        opciones: ["Sí, acepto el reto 🕊️", "Lo intentaré", "No me interesa"],
        emoji: "✨" // Destellos de compromiso final
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
    
    // === EL CAMBIO CLAVE: El avatar toma el emoji de la pregunta actual ===
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
    
    // Al terminar con éxito, el personaje se vuelve un trofeo de victoria
    avatarPersonaje.innerText = "🏆"; 
    
    textoPregunta.innerHTML = `
        <strong>¡MISIÓN COMPLETADA! 🏆 HEROÍNA/HÉROE DEL CAMBIO</strong><br><br>
        Guardando tus elecciones en la base de datos... Por favor espera un momento. ⏳
    `;
    
    contenedorOpciones.innerHTML = ""; 

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