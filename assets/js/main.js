/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/

const blurHeader = () => {
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const contactButton = document.getElementById('contact-button');

let isRequestAllowed = true;
let timeout;

const sendEmail = (e) => {
    e.preventDefault();

    if (!isRequestAllowed) {
        const remainingTime = Math.ceil((timeout - Date.now()) / 1000);
        contactMessage.textContent = `Please wait another ${remainingTime} seconds.`;
        return;
    }

    isRequestAllowed = false;
    contactButton.disabled = true;
    timeout = Date.now() + 60000; // Set timeout for 60 seconds

    emailjs.sendForm('service_2b0hrch', 'template_1dj69vk', '#contact-form', 'irh4cpRLG-92xnrW0')
        .then(() => {
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅';

            // Remove message after 5 seconds
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);

            // Clear input field
            contactForm.reset();
        }, () => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌';
        });

    // Start the countdown for 60 seconds
    const countdown = setInterval(() => {
        const remainingTime = Math.ceil((timeout - Date.now()) / 1000);
        if (remainingTime <= 0) {
            clearInterval(countdown);
            contactMessage.textContent = '';
            isRequestAllowed = true;
            contactButton.disabled = false;
        } else {
            contactMessage.textContent = `Please wait another ${remainingTime} seconds.`;
        }
    }, 1000);
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    //When the scroll is higher than 350 viewport height, add the show-scroll class to the tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true //Animations repeat
}
)

sr.reveal(`.home__data, .experience, .skills, .contact__container`)

sr.reveal(`.home__img`, {delay: 600})
sr.reveal(`.home__scroll`, {delay: 800})
sr.reveal(`.work__card, .services__card`, {interval: 100})
sr.reveal(`.about__content`, {origin: 'right'})
sr.reveal(`.about__img`, {origin: 'left'})
