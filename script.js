/*==========================================================
  JC PRODUCT
  SCRIPT.JS
  PART 01
==========================================================*/

'use strict';

/*==========================================================
DOM
==========================================================*/

const nav = document.querySelector('.nav');

const hero = document.querySelector('.hero');

const heroBg = document.getElementById('heroBg');

const revealElements = document.querySelectorAll(
    '.section__title, .grid__item, .about__img, .about__text, .form, .footer'
);

/*==========================================================
NAVIGATION SCROLL
==========================================================*/

const updateNavigation = () => {

    if (window.scrollY > 60) {

        nav.classList.add('scrolled');

    } else {

        nav.classList.remove('scrolled');

    }

};

updateNavigation();

window.addEventListener(
    'scroll',
    updateNavigation,
    {
        passive: true
    }
);

/*==========================================================
SMOOTH SCROLL
==========================================================*/

document
.querySelectorAll('a[href^="#"]')
.forEach(link => {

    link.addEventListener('click', e => {

        const targetId = link.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: 'smooth',

            block: 'start'

        });

    });

});

/*==========================================================
HERO PARALLAX
==========================================================*/

let lastScroll = 0;

const heroParallax = () => {

    const current = window.pageYOffset;

    if (Math.abs(current - lastScroll) < 2) return;

    lastScroll = current;

    if (!heroBg) return;

    heroBg.style.transform =
        `translateY(${current * 0.25}px) scale(1.08)`;

};

window.addEventListener(
    'scroll',
    heroParallax,
    {
        passive: true
    }
);

/*==========================================================
SECTION REVEAL
==========================================================*/

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add('show');

            revealObserver.unobserve(entry.target);

        });

    },

    {

        threshold: 0.15,

        rootMargin: '0px 0px -80px 0px'

    }

);

revealElements.forEach(element => {

    if (!element) return;

    element.classList.add('fade');

    revealObserver.observe(element);

});

/*==========================================================
PORTFOLIO STAGGER
==========================================================*/

const portfolioItems = document.querySelectorAll('.grid__item');

const portfolioObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const index = [...portfolioItems].indexOf(entry.target);

            entry.target.style.transitionDelay =
                `${index * 70}ms`;

            entry.target.classList.add('show');

            portfolioObserver.unobserve(entry.target);

        });

    },

    {

        threshold: 0.12

    }

);

portfolioItems.forEach(item => {

    portfolioObserver.observe(item);

});

/*==========================================================
SCROLL INDICATOR
==========================================================*/

const scrollIndicator = document.querySelector('.hero__scroll');

if (scrollIndicator) {

    scrollIndicator.addEventListener('click', () => {

        const portfolio = document.getElementById('portfolio');

        if (!portfolio) return;

        portfolio.scrollIntoView({

            behavior: 'smooth'

        });

    });

}

/*==========================================================
WINDOW RESIZE
==========================================================*/

window.addEventListener(

    'resize',

    () => {

        heroParallax();

    },

    {

        passive: true

    }

);

/*==========================================================
END OF PART 01
==========================================================*/ 
/*==========================================================
LIGHTBOX
PART 02
==========================================================*/

const lightbox = document.getElementById('lightbox');

const lightboxImage = document.getElementById('lbImg');

const lightboxClose = document.getElementById('lbClose');

const lightboxPrev = document.getElementById('lbPrev');

const lightboxNext = document.getElementById('lbNext');

const galleryImages = [
    ...document.querySelectorAll('.grid__item img')
];

let currentImage = 0;

let touchStartX = 0;

let touchEndX = 0;

/*==========================================================
OPEN
==========================================================*/

function openLightbox(index){

    if(!lightbox) return;

    currentImage = index;

    lightboxImage.src = galleryImages[index].src;

    lightbox.classList.add('active');

    document.body.style.overflow = 'hidden';

}

/*==========================================================
CLOSE
==========================================================*/

function closeLightbox(){

    lightbox.classList.remove('active');

    document.body.style.overflow = '';

}

/*==========================================================
NEXT
==========================================================*/

function nextImage(){

    currentImage++;

    if(currentImage >= galleryImages.length){

        currentImage = 0;

    }

    lightboxImage.src = galleryImages[currentImage].src;

}

/*==========================================================
PREVIOUS
==========================================================*/

function previousImage(){

    currentImage--;

    if(currentImage < 0){

        currentImage = galleryImages.length - 1;

    }

    lightboxImage.src = galleryImages[currentImage].src;

}

/*==========================================================
IMAGE CLICK
==========================================================*/

galleryImages.forEach((image,index)=>{

    image.addEventListener('click',()=>{

        openLightbox(index);

    });

});

/*==========================================================
BUTTONS
==========================================================*/

if(lightboxClose){

    lightboxClose.addEventListener('click',closeLightbox);

}

if(lightboxNext){

    lightboxNext.addEventListener('click',nextImage);

}

if(lightboxPrev){

    lightboxPrev.addEventListener('click',previousImage);

}

/*==========================================================
CLICK OUTSIDE
==========================================================*/

if(lightbox){

    lightbox.addEventListener('click',(event)=>{

        if(event.target===lightbox){

            closeLightbox();

        }

    });

}

/*==========================================================
KEYBOARD
==========================================================*/

document.addEventListener('keydown',(event)=>{

    if(!lightbox.classList.contains('active')) return;

    switch(event.key){

        case 'Escape':

            closeLightbox();

        break;

        case 'ArrowRight':

            nextImage();

        break;

        case 'ArrowLeft':

            previousImage();

        break;

    }

});

/*==========================================================
TOUCH
==========================================================*/

if(lightbox){

    lightbox.addEventListener('touchstart',(event)=>{

        touchStartX = event.changedTouches[0].screenX;

    },{passive:true});

    lightbox.addEventListener('touchend',(event)=>{

        touchEndX = event.changedTouches[0].screenX;

        const distance = touchEndX - touchStartX;

        if(Math.abs(distance)<60) return;

        if(distance<0){

            nextImage();

        }else{

            previousImage();

        }

    },{passive:true});

}

/*==========================================================
MOUSE WHEEL
==========================================================*/

if(lightbox){

    lightbox.addEventListener('wheel',(event)=>{

        if(event.deltaY>0){

            nextImage();

        }else{

            previousImage();

        }

    },{passive:true});

}

/*==========================================================
PRELOAD
==========================================================*/

galleryImages.forEach(image=>{

    const preload = new Image();

    preload.src = image.src;

});

/*==========================================================
END OF PART 02
==========================================================*/
/*==========================================================
CONTACT FORM
PART 03
==========================================================*/

const contactForm = document.getElementById('contactForm');

if(contactForm){

    contactForm.addEventListener('submit',handleFormSubmit);

}

function handleFormSubmit(event){

    event.preventDefault();

    const formData = new FormData(contactForm);

    const fields = [...contactForm.querySelectorAll('input, textarea')];

    let valid = true;

    fields.forEach(field=>{

        field.classList.remove('field-error');

        if(field.value.trim()===''){

            valid = false;

            field.classList.add('field-error');

        }

    });

    if(!valid){

        shakeForm();

        return;

    }

    const submitButton = contactForm.querySelector('.btn');

    if(submitButton){

        submitButton.disabled = true;

        submitButton.dataset.originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';

    }

    setTimeout(()=>{

        if(submitButton){

            submitButton.textContent = 'Message Sent';

        }

        contactForm.reset();

        setTimeout(()=>{

            if(submitButton){

                submitButton.disabled = false;

                submitButton.textContent =
                submitButton.dataset.originalText;

            }

        },1800);

    },1200);

}

/*==========================================================
FORM SHAKE
==========================================================*/

function shakeForm(){

    contactForm.classList.remove('form-shake');

    void contactForm.offsetWidth;

    contactForm.classList.add('form-shake');

}

/*==========================================================
ACTIVE NAVIGATION
==========================================================*/

const sections = document.querySelectorAll('section[id]');

const navigationLinks =
document.querySelectorAll('.nav__links a');

const navigationObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        navigationLinks.forEach(link=>{

            link.classList.remove('active');

            if(

                link.getAttribute('href') ===
                '#' + entry.target.id

            ){

                link.classList.add('active');

            }

        });

    });

},

{

    threshold:.45

}

);

sections.forEach(section=>{

    navigationObserver.observe(section);

});

/*==========================================================
BUTTON RIPPLE
==========================================================*/

document
.querySelectorAll('.btn')
.forEach(button=>{

    button.addEventListener('click',event=>{

        const ripple =
        document.createElement('span');

        ripple.className = 'ripple';

        const rect =
        button.getBoundingClientRect();

        const size =
        Math.max(rect.width,rect.height);

        ripple.style.width = size + 'px';

        ripple.style.height = size + 'px';

        ripple.style.left =
        event.clientX - rect.left - size/2 + 'px';

        ripple.style.top =
        event.clientY - rect.top - size/2 + 'px';

        button.appendChild(ripple);

        ripple.addEventListener(

            'animationend',

            ()=>{

                ripple.remove();

            }

        );

    });

});

/*==========================================================
IMAGE HOVER PARALLAX
==========================================================*/

portfolioItems.forEach(item=>{

    item.addEventListener('mousemove',event=>{

        const image =
        item.querySelector('img');

        if(!image) return;

        const rect =
        item.getBoundingClientRect();

        const x =
        (event.clientX - rect.left) / rect.width;

        const y =
        (event.clientY - rect.top) / rect.height;

        const rotateY =
        (x - .5) * 8;

        const rotateX =
        (.5 - y) * 8;

        image.style.transform =

        `scale(1.08)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)`;

    });

    item.addEventListener('mouseleave',()=>{

        const image =
        item.querySelector('img');

        if(!image) return;

        image.style.transform = '';

    });

});

/*==========================================================
PAGE VISIBILITY
==========================================================*/

document.addEventListener(

'visibilitychange',

()=>{

    if(document.hidden){

        document.body.classList.add('page-hidden');

    }else{

        document.body.classList.remove('page-hidden');

    }

});

/*==========================================================
PERFORMANCE
==========================================================*/

window.addEventListener(

'load',

()=>{

    document.body.classList.add('loaded');

});

/*==========================================================
END OF SCRIPT
==========================================================*/
