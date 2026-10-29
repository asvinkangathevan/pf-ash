
/* ==========================================================
   PORTFOLIO BTS SIO SISR — SCRIPT.JS
   Navigation, projets, certifications, animations
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollBehavior = reduceMotion ? "instant" : "smooth";

    /* ======================================================
       1. BARRE DE PROGRESSION
       ====================================================== */

    let progress = $(".scroll-progress");

    if (!progress) {
        progress = document.createElement("div");
        progress.className = "scroll-progress";
        document.body.prepend(progress);
    }

    function updateProgress() {
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage = maxScroll > 0
            ? (window.scrollY / maxScroll) * 100
            : 0;

        progress.style.width =
            Math.min(100, Math.max(0, percentage)) + "%";
    }

    /* ======================================================
       2. NAVIGATION
       ====================================================== */

    const header = $(".header-area");
    const nav = $(".navbar-modern");
    const mobileMenu = $(".mobile-menu");
    const navLinks = $$(".nav-link");

    const mainSections = [
        "home",
        "about",
        "education",
        "competences",
        "experiences",
        "pro",
        "certi",
        "tb",
        "procedure",
        "veille"
    ].map(id => document.getElementById(id)).filter(Boolean);

    function closeMobileMenu() {
        nav?.classList.remove("open");

        if (mobileMenu) {
            mobileMenu.setAttribute("aria-expanded", "false");

            const icon = mobileMenu.querySelector("i");

            icon?.classList.remove("fa-times");
            icon?.classList.add("fa-bars");
        }
    }

    function toggleMobileMenu() {
        if (!nav || !mobileMenu) return;

        const isOpen = nav.classList.toggle("open");

        mobileMenu.setAttribute("aria-expanded", String(isOpen));

        const icon = mobileMenu.querySelector("i");

        icon?.classList.toggle("fa-bars", !isOpen);
        icon?.classList.toggle("fa-times", isOpen);
    }

    if (mobileMenu) {
        mobileMenu.setAttribute("role", "button");
        mobileMenu.setAttribute("tabindex", "0");
        mobileMenu.setAttribute("aria-label", "Ouvrir le menu");
        mobileMenu.setAttribute("aria-expanded", "false");

        mobileMenu.addEventListener("click", toggleMobileMenu);

        mobileMenu.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    $$('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.getElementById(href.slice(1));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            closeMobileMenu();
        });
    });

  
    /* ======================================================
       4. NUMÉROTATION DES SECTIONS
       ====================================================== */

    $$(".section-title").forEach((element, index) => {
        element.dataset.number =
            String(index + 1).padStart(2, "0");
    });

    /* ======================================================
       5. COMPÉTENCES
       ====================================================== */

    const competences = $("#competences");

    if (competences) {
        $$(".skills-tabs", competences).forEach(tab => {
            tab.remove();
        });

        $$(".category-section", competences).forEach(category => {
            category.hidden = false;
            category.classList.add("active-category");
            category.style.display = "block";
            category.style.opacity = "1";
            category.style.visibility = "visible";
        });
    }

    /* ======================================================
       6. DONNÉES DES PROJETS
       ====================================================== */

    const projectData = {
        web: {
            title: "Développement web",
            description:
                "Conception de sites et d'applications web.",
            items: [
                {
                    title: "Portfolio personnel",
                    description:
                        "Conception d'un portfolio responsive avec HTML, CSS et JavaScript."
                },
                {
                    title: "BookingAUTO",
                    description:
                        "Projet de développement d'une application web."
                },
                {
                    title: "WordPress",
                    description:
                        "Installation et configuration du CMS WordPress.",
                    pdf: "WordPress-Procedure.pdf"
                }
            ]
        },

        systemes: {
            title: "Systèmes & Docker",
            description:
                "Virtualisation, administration Linux et déploiement de services.",
            items: [
                {
                    title: "VirtualBox",
                    description:
                        "Création et configuration de machines virtuelles."
                },
                {
                    title: "Linux Mint",
                    description:
                        "Installation et administration d'un système Linux Mint."
                },
                {
                    title: "Ubuntu Server",
                    description:
                        "Installation et configuration d'un serveur Ubuntu."
                },
                {
                    title: "Proxmox",
                    description:
                        "Travaux pratiques de virtualisation avec Proxmox VE."
                },
                {
                    title: "LAMP",
                    description:
                        "Installation d'un environnement Linux, Apache, MariaDB et PHP.",
                    pdf: "LAMP-Procedure.pdf"
                },
                {
                    title: "Docker",
                    description:
                        "Déploiement et gestion de conteneurs Docker.",
                    pdf: "Docker-Procedure.pdf"
                },
                {
                    title: "Nextcloud",
                    description:
                        "Installation d'une plateforme de stockage et de partage.",
                    pdf: "Nextcloud-Procedure.pdf"
                },
                {
                    title: "Mattermost",
                    description:
                        "Déploiement d'une plateforme de communication collaborative."
                },
                {
                    title: "Portainer",
                    description:
                        "Administration des conteneurs Docker via une interface web.",
                    pdf: "Portainer-Procedure.pdf"
                }
            ]
        },

        reseau: {
            title: "Infrastructure réseau",
            description:
                "Configuration, administration et analyse des réseaux.",
            items: [
                {
                    title: "Cisco Packet Tracer",
                    description:
                        "Simulation et configuration d'infrastructures réseau."
                },
                {
                    title: "VLAN",
                    description:
                        "Segmentation logique des réseaux et configuration des VLAN."
                },
                {
                    title: "Routage",
                    description:
                        "Configuration et étude des communications entre réseaux."
                },
                {
                    title: "NAT",
                    description:
                        "Configuration et analyse de la traduction d'adresses réseau."
                },
                {
                    title: "Brassage réseau",
                    description:
                        "Raccordement et organisation des équipements réseau."
                },
                {
                    title: "Switch",
                    description:
                        "Configuration et maintenance des commutateurs."
                },
                {
                    title: "Wireshark",
                    description:
                        "Capture et analyse de trames et de paquets réseau."
                }
            ]
        },

        support: {
            title: "Support & parc informatique",
            description:
                "Assistance aux utilisateurs et gestion du parc informatique.",
            items: [
                {
                    title: "GLPI",
                    description:
                        "Installation et utilisation d'une solution de gestion de parc et de tickets.",
                    pdf: "GLPI-Procedure.pdf"
                },
                {
                    title: "OCS Inventory",
                    description:
                        "Inventaire et suivi des équipements informatiques."
                },
                {
                    title: "Odoo",
                    description:
                        "Suivi et traitement des demandes d'assistance."
                },
                {
                    title: "Active Directory",
                    description:
                        "Gestion des comptes utilisateurs et des postes Windows."
                },
                {
                    title: "RustDesk",
                    description:
                        "Téléassistance et prise en main à distance."
                },
                {
                    title: "Maintenance informatique",
                    description:
                        "Diagnostic, dépannage et préparation des postes."
                }
            ]
        },

        supervision: {
            title: "Supervision",
            description:
                "Surveillance des systèmes et des infrastructures.",
            items: [
                {
                    title: "Prometheus",
                    description:
                        "Collecte et exploitation des métriques système."
                },
                {
                    title: "Grafana",
                    description:
                        "Création de tableaux de bord de supervision."
                },
                {
                    title: "Windows Exporter",
                    description:
                        "Collecte des métriques des postes Windows."
                },
                {
                    title: "Zabbix",
                    description:
                        "Supervision des équipements et des services.",
                    pdf: "Zabbix-Procedure.pdf"
                }
            ]
        },

        securite: {
            title: "Cybersécurité",
            description:
                "Protection des systèmes et détection des menaces.",
            items: [
                {
                    title: "SafeLine",
                    description:
                        "Mise en place d'un pare-feu applicatif web."
                },
                {
                    title: "CrowdSec",
                    description:
                        "Détection et prévention des comportements malveillants.",
                    pdf: "CrowdSec-Procédure.pdf"
                },
                {
                    title: "Suricata",
                    description:
                        "Analyse du trafic et détection des intrusions réseau.",
                    pdf: "Suricata-Procedure.pdf"
                },
                {
                    title: "UFW",
                    description:
                        "Configuration des règles de pare-feu Linux."
                },
                {
                    title: "OpenSSH",
                    description:
                        "Administration et sécurisation des accès SSH.",
                    pdf: "OpenSSH-Procedure.pdf"
                },
                {
                    title: "Restic",
                    description:
                        "Mise en place de sauvegardes sécurisées.",
                    pdf: "Restic-Procedure.pdf"
                },
                {
                    title: "CTF",
                    description:
                        "Exercices pratiques de cybersécurité."
                }
            ]
        }
    };

    /* ======================================================
       7. PROJETS — AFFICHAGE DES RÉALISATIONS
       ====================================================== */

    const projectSection = $("#pro");

    if (projectSection) {
        const buttons = $$(".projet-open", projectSection);

        const panel = $("#projets-detail");
        const title = $("#detail-title");
        const description = $("#detail-description");
        const list = $("#detail-list");
        const closeButton = $(".detail-close", projectSection);

        let activeButton = null;

        if (panel && title && description && list) {
            function closeProjectDetails(restoreFocus = true) {
                const previousButton = activeButton;

                panel.hidden = true;
                panel.classList.remove("open");

                panel.style.removeProperty("display");

                buttons.forEach(button => {
                    button.setAttribute("aria-expanded", "false");
                    button.classList.remove("active");
                });

                activeButton = null;

                if (restoreFocus) {
                    previousButton?.focus();
                }
            }

            function createProjectItem(item) {
                const card = document.createElement("article");
                card.className = "detail-item";

                const heading = document.createElement("h4");
                heading.textContent = item.title;

                const paragraph = document.createElement("p");
                paragraph.textContent = item.description;

                card.append(heading, paragraph);

                if (item.pdf) {
                    const link = document.createElement("a");

                    // Les procédures sont dans le dossier tds/
                    link.href =
                        "tds/" + encodeURIComponent(item.pdf);

                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.className = "detail-pdf";

                    link.textContent =
                        "Consulter la procédure PDF ↗";

                    card.appendChild(link);
                }

                return card;
            }

            function openProjectDetails(category, button) {
                const project = projectData[category];

                if (!project) {
                    console.error(
                        "[PROJETS] Catégorie inconnue :",
                        category
                    );
                    return;
                }

                if (!panel.hidden && activeButton === button) {
                    closeProjectDetails();
                    return;
                }

                title.textContent = project.title;
                description.textContent = project.description;

                const fragment = document.createDocumentFragment();

                project.items.forEach(item => {
                    fragment.appendChild(createProjectItem(item));
                });

                list.replaceChildren(fragment);

                // Rendre le panneau visible
                panel.hidden = false;
                panel.classList.add("open");

                panel.style.setProperty(
                    "display",
                    "block",
                    "important"
                );

                panel.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                panel.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                panel.style.setProperty(
                    "height",
                    "auto",
                    "important"
                );

                panel.style.setProperty(
                    "max-height",
                    "none",
                    "important"
                );

                panel.style.setProperty(
                    "overflow",
                    "visible",
                    "important"
                );

                activeButton = button;

                buttons.forEach(current => {
                    const isActive = current === button;

                    current.setAttribute(
                        "aria-expanded",
                        String(isActive)
                    );

                    current.classList.toggle(
                        "active",
                        isActive
                    );
                });

                requestAnimationFrame(() => {
                    panel.scrollIntoView({
                        behavior: reduceMotion ? "auto" : "smooth",
                        block: "start"
                    });
                });

                console.log(
                    "[PROJETS] Réalisations affichées :",
                    project.title
                );
            }

            buttons.forEach(button => {
                button.addEventListener("click", event => {
                    event.preventDefault();
                    event.stopPropagation();

                    openProjectDetails(
                        button.dataset.project,
                        button
                    );
                });
            });

            closeButton?.addEventListener("click", event => {
                event.preventDefault();
                closeProjectDetails();
            });

            document.addEventListener("keydown", event => {
                if (event.key === "Escape" && !panel.hidden) {
                    closeProjectDetails();
                }
            });

            // Le panneau est fermé au chargement.
            closeProjectDetails(false);

            console.log(
                "[PROJETS] Initialisation réussie :",
                buttons.length,
                "boutons."
            );
        } else {
            console.error(
                "[PROJETS] Éléments HTML manquants.",
                {
                    panel: !!panel,
                    title: !!title,
                    description: !!description,
                    list: !!list
                }
            );
        }
    }

    /* ======================================================
       8. CERTIFICATIONS — CARROUSEL
       ====================================================== */

    const certifications = $(".certifications-grid");

    if (certifications) {
        let shell = certifications.closest(".cert-carousel-shell");

        if (!shell) {
            shell = document.createElement("div");
            shell.className = "cert-carousel-shell";

            certifications.parentNode.insertBefore(
                shell,
                certifications
            );

            shell.appendChild(certifications);
        }

        if (!$(".carousel-controls", shell)) {
            const controls = document.createElement("div");

            controls.className = "carousel-controls";

            controls.innerHTML = `
                <button
                    type="button"
                    class="carousel-btn carousel-prev"
                    aria-label="Certification précédente"
                >‹</button>

                <button
                    type="button"
                    class="carousel-btn carousel-next"
                    aria-label="Certification suivante"
                >›</button>
            `;

            shell.appendChild(controls);

            function scrollCertifications(direction) {
                const firstCard = $(".certification-card", certifications);

                if (!firstCard) return;

                const gap =
                    parseFloat(getComputedStyle(certifications).gap) || 14;

                const distance =
                    firstCard.getBoundingClientRect().width + gap;

                certifications.scrollBy({
                    left: distance * direction,
                    behavior: reduceMotion ? "auto" : "smooth"
                });
            }

            $(".carousel-prev", controls)?.addEventListener(
                "click",
                () => scrollCertifications(-1)
            );

            $(".carousel-next", controls)?.addEventListener(
                "click",
                () => scrollCertifications(1)
            );
        }
    }

    /* ======================================================
       9. VEILLE TECHNOLOGIQUE
       ====================================================== */

    const veille = $("#veille");

    if (veille) {
        const veilleContainer = $(".container", veille);

        if (veilleContainer) {
            const expandableElements = $$(
                ".key-points-grid, .applications-area, .sources-area",
                veilleContainer
            );

            if (
                expandableElements.length > 0 &&
                !$(".veille-toggle", veilleContainer)
            ) {
                const button = document.createElement("button");

                button.type = "button";
                button.className = "veille-toggle";
                button.textContent = "Afficher les détails de la veille";

                button.setAttribute("aria-expanded", "false");

                const content = document.createElement("div");
                content.className = "veille-extra";
                content.hidden = true;

                expandableElements[0].parentNode.insertBefore(
                    content,
                    expandableElements[0]
                );

                expandableElements.forEach(element => {
                    content.appendChild(element);
                });

                content.parentNode.insertBefore(
                    button,
                    content
                );

                button.addEventListener("click", () => {
                    const isOpen = content.hidden;

                    content.hidden = !isOpen;

                    button.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                    button.textContent = isOpen
                        ? "Masquer les détails de la veille"
                        : "Afficher les détails de la veille";
                });
            }
        }
    }

    /* ======================================================
       10. NAVIGATION LATÉRALE
       ====================================================== */

    let sideNav = $(".side-nav");

    if (!sideNav && mainSections.length > 0) {
        sideNav = document.createElement("nav");
        sideNav.className = "side-nav";

        sideNav.setAttribute(
            "aria-label",
            "Navigation entre les sections"
        );

        mainSections.forEach(section => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "side-dot";

            dot.dataset.target = section.id;

            const sectionTitle =
                $(".section-title h2", section)?.textContent ||
                section.id;

            dot.setAttribute(
                "aria-label",
                "Aller à " + sectionTitle
            );

            dot.title = sectionTitle;

            dot.addEventListener("click", () => {
                section.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });
            });

            sideNav.appendChild(dot);
        });

        document.body.appendChild(sideNav);
    }

    /* ======================================================
       11. ANIMATIONS AU DÉFILEMENT
       ====================================================== */

    const revealSelectors = [
        ".about-content",
        ".education-column",
        ".competence-card",
        ".timeline-card",
        ".projet-domaine",
        ".certification-card",
        ".synthesis-wrapper",
        ".procedure-card",
        ".theme-banner",
        ".theme-description",
        ".point-card",
        ".application-item",
        ".source-category",
        ".hero-tech-panel"
    ].join(",");

    const revealElements = $$(revealSelectors);

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -20px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.classList.add("reveal-item");

            element.style.transitionDelay =
                ((index % 4) * 40) + "ms";

            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }

    /* ======================================================
       12. EFFET LUMINEUX À LA SOURIS
       ====================================================== */

    const glowSelectors = [
        ".projet-domaine",
        ".competence-card",
        ".certification-card",
        ".procedure-card",
        ".timeline-card",
        ".point-card",
        ".application-item",
        ".source-category",
        ".education-column"
    ].join(",");

    $$(glowSelectors).forEach(card => {
        card.classList.add("mouse-glow");

        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();

            card.style.setProperty(
                "--x",
                (event.clientX - rect.left) + "px"
            );

            card.style.setProperty(
                "--y",
                (event.clientY - rect.top) + "px"
            );
        });
    });

    /* ======================================================
       13. EFFET RIPPLE SUR LES BOUTONS
       ====================================================== */

    const rippleSelectors = [
        ".btn",
        ".cert-link",
        ".synthesis-download-btn",
        ".synthesis-view-btn",
        ".theme-btn",
        ".carousel-btn",
        ".projet-open",
        ".veille-toggle"
    ].join(",");

    document.addEventListener("click", event => {
        if (reduceMotion) return;
        if (!(event.target instanceof Element)) return;

        const button = event.target.closest(rippleSelectors);

        if (!button) return;

        const rect = button.getBoundingClientRect();

        const diameter = Math.max(rect.width, rect.height);

        const ripple = document.createElement("span");

        ripple.className = "ripple-effect";

        ripple.style.width = diameter + "px";
        ripple.style.height = diameter + "px";

        ripple.style.left =
            (event.clientX - rect.left - diameter / 2) + "px";

        ripple.style.top =
            (event.clientY - rect.top - diameter / 2) + "px";

        button.appendChild(ripple);

        ripple.addEventListener(
            "animationend",
            () => ripple.remove(),
            { once: true }
        );

        // Évite les éléments résiduels si l'animation CSS manque.
        setTimeout(() => ripple.remove(), 1500);
    });

    /* ======================================================
       14. EFFET 3D SUR LES CARTES
       ====================================================== */

    if (
        !reduceMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {
        const tiltCards = $$(
            ".projet-domaine, .certification-card"
        );

        tiltCards.forEach(card => {
            card.addEventListener("pointermove", event => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY =
                    (x / rect.width - 0.5) * 2;

                const rotateX =
                    -(y / rect.height - 0.5) * 2;

                card.style.transform = `
                    perspective(900px)
                    translateY(-5px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
            });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }

    /* ======================================================
       15. BLACK HOLE N°28
       ====================================================== */

    const blackHoleSelectors = [
        ".competence-card",
        ".timeline-card",
        ".projet-domaine",
        ".certification-card",
        ".procedure-card",
        ".point-card",
        ".application-item",
        ".source-category",
        ".education-column",
        ".entry-content",
        ".hero-tech-panel",
        ".about-content",
        ".synthesis-wrapper",
        ".theme-description",
        ".tech-chip",
        ".theme-banner"
    ].join(",");

    const blackHoleTimers = new WeakMap();

    $$(blackHoleSelectors).forEach(card => {
        card.classList.add("blackhole28-card");

        if (!$(":scope > .blackhole28-overlay", card)) {
            const overlay = document.createElement("span");

            overlay.className = "blackhole28-overlay";
            overlay.setAttribute("aria-hidden", "true");

            card.appendChild(overlay);
        }
    });

    document.addEventListener("click", event => {
        if (reduceMotion) return;
        if (!(event.target instanceof Element)) return;

        const card = event.target.closest(".blackhole28-card");

        if (!card) return;

        const previousTimer = blackHoleTimers.get(card);

        if (previousTimer) clearTimeout(previousTimer);

        card.classList.remove("blackhole28-active");

        void card.offsetWidth;

        card.classList.add("blackhole28-active");

        const timer = setTimeout(() => {
            card.classList.remove("blackhole28-active");
            blackHoleTimers.delete(card);
        }, 1300);

        blackHoleTimers.set(card, timer);
    });

    /* ======================================================
       16. SECTION ACTIVE
       ====================================================== */

    function updateActiveSection() {
        header?.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

        updateProgress();

        let activeId = "home";
        const scrollPosition = window.scrollY + 160;

        mainSections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                activeId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + activeId
            );
        });

        if (sideNav) {
            $$(".side-dot", sideNav).forEach(dot => {
                dot.classList.toggle(
                    "active",
                    dot.dataset.target === activeId
                );
            });
        }
    }

    /* ======================================================
       17. INITIALISATION
       ====================================================== */

    updateActiveSection();

    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        () => {
            updateActiveSection();

            if (window.innerWidth > 980) {
                closeMobileMenu();
            }
        },
        { passive: true }
    );

    console.log(
        "%cPORTFOLIO BTS SIO SISR — JavaScript chargé",
        "color:#9c82ff;font-weight:bold;"
    );

    console.log(
        "[PROJETS] Boutons détectés :",
        $$("#pro .projet-open").length
    );

    console.log(
        "[BLACK HOLE 28] Cartes initialisées :",
        $$(".blackhole28-card").length
    );
});
