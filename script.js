// Scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manipular envio do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = this.querySelector('input[placeholder="Seu Nome"]').value;
    const email = this.querySelector('input[placeholder="Seu Email"]').value;
    const telefone = this.querySelector('input[placeholder="Telefone"]').value;
    const mensagem = this.querySelector('textarea').value;
    
    // Validação básica
    if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }
    
    // Simular envio
    alert(`Obrigado, ${nome}! Sua mensagem foi recebida. Entraremos em contato em breve!`);
    
    // Limpar formulário
    this.reset();
    
    // Aqui você pode adicionar integração com API de email
    // Por exemplo: enviar para um backend ou serviço como EmailJS
});

// Adicionar animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de serviço
document.querySelectorAll('.servico-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Efeito de hover para cards
document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
});

// Menu responsivo (opcional - para mobile)
function criarMenuMobile() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Contador animado para stats (quando chegar à seção)
const stats = document.querySelectorAll('.stat h3');
let statsAnimated = false;

const observerStats = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            stats.forEach(stat => {
                animarNumero(stat);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelector('.sobre-stats')?.parentElement && 
    observerStats.observe(document.querySelector('.sobre-stats'));

function animarNumero(element) {
    const alvo = parseInt(element.textContent);
    const duracao = 2000;
    const incremento = alvo / (duracao / 16);
    let atual = 0;
    
    const interval = setInterval(() => {
        atual += incremento;
        if (atual >= alvo) {
            element.textContent = alvo + '+';
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(atual);
        }
    }, 16);
}

console.log('✅ Website carregado com sucesso!');