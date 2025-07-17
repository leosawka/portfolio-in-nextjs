import type { NextApiRequest, NextApiResponse } from 'next';

export type Language = 'en' | 'es';

export const texts = {
  en: {
    greeting: 'Welcome to my portfolio!',
    about: "I am Jairo Leonardo Olivera Sawka, a fullstack developer based in LATAM with experience as a semi-senior developer at a multinational company based in London, England, United Kingdom. I have over 7 years of professional experience developing scalable Web Applications using Python, Django, Javascript (React.js, Node.js), and SQL databases. In my career I have worked from the full product development lifecycle, including backend architecture, API integration, interfaces, and containerization with Docker, to production support, bug fixes, and technical advice in cross-functional teams, which is even more important in a fast-paced environment. More recently I have been involved in AI development with hands-on projects, including a working LLM powered chatbot, and an object detection system using YOLOv8, using a structured version control system. I think that I can bring a combination of technical depth, communication skills, and ability to adapt to a given scenario on any project, and I strongly enjoy the opportunity to problem-solve in the real-world through clean coding practices, thoughtfully designed architecture, and a strong focus on learning.",
    skills: 'Technologies I use:',
    stack: ['JavaScript', 'TypeScript', 'Phyton', 'Java', 'SQL', 'C#', 'HTML', 'CSS', 'Bash', 'Docker', 'React', 'Redux', 'Node', 'Express', 'Next', 'Jest', 'Cypress', 'Pytest', 'MaterialUI', 'TailwindCSS', 'FastAPI', 'Django', 'Bootstrap', 'MySQL', 'MongoDB', 'SQLite', 'Unit testing', 'QA automation', 'Git', 'Github', 'CI/CD', 'Azure', 'Token authentication', 'OAuth2', 'HTTPS', 'Access Control', 'LLM integration', 'OpenAI', 'Groq', 'YOLOv8', 'Pandas', 'Data visualization', 'Basic AI modeling', 'Responsive design', 'Accessibility', 'UX writting', 'Figma', 'Miro', 'MVC', 'Microservices', 'Technical documentation', 'RESTful API design', 'GraphQL', 'English', 'Italian', 'Japanese', 'Polish', 'Project management', 'Airtable', 'Excel', 'Word', 'Powerpoint', 'Google sheets', 'Teamwork', 'Troubleshooting', 'Critical thinking', 'INTJ'],
    workExperienceTitle: 'Work experience',
    workLabels: {from:'From', to:'to', position:'Position/Role', company:'Company', highlights:'Responsibilities and achievements', technologies:'Technologies'},
    workExperience: [
      {iconImage: {}, from: 'Oct 2022', to: 'Dec 2024', jobtitle: 'Associate 2', company: 'Pricewaterhousecoopers', highlights: ['Delivered high-quality enhancements for a React-TypeScript web application for Bristol-Myers Squibb, ensuring project alignment and client satisfaction.', 'Led the migration of a SharePoint database to a scalable platform, improving efficiency and usability.', 'Maintained a robust Azure-based support platform for NBCUniversal, ensuring seamless operation and issue resolution.'], tecnologies: ['Trello', 'Miro', 'Figma', 'JavaScript', 'Python', '.NET', 'Sharepoint', 'React', 'Typescript', 'MySQL']},
      {iconImage: {}, from: 'Jan 2020', to: 'Oct 2022', jobtitle: 'Project Manager', company: 'OliTeam', highlights: ['Co-founded the organization, overseeing small-scale projects and mentoring new developers.', 'Introduced innovative programming pathways to accelerate skill development among junior team members.'], tecnologies: ['Java', 'Python', 'JavaScript', 'NodeJs', 'Express', 'React', 'Redux', 'MongoDB', 'PosgreSQL', 'MySQL', 'PL/SQL']},
      {iconImage: {}, from: 'Jan 2020', to: 'Feb 2021', jobtitle: 'Frontend Developer', company: 'Halalá', highlights: ['Designed and developed a mobile-first e-commerce application connecting raw material producers with manufacturers.', 'Spearheaded the UI/UX design process, enhancing user engagement and navigation efficiency.'], tecnologies: ['JavaScript', 'NodeJs', 'React', 'Redux', 'PosgreSQL']},
      {iconImage: {}, from: 'Oct 2013', to: 'Dec 2017', jobtitle: 'Database Manager', company: 'Tecnicina', highlights: ['Ensured the accuracy and functionality of a commerce database for medical equipment sales.', 'Resolved operational issues related to invoice printing and fiscal registration, enhancing workflow reliability'], tecnologies: ['Factusol', 'Magento', 'Odoo', 'Python', 'JavaScript']},
    ],
    projectsTitle: 'Projects',
    projects: [
      {
        title: 'Nuntius',
        description: 'News CRUD application using React, TypeScript, Node.js, and PostgreSQL.',
        image: '/projects/nuntius/Nuntius_test.png',
        link: 'https://github.com/leosawka/nuntius',
      },
      {
        title: 'ToDo List',
        description: 'Simple task manager built with React and hosted with GitHub Pages.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'ToDo List',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test2',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test3',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test4',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
        link: 'https://leosawka.github.io/ToDo/',
      },
      {
        title: 'Test5',
        description: 'This is a test.',
        image: '/projects/todolist/ToDoList.png',
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
      "invalidFormat": "Invalid email format.",
      "disposableEmail": "Disposable or blocked email addresses are not allowed.",
      "errorName": "Name is required.",
      "errorEmail": "Email is required.",
      "errorMessage": "Message is required."
    },
  },
  es: {
    greeting: '¡Bienvenido a mi portfolio!',
    about: 'Mi nombre es Jairo Leonardo Olivera Sawka, soy desarrollador fullstack ubicado en América latina con experiencia como desarrollador semi-senior en una compaía multinacional ubicada en London, Inglaterra, Reino Unido. Tengo más de 7 años de experiencia diseñando aplicaciones web escalables con Python, Django, JavaScript (React, Node.js) y bases de datos SQL. A lo largo de mi carrera he estado implicado en todo el ciclo de vida de los productos pasando por la arquitectura backend, integraciones de APIs, creación de interfaces frontend y despliegues en contenedores con Docker. También he colaborado en soporte técnico, resolución de bugs en producción y guiado a equipos de forma técnica y proactiva. Recientemente he ampliado mi perfil hacia la inteligencia artificial desarrollando proyectos como un chatbot basado en modelos LLM o un sistema de detección de personas en imagen en tiempo real con YOLOv8. Me entusiasma encontrar soluciones eficientes, comunicarme claramente y aprender cada día con cada nuevo reto. Estaré encantado de unirme a su equipo y aportar mi experiencia, versatilidad y enfoque resultado.',
    skills: 'Tecnologías que utilizo:',
    stack: ['JavaScript', 'TypeScript', 'Phyton', 'Java', 'SQL', 'C#', 'HTML', 'CSS', 'Bash', 'Docker', 'React', 'Redux', 'Node', 'Express', 'Next', 'Jest', 'Cypress', 'Pytest', 'MaterialUI', 'TailwindCSS', 'FastAPI', 'Django', 'Bootstrap', 'MySQL', 'MongoDB', 'SQLite', 'Unit testing', 'QA automation', 'Git', 'Github', 'CI/CD', 'Azure', 'Token authentication', 'OAuth2', 'HTTPS', 'Access Control', 'LLM integration', 'OpenAI', 'Groq', 'YOLOv8', 'Pandas', 'Data visualization', 'Basic AI modeling', 'Responsive design', 'Accessibility', 'UX writting', 'Figma', 'Miro', 'MVC', 'Microservices', 'Technical documentation', 'RESTful API design', 'GraphQL', 'English', 'Italian', 'Japanese', 'Polish', 'Project management', 'Airtable', 'Excel', 'Word', 'Powerpoint', 'Google sheets', 'Teamwork', 'Troubleshooting', 'Critical thinking', 'INTJ'],
    workExperienceTitle: 'Experiencia laboral',
    workLabels: {from:'Desde', to:'Hasta', position:'Puesto/Rol', company:'Empresa', highlights:'Responsabilidades y logros', technologies:'Tecnologías'},
    workExperience: [
      {iconImage: {}, from: "Oct 2022", to: "Dic 2024", jobtitle: "Asociado 2", company: "PricewaterhouseCoopers", highlights: [ "Entregué mejoras de alta calidad para una aplicación web en React-TypeScript para Bristol-Myers Squibb, asegurando el alineamiento del proyecto y la satisfacción del cliente.", "Lideré la migración de una base de datos de SharePoint a una plataforma escalable, mejorando la eficiencia y usabilidad.", "Mantuve una sólida plataforma de soporte basada en Azure para NBCUniversal, garantizando una operación fluida y resolución de incidencias." ], tecnologies: [ "Trello", "Miro", "Figma", "JavaScript", "Python", ".NET", "Sharepoint", "React", "Typescript", "MySQL" ]},
      {iconImage: {}, from: "Ene 2020", to: "Oct 2022", jobtitle: "Gerente de Proyecto", company: "OliTeam", highlights: [ "Cofundé la organización, supervisando proyectos de pequeña escala y mentoreando a nuevos desarrolladores.", "Introduje rutas innovadoras de programación para acelerar el desarrollo de habilidades entre miembros junior del equipo." ], tecnologies: [ "Java", "Python", "JavaScript", "NodeJs", "Express", "React", "Redux", "MongoDB", "PosgreSQL", "MySQL", "PL/SQL" ]},
      {iconImage: {}, from: "Ene 2020", to: "Feb 2021", jobtitle: "Desarrollador Frontend", company: "Halalá", highlights: [ "Diseñé y desarrollé una aplicación de comercio electrónico mobile-first que conectaba productores de materia prima con fabricantes.", "Encabecé el proceso de diseño UI/UX, mejorando el compromiso del usuario y la eficiencia de navegación." ], tecnologies: [ "JavaScript", "NodeJs", "React", "Redux", "PosgreSQL"]},
      {iconImage: {}, from: "Oct 2013", to: "Dic 2017", jobtitle: "Administrador de Base de Datos", company: "Tecnicina", highlights: [ "Aseguré la precisión y funcionalidad de una base de datos comercial para ventas de equipamiento médico.", "Resolví problemas operativos relacionados con la impresión de facturas y la registración fiscal, mejorando la confiabilidad del flujo de trabajo." ], tecnologies: [ "Factusol", "Magento", "Odoo", "Python", "JavaScript"]}
    ],
    projectsTitle: 'Proyectos',
    projects: [
      {
        title: 'Nuntius',
        description: 'Aplicación CRUD de noticias con React, TypeScript, Node.js y PostgreSQL.',
        image: '/projects/nuntius/Nuntius_test.png',
        link: 'https://github.com/leosawka/nuntius',
      },
      {
        title: 'ToDo List',
        description: 'Gestor de tareas simple construido con React y alojado en GitHub Pages.',
        image: '/projects/todolist/ToDoList.png',
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
    "contactForm": {
      "name": "Nombre",
      "email": "Correo electrónico",
      "message": "Mensaje",
      "send": "Enviar",
      "success": "¡Mensaje enviado!",
      "error": "Por favor completá todos los campos.",
      "invalidFormat": "Formato de correo inválido.",
      "disposableEmail": "No se permiten correos temporales o bloqueados.",
      "errorName": "El nombre es obligatorio.",
      "errorEmail": "El correo es obligatorio.",
      "errorMessage": "El mensaje es obligatorio."
    }
  },
};
