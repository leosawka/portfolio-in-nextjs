import type { NextApiRequest, NextApiResponse } from 'next';

export type Language = 'en' | 'es';

export const texts = {
  en: {
    greeting: 'Welcome to my portfolio!',
    about: "I am Jairo Leonardo Olivera Sawka, a fullstack developer based in LATAM with experience as a semi-senior developer at a multinational company based in London, England, United Kingdom. I have over 7 years of professional experience developing scalable Web Applications using Python, Django, Javascript (React.js, Node.js), and SQL databases. In my career I have worked from the full product development lifecycle, including backend architecture, API integration, interfaces, and containerization with Docker, to production support, bug fixes, and technical advice in cross-functional teams, which is even more important in a fast-paced environment. More recently I have been involved in AI development with hands-on projects, including a working LLM powered chatbot, and an object detection system using YOLOv8, using a structured version control system. I think that I can bring a combination of technical depth, communication skills, and ability to adapt to a given scenario on any project, and I strongly enjoy the opportunity to problem-solve in the real-world through clean coding practices, thoughtfully designed architecture, and a strong focus on learning.",
    skills: 'Technologies I use:',
    stack: ['JavaScript', 'TypeScript', 'Phyton', 'Java', 'SQL', 'C#', 'HTML', 'CSS', 'Bash', 'Docker', 'React', 'Redux', 'Node', 'Express', 'Next', 'Jest', 'Cypress', 'Pytest', 'MaterialUI', 'TailwindCSS', 'FastAPI', 'Django', 'Bootstrap', 'MySQL', 'MongoDB', 'SQLite', 'Unit testing', 'QA automation', 'Git', 'Github', 'CI/CD', 'Azure', 'Token authentication', 'OAuth2', 'HTTPS', 'Access Control', 'LLM integration', 'OpenAI', 'Groq', 'YOLOv8', 'Pandas', 'Data visualization', 'Basic AI modeling', 'Responsive design', 'Accessibility', 'UX writting', 'Figma', 'Miro', 'MVC', 'Microservices', 'Technical documentation', 'RESTful API design', 'GraphQL', 'English', 'Italian', 'Japanese', 'Polish', 'Project management', 'Airtable', 'Excel', 'Word', 'Powerpoint', 'Google sheets', 'Teamwork', 'Troubleshooting', 'Critical thinking', 'INTJ'],
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
      {
        title: 'ToDo List',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test2',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test3',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test4',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test5',
        description: 'This is a test.',
        image: '/projects/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
    ],
    socialTitle: 'Social & Contact',
    social: [
      { label: 'Github', url: 'https://github.com/leosawka'},
      { label: 'Linkedin', url: 'https://www.linkedin.com/in/jairo-leonardo-olivera-sawka-623732b4/'},
      { label: 'Gmail', url: 'leonardo.sawka@gmail.com'},
      { label: 'Telegram', url: 'https://t.me/leonardosawka'},
    ],
    contactTitle: 'Contact Me',
    contactForm: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      success: 'Message sent!',
      error: 'Please complete all fields.',
      errors: {
        missingFields: 'All fields are required',
        invalidEmail: 'Invalid email address',
        captchaMissing: 'Captcha token missing',
        captchaFail: 'Captcha verification failed',
        rateLimit: 'Too many requests. Try again later.',
        telegramFail: 'Failed to send message via Telegram',
      },
    },
  },
  es: {
    greeting: '¡Bienvenido a mi portfolio!',
    about: 'Mi nombre es Jairo Leonardo Olivera Sawka, soy desarrollador fullstack ubicado en América latina con experiencia como desarrollador semi-senior en una compaía multinacional ubicada en London, Inglaterra, Reino Unido. Tengo más de 7 años de experiencia diseñando aplicaciones web escalables con Python, Django, JavaScript (React, Node.js) y bases de datos SQL. A lo largo de mi carrera he estado implicado en todo el ciclo de vida de los productos pasando por la arquitectura backend, integraciones de APIs, creación de interfaces frontend y despliegues en contenedores con Docker. También he colaborado en soporte técnico, resolución de bugs en producción y guiado a equipos de forma técnica y proactiva. Recientemente he ampliado mi perfil hacia la inteligencia artificial desarrollando proyectos como un chatbot basado en modelos LLM o un sistema de detección de personas en imagen en tiempo real con YOLOv8. Me entusiasma encontrar soluciones eficientes, comunicarme claramente y aprender cada día con cada nuevo reto. Estaré encantado de unirme a su equipo y aportar mi experiencia, versatilidad y enfoque resultado.',
    skills: 'Tecnologías que utilizo:',
    stack: ['JavaScript', 'TypeScript', 'Phyton', 'Java', 'SQL', 'C#', 'HTML', 'CSS', 'Bash', 'Docker', 'React', 'Redux', 'Node', 'Express', 'Next', 'Jest', 'Cypress', 'Pytest', 'MaterialUI', 'TailwindCSS', 'FastAPI', 'Django', 'Bootstrap', 'MySQL', 'MongoDB', 'SQLite', 'Unit testing', 'QA automation', 'Git', 'Github', 'CI/CD', 'Azure', 'Token authentication', 'OAuth2', 'HTTPS', 'Access Control', 'LLM integration', 'OpenAI', 'Groq', 'YOLOv8', 'Pandas', 'Data visualization', 'Basic AI modeling', 'Responsive design', 'Accessibility', 'UX writting', 'Figma', 'Miro', 'MVC', 'Microservices', 'Technical documentation', 'RESTful API design', 'GraphQL', 'English', 'Italian', 'Japanese', 'Polish', 'Project management', 'Airtable', 'Excel', 'Word', 'Powerpoint', 'Google sheets', 'Teamwork', 'Troubleshooting', 'Critical thinking', 'INTJ'],
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
      errors: {
        missingFields: 'Por favor completa todos los campos.',
        invalidEmail: 'Correo inválido.',
        captchaMissing: 'Falta verificar el captcha.',
        captchaFail: 'La verificación del captcha falló.',
        rateLimit: 'Demasiadas solicitudes. Intenta nuevamente más tarde.',
        telegramFail: 'No se pudo enviar el mensaje por Telegram.',
      },
    },
  },
};
