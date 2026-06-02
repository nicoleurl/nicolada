document.addEventListener('turbo:load', () => {

    const variableContact = document.querySelector('#contact__variable-text');
    if (variableContact) {
        const contactWords = ["meaningful", "creative", "impactful", "daring", "exciting", "original"];
        let lastHeaderContact = -1;
        function contactHeader() {
            lastHeaderContact = (lastHeaderContact + 1) % contactWords.length;
            variableContact.innerText = contactWords[lastHeaderContact];
        }
        contactHeader();
        setInterval(contactHeader, 1500);
    } else {
        console.log("Contact header element not found, skipping contact header logic.");
    }

    const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    el.classList.toggle('is-active');
                    targetElement.classList.toggle('is-active');
                }
            });
        });
    }

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

        // Footer bounce animation
        let bounced = false;
        let playBounce = () => {};

        if (document.querySelector(".footer__bouncy-top")) {
            const droopyFill = "M0,40 Q720,120 1440,40 L1440,160 L0,160 Z";
            const flatFill   = "M0,40 Q720,40 1440,40 L1440,160 L0,160 Z";
            const droopyLine = "M0,40 Q720,120 1440,40";
            const flatLine   = "M0,40 Q720,40 1440,40";

            gsap.set("#bouncy-path", { attr: { d: droopyFill } });
            gsap.set("#bouncy-line", { attr: { d: droopyLine } });

            playBounce = () => {
                if (bounced) return;
                bounced = true;
                gsap.to("#bouncy-path", { attr: { d: flatFill }, duration: 3.5, ease: "elastic.out(1.3, 0.3)", overwrite: true });
                gsap.to("#bouncy-line", { attr: { d: flatLine }, duration: 3.5, ease: "elastic.out(1.3, 0.3)", overwrite: true });
            };

            const checkFooter = () => {
                const footerTop = document.querySelector(".footer").getBoundingClientRect().top;
                if (footerTop < window.innerHeight * 0.95) {
                    playBounce();
                    window.removeEventListener("scroll", checkFooter);
                }
            };

            window.addEventListener("scroll", checkFooter);
            setTimeout(checkFooter, 300);
        }

        // Hero draggable SVGs
        Draggable.create([
            ".svg-wrapper__hello",
            ".svg-wrapper__flower",
            ".svg-wrapper__diamond-circle",
            ".svg-wrapper__star"
        ], { type: "x,y", bounds: ".hero__wrapper", inertia: false, cursor: "grab", activeCursor: "grabbing" });

        // Projects section
        if (document.querySelector(".projects__wrapper")) {
            gsap.from(".projects__title", { scrollTrigger: { trigger: ".projects__wrapper", start: "top 80%" }, y: 30, opacity: 0, duration: 0.6, ease: "power2.out" });
            gsap.from(".project-button", { scrollTrigger: { trigger: ".projects__wrapper", start: "top 70%" }, y: 50, opacity: 0, duration: 0.7, ease: "power2.out" });
            gsap.from(".projects__wrapper .btn__wrapper", { scrollTrigger: { trigger: ".projects__wrapper .btn__wrapper", start: "top 90%" }, y: 20, opacity: 0, duration: 0.5, ease: "power2.out" });
        }

        // About home section
        if (document.querySelector(".about-home__wrapper")) {
            gsap.from(".about-home__img-wrapper", { scrollTrigger: { trigger: ".about-home__wrapper", start: "top 85%", once: true }, x: -40, opacity: 0, duration: 0.8, ease: "power2.out" });
            gsap.from(".about-home__text-wrapper", { scrollTrigger: { trigger: ".about-home__wrapper", start: "top 85%", once: true }, x: 40, opacity: 0, duration: 0.8, ease: "power2.out" });
        }

        // Brands section
        if (document.querySelector(".brands-home__wrapper")) {
            gsap.from(".brands__title", { scrollTrigger: { trigger: ".brands-home__wrapper", start: "top 60%" }, y: 30, opacity: 0, duration: 0.6, ease: "power2.out" });
            gsap.from(".brands-home__img-wrapper", { scrollTrigger: { trigger: ".brands-home__wrapper", start: "top 60%" }, y: 20, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.03 });
        }

        // Contact section
        if (document.querySelector(".contact-home__wrapper")) {
            gsap.from(".contact-home__wrapper h2, .contact-home__wrapper .btn__wrapper", { scrollTrigger: { trigger: ".contact-home__wrapper", start: "top 80%" }, y: 30, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.15 });
        }

        // About page
        if (document.querySelector(".about__wrapper")) {
            gsap.from(".about__img-container", { scrollTrigger: { trigger: ".about__wrapper", start: "top 75%", once: true }, x: -50, opacity: 0, duration: 0.9, ease: "power2.out" });
            gsap.from(".about__text-wrapper h1", { scrollTrigger: { trigger: ".about__wrapper", start: "top 75%", once: true }, y: 30, opacity: 0, duration: 0.7, ease: "power2.out" });
            gsap.from(".about__text-wrapper p", { scrollTrigger: { trigger: ".about__wrapper", start: "top 75%", once: true }, y: 30, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 });
        }

        // Projects filter
        if (document.querySelector(".projects-page__wrapper")) {
            const filterButtons = document.querySelectorAll(".filter__button");
            const projectItems = document.querySelectorAll(".filtered-columns .column");
        
            // hide graphic on load
            projectItems.forEach(item => {
                if (item.dataset.category !== "uxui") {
                    item.style.display = "none";
                }
            });
        
            filterButtons.forEach(button => {
                button.addEventListener("click", () => {
                    if (button.classList.contains("is-active")) return;
                    filterButtons.forEach(btn => btn.classList.remove("is-active"));
                    button.classList.add("is-active");
                    const filter = button.id.replace("filter__button-", "");
        
                    // fade out visible items
                    const visibleItems = Array.from(projectItems).filter(i => i.style.display !== "none");
                    gsap.to(visibleItems, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            // swap items
                            projectItems.forEach(item => {
                                if (filter === "all" || item.dataset.category === filter) {
                                    item.style.display = "block";
                                    item.style.opacity = 0;
                                } else {
                                    item.style.display = "none";
                                }
                            });
        
                            // fade in new items
                            const newItems = Array.from(projectItems).filter(i => i.style.display !== "none");
                            gsap.to(newItems, {
                                opacity: 1,
                                duration: 0.3,
                                ease: "power2.out",
                                stagger: 0.05
                            });
        
                            ScrollTrigger.refresh();
                            const footerTop = document.querySelector(".footer").getBoundingClientRect().top;
                            if (footerTop < window.innerHeight * 0.95) {
                                playBounce();
                            }
                        }
                    });
                });
            });
        
            document.getElementById("filter__button-uxui").classList.add("is-active");
        
            setTimeout(() => {
                const footerTop = document.querySelector(".footer").getBoundingClientRect().top;
                if (footerTop < window.innerHeight * 0.95) {
                    playBounce();
                }
            }, 300);
        }
    }

});