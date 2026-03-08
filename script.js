// ============ IMAGE GALLERY CAROUSEL ============
let currentSlideIndex = 0;
const totalSlides = 6;
let autoplayInterval;

function moveCarousel(direction) {
    currentSlideIndex += direction;
    
    // Wrap around
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
    resetAutoplay();
}

function currentSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
    resetAutoplay();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    const videos = document.querySelectorAll('.gallery-video');
    
    if (track) {
        const translateValue = -currentSlideIndex * 100;
        track.style.transform = `translateX(${translateValue}%)`;
    }
    
    // Handle video playback
    videos.forEach((video, index) => {
        if (index === currentSlideIndex) {
            video.classList.add('active');
            video.play().catch(err => console.log('Autoplay prevented:', err));
        } else {
            video.classList.remove('active');
            video.pause();
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function autoplayCarousel() {
    moveCarousel(1);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(autoplayCarousel, 5000);
}

// ============ TESTIMONIALS CAROUSEL ============
let currentTestimonialIndex = 0;
const totalTestimonials = 10;
let testimonialAutoplayInterval;

function slideTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    // Wrap around
    if (currentTestimonialIndex >= totalTestimonials) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = totalTestimonials - 1;
    }
    
    updateTestimonials();
    resetTestimonialAutoplay();
}

function currentTestimonial(index) {
    currentTestimonialIndex = index;
    updateTestimonials();
    resetTestimonialAutoplay();
}

function updateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonials-carousel .testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonialIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    dots.forEach((dot, index) => {
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function autoplayTestimonials() {
    slideTestimonial(1);
}

function resetTestimonialAutoplay() {
    clearInterval(testimonialAutoplayInterval);
    testimonialAutoplayInterval = setInterval(autoplayTestimonials, 6000);
}

// ============ CARD IMAGE CAROUSEL ============
// Removed - cards now display single animated image

// ============ ANIMATED COUNTER ============
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Number of steps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 30);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.classList.toString().includes('stat-number') ? 'counter 1s ease-out' : 'slideUp 0.8s ease-out';
            
            if (entry.target.classList.contains('stat-card')) {
                // Start counter animation when stats section is visible
                setTimeout(animateCounter, 200);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.slide-up, .fade-in, .stat-card, .card, .feature-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ============ INITIALIZE CAROUSEL ============
    updateCarousel();
    resetAutoplay();
    
    // ============ INITIALIZE TESTIMONIALS CAROUSEL ============
    updateTestimonials();
    resetTestimonialAutoplay();
    
    // Pause testimonials autoplay on hover
    const testimonialCarousel = document.querySelector('.testimonials-carousel-wrapper');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', function() {
            clearInterval(testimonialAutoplayInterval);
        });
        testimonialCarousel.addEventListener('mouseleave', function() {
            resetTestimonialAutoplay();
        });
    }
    
    // ============ INITIALIZE VIDEOS ============
    const allVideos = document.querySelectorAll('.gallery-video');
    allVideos.forEach((video, index) => {
        video.muted = true;
        video.loop = true;
        if (index === 0) {
            video.play().catch(err => console.log('Autoplay prevented'));
        }
    });
    
    // Pause autoplay on hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        carouselWrapper.addEventListener('mouseleave', function() {
            resetAutoplay();
        });
    }

    // Smooth scroll links
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

    // Add hover animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(event) {
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper && carouselWrapper.offsetParent !== null) { // Check if visible
            if (event.key === 'ArrowLeft') {
                moveCarousel(-1);
            } else if (event.key === 'ArrowRight') {
                moveCarousel(1);
            }
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add scroll animations for cards
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Mobile menu toggle functionality
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Call animation on page load
window.addEventListener('load', function() {
    // Trigger initial animations
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach((el, index) => {
        el.style.animation = `fadeIn 1s ease-out ${index * 0.2}s both`;
    });
});

// Enhance button click feedback
document.querySelectorAll('.btn-primary, .cta-btn, .cta-btn-large').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============ WhatsApp Integration ============
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-float-button');
    
    if (whatsappButton) {
        // Add click tracking
        whatsappButton.addEventListener('click', function(e) {
            console.log('WhatsApp button clicked');
            // Track analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click');
            }
        });

        // Add hover effect with pulse
        const icon = whatsappButton.querySelector('.whatsapp-icon');
        whatsappButton.addEventListener('mouseenter', function() {
            icon.style.animation = 'bounce 0.6s ease-in-out';
        });
    }

    // WhatsApp Pre-defined Messages
    const whatsappMessages = {
        booking: "Hello GoaDreams! 👋 I want to book a tour.",
        inquiry: "Hi! I have a question about your tour packages.",
        custom: "Hello GoaDreams! Tell me more about your services."
    };

    // Add WhatsApp button interactivity
    const ctaButton = document.querySelector('.cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Option to open WhatsApp with pre-filled message
            setTimeout(() => {
                const whatsappUrl = `https://wa.me/918390603468?text=${encodeURIComponent(whatsappMessages.booking)}`;
                console.log('Redirecting to WhatsApp for booking');
            }, 300);
        });
    }

    // Book Now button WhatsApp integration
    const bookButtons = document.querySelectorAll('.btn-primary');
    bookButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            const packageName = this.closest('.card')?.querySelector('h3')?.textContent || 'Tour Package';
            const message = `Hello GoaDreams! 👋 I'm interested in booking the "${packageName}". Please provide more details.`;
            const whatsappUrl = `https://wa.me/918390603468?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp (in real scenario)
            console.log('WhatsApp Message:', message);
        });
    });

    // WhatsApp Chat Availability Status
    function updateWhatsAppStatus() {
        const currentHour = new Date().getHours();
        const isBusinessHours = currentHour >= 9 && currentHour <= 22; // 9 AM to 10 PM
        
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            if (isBusinessHours) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.pointerEvents = 'auto';
            } else {
                // Still visible but with status indicator
                whatsappFloat.style.opacity = '0.8';
            }
        }
    }

    updateWhatsAppStatus();
    setInterval(updateWhatsAppStatus, 60000); // Check every minute

    // WhatsApp Widget - Show/Hide functionality
    let isWhatsAppWidgetOpen = false;

    function toggleWhatsAppWidget() {
        const widget = document.querySelector('.whatsapp-chat-container');
        if (widget) {
            isWhatsAppWidgetOpen = !isWhatsAppWidgetOpen;
            widget.style.display = isWhatsAppWidgetOpen ? 'block' : 'none';
        }
    }

    // Display initial message (if widget added)
    function initializeWhatsAppWidget() {
        const container = document.querySelector('.whatsapp-chat-container');
        if (!container) {
            // Only create if it doesn't exist
            if (document.body) {
                const widgetHtml = `
                    <div class="whatsapp-chat-container" style="display: none;">
                        <div class="whatsapp-chat-header">
                            <span>GoaDreams Support</span>
                            <span style="cursor: pointer; font-size: 18px;">×</span>
                        </div>
                        <div class="whatsapp-chat-body">
                            <div class="whatsapp-message">
                                <strong>Welcome to GoaDreams! 🎉</strong><br>
                                How can we help you today?<br><br>
                                <em>• Book a tour</em><br>
                                <em>• Get information</em><br>
                                <em>• Ask questions</em>
                            </div>
                        </div>
                    </div>
                `;
                // Don't insert - keep simple WhatsApp button only
            }
        }
    }

    initializeWhatsAppWidget();

    // Add focus effect to WhatsApp button on page scroll
    window.addEventListener('scroll', function() {
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            if (window.scrollY > 500) {
                whatsappFloat.style.animation = 'slideInWhatsApp 0.6s ease-out';
            }
        }
    });

    // Mobile detection and optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // Enhance WhatsApp button for mobile
        const whatsappBtn = document.querySelector('.whatsapp-float-button');
        if (whatsappBtn) {
            whatsappBtn.style.padding = '12px 16px';
            // Auto-open chat on mobile more easily
            whatsappBtn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            whatsappBtn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
});

// ============ SERVICE DETAILS MODAL ============
const serviceDetails = {
    pickup: {
        title: '🚗 PICKUP & DROP SERVICES',
        price: 'Starting ₹1,149',
        items: [
            '🚆 Thivim Railway Station – ₹1,149',
            '🚆 Karmali railway station – ₹1,499',
            '✈️ Manohar International Airport (Mopa Airport) – ₹1,549',
            '✈️ Dabolim Airport – ₹1,749',
            '🚆 Madgaon Junction railway station – ₹1,799',
            '🚆 Vasco da Gama railway station – ₹1,799',
            
        ],
        description: 'Affordable and reliable pickup & drop services from any location. We serve all major airports and railway stations in Goa.'
    },
    northgoa: {
        title: '🌊 NORTH GOA EXPLORER – ₹2,799 (9 Points)',
        price: '₹2,799',
        items: [
            '🏰 Aguada Fort',
            '🐬 Dolphin Point',
            '🌊 Siquerim Beach',
            '🌴 Candolim Beach',
            '❄️ Snow Park Goa',
            '🎉 Baga Beach',
            '🌅 Anjuna Beach',
            '🦖 Thunder World',
            '🏞 Chapora Fort'
        ],
        description: 'Enjoy a full day exploring North Goa\'s most iconic attractions, beaches, and entertainment spots. Includes all major tourist destinations.'
    },
    southgoa: {
        title: '🌴 SOUTH GOA SERENITY – ₹2,999 (9 Points)',
        price: '₹2,999',
        items: [
            '🛕 Mangeshi Temple',
            '🛕 Shri Balaji Temple',
            '🌿 Sahakari Spice Farm',
            '⛪ Basilica of Bom Jesus',
            '🎨 Fontainhas (Panjim)',
            '🤍 Our Lady of the Immaculate Conception Church',
            '🌊 Miramar Beach',
            '🌅 Dona Paula',
            '🚢 Mandovi River Cruise (Sunset Cruise)'
        ],
        description: 'Experience South Goa\'s spiritual and cultural heritage. Includes temples, historic churches, scenic beaches, and a romantic sunset cruise.'
    },
    northwestbeaches: {
        title: '🌅 NORTH-WEST EXPLORER – ₹4,499',
        price: '₹4,499',
        items: [
            '🌴 Arambol Beach',
            '🌊 Querim Beach (Turtle Beach)',
            '🐢 Morjim Beach'
        ],
        description: 'Discover the pristine and less crowded beaches of North-West Goa. Perfect for those seeking tranquility and natural beauty.'
    },
    southeastbeaches: {
        title: '🌊 SOUTH–EAST EXPLORER – ₹5,499',
        price: '₹5,499',
        items: [
            '🌴 Palolem Beach',
            '🦋 Butterfly Beach',
            '🌊 Cola Beach',
            '🌴 Cabo de Rama Beach'
        ],
        description: 'Explore South Goa\'s most exclusive and scenic beaches. Includes hidden coves, pristine sands, and stunning coastal views.'
    },
    watersports: {
        title: '🌊 WATER SPORTS PACKAGE – ₹1,999 / per person',
        price: '₹1,999 per person',
        items: [
            '🚤 Jet Ski',
            '🚤 Speed Boat',
            '🪂 Parasailing (Premium)',
            '🍌 Banana Ride',
            '💥 Bumper Ride'
        ],
        description: 'Experience thrilling water sports activities at Goa\'s best beaches. All equipment and professional instructors included.'
    },
    scubadiving: {
        title: '🤿 SCUBA DIVING PACKAGE (Island Explorer) – ₹1,499 / per person',
        price: '₹1,499 per person',
        items: [
            '✔️ Breakfast Included',
            '✔️ Meal Included',
            '✔️ Water Sports',
            '✔️ Scuba Diving Experience'
        ],
        description: 'Dive into the underwater world of Goa. Includes professional training, equipment, meals, and other water sports activities.'
    },
    dudhsagar: {
        title: '🌊 DUDHSAGAR EXPLORER – ₹5,299',
        price: '₹5,299',
        items: [
            '🏞 Dudhsagar Falls',
            '🌿 Spice Plantation',
            '⛪ Old Goa Church'
        ],
        description: 'Witness the majestic Dudhsagar waterfall and explore Goa\'s natural and cultural heritage. One of Goa\'s must-visit destinations.'
    },
    dinnercruise: {
        title: '🚢 DINNER CRUISE EXPERIENCE',
        price: 'On Request',
        items: [
            '🍽️ Gourmet Dinner',
            '🌅 Sea Sunset View',
            '🎶 Music & Entertainment',
            '🌙 Evening Luxury Experience'
        ],
        description: 'Enjoy a romantic and luxurious dinner cruise on the Arabian Sea. Perfect for couples, anniversaries, and special occasions.'
    },
    nightlife: {
        title: '🎉 PARTY CLUB & NIGHTLIFE',
        price: 'On Request',
        items: [
            '🎉 Premium Club Entry',
            '🍻 VIP Access',
            '🎊 Party Package',
            '🎵 Live DJ & Music'
        ],
        description: 'Experience Goa\'s vibrant nightlife with VIP access to premium clubs. Perfect for party lovers looking for an unforgettable night.'
    }
};

function showDetails(serviceId) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    const details = serviceDetails[serviceId];

    if (details) {
        const itemsHTML = details.items.map(item => `<li>${item}</li>`).join('');
        
        modalBody.innerHTML = `
            <h2 class="service-details-title">${details.title}</h2>
            <p class="service-details-price">${details.price}</p>
            <p class="service-details-description">${details.description}</p>
            <ul class="service-details-list">
                ${itemsHTML}
            </ul>
            <div class="modal-action-buttons">
                <button class="btn-book" onclick="bookService('${serviceId}')">Book Now</button>
                <button class="btn-close-modal" onclick="closeDetails()">Close</button>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDetails() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function bookService(serviceId) {
    const details = serviceDetails[serviceId];
    const message = `Hi GoaDreams! I'm interested in booking: ${details.title}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/918390603468?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeDetails();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDetails();
    }
});
