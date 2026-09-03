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
                            gsap.to(newItems, { opacity: 1, duration: 0.3, ease: "power2.out" });

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
        // Sticky section headings
        document.querySelectorAll('.case-study__feature').forEach(feature => {
            const heading = feature.querySelector('.section-heading__wrapper');
            if (!heading) return;

            ScrollTrigger.create({
                trigger: feature,
                start: "top top",
                end: "bottom 70%",
                pin: heading,
                pinSpacing: false,
                anticipatePin: 1,
                fastScrollEnd: true,
            });
        });
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