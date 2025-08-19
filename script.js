document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('main-title');
    const text = "Linux: O Sistema Operacional que Transforma o Mundo Digital";
    titleElement.textContent = text; // Define o texto para que o CSS possa animar a largura
});

// --- Lógica da Linha do Tempo Interativa ---

document.addEventListener('DOMContentLoaded', function() {
    // ... (o código do título que já estava aqui) ...

    const timeline = document.querySelector('.timeline');
    const timelineEvents = document.querySelectorAll('.timeline-event');

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.5 // Aciona quando 50% do elemento está visível
    };

    // Observador para os eventos individuais
    const eventObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar depois que a animação acontece
            }
        });
    }, observerOptions);

    // Aplica o observador a cada evento
    timelineEvents.forEach(event => {
        eventObserver.observe(event);
    });
    
    // Observador para a linha vertical principal
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Aciona quando 10% da timeline aparece

    lineObserver.observe(timeline);
});

// --- Lógica dos Cards 3D das Distribuições ---

document.addEventListener('DOMContentLoaded', function() {
    // ... (todo o código anterior do script.js) ...

    const cards = document.querySelectorAll('.distro-card');

    cards.forEach(card => {
        const cardContent = card.querySelector('.card-content');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse dentro do card
            const y = e.clientY - rect.top;  // Posição Y do mouse dentro do card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10; // Controla a rotação no eixo X
            const rotateY = (centerX - x) / 10; // Controla a rotação no eixo Y

            cardContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reseta a transformação quando o mouse sai
            cardContent.style.transform = 'rotateX(0) rotateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (todo o código anterior do script.js) ...

    // --- Lógica para animar os cards de curiosidades ---
    const factCards = document.querySelectorAll('.fact-card');

    // Reutilizando as mesmas opções do observador da timeline
    const factObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Aciona quando 20% do card está visível

    factCards.forEach(card => {
        factObserver.observe(card);
    });
});

    function openModal(card ) {
        const title = card.querySelector('h3').textContent;
        const description = card.dataset.description;
        
        // Pega a imagem ou o ícone
        const imgElement = card.querySelector('img');
        const iconifyElement = card.querySelector('.iconify');

        if (imgElement) {
            modalImg.style.display = 'block'; // Mostra a tag de imagem
            document.getElementById('modal-icon-container').style.display = 'none'; // Esconde o container do ícone
            modalImg.src = imgElement.src;
        } else if (iconifyElement) {
            modalImg.style.display = 'none'; // Esconde a tag de imagem
            const iconContainer = document.getElementById('modal-icon-container');
            iconContainer.style.display = 'block'; // Mostra o container do ícone
            // Clona o ícone para dentro da modal
            iconContainer.innerHTML = ''; // Limpa o container
            iconContainer.appendChild(iconifyElement.cloneNode(true));
        }

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalOverlay.classList.add('visible');
    }
