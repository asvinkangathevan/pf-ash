document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =========================================================
       1. OUTILS
    ========================================================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollBehavior = reduceMotion
        ? "auto"
        : "smooth";


    /* =========================================================
       2. ELEMENTS PRINCIPAUX
    ========================================================= */

    const header = $(".header-area");
    const nav = $(".navbar-modern");
    const menu = $(".mobile-menu");
    const navLinks = $$(".nav-link");
    const sections = $$("section[id]");


    /* =========================================================
       3. BARRE DE PROGRESSION
    ========================================================= */

    let progress = $(".scroll-progress");

    if (!progress) {

        progress = document.createElement("div");
        progress.className = "scroll-progress";

        document.body.prepend(progress);

    }


    function updateProgress() {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (window.scrollY / documentHeight) * 100
                : 0;

        progress.style.width =
            Math.min(100, Math.max(0, percentage)) + "%";

    }


    /* =========================================================
       4. PANNEAU TECHNIQUE HERO
    ========================================================= */

    const hero = $(".hero-content");

    if (
        hero &&
        !$(".hero-tech-panel", hero)
    ) {

        const panel =
            document.createElement("aside");

        panel.className =
            "hero-tech-panel";

        panel.innerHTML = `
            <div class="hero-tech-inner">

                <span class="tech-kicker">
                    SYSTEMS / NETWORK / SECURITY
                </span>

                <h2 class="tech-title">
                    Infrastructure IT
                </h2>

                <div class="tech-grid">

                    <div class="tech-chip">
                        <small>Formation</small>
                        <strong>BTS SIO</strong>
                    </div>

                    <div class="tech-chip">
                        <small>Option</small>
                        <strong>SISR</strong>
                    </div>

                    <div class="tech-chip">
                        <small>Domaine</small>
                        <strong>Systèmes</strong>
                    </div>

                    <div class="tech-chip">
                        <small>Domaine</small>
                        <strong>Réseaux</strong>
                    </div>

                </div>

                <div class="tech-status">
                    PORTFOLIO • 2026
                </div>

            </div>
        `;

        hero.appendChild(panel);

    }


    /* =========================================================
       5. NUMEROTATION DES SECTIONS
    ========================================================= */

    $$(".section-title").forEach(
        (title, index) => {

            title.dataset.number =
                String(index + 1).padStart(
                    2,
                    "0"
                );

        }
    );


    /* =========================================================
       6. MENU MOBILE
    ========================================================= */

    function closeMenu() {

        if (!nav) return;

        nav.classList.remove("open");

        if (!menu) return;

        menu.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = $("i", menu);

        if (icon) {

            icon.classList.add(
                "fa-bars"
            );

            icon.classList.remove(
                "fa-times"
            );

        }

    }


    function toggleMenu() {

        if (!nav || !menu) return;

        const isOpen =
            nav.classList.toggle("open");

        menu.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        const icon = $("i", menu);

        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-times",
                isOpen
            );

        }

    }


    if (menu) {

        menu.setAttribute(
            "role",
            "button"
        );

        menu.setAttribute(
            "tabindex",
            "0"
        );

        menu.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );

        menu.setAttribute(
            "aria-expanded",
            "false"
        );


        menu.addEventListener(
            "click",
            toggleMenu
        );


        menu.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    toggleMenu();

                }

            }
        );

    }


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =========================================================
       7. SCROLL FLUIDE
    ========================================================= */

    $$('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const id =
                    href.substring(1);

                const target =
                    document.getElementById(id);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        scrollBehavior,

                    block:
                        "start"
                });

                closeMenu();

            }
        );

    });


    /* =========================================================
       8. COMPETENCES
       VERSION ROBUSTE
    ========================================================= */

    const competencesSection =
        $("#competences");

    if (competencesSection) {

        const competencesContainer =
            $(".container", competencesSection);

        const categories =
            $$(".category-section", competencesSection);


        console.log(
            "[COMPETENCES] Catégories trouvées :",
            categories.length
        );


        if (
            competencesContainer &&
            categories.length > 0
        ) {

            /* -----------------------------------------
               Supprimer ancienne barre
            ----------------------------------------- */

            const existingTabs =
                $(".skills-tabs", competencesContainer);

            if (existingTabs) {
                existingTabs.remove();
            }


            /* -----------------------------------------
               Créer barre
            ----------------------------------------- */

            const tabs =
                document.createElement("div");

            tabs.className =
                "skills-tabs";

            tabs.setAttribute(
                "role",
                "tablist"
            );

            tabs.setAttribute(
                "aria-label",
                "Catégories de compétences"
            );


            /* -----------------------------------------
               Nettoyage initial
            ----------------------------------------- */

            categories.forEach(
                (category, index) => {

                    category.classList.remove(
                        "active-category"
                    );

                    category.removeAttribute(
                        "hidden"
                    );

                    category.setAttribute(
                        "role",
                        "tabpanel"
                    );

                    category.dataset.skillIndex =
                        String(index);


                    /*
                     * IMPORTANT :
                     * Les catégories ne doivent jamais
                     * dépendre du reveal global.
                     */

                    category
                        .querySelectorAll(
                            ".reveal-item"
                        )
                        .forEach(element => {

                            element.classList.remove(
                                "reveal-item",
                                "from-left",
                                "from-right",
                                "zoom-in"
                            );

                            element.classList.add(
                                "is-visible"
                            );

                        });

                }
            );


            /* -----------------------------------------
               Afficher une catégorie
            ----------------------------------------- */

            function showCategory(index) {

                const buttons =
                    $$(".skills-tab", tabs);


                categories.forEach(
                    (category, categoryIndex) => {

                        const active =
                            categoryIndex === index;


                        category.classList.toggle(
                            "active-category",
                            active
                        );


                        /*
                         * On force le display.
                         * Cela évite le problème
                         * de section vide.
                         */

                        category.style.display =
                            active
                                ? "block"
                                : "none";


                        category.style.opacity =
                            active
                                ? "1"
                                : "0";


                        category.style.visibility =
                            active
                                ? "visible"
                                : "hidden";


                        category.style.filter =
                            "none";


                        category.style.transform =
                            "none";


                        category.setAttribute(
                            "aria-hidden",
                            String(!active)
                        );


                        if (active) {

                            /*
                             * Force également les enfants.
                             */

                            const visibleChildren =
                                $$(
                                    [
                                        ".category-header",
                                        ".skills-flow",
                                        ".skill-badge"
                                    ].join(","),
                                    category
                                );


                            visibleChildren.forEach(
                                element => {

                                    element.style.opacity =
                                        "1";

                                    element.style.visibility =
                                        "visible";

                                    element.style.filter =
                                        "none";

                                    element.classList.add(
                                        "is-visible"
                                    );

                                }
                            );


                            /*
                             * Redémarrage de l'animation
                             * CSS à chaque changement.
                             */

                            category.style.animation =
                                "none";

                            void category.offsetWidth;

                            category.style.animation =
                                "";

                        }

                    }
                );


                buttons.forEach(
                    (button, buttonIndex) => {

                        const active =
                            buttonIndex === index;

                        button.classList.toggle(
                            "active",
                            active
                        );

                        button.setAttribute(
                            "aria-selected",
                            String(active)
                        );

                        button.tabIndex =
                            active
                                ? 0
                                : -1;

                    }
                );

            }


            /* -----------------------------------------
               Créer boutons
            ----------------------------------------- */

            categories.forEach(
                (category, index) => {

                    const heading =
                        $(
                            ".category-header h3",
                            category
                        );


                    const categoryName =
                        heading &&
                        heading.textContent.trim()

                            ? heading.textContent.trim()

                            : `Catégorie ${index + 1}`;


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";

                    button.className =
                        "skills-tab";

                    button.textContent =
                        categoryName;

                    button.dataset.index =
                        String(index);

                    button.setAttribute(
                        "role",
                        "tab"
                    );

                    button.setAttribute(
                        "aria-selected",
                        "false"
                    );


                    button.addEventListener(
                        "click",
                        () => {

                            showCategory(index);

                        }
                    );


                    /*
                     * Navigation clavier
                     */

                    button.addEventListener(
                        "keydown",
                        event => {

                            if (
                                event.key !==
                                    "ArrowRight" &&
                                event.key !==
                                    "ArrowLeft"
                            ) {
                                return;
                            }


                            event.preventDefault();


                            let nextIndex =
                                index;


                            if (
                                event.key ===
                                "ArrowRight"
                            ) {

                                nextIndex =
                                    (index + 1) %
                                    categories.length;

                            }


                            if (
                                event.key ===
                                "ArrowLeft"
                            ) {

                                nextIndex =
                                    (
                                        index -
                                        1 +
                                        categories.length
                                    ) %
                                    categories.length;

                            }


                            showCategory(
                                nextIndex
                            );


                            const nextButton =
                                $$(
                                    ".skills-tab",
                                    tabs
                                )[nextIndex];


                            if (nextButton) {
                                nextButton.focus();
                            }

                        }
                    );


                    tabs.appendChild(
                        button
                    );

                }
            );


            /* -----------------------------------------
               Insérer les onglets
            ----------------------------------------- */

            const sectionTitle =
                $(
                    ".section-title",
                    competencesSection
                );


            if (sectionTitle) {

                sectionTitle.insertAdjacentElement(
                    "afterend",
                    tabs
                );

            }

            else {

                competencesContainer.prepend(
                    tabs
                );

            }


            /* -----------------------------------------
               TOUJOURS afficher la première
            ----------------------------------------- */

            showCategory(0);


            console.log(
                "[COMPETENCES] Première catégorie activée."
            );

        }

        else {

            console.warn(
                "[COMPETENCES] Aucune .category-section trouvée."
            );

        }

    }


    /* =========================================================
       9. PROJETS — CLASSIFICATION
    ========================================================= */

    const projectGrid =
        $(".projects-grid");

    const projects =
        $$(".project-card");


    function classifyProject(text) {

        const value =
            text.toLowerCase();


        if (
            /safe|ctf|sécur|cyber|waf/.test(
                value
            )
        ) {

            return "Cyber";

        }


        if (
            /réseau|packet|cisco|active directory|vlan/.test(
                value
            )
        ) {

            return "Réseau";

        }


        if (
            /portfolio|booking|wordpress|lamp|apache|php/.test(
                value
            )
        ) {

            return "Web";

        }


        if (
            /odoo|maintenance|rustdesk|ticket|numérisation/.test(
                value
            )
        ) {

            return "Support";

        }


        return "Systèmes";

    }


    /* =========================================================
       10. FILTRES PROJETS
    ========================================================= */

    if (
        projectGrid &&
        projects.length > 0
    ) {

        projects.forEach(
            (card, index) => {

                card.dataset.category =
                    classifyProject(
                        card.textContent
                    );

                card.dataset.index =
                    String(index);

            }
        );


        const oldToolbar =
            $(".project-toolbar");

        if (oldToolbar) {
            oldToolbar.remove();
        }


        const toolbar =
            document.createElement("div");

        toolbar.className =
            "project-toolbar";


        const filters =
            document.createElement("div");

        filters.className =
            "project-filters";


        const filterNames = [
            "Tous",
            "Réseau",
            "Systèmes",
            "Cyber",
            "Web",
            "Support"
        ];


        let currentFilter =
            "Tous";

        let expanded =
            false;


        const moreButton =
            document.createElement(
                "button"
            );

        moreButton.type =
            "button";

        moreButton.className =
            "projects-more";

        moreButton.textContent =
            "Voir +";


        function renderProjects() {

            const matching =
                projects.filter(card => {

                    return (
                        currentFilter === "Tous" ||
                        card.dataset.category ===
                            currentFilter
                    );

                });


            projects.forEach(card => {

                card.classList.add(
                    "is-hidden"
                );

            });


            matching.forEach(
                (card, index) => {

                    const visible =
                        expanded ||
                        index < 6;

                    card.classList.toggle(
                        "is-hidden",
                        !visible
                    );

                }
            );


            const hasMore =
                matching.length > 6;


            moreButton.hidden =
                !hasMore;


            moreButton.textContent =
                expanded
                    ? "Voir moins"
                    : "Voir +";

        }


        filterNames.forEach(
            (name, index) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "project-filter";

                button.textContent =
                    name;


                if (index === 0) {

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        currentFilter =
                            name;

                        expanded =
                            false;


                        $$(
                            ".project-filter",
                            filters
                        ).forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                        button.classList.add(
                            "active"
                        );


                        renderProjects();

                    }
                );


                filters.appendChild(
                    button
                );

            }
        );


        moreButton.addEventListener(
            "click",
            () => {

                expanded =
                    !expanded;

                renderProjects();

            }
        );


        toolbar.appendChild(
            filters
        );

        toolbar.appendChild(
            moreButton
        );


        projectGrid.before(
            toolbar
        );


        renderProjects();

    }


    /* =========================================================
       11. MODALE PROJETS
    ========================================================= */

    if (projects.length > 0) {

        const oldModal =
            $(".project-modal");

        if (oldModal) {
            oldModal.remove();
        }


        const modal =
            document.createElement("div");

        modal.className =
            "project-modal";

        modal.setAttribute(
            "role",
            "dialog"
        );

        modal.setAttribute(
            "aria-modal",
            "true"
        );

        modal.setAttribute(
            "aria-label",
            "Détails du projet"
        );


        modal.innerHTML = `
            <div class="project-modal-box">

                <div class="project-modal-head">

                    <h3></h3>

                    <button
                        type="button"
                        class="project-modal-close"
                        aria-label="Fermer"
                    >
                        <i class="fa fa-times"></i>
                    </button>

                </div>

                <div class="project-modal-content"></div>

            </div>
        `;


        document.body.appendChild(
            modal
        );


        const closeButton =
            $(".project-modal-close", modal);

        let previousFocus =
            null;


        function closeModal() {

            modal.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

            if (previousFocus) {
                previousFocus.focus();
            }

        }


        function openProjectModal(
            card,
            event
        ) {

            if (
                event &&
                event.target.closest("a")
            ) {
                return;
            }


            const title =
                $(
                    ".project-header h3",
                    card
                );


            const description =
                $(
                    ".project-description",
                    card
                );


            const modalTitle =
                $(
                    ".project-modal-head h3",
                    modal
                );


            const content =
                $(
                    ".project-modal-content",
                    modal
                );


            modalTitle.textContent =
                title
                    ? title.textContent.trim()
                    : "Projet";


            content.replaceChildren();


            if (description) {

                content.appendChild(
                    description.cloneNode(
                        true
                    )
                );

            }


            previousFocus =
                document.activeElement;


            modal.classList.add(
                "open"
            );


            document.body.style.overflow =
                "hidden";


            closeButton.focus();

        }


        closeButton.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "open"
                    )
                ) {

                    closeModal();

                }

            }
        );


        projects.forEach(card => {

            card.setAttribute(
                "tabindex",
                "0"
            );


            card.addEventListener(
                "click",
                event => {

                    openProjectModal(
                        card,
                        event
                    );

                }
            );


            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        if (
                            event.target.closest(
                                "a"
                            )
                        ) {
                            return;
                        }


                        event.preventDefault();


                        openProjectModal(
                            card,
                            event
                        );

                    }

                }
            );

        });

    }


    /* =========================================================
       12. CARROUSEL CERTIFICATIONS
    ========================================================= */

    const certGrid =
        $(".certifications-grid");


    if (certGrid) {

        let shell =
            certGrid.closest(
                ".cert-carousel-shell"
            );


        if (!shell) {

            shell =
                document.createElement(
                    "div"
                );

            shell.className =
                "cert-carousel-shell";


            certGrid.parentNode.insertBefore(
                shell,
                certGrid
            );


            shell.appendChild(
                certGrid
            );

        }


        if (
            !$(".carousel-controls", shell)
        ) {

            const controls =
                document.createElement(
                    "div"
                );

            controls.className =
                "carousel-controls";


            controls.innerHTML = `
                <button
                    type="button"
                    class="carousel-btn prev"
                    aria-label="Certification précédente"
                >
                    <i class="fa fa-arrow-left"></i>
                </button>

                <button
                    type="button"
                    class="carousel-btn next"
                    aria-label="Certification suivante"
                >
                    <i class="fa fa-arrow-right"></i>
                </button>
            `;


            shell.appendChild(
                controls
            );


            const previous =
                $(".prev", controls);

            const next =
                $(".next", controls);


            previous.addEventListener(
                "click",
                () => {

                    certGrid.scrollBy({
                        left:
                            -certGrid.clientWidth *
                            0.78,

                        behavior:
                            scrollBehavior
                    });

                }
            );


            next.addEventListener(
                "click",
                () => {

                    certGrid.scrollBy({
                        left:
                            certGrid.clientWidth *
                            0.78,

                        behavior:
                            scrollBehavior
                    });

                }
            );

        }

    }


    /* =========================================================
       13. VEILLE REPLIABLE
    ========================================================= */

    const watch =
        $("#veille .container");


    if (watch) {

        const details =
            $$(
                [
                    ".key-points-grid",
                    ".applications-area",
                    ".sources-area"
                ].join(","),
                watch
            );


        if (
            details.length > 0 &&
            !$(".watch-collapsible", watch)
        ) {

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "watch-collapsible";


            details[0].before(
                wrapper
            );


            details.forEach(item => {

                wrapper.appendChild(
                    item
                );

            });


            wrapper.style.maxHeight =
                "0px";

            wrapper.style.opacity =
                "0";


            const toggle =
                document.createElement(
                    "button"
                );

            toggle.type =
                "button";

            toggle.className =
                "theme-btn watch-toggle";

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );


            toggle.innerHTML = `
                <i class="fa fa-plus"></i>
                Explorer la veille
            `;


            wrapper.after(
                toggle
            );


            let isOpen =
                false;


            function updateWatchHeight() {

                if (!isOpen) return;

                wrapper.style.maxHeight =
                    wrapper.scrollHeight +
                    "px";

            }


            toggle.addEventListener(
                "click",
                () => {

                    isOpen =
                        !isOpen;


                    wrapper.style.maxHeight =
                        isOpen
                            ? wrapper.scrollHeight +
                              "px"
                            : "0px";


                    wrapper.style.opacity =
                        isOpen
                            ? "1"
                            : "0";


                    toggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );


                    toggle.innerHTML =
                        isOpen

                            ? `
                                <i class="fa fa-minus"></i>
                                Réduire la veille
                              `

                            : `
                                <i class="fa fa-plus"></i>
                                Explorer la veille
                              `;

                }
            );


            window.addEventListener(
                "resize",
                updateWatchHeight
            );

        }

    }


    /* =========================================================
       14. NAVIGATION LATERALE
    ========================================================= */

    const existingSideNav =
        $(".side-nav");

    if (existingSideNav) {
        existingSideNav.remove();
    }


    const sideNav =
        document.createElement("div");

    sideNav.className =
        "side-nav";

    sideNav.setAttribute(
        "aria-label",
        "Navigation rapide"
    );


    sections.forEach(section => {

        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "side-dot";

        button.dataset.target =
            section.id;


        const title =
            $(".section-title h2", section);


        button.title =
            title
                ? title.textContent.trim()
                : section.id;


        button.setAttribute(
            "aria-label",
            button.title
        );


        button.addEventListener(
            "click",
            () => {

                section.scrollIntoView({
                    behavior:
                        scrollBehavior,

                    block:
                        "start"
                });

            }
        );


        sideNav.appendChild(
            button
        );

    });


    if (sections.length > 0) {

        document.body.appendChild(
            sideNav
        );

    }


    /* =========================================================
       15. REVEAL AU SCROLL
       COMPETENCES EXCLUES
    ========================================================= */

    const revealSelectors = [

        ".animate-on-scroll",

        ".section-title",

        ".about-content",

        ".education-column",

        ".timeline-card",

        ".project-card",

        ".certification-card",

        ".synthesis-wrapper",

        ".procedure-card",

        ".theme-banner",

        ".theme-description",

        ".point-card",

        ".application-item",

        ".source-category",

        ".hero-tech-panel"

    ];


    const allRevealElements = [

        ...new Set(
            $$(
                revealSelectors.join(",")
            )
        )

    ];


    /*
     * IMPORTANT :
     * aucun élément interne d'une
     * category-section n'est géré ici.
     */

    const revealElements =
        allRevealElements.filter(
            element => {

                return !element.closest(
                    "#competences .category-section"
                );

            }
        );


    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                "reveal-item"
            );


            const variation =
                index % 4;


            if (variation === 1) {

                element.classList.add(
                    "from-left"
                );

            }


            else if (variation === 2) {

                element.classList.add(
                    "from-right"
                );

            }


            else if (variation === 3) {

                element.classList.add(
                    "zoom-in"
                );

            }


            element.style.transitionDelay =
                (
                    (index % 5) *
                    45
                ) +
                "ms";

        }
    );


    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "is-visible"
                                    );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.06,

                    rootMargin:
                        "0px 0px -25px 0px"
                }

            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =========================================================
       16. MOUSE GLOW
    ========================================================= */

    const glowSelectors = [

        ".project-card",
        ".skill-badge",
        ".certification-card",
        ".procedure-card",
        ".timeline-card",
        ".point-card",
        ".application-item",
        ".source-category",
        ".education-column"

    ];


    const glowCards =
        $$(
            glowSelectors.join(",")
        );


    glowCards.forEach(card => {

        card.classList.add(
            "mouse-glow"
        );


        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--x",
                    x + "px"
                );


                card.style.setProperty(
                    "--y",
                    y + "px"
                );

            }
        );

    });


    /* =========================================================
       17. RIPPLE
    ========================================================= */

    const rippleSelector = [

        ".btn",
        ".cert-link",
        ".synthesis-download-btn",
        ".synthesis-view-btn",
        ".theme-btn",
        ".skills-tab",
        ".project-filter",
        ".projects-more",
        ".carousel-btn"

    ].join(",");


    document.addEventListener(
        "click",
        event => {

            if (reduceMotion) return;


            const button =
                event.target.closest(
                    rippleSelector
                );


            if (!button) return;


            const rect =
                button.getBoundingClientRect();


            const diameter =
                Math.max(
                    rect.width,
                    rect.height
                );


            const ripple =
                document.createElement(
                    "span"
                );


            ripple.className =
                "ripple-effect";


            ripple.style.width =
                diameter + "px";


            ripple.style.height =
                diameter + "px";


            ripple.style.left =
                (
                    event.clientX -
                    rect.left -
                    diameter / 2
                ) +
                "px";


            ripple.style.top =
                (
                    event.clientY -
                    rect.top -
                    diameter / 2
                ) +
                "px";


            button.appendChild(
                ripple
            );


            ripple.addEventListener(
                "animationend",
                () => ripple.remove(),
                {
                    once: true
                }
            );

        }
    );


    /* =========================================================
       18. PETIT EFFET 3D
    ========================================================= */

    if (
        !reduceMotion &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const tiltCards =
            $$(
                [
                    ".project-card",
                    ".certification-card"
                ].join(",")
            );


        tiltCards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            x /
                            rect.width -
                            0.5
                        ) *
                        2.2;


                    const rotateX =
                        -(
                            y /
                            rect.height -
                            0.5
                        ) *
                        2.2;


                    card.style.transform =
                        `
                        perspective(900px)
                        translateY(-6px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =========================================================
       19. SECTION ACTIVE
    ========================================================= */

    function updateActiveSection() {

        if (header) {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        }


        updateProgress();


        let currentSection =
            sections.length > 0
                ? sections[0].id
                : "home";


        const position =
            window.scrollY +
            160;


        sections.forEach(section => {

            if (
                section.offsetTop <=
                position
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            const active =
                link.getAttribute(
                    "href"
                ) ===
                "#" +
                currentSection;


            link.classList.toggle(
                "active",
                active
            );

        });


        $$(".side-dot", sideNav)
            .forEach(dot => {

                dot.classList.toggle(
                    "active",
                    dot.dataset.target ===
                        currentSection
                );

            });

    }


    /* =========================================================
       20. RESIZE
    ========================================================= */

    function handleResize() {

        updateActiveSection();


        if (
            window.innerWidth > 980
        ) {

            closeMenu();

        }

    }


    /* =========================================================
       21. INITIALISATION
    ========================================================= */

    updateProgress();
    updateActiveSection();


    window.addEventListener(
        "scroll",
        updateActiveSection,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        handleResize,
        {
            passive: true
        }
    );


    console.log(
        "%cPORTFOLIO ASVIN — JS chargé",
        "color:#9c82ff;font-weight:bold;"
    );

});