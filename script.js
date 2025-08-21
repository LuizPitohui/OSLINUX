document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica do Título Principal ---
    const titleElement = document.getElementById('main-title');
    const text = "Linux: O Sistema Operacional que Transforma o Mundo Digital";
    titleElement.textContent = text; 

    // --- Lógica da Linha do Tempo Interativa ---
    const timeline = document.querySelector('.timeline');
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const eventObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    timelineEvents.forEach(event => { eventObserver.observe(event); });
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { timeline.classList.add('visible'); }
        });
    }, { threshold: 0.1 });
    lineObserver.observe(timeline);

    // --- Lógica para animar os cards de curiosidades ---
    const factCards = document.querySelectorAll('.fact-card');
    const factObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    factCards.forEach(card => { factObserver.observe(card); });

    // --- Lógica dos Cards 3D das Distribuições ---
    const cards3D = document.querySelectorAll('.distro-card');
    cards3D.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            cardContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            cardContent.style.transform = 'rotateX(0) rotateY(0)';
        });
    });

    // --- Lógica da Janela Modal ---
    const modalOverlay = document.getElementById('distro-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalIconContainer = document.getElementById('modal-icon-container');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.querySelector('.modal-close');
    const distroCards = document.querySelectorAll('.distro-card');

    function openModal(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.dataset.description;
        const imgElement = card.querySelector('img');
        const iconifyElement = card.querySelector('.iconify');

        modalImg.style.display = 'none';
        modalIconContainer.style.display = 'none';
        modalIconContainer.innerHTML = '';

        if (imgElement) {
            modalImg.style.display = 'block';
            modalImg.src = imgElement.src;
        } else if (iconifyElement) {
            modalIconContainer.style.display = 'flex'; // Usar flex para centralizar
            modalIconContainer.appendChild(iconifyElement.cloneNode(true));
        }

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        modalOverlay.classList.remove('visible');
    }

    distroCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    closeModalButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});

