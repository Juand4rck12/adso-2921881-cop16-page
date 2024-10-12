document.addEventListener("DOMContentLoaded", function () {
    // Animación de elementos al hacer scroll
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Toggle entre modo claro y oscuro
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Opcional: guardar la preferencia del usuario
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Verificar y aplicar el tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Menú hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuItems = navMenu.querySelectorAll('a');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');  // Añade esta línea
        document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded',
            menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    }
    menuToggle.addEventListener('click', toggleMenu);

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});