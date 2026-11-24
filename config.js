// ✏️ EDITA SOLO ESTE ARCHIVO para personalizar la página.
// Pon tus fotos en /media/fotos, audios en /media/audios y videos en /media/videos.

window.CONFIG = {
  nombreElla: "Peteña",           // cómo la llamas
  tuNombre: "Tu coscorron de arroz",
  fechaInicio: "2026-07-12",       // desde cuándo están juntos (AAAA-MM-DD)
  fechaConocernos: "2026-02-12T22:30:00", // cuándo se conocieron (AAAA-MM-DDTHH:MM:SS)

  mensajeBienvenida:
    "Hice esta página para ti. Cuando tu cabecita te esté abrumando, aquí siempre tendrás algo para jugar, escuchar y sonreír. Te amo muchísimo. ❤️",

  // Fotos para el rompecabezas y la memoria.
  // Se llaman foto1.jpeg, foto2.jpeg ... foto45.jpeg y van en la carpeta media/fotos.
  // Si tienes otra cantidad, cambia el 45. Si tus fotos fueran .jpg, cambia "jpeg" por "jpg".
  fotos: Array.from({ length: 45 }, (_, i) => `media/fotos/foto${i + 1}.jpeg`),

  // Premios del juego de memoria (sale uno al azar cada vez que gana)
  premios: [
    "Ganaste un beso 😘",
    "Ganaste un abrazo bien fuerte 🤗",
    "Ganaste un cupón para no enojarme 🎟️ (válido una vez, úsalo con sabiduría)",
    "Ganaste que hoy tú eliges qué comemos 🍕",
    "Ganaste un masajito de espalda 💆‍♀️",
    "Ganaste una noche de películas con mantita 🎬",
    "Ganaste un helado 🍦",
    "Ganaste mil besitos de tortuga 🐢",
    "Ganaste una llamada larga conmigo 📞",
    "Ganaste un mensaje de voz de buenas noches 🌙",
    "Ganaste un día de mimos sin quejas 🥰",
    "Ganaste un \"tienes la razón\" sin discutir 😌",
    "Ganaste un paseo juntos 🌳",
    "Ganaste un abrazo de oso 🐻"
  ],

  // Mensajes de voz. Los archivos van en media/audios/ con estos nombres (mensaje1.mp3 ... mensaje10.mp3).
  // Cambia el título y la nota (la nota es opcional) por lo que quieras. Si tienes más o menos
  // audios, agrega o borra líneas.
  audios: [
    { titulo: "Buenos días, Peteña", nota: "Para empezar el día con mi voz", archivo: "media/audios/mensaje1.ogg" },
    { titulo: "Para cuando me extrañes", nota: "Dale play y cierra los ojos", archivo: "media/audios/mensaje2.ogg" },
    { titulo: "Para cuando tu cabecita no pare", nota: "Respira conmigo un ratito", archivo: "media/audios/mensaje3.ogg" },
    { titulo: "Algo que quiero que sepas", archivo: "media/audios/mensaje4.ogg" },
    { titulo: "Para cuando estés triste", archivo: "media/audios/mensaje5.ogg" },
    { titulo: "Un recuerdo nuestro", archivo: "media/audios/mensaje6.ogg" },
    { titulo: "Lo que más admiro de ti", archivo: "media/audios/mensaje7.ogg" },
    { titulo: "Para reírnos un rato", archivo: "media/audios/mensaje8.ogg" },
    { titulo: "Un secreto de tortugas", archivo: "media/audios/mensaje9.ogg" },
    { titulo: "Buenas noches, mi niña", nota: "Para dormir tranquila", archivo: "media/audios/mensaje10.ogg" }
  ],
  puzzle: {
  fotosIniciales: 3,          // fotos libres al empezar
  todasDesbloqueadas: false   // true = mostrarlas todas desde el inicio
},

   videos: [
    { titulo: "Video 1", nota: "", archivo: "media/videos/video1.mp4" },
    { titulo: "Video 2", nota: "", archivo: "media/videos/video2.mp4" },
    { titulo: "Video 3", nota: "", archivo: "media/videos/video3.mp4" },
    { titulo: "Video 4", nota: "", archivo: "media/videos/video4.mp4" },
    { titulo: "Video 5", nota: "", archivo: "media/videos/video5.mp4" },
    { titulo: "Video 6", nota: "", archivo: "media/videos/video6.mp4" },
    { titulo: "Video 7", nota: "", archivo: "media/videos/video7.mp4" },
    { titulo: "Video 8", nota: "", archivo: "media/videos/video8.mp4" },
    { titulo: "Video 9", nota: "", archivo: "media/videos/video9.mp4" },
    { titulo: "Video 10", nota: "", archivo: "media/videos/video10.mp4" },
    { titulo: "Video 11", nota: "", archivo: "media/videos/video11.mp4" },
    { titulo: "Video 12", nota: "", archivo: "media/videos/video12.mp4" },
    { titulo: "Video 13", nota: "", archivo: "media/videos/video13.mp4" },
    { titulo: "Video 14", nota: "", archivo: "media/videos/video14.mp4" },
    { titulo: "Video 15", nota: "", archivo: "media/videos/video15.mp4" },
    { titulo: "Video 16", nota: "", archivo: "media/videos/video16.mp4" },
    { titulo: "Video 17", nota: "", archivo: "media/videos/video17.mp4" },
    { titulo: "Video 18", nota: "", archivo: "media/videos/video18.mp4" },
    { titulo: "Video 19", nota: "", archivo: "media/videos/video19.mp4" }
  ],

  musica: {
    volumen: 0.35,      // volumen normal (0 a 1)
    volumenBajo: 0.08,  // volumen mientras suena un mensaje de voz
    canciones: [
      { titulo: "Nuestra canción", archivo: "media/musica/cancion1.mp3" },
      { titulo: "Otra para ti", archivo: "media/musica/cancion2.mp3" }
    ]
  },

  // Cartitas (se muestran en este orden)
  cartas: [
    { titulo: "Cuando sientas que no puedes más", texto: "Mi amor, respira un poquito. No tienes que solucionar todo hoy. Está bien sentirse cansada, está bien no saber qué hacer y está bien tomarse un descanso. No eres menos por tener días difíciles. Te amo, incluso en tus días más complicados." },
    { titulo: "No te adelantes al futuro", texto: "Mi niña, todavía no tienes que saber cómo será tu vida dentro de cinco años. No te apresures a encontrar todas las respuestas. Vive un día a la vez, que también mereces disfrutar el presente sin preocuparte tanto por lo que viene." },
    { titulo: "Cuando sientas que no eres suficiente", texto: "Quiero recordarte algo: eres suficiente, incluso cuando no consigues lo que te propones, incluso cuando cometes errores y cuando las cosas no salen como esperabas. Tu valor nunca ha dependido de tus resultados." },
    { titulo: "Cuando sientas que nadie te entiende", texto: "Tal vez no siempre encuentre las palabras correctas para entender lo que pasa por tu cabecita, pero quiero escucharte. No tienes que explicarme todo perfectamente. Puedes hablar, llorar o simplemente quedarte conmigo en silencio." },
    { titulo: "Cuando te compares con los demás", texto: "Mi amor, no estás compitiendo con nadie. Cada persona tiene su propio camino y sus propios tiempos. No permitas que los logros de otras personas te hagan sentir que estás atrasada. Tú también estás avanzando." },
    { titulo: "Cuando sientas que tu mamá no te presta suficiente atención", texto: "Sé que a veces puedes sentir que no recibes la atención que necesitas, y quiero que sepas que tus sentimientos también importan. No tienes que hacer más cosas ni demostrar nada para merecer cariño. Tú también mereces que te escuchen, te abracen y te pregunten cómo estás." },
    { titulo: "Cuando tengas miedo de decepcionar a alguien", texto: "Mi vida, no naciste para cumplir todas las expectativas de los demás. También tienes derecho a equivocarte, cambiar de opinión y elegir tu propio camino. Las personas que te quieren de verdad deben poder aceptar que eres humana." },
    { titulo: "Cuando pienses demasiado", texto: "Shhh, mi niña. Por un ratito deja de buscar respuestas a todas esas preguntas que tienes en la cabeza. Respira, relájate y recuerda que no todos los problemas necesitan una solución inmediata. Algunos pueden esperar hasta mañana." },
    { titulo: "Cuando sientas que estás sola", texto: "Aunque no siempre pueda estar físicamente a tu lado, quiero que recuerdes que tienes a alguien que piensa en ti, que se preocupa por ti y que quiere verte feliz. No tienes que cargar con todo tú solita." },
    { titulo: "Cuando tengas un día horrible", texto: "Hoy no fue un buen día, ¿verdad? Bueno, no pasa nada, mi amor. Mañana tienes otra oportunidad de empezar. Por ahora, descansa, come algo rico y recuerda que un día malo no significa una vida mala." },
    { titulo: "Cuando dudes de ti misma", texto: "Ojalá pudieras verte por un momento con mis ojos. Verías a esa chica responsable, inteligente, sensible y con tantas cosas bonitas por ofrecer. A veces eres demasiado dura contigo misma. Date un poquito del cariño que siempre das a los demás." },
    { titulo: "Cuando sientas que no avanzas", texto: "Tal vez no notes tus propios avances porque estás demasiado concentrada en lo que todavía te falta. Pero créeme, has recorrido un camino y has superado cosas que alguna vez también te parecían difíciles. No minimices lo que has conseguido." },
    { titulo: "Cuando quieras llorar", texto: "Llora, mi amor. No tienes que guardarte todo para demostrar que eres fuerte. No tienes que sonreír cuando por dentro estás triste. A veces llorar también es una manera de descansar el corazón." },
    { titulo: "Cuando tengas miedo de tu futuro", texto: "No sé exactamente qué nos espera mañana, pero sí sé que no necesitas tener toda tu vida planeada para merecer tranquilidad hoy. Poco a poco vas a encontrar tu camino. Confía también en la chica que estás construyendo cada día." },
    { titulo: "Cuando sientas que no eres importante", texto: "Quiero que sepas que eres importante. No solamente por lo que haces, por lo que consigues o por lo que puedes ofrecer. Eres importante simplemente por ser tú. Y para mí eres alguien muy especial." },
    { titulo: "Cuando sientas que debes ser fuerte todo el tiempo", texto: "Mi niña, hasta las personas más fuertes necesitan descansar. No tienes que resolver los problemas de todos, ni demostrar que puedes con todo. También mereces que alguien cuide de ti." },
    { titulo: "Cuando pienses que estás fallando", texto: "Equivocarte no significa que estés fracasando. Significa que estás aprendiendo. No te castigues por no saber hacer algo que todavía estás intentando aprender. Ten paciencia contigo misma." },
    { titulo: "Cuando sientas que no te valoran", texto: "No permitas que la falta de atención de alguien te haga olvidar todo lo bonito que hay en ti. Mereces ser escuchada, tomada en cuenta y querida. No tienes que rogar para que tus sentimientos sean importantes." },
    { titulo: "Cuando tengas muchas preocupaciones", texto: "Vamos a hacer algo: por ahora, deja a un lado todo lo que te preocupa. No tienes que resolver el mundo esta noche. Toma agüita, acomódate y descansa. Mañana será otro día y podremos pensar con más calma." },
    { titulo: "Cuando sientas que no tienes un propósito", texto: "No tienes que encontrar hoy la gran razón de tu vida. A veces el propósito se va descubriendo mientras vivimos, aprendemos y conocemos cosas nuevas. No estás perdida por todavía estar descubriéndote." },
    { titulo: "Cuando sientas que eres una carga", texto: "Mi amor, tener problemas, necesitar atención o pedir un abrazo no te convierte en una carga. No tienes que estar siempre bien para merecer compañía. También puedes necesitar ayuda y cariño." },
    { titulo: "Cuando tengas miedo de tomar una decisión", texto: "No existe una vida en la que siempre tomemos las decisiones perfectas. Haz lo que consideres mejor con lo que sabes hoy. Y si mañana descubres que debiste elegir diferente, también podrás aprender y volver a intentarlo." },
    { titulo: "Cuando extrañes sentirte tranquila", texto: "Cierra tus ojitos un ratito, mi niña. Imagina que estoy abrazándote muy fuerte. No tienes que pensar en nada por unos minutos. Solo descansa. Quiero que sepas que también mereces momentos en los que tu cabecita esté en paz." },
    { titulo: "Cuando sientas que todos esperan algo de ti", texto: "No tienes que convertirte en la persona que todos esperan que seas. Tienes derecho a descubrir quién quieres ser tú. No vivas intentando satisfacer a todos mientras te olvidas de lo que tú necesitas." },
    { titulo: "Cuando no te guste cómo te está yendo", texto: "No confundas una etapa difícil con una vida que va mal. Estás creciendo, aprendiendo y descubriendo muchas cosas. No todo tiene que salir bien para que estés haciendo las cosas lo mejor que puedes." },
    { titulo: "Cuando te sientas invisible", texto: "Quizás algunas veces sientas que nadie nota lo que haces o cómo te sientes. Pero quiero recordarte que lo que pasa dentro de ti importa. No tienes que hacer ruido ni llamar la atención para merecer amor." },
    { titulo: "Cuando sientas que no eres tan buena como los demás", texto: "Mi niña, no tienes que ser la mejor en todo. No tienes que destacar siempre ni conseguir más que los demás. Puedes ser una chica que está aprendiendo, que tiene dudas y que algunas veces necesita ayuda. Eso también está bien." },
    { titulo: "Cuando tengas ganas de rendirte", texto: "Espera un poquito, amor. No tomes decisiones sobre toda tu vida en un momento en el que te sientes agotada. Descansa primero. Recuerda por qué empezaste y date la oportunidad de volver a intentarlo cuando tengas fuerzas." },
    { titulo: "Cuando sientas que nadie se preocupa por ti", texto: "Quiero preguntarte algo: ¿ya comiste?, ¿tomaste agüita?, ¿descansaste un poquito? Porque yo sí me preocupo por esas pequeñas cosas. Me importa cómo estás, incluso cuando no me cuentas lo que pasa." },
    { titulo: "Cuando tengas miedo de no cumplir tus sueños", texto: "Tus sueños no tienen fecha de vencimiento, mi amor. Puedes tardar, cambiar de dirección, empezar de nuevo y descubrir nuevos sueños. No dejes que el miedo a no conseguirlos te impida disfrutar el camino." },
    { titulo: "Cuando sientas que has cambiado demasiado", texto: "No tienes que ser siempre la misma chica de antes. Estás creciendo y eso significa descubrir nuevas partes de ti. Espero que nunca olvides cuidar esa esencia tan bonita que tienes." },
    { titulo: "Cuando estés cansada de pensar", texto: "Por favor, mi niña, deja de pelearte con tus pensamientos por un ratito. No todo lo que imaginas va a pasar y no todas las preocupaciones son señales de que algo malo viene. Respira. Estás aquí, en este momento, y puedes descansar." },
    { titulo: "Cuando sientas que no eres una buena hija", texto: "No midas lo buena hija que eres por cuánto puedes hacer por los demás. También tienes emociones, necesidades y sueños propios. No necesitas ser perfecta para merecer el amor de tu familia." },
    { titulo: "Cuando sientas que estás decepcionando a tu familia", texto: "Tu vida no es un examen que tengas que aprobar frente a todos. Tu familia puede tener expectativas, pero tú también tienes derecho a construir tu propia historia. Equivocarte no borra todo lo bueno que eres." },
    { titulo: "Cuando necesites recordar cuánto te admiro", texto: "Admiro muchas cosas de ti, pero sobre todo esa forma tan bonita que tienes de preocuparte por las personas que quieres. Eres una chica fuerte, de bonitos sentimientos y con mucho amor para dar. Espero que nunca pierdas eso, pero tampoco te olvides de darte amor a ti misma." },
    { titulo: "Cuando sientas que todo está fuera de control", texto: "No puedes controlar todo lo que sucede a tu alrededor, mi amor. Y aunque a veces eso te asuste, no significa que todo vaya a salir mal. Concéntrate en lo que sí puedes hacer y deja que lo demás vaya tomando su lugar." },
    { titulo: "Cuando sientas que necesitas un abrazo", texto: "Esta cartita viene con un abrazo enorme, de esos que duran bastante y no necesitan palabras. Imagínate que te tengo cerquita y te digo al oído: tranquila, mi niña, no tienes que poder con todo hoy." },
    { titulo: "Cuando tengas miedo de empezar algo nuevo", texto: "No necesitas sentirte preparada al cien por ciento para empezar. Muchas cosas bonitas comienzan con nervios, dudas y un poquito de miedo. Confía en que puedes aprender mientras avanzas." },
    { titulo: "Cuando sientas que nadie ve tu esfuerzo", texto: "Yo sí quiero que sepas que tus esfuerzos cuentan, incluso los que nadie ve. Esos días en los que te levantas sin muchas ganas, pero aun así sigues intentando. Esas pequeñas cosas también son logros, mi amor." },
    { titulo: "Cuando te sientas triste sin saber por qué", texto: "No necesitas encontrar una explicación para cada emoción. A veces simplemente tenemos días sensibles. No te obligues a estar feliz, no te juzgues y recuerda que está bien pedir compañía." },
    { titulo: "Cuando pienses que tu vida debería ser diferente", texto: "No te castigues pensando en cómo deberían ser las cosas. Tu historia no tiene que parecerse a la de nadie. Todavía tienes muchísimas experiencias por vivir, lugares por conocer y cosas bonitas por descubrir." },
    { titulo: "Cuando te preocupes por lo que piensan de ti", texto: "No puedes controlar todas las opiniones de las personas, mi niña. Pero sí puedes aprender a no dejar que cada opinión defina cómo te ves a ti misma. Tú también tienes derecho a elegir cómo quieres vivir." },
    { titulo: "Cuando sientas que no te escuchan", texto: "Tus palabras merecen ser escuchadas y tus sentimientos merecen un espacio. No guardes siempre todo para evitar incomodar a los demás. Puedes expresar lo que necesitas sin sentirte culpable por hacerlo." },
    { titulo: "Cuando tengas un mal recuerdo o una mala experiencia", texto: "Lo que te pasó forma parte de tu historia, pero no tiene que definir todo tu futuro. No eres tus errores ni tus momentos difíciles. Todavía tienes muchas oportunidades de vivir cosas diferentes y bonitas." },
    { titulo: "Cuando quieras sentirte querida", texto: "Ven aquí, mi niña. Quiero que recuerdes que no tienes que hacer nada especial para que te quiera. No tienes que conseguir algo, demostrar algo ni estar siempre de buen humor. Me encanta compartir mi vida contigo tal como eres." },
    { titulo: "Cuando estés preocupada por mañana", texto: "Mañana todavía no ha llegado, amor. No permitas que las preocupaciones de un día que aún no vivimos te quiten la tranquilidad de este momento. Vamos paso a paso. No tienes que correr." },
    { titulo: "Cuando sientas que has perdido tu alegría", texto: "Quiero volver a ver esa sonrisa tuya, pero no quiero que finjas estar feliz para tranquilizarme. Prefiero acompañarte mientras recuperas tus ganas de sonreír. No hay apuro, mi amor. Estoy contigo." },
    { titulo: "Cuando necesites recordar que eres capaz", texto: "A veces dudas tanto de ti que olvidas todo lo que has podido superar. No te subestimes, mi niña. Eres capaz de aprender, de crecer y de construir una vida bonita. Confía un poquito más en ti." },
    { titulo: "Cuando sientas que todo es demasiado", texto: "Hoy no tienes que ser productiva, ni fuerte, ni tener respuestas. Hoy puedes simplemente ser tú. Descansa, respira y deja que las cosas esperen un poquito. Tu bienestar también debe ser una prioridad." },
    { titulo: "Cuando necesites saber cuánto te amo", texto: "Mi amor, no sé qué estará pasando por tu cabecita en este momento, pero quiero que sepas algo: no estás sola. Quiero verte cumplir tus sueños, descubrir lo que te hace feliz y convertirte en la persona que tú deseas ser. No quiero que vivas con miedo a decepcionar a los demás, quiero que también aprendas a elegirte, a cuidarte y a quererte. No tienes que tener una vida perfecta para que yo esté orgulloso de ti. Estoy feliz de caminar a tu lado, de conocerte cada día un poquito más y de compartir esta historia contigo. Te amo, mi niña. ❤️" }
  ],

  // Razones por las que la quieres (botón aleatorio)
  razones: [
     "Porque me haces reír aun en mis días malos.",
    "Porque contigo todo se siente en casa.",
    "Porque tu sonrisa me arregla el día.",
    "Porque eres valiente y no te das cuenta.",
    "Porque me cuidas incluso cuando no lo pido.",
    "Porque contigo hasta el silencio es cómodo.",
    "Porque eres mi lugar tranquilo cuando todo se mueve.",
    "Porque tu risa es mi sonido favorito.",
    "Porque me escuchas de verdad, sin apuro.",
    "Porque me haces querer ser mejor, sin presionarme.",
    "Porque tienes un corazón enorme, aunque a veces lo escondas.",
    "Porque me haces sentir que está bien ser yo.",
    "Porque sigues intentándolo, incluso en los días difíciles.",
    "Porque eres tierna y fuerte a la vez.",
    "Porque contigo un día cualquiera se vuelve especial.",
    "Porque me tienes paciencia cuando me pongo terco.",
    "Porque tu cabecita piensa mucho, y eso también me gusta de ti.",
    "Porque eres curiosa y te emocionas con las cositas.",
    "Porque me das ganas de cuidarte todos los días.",
    "Porque me acuerdo de ti en las cosas más pequeñas.",
    "Porque eres mi persona favorita para contarle todo.",
    "Porque tus abrazos me dejan sin preocupaciones.",
    "Porque mi día mejora apenas me escribes.",
    "Porque eres como una tortuguita: lenta para rendirte y firme para avanzar.",
    "Porque me haces sentir acompañado, aunque estemos lejos.",
    "Porque eres más capaz de lo que crees.",
    "Porque me encanta cómo te brillan los ojos cuando algo te hace feliz.",
    "Porque contigo aprendí a ir con calma.",
    "Porque mereces cariño, y a mí me encanta dártelo.",
    "Porque tus mensajes son mi parte favorita del día.",
    "Porque eres auténtica, sin fingir nada.",
    "Porque me haces sentir orgulloso de caminar a tu lado.",
    "Porque tienes una forma única de ver el mundo.",
    "Porque me encanta que seas tú, con tus rarezas y todo.",
    "Porque hasta tus días grises tienen algo bonito.",
    "Porque me elegiste, y eso me hace muy feliz.",
    "Porque contigo aprendí que querer es cuidar.",
    "Porque tus detalles pequeños son enormes para mí.",
    "Porque me haces creer que lo bonito dura.",
    "Porque te quiero, mi Peteña, simplemente porque eres tú."
  ]

  // Los acertijos están en el archivo acertijos.js
};
