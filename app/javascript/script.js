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
    
            projectItems.forEach(item => {
                if (item.dataset.category !== "uxui") item.style.display = "none";
            });
    
            filterButtons.forEach(button => {
                button.addEventListener("click", () => {
                    if (button.classList.contains("is-active")) return;
                    filterButtons.forEach(btn => btn.classList.remove("is-active"));
                    button.classList.add("is-active");
                    const filter = button.id.replace("filter__button-", "");
    
                    const visibleItems = Array.from(projectItems).filter(i => i.style.display !== "none");
                    gsap.to(visibleItems, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            projectItems.forEach(item => {
                                if (filter === "all" || item.dataset.category === filter) {
                                    item.style.display = "block";
                                    item.style.opacity = 0;
                                } else {
                                    item.style.display = "none";
                                }
                            });
    
                            const newItems = Array.from(projectItems).filter(i => i.style.display !== "none");
                            gsap.to(newItems, { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 });
    
                            ScrollTrigger.refresh();
                            const footerTop = document.querySelector(".footer").getBoundingClientRect().top;
                            if (footerTop < window.innerHeight * 0.95) playBounce();
                        }
                    });
                });
            });
    
            document.getElementById("filter__button-uxui").classList.add("is-active");
    
            setTimeout(() => {
                const footerTop = document.querySelector(".footer").getBoundingClientRect().top;
                if (footerTop < window.innerHeight * 0.95) playBounce();
            }, 300);
        }
    
        // Case study + project page animations
        const animateCaseStudy = (wrapper, selectors) => {
            if (!document.querySelector(wrapper)) return;
            selectors.forEach(({ el, y = 30, stagger }) => {
                const els = document.querySelectorAll(el);
                if (!els.length) return;
                gsap.from(el, {
                    scrollTrigger: { trigger: els[0], start: "top 65%" },
                    y,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    ...(stagger && { stagger })
                });
            });
        };
    
        // Shared selectors across all case studies
        const sharedSelectors = [
            { el: ".case-study__project-scope .case-study__step", y: 30, stagger: 0.1 },
            { el: ".industry-insights__section", y: 30, stagger: 0.15 },
            { el: ".competitive-audit__table", y: 30 },
            { el: ".analysis__card", y: 30, stagger: 0.1 },
            { el: ".case-study-quote", y: 30, stagger: 0.1 },
            { el: ".case-study__interview-takeaways li", y: 20, stagger: 0.08 },
            { el: ".case-study__problem-statement .column.is-8 p", y: 20, stagger: 0.1 },
            { el: ".main-concerns__concerns-box", y: 30, stagger: 0.1 },
            { el: ".project-goals__graph", y: 30 },
            { el: ".brainstorming-card", y: 20, stagger: 0.05 },
            { el: ".features__features-table", y: 30 },
            { el: ".case-study-feature", y: 30, stagger: 0.1 },
            { el: ".user-flows__img", y: 30, stagger: 0.1 },
            { el: ".case-study__desing-system .column.is-8 img", y: 20, stagger: 0.1 },
            { el: ".hifi-wireframes__main-visual .container > *", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__section-description", y: 30 },
        ];
    
        // Island Finance full
        animateCaseStudy(".case-study__if-web .case-study__project-scope-wrapper", [
            ...sharedSelectors,
            { el: ".hifi-wireframes__loan-options", y: 30 },
            { el: ".hifi-wireframes__loan-application", y: 30 },
            { el: ".hifi-wireframes__account", y: 30 },
            { el: ".hifi-wireframes__other-services .other-services__text-wrapper", y: 30 },
            { el: ".hifi-wireframes__company .company__text-wrapper", y: 30 },
        ]);
    
        // Island Finance abbreviated
        animateCaseStudy(".case-studies__navigation-wrapper.if-web-short", [
            { el: ".case-study__details-wrapper", y: 30 },
            { el: ".case-study__intro-text-wrapper p", y: 20, stagger: 0.1 },
            { el: ".insight__wrapper", y: 30, stagger: 0.12 },
            { el: ".bubble__wrapper", y: 30, stagger: 0.1 },         // ADD THIS
            { el: ".research__wrapper ul li", y: 20, stagger: 0.08 }, // ADD THIS
            { el: ".competitive-audit__table", y: 30 },
            { el: ".analysis__card", y: 30, stagger: 0.1 },
            { el: ".case-study-quote", y: 30, stagger: 0.1 },
            { el: ".case-study__interview-takeaways li", y: 20, stagger: 0.08 },
            { el: ".main-concerns__concerns-box", y: 30, stagger: 0.1 },
            { el: ".project-goals__graph", y: 30 },
            { el: ".case-study-feature", y: 30, stagger: 0.1 },
            { el: ".user-flows__img", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__main-visual .container > *", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__loan-options", y: 30 },
            { el: ".hifi-wireframes__account.short", y: 30 },
        ]);
    
        // Dr. Harvey's full case study
        animateCaseStudy(".case-study__dr-harveys .case-study__project-scope-wrapper", [
            ...sharedSelectors,
            { el: ".hifi-wireframes__sign-up .column", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__education", y: 30 },
            { el: ".hifi-wireframes__product-discovery", y: 30 },
            { el: ".hifi-wireframes__conversions", y: 30 },
            { el: ".hifi-wireframes__support", y: 30 },
        ]);
        
        // Dr. Harvey's abbreviated
        animateCaseStudy(".case-study__dr-harveys .case-study__short-introduction", [
            { el: ".short-introduction__section", y: 30, stagger: 0.12 },
            { el: ".competitive-audit__table", y: 30 },
            { el: ".analysis__card", y: 30, stagger: 0.1 },
            { el: ".case-study-quote", y: 30, stagger: 0.1 },
            { el: ".main-concerns__concerns-box", y: 30, stagger: 0.1 },
            { el: ".project-goals__graph", y: 30 },
            { el: ".case-study-feature", y: 30, stagger: 0.1 },
            { el: ".user-flows__img", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__main-visual .container > *", y: 30, stagger: 0.1 },
            { el: ".hifi-wireframes__education", y: 30 },
            { el: ".hifi-wireframes__product-discovery", y: 30 },
            { el: ".hifi-wireframes__conversions", y: 30 },
        ]);
    
        // Project pages
        const animateProject = (wrapper, extras = []) => {
            animateCaseStudy(wrapper, [
                { el: `${wrapper} .project-details__colors-wrapper`, y: 30 },
                { el: `${wrapper} .project-details__gallery-wrapper .columns`, y: 30, stagger: 0.1 },
                { el: `${wrapper} .project-details__description-wrapper`, y: 30, stagger: 0.12 },
                { el: `${wrapper} .project-details__objectives-wrapper`, y: 30 },
                { el: `${wrapper} .project-details__navigation-wrapper`, y: 20 },
                ...extras
            ]);
        };
    
        animateProject(".project__ocean-spray", [
            { el: ".project-details__objectives-wrapper .project-details_objectives", y: 20, stagger: 0.1 },
            { el: ".ron-pon__wrapper", y: 30 },
        ]);
    
        animateProject(".project__cause-x-effect");
        animateProject(".project__everybodys-free");
    
        animateProject(".project__social-media", [
            { el: ".project-details__company-wrapper", y: 30, stagger: 0.15 },
        ]);
    
        animateProject(".project__intimates");
    
        animateProject(".project__wyndham", [
            { el: ".project-details__img-wrapper", y: 20, stagger: 0.08 },
        ]);
    
        window.addEventListener('load', () => { ScrollTrigger.refresh(); });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.addEventListener('load', () => ScrollTrigger.refresh());
        });

        setTimeout(() => { ScrollTrigger.refresh(); }, 500);
    }
    // Number counter animation on scroll
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const formatNumber = (n) => n >= 1000 ? n.toLocaleString() : n.toString();

        const animateCounter = (el) => {
            const target = +el.dataset.count;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duration = 1500;
            const start = performance.now();

            const tick = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = prefix + formatNumber(Math.round(eased * target)) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => observer.observe(el));
    }

});