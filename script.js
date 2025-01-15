particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00ff88"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00ff88",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

VanillaTilt.init(document.querySelectorAll(".about-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    scale: 1.05
});

function animateValue(element) {
    const finalValue = parseInt(element.getAttribute('data-value'));
    let currentValue = 0;
    const duration = 2000; 
    const increment = finalValue / (duration / 16); 

    const updateValue = () => {
        if(currentValue < finalValue) {
            currentValue += increment;
            element.textContent = Math.floor(currentValue);
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = finalValue;
        }
    };
    updateValue();
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('highlight')) {
                animateValue(entry.target);
            } else {
                entry.target.classList.add('animate');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function createGlitchEffect() {
    const glitchText = document.querySelector('.glitch');
    if (!glitchText) return;

    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10}px 0 0 rgba(255, 0, 0, 0.75),
                ${Math.random() * -10}px ${Math.random() * -10}px 0 rgba(0, 255, 0, 0.75),
                ${Math.random() * 10}px ${Math.random() * 10}px 0 rgba(0, 0, 255, 0.75)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '';
            }, 50);
        }
    }, 100);
}

document.querySelectorAll('.equipment-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const progress = item.querySelector('.progress');
        progress.style.filter = 'brightness(1.5)';
        progress.style.boxShadow = '0 0 20px var(--neon-green)';
    });
    
    item.addEventListener('mouseleave', () => {
        const progress = item.querySelector('.progress');
        progress.style.filter = 'brightness(1)';
        progress.style.boxShadow = '0 0 10px var(--neon-green)';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        btn.innerHTML = 'Inviato ✓';
        btn.style.background = 'var(--neon-green)';
        btn.style.color = 'var(--cyber-black)';
        
        setTimeout(() => {
            btn.innerHTML = 'INVIA →';
            btn.style.background = 'transparent';
            btn.style.color = 'var(--neon-green)';
            form.reset();
        }, 3000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createGlitchEffect();
    
    document.querySelectorAll('.highlight').forEach(el => {
        const value = el.textContent;
        el.setAttribute('data-value', value);
        el.textContent = '0';
    });

    document.querySelectorAll('.highlight, .about-card, .beat-card').forEach(el => {
        observer.observe(el);
    });
});

document.querySelectorAll('.cyber-button').forEach(button => {
    button.addEventListener('click', function() {
        this.innerHTML = 'PLAYING ♪';
        
        setTimeout(() => {
            this.innerHTML = 'ASCOLTA ⚡';
        }, 2000);
    });
});