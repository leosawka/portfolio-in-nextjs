import type { NextApiRequest, NextApiResponse } from 'next';

type Language = 'en' | 'es';

const texts = {
  en: {
    greeting: 'Welcome to my portfolio!',
    about: "I am Jairo Leonardo Olivera, a fullstack developer based in LATAM currently working as a senior developer at a company based in Portugal. I have over 7 years of professional experience developing scalable Web Applications using Python, Django, Javascript (React.js, Node.js), and SQL databases. In my career I have worked from the full product development lifecycle, including backend architecture, API integration, interfaces, and containerization with Docker, to production support, bug fixes, and technical advice in cross-functional teams, which is even more important in a fast-paced environment. More recently I have been involved in AI development with hands-on projects, including a working LLM powered chatbot, and an object detection system using YOLOv8, using a structured version control system. I think that I can bring a combination of technical depth, communication skills, and ability to adapt to a given scenario on any project, and I strongly enjoy the opportunity to problem-solve in the real-world through clean coding practices, thoughtfully designed architecture, and a strong focus on learning.",
    skills: 'Technologies I use:',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Docker'],
    projectsTitle: 'Projects',
    projects: [
      {
        title: 'Nuntius',
        description: 'News CRUD application using React, TypeScript, Node.js, and PostgreSQL.',
        image: '/projects/nuntius.png',
        link: 'https://github.com/leosawka/nuntius',
      },
      {
        title: 'ToDo List',
        description: 'Simple task manager built with React and hosted with GitHub Pages.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
    ],
    socialTitle: 'Social & Contact',
    social: [
      { label: 'GitHub', url: 'https://github.com/leosawka', icon: '🐱' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jairo-leonardo-olivera-sawka-623732b4/', icon: '💼' },
      { label: 'Email', url: 'leonardo.sawka@gmail.com', icon: '✉️' },
      { label: 'Telegram', url: 'https://t.me/leonardosawka', icon: '📲' },
    ],
    contactTitle: 'Contact Me',
    contactForm: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      success: 'Message sent!',
      error: 'Please complete all fields.',
    },
  },
  es: {
    greeting: '¡Bienvenido a mi portfolio!',
    about: 'Mi nombre es Jairo Leonardo Olivera, soy desarrollador fullstack con más de 7 años de experiencia diseñando aplicaciones web escalables con Python, Django, JavaScript (React, Node.js) y bases de datos SQL. A lo largo de mi carrera he estado implicado en todo el ciclo de vida de los productos pasando por la arquitectura backend, integraciones de APIs, creación de interfaces frontend y despliegues en contenedores con Docker. También he colaborado en soporte técnico, resolución de bugs en producción y guiado a equipos de forma técnica y proactiva. Recientemente he ampliado mi perfil hacia la inteligencia artificial desarrollando proyectos como un chatbot basado en modelos LLM o un sistema de detección de personas en imagen en tiempo real con YOLOv8. Me entusiasma encontrar soluciones eficientes, comunicarme claramente y aprender cada día con cada nuevo reto. Estaré encantado de unirme a su equipo y aportar mi experiencia, versatilidad y enfoque resultado.',
    skills: 'Tecnologías que utilizo:',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Docker'],
    projectsTitle: 'Proyectos',
    projects: [
      {
        title: 'Nuntius',
        description: 'Aplicación CRUD de noticias con React, TypeScript, Node.js y PostgreSQL.',
        image: '/projects/nuntius.png',
        link: 'https://github.com/leosawka/nuntius',
      },
      {
        title: 'ToDo List',
        description: 'Gestor de tareas simple construido con React y alojado en GitHub Pages.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
    ],
    socialTitle: 'Redes y contacto',
    social: [
      { label: 'GitHub', url: 'https://github.com/leosawka', icon: '🐱' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jairo-leonardo-olivera-sawka-623732b4/', icon: '💼' },
      { label: 'Email', url: 'leonardo.sawka@gmail.com', icon: '✉️' },
      { label: 'Telegram', url: 'https://t.me/leonardosawka', icon: '📲' },
    ],
    contactTitle: 'Contáctame',
    contactForm: {
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar',
      success: '¡Mensaje enviado!',
      error: 'Por favor completa todos los campos.',
    },
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;
  const language = (lang === 'es' ? 'es' : 'en') as Language;

  res.status(200).json(texts[language]);
}
