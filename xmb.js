(function () {
    'use strict';

    // One-shot retry for images that fail on first load (flaky CDN / cold cache).
    document.addEventListener('error', function (e) {
        var el = e.target;
        if (!el || el.tagName !== 'IMG' || el.dataset.retried) return;
        el.dataset.retried = '1';
        var src = el.src;
        var sep = src.indexOf('?') === -1 ? '?' : '&';
        setTimeout(function () { el.src = src + sep + 'r=' + Date.now(); }, 400);
    }, true);

    /* ═══════════════════════════════════════════════════════════
       CONFIGURATION
       ═══════════════════════════════════════════════════════════ */

    var TRANSITION_MS = 400;
    var SWIPE_THRESHOLD = 35;
    var WHEEL_DEBOUNCE = 250;
    var TYPEWRITER_SPEED = 80;

    /* ═══════════════════════════════════════════════════════════
       CONTENT DATA — all text preserved from original site
       ═══════════════════════════════════════════════════════════ */

    var CATEGORIES = [
        {
            id: 'home',
            icon: 'fa-solid fa-house',
            label: 'Home',
            waveColors: {
                c1: 'rgba(255, 255, 255, 0.04)',
                c2: 'rgba(180, 200, 255, 0.03)',
                c3: 'rgba(200, 220, 255, 0.02)'
            },
            items: [
                {
                    id: 'welcome',
                    icon: 'fa-solid fa-play',
                    label: 'Welcome',
                    preview: 'Press Enter to see the welcome message',
                    getContent: function () {
                        return '<div class="xc-welcome">' +
                            '<div class="xc-welcome-typing">' +
                                '<div class="xc-code-box">' +
                                    '<span id="xc-typed-text"></span><span class="xc-cursor"></span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="xc-welcome-photo">' +
                                '<img src="images/FullSizeRender.jpg" alt="Stephan Leznikov">' +
                            '</div>' +
                        '</div>';
                    },
                    onOpen: function () {
                        var el = document.getElementById('xc-typed-text');
                        if (el) {
                            typeWriter(el, "Hi, I'm Stephan Leznikov the next generation of AI engineering.", TYPEWRITER_SPEED);
                        }
                    }
                },
                {
                    id: 'why',
                    icon: 'fa-solid fa-gamepad',
                    label: 'Why this layout?',
                    preview: 'The inspiration behind the PS3 XMB design',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Why this layout?</h2>' +
                            '<div class="xc-card">' +
                                '<h3>A tribute to the PS3 XMB</h3>' +
                                '<div class="xc-card-date">Where it all began</div>' +
                                '<p>Every developer has a moment that lights the spark. Mine was the soft blue glow of a PlayStation 3 when I was a kid, watching its iconic XMB (XrossMediaBar) flow seamlessly between games, music, and videos. That interface felt like magic, pixels dancing to my every command. It wasn\'t just a menu; it was a window into how thoughtful design can make technology feel alive.</p>' +
                                '<p>Years later, learning to code became my way of asking the question I had been asking since I was seven: how did they do that? Every line of JavaScript and every CSS transition I write is a small step toward answering it. Rebuilding the XMB here isn\'t nostalgia. It\'s a tribute. A reminder that behind every polished interface is a kid somewhere discovering their passion for the first time.</p>' +
                                '<p>This website is my way of turning that childhood wonder into something real, of proving to my younger self that the magic he saw on screen was never out of reach. It was a craft waiting to be learned. Welcome to the intersection of inspiration and engineering, the place where a lifelong curiosity becomes a career.</p>' +
                            '</div>' +
                        '</div>';
                    }
                }
            ]
        },
        {
            id: 'about',
            icon: 'fa-solid fa-user',
            label: 'About',
            waveColors: {
                c1: 'rgba(3, 207, 252, 0.07)',
                c2: 'rgba(3, 150, 252, 0.04)',
                c3: 'rgba(80, 80, 255, 0.03)'
            },
            items: [
                {
                    id: 'bio',
                    icon: 'fa-solid fa-address-card',
                    label: 'About Me',
                    preview: 'Learn more about my background and interests',
                    getContent: function () {
                        return '<div class="xc-about">' +
                            '<h2 class="xc-title">About Me</h2>' +
                            '<div class="xc-card xc-about-card">' +
                                '<div class="xc-about-photo">' +
                                    '<img src="images/FullSizeRender.jpg" alt="Stephan Leznikov">' +
                                '</div>' +
                                '<div class="xc-about-body">' +
                                    '<h3>Stephan Leznikov</h3>' +
                                    '<div class="xc-card-date">Computer Science &amp; AI, Queen\'s University</div>' +
                                    '<p>Hello there! I\'m Stephan, a Computer Science and AI student at Queen\'s University with a hands-on approach to building intelligent systems. Currently, I\'m working as an AI/Machine Learning Intern at Kyndryl, where I designed and developed an AI-powered document validation and data extraction system that automated a client\'s mortgage application review process, effectively doubling their application throughput.</p>' +
                                    '<p>From deep learning models and NLP pipelines to full-stack web apps, I love taking an idea from concept to production. I\'m always looking for the next challenging problem to solve, whether that\'s training a neural network, architecting a clean API, or collaborating with a team to ship something meaningful.</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }
                },
                {
                    id: 'experience',
                    icon: 'fa-solid fa-briefcase',
                    label: 'Experience',
                    preview: 'Kyndryl, AI / Machine Learning Intern',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Experience</h2>' +
                            '<div class="xc-card">' +
                                '<h3>Kyndryl - AI / Machine Learning Intern</h3>' +
                                '<div class="xc-card-date">May 2025 \u2013 August 2026</div>' +
                                '<p>Designed and developed an AI-powered document validation and data extraction system for a client\'s mortgage application process. The solution automated the review of supporting documents submitted by applicants, significantly reducing manual workload for reviewers and enabling the client to effectively double their mortgage application throughput.</p>' +
                                '<p>Engaged directly with the client throughout the project lifecycle, gathering requirements, presenting progress updates, and iterating on deliverables to ensure alignment with business objectives.</p>' +
                            '</div>' +
                        '</div>';
                    }
                },
                {
                    id: 'skills',
                    icon: 'fa-solid fa-code',
                    label: 'Skills',
                    preview: 'Programming, AI/ML, Full-Stack, Cloud & more',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Skills</h2>' +
                            '<div class="xc-skills-grid">' +
                                '<div class="xc-skill">' +
                                    '<h4>Programming Languages</h4>' +
                                    '<p>Strong command of Java, Python, JavaScript/Node.js, C++, and R with a focus on clean, object-oriented architecture and scalable design patterns.</p>' +
                                '</div>' +
                                '<div class="xc-skill">' +
                                    '<h4>AI &amp; Machine Learning</h4>' +
                                    '<p>Hands-on experience building and fine-tuning deep learning models, leveraging frameworks such as TensorFlow, PyTorch, and Hugging Face Transformers. Proficient in LLM integration, prompt engineering, and deploying AI-driven solutions in production environments.</p>' +
                                '</div>' +
                                '<div class="xc-skill">' +
                                    '<h4>Full-Stack Web Development</h4>' +
                                    '<p>End-to-end development of responsive web applications using HTML, CSS, JavaScript, and modern frameworks. Strong eye for intuitive UI/UX design and performance optimization.</p>' +
                                '</div>' +
                                '<div class="xc-skill">' +
                                    '<h4>Data &amp; Cloud Infrastructure</h4>' +
                                    '<p>Proficient in SQL (MySQL, PostgreSQL) for complex data modeling and querying. Experienced with cloud platforms and CI/CD workflows for reliable, automated deployments.</p>' +
                                '</div>' +
                                '<div class="xc-skill">' +
                                    '<h4>Developer Tools &amp; Workflow</h4>' +
                                    '<p>Skilled with Git version control, RESTful API design, Agile methodologies, and collaborative development in cross-functional teams.</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }
                },
                {
                    id: 'education',
                    icon: 'fa-solid fa-graduation-cap',
                    label: 'Education',
                    preview: 'Queen\'s University, B.Sc. Computer Science / AI',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Education</h2>' +
                            '<div class="xc-card">' +
                                '<h3>Queen\'s University</h3>' +
                                '<div class="xc-card-date">2022 - Current</div>' +
                                '<p>Bachelors of Science<br>Computer Science / Artificial Intelligence</p>' +
                            '</div>' +
                        '</div>';
                    }
                }
            ]
        },
        {
            id: 'portfolio',
            icon: 'fa-solid fa-folder-open',
            label: 'Portfolio',
            waveColors: {
                c1: 'rgba(100, 50, 255, 0.06)',
                c2: 'rgba(3, 100, 252, 0.05)',
                c3: 'rgba(150, 50, 255, 0.03)'
            },
            items: [
                {
                    id: 'docval',
                    icon: 'fa-solid fa-file-shield',
                    thumb: 'images/habitat.jpg',
                    label: 'Document Validator & Extractor',
                    preview: 'AI-powered document validation and data extraction system deployed on Azure Functions',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Document Validator &amp; Extractor</h2>' +
                            '<div class="xc-project-image"><img src="images/habitat.jpg" alt="Document Validator"></div>' +
                            '<p class="xc-project-desc">AI-powered document validation and data extraction system built for a real-world client engagement at Kyndryl. The system is deployed on Azure Functions and automates the review of supporting documents submitted during mortgage applications, identifying document types, validating completeness, and extracting key data fields using a combination of OCR, NLP, and custom classification logic.</p>' +
                            '<p class="xc-project-desc">Extracted data is transmitted directly to Salesforce for centralized case management, eliminating manual data entry and significantly reducing turnaround times for application reviewers. The solution effectively doubled the client\u2019s mortgage application throughput.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Azure Functions</span><span class="xc-tag">Python</span><span class="xc-tag">OCR</span><span class="xc-tag">NLP</span><span class="xc-tag">Salesforce</span></div>' +
                        '</div>';
                    }
                },
                {
                    id: 'autodrive',
                    icon: 'fa-solid fa-car',
                    thumb: 'images/IMG_6898.jpg',
                    label: "Queen's AutoDrive",
                    preview: 'Simulating real-world situations to ensure ML model reliability',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Queen\'s AutoDrive</h2>' +
                            '<div class="xc-project-image"><img src="images/IMG_6898.jpg" alt="Queen\'s AutoDrive"></div>' +
                            '<p class="xc-project-desc">As part of Queen\'s University\'s AutoDrive Challenge team, I played a crucial role in detecting and addressing potential system vulnerabilities by designing and executing complex real-world simulation scenarios. This work was essential for stress-testing the autonomous vehicle\'s perception and decision-making pipeline under edge cases such as adverse weather, occluded objects, and unexpected pedestrian behavior.</p>' +
                            '<p class="xc-project-desc">By systematically identifying failure modes, I helped ensure the machine learning model\'s reliability and safety across a wide variety of driving conditions, contributing to the team\'s overall competition performance and the advancement of autonomous vehicle research at Queen\'s.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Autonomous Vehicles</span><span class="xc-tag">Machine Learning</span><span class="xc-tag">Simulation</span><span class="xc-tag">Computer Vision</span></div>' +
                            '<a class="xc-project-link" href="https://autodrive.engineering.queensu.ca/" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> View Project</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'foodclassifier',
                    icon: 'fa-solid fa-utensils',
                    thumb: 'images/food-classifier.jpg',
                    label: 'Food Classifier',
                    preview: 'Deep learning model classifying 41 food categories with 85-90% accuracy',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Food Classifier</h2>' +
                            '<div class="xc-project-image"><img src="images/food-classifier.jpg" alt="Food Classifier"></div>' +
                            '<p class="xc-project-desc">A deep learning image classification model built using MobileNetV2 transfer learning to accurately identify and categorize 41 different food types with 85\u201390% accuracy. The model was trained on a large labeled dataset with extensive data augmentation techniques including random rotation, flipping, zoom, and brightness adjustments to improve generalization and reduce overfitting.</p>' +
                            '<p class="xc-project-desc">The training pipeline was optimized for GPU acceleration, with real-time performance monitoring through TensorBoard. The architecture leverages MobileNetV2\'s lightweight design, making it suitable for deployment on resource-constrained devices and mobile applications.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">TensorFlow</span><span class="xc-tag">MobileNetV2</span><span class="xc-tag">Transfer Learning</span><span class="xc-tag">Python</span><span class="xc-tag">TensorBoard</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/food-classifier" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'statzone',
                    icon: 'fa-solid fa-chart-line',
                    thumb: 'images/Stocks-market.jpg',
                    label: 'StatZone',
                    preview: 'Sports analyst chatbot powered by OpenAI API',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">StatZone</h2>' +
                            '<div class="xc-project-image"><img src="images/Stocks-market.jpg" alt="StatZone"></div>' +
                            '<p class="xc-project-desc">An intelligent sports analyst chatbot powered by the OpenAI API, designed to provide real-time insights into team performances, player statistics, historical matchups, and game strategies. Users can interact with the chatbot through natural language queries to get detailed breakdowns, comparisons, and predictions, making complex sports data accessible and conversational.</p>' +
                            '<p class="xc-project-desc">The system integrates advanced machine learning models with live and historical data analytics to generate outcome predictions, identify trends, and surface non-obvious statistical patterns. Built with a focus on delivering fast, accurate, and contextually relevant responses to both casual fans and serious analysts.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">OpenAI API</span><span class="xc-tag">Python</span><span class="xc-tag">NLP</span><span class="xc-tag">Data Analytics</span><span class="xc-tag">Chatbot</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/StatZone_OpenAI" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'sentiment',
                    icon: 'fa-solid fa-brain',
                    thumb: 'images/sentiment-analysis.jpg',
                    label: 'Sentiment Analysis',
                    preview: 'Advanced NLP system combining Random Forest ML with rule-based analysis',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Sentiment Analysis</h2>' +
                            '<div class="xc-project-image"><img src="images/sentiment-analysis.jpg" alt="Sentiment Analysis"></div>' +
                            '<p class="xc-project-desc">An advanced natural language processing system that combines a Random Forest machine learning classifier with a sophisticated rule-based analysis engine for nuanced text sentiment classification. The hybrid approach allows the system to handle complex linguistic constructs that trip up purely statistical models, including negation detection (e.g., "not good"), intensity modifiers (e.g., "very," "slightly"), and context-dependent phrasing.</p>' +
                            '<p class="xc-project-desc">The system integrates a comprehensive sentiment lexicon and custom feature engineering pipeline to extract meaningful signals from raw text. It delivers accurate positive, negative, and neutral classifications across a variety of domains, from product reviews to social media posts.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Python</span><span class="xc-tag">scikit-learn</span><span class="xc-tag">NLP</span><span class="xc-tag">Random Forest</span><span class="xc-tag">Feature Engineering</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/sentiment-analysis-tool" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'platformer',
                    icon: 'fa-solid fa-gamepad',
                    thumb: 'images/unity-game.png',
                    label: '2D Platformer',
                    preview: 'A 2D platformer game built with Unity and C#',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">2D Platformer</h2>' +
                            '<div class="xc-project-image"><img src="images/unity-game.png" alt="2D Platformer"></div>' +
                            '<p class="xc-project-desc">A fully playable 2D platformer game developed in Unity with C#, featuring hand-crafted levels, responsive character controls, and custom shader effects that bring the game world to life. The project demonstrates core game development principles including physics-based movement, collision detection, sprite animation state machines, and camera tracking.</p>' +
                            '<p class="xc-project-desc">Platform mechanics include moving platforms, interactive hazards, collectible items, and a scoring system. Custom shaders were written to achieve unique visual effects, adding depth and atmosphere to the pixel-art style environment.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Unity</span><span class="xc-tag">C#</span><span class="xc-tag">Game Development</span><span class="xc-tag">Shader Programming</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/Unity-Game" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                }
            ]
        },
        {
            id: 'contact',
            icon: 'fa-solid fa-envelope',
            label: 'Contact',
            waveColors: {
                c1: 'rgba(3, 252, 180, 0.05)',
                c2: 'rgba(3, 207, 252, 0.04)',
                c3: 'rgba(3, 180, 200, 0.03)'
            },
            items: [
                {
                    id: 'info',
                    icon: 'fa-solid fa-address-book',
                    label: 'Get in Touch',
                    preview: 'Email, phone, and social links',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Get in Touch</h2>' +
                            '<div class="xc-contact-info">' +
                                '<div class="xc-contact-row"><i class="fa-solid fa-paper-plane"></i> sleznikov@gmail.com</div>' +
                                '<div class="xc-contact-row"><i class="fa-solid fa-phone"></i> 416-880-2241</div>' +
                            '</div>' +
                            '<div style="margin-top:32px">' +
                                '<h3 style="font-size:16px;font-weight:600;margin-bottom:14px;color:rgba(255,255,255,0.7)">Social</h3>' +
                                '<div class="xc-social-icons">' +
                                    '<a href="https://www.linkedin.com/in/stephanleznikov/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>' +
                                    '<a href="https://github.com/sleznikov" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>' +
                                '</div>' +
                            '</div>' +
                            '<a class="xc-cv-btn" href="Stephan Leznikov - CV.pdf" download="Stephan Leznikov - CV"><i class="fa-solid fa-download"></i> Download CV</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'form',
                    icon: 'fa-solid fa-paper-plane',
                    label: 'Send Message',
                    preview: 'Send me a message directly',
                    getContent: function () {
                        return '<div>' +
                            '<h2 class="xc-title">Send Message</h2>' +
                            '<form class="xc-form">' +
                                '<input type="text" name="Name" placeholder="Your Name" required>' +
                                '<input type="email" name="email" placeholder="Your Email" required>' +
                                '<textarea name="Message" rows="6" placeholder="Your Message"></textarea>' +
                                '<button type="submit" class="xc-form-submit">Submit</button>' +
                            '</form>' +
                        '</div>';
                    }
                }
            ]
        }
    ];

    /* ═══════════════════════════════════════════════════════════
       STATE
       ═══════════════════════════════════════════════════════════ */

    var state = {
        catIndex: 0,
        itemIndex: [],
        contentOpen: false,
        transitioning: false
    };

    for (var i = 0; i < CATEGORIES.length; i++) {
        state.itemIndex.push(0);
    }

    /* ═══════════════════════════════════════════════════════════
       DOM REFERENCES
       ═══════════════════════════════════════════════════════════ */

    var dom = {
        xmb: document.getElementById('xmb'),
        bar: document.getElementById('xmb-bar'),
        content: document.getElementById('xmb-content'),
        contentBody: document.getElementById('xmb-content-body'),
        cross: document.getElementById('xmb-cross'),
        back: document.getElementById('xmb-back'),
        clock: document.getElementById('xmb-clock'),
        preview: document.getElementById('xmb-preview'),
        bgVideo: document.getElementById('xmb-bg-video')
    };

    var hueDeg = 0;
    function applyRandomHue() {
        if (!dom.bgVideo) return;
        hueDeg += 45;
        dom.bgVideo.style.filter = 'hue-rotate(' + hueDeg + 'deg)';
    }

    /* ═══════════════════════════════════════════════════════════
       ROUTING — deep linking via History API
       ═══════════════════════════════════════════════════════════ */

    var SITE_TITLE = 'Stephan Leznikov';
    var HOME_TITLE = 'Stephan Leznikov – AI Engineer & Developer';
    var HOME_DESC = 'Personal portfolio of Stephan Leznikov — Computer Science & AI student at Queen\'s University and AI/ML Intern at Kyndryl.';

    function findCategoryIndex(slug) {
        if (!slug) return -1;
        for (var i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].id === slug) return i;
        }
        return -1;
    }

    function findItemIndex(catIdx, slug) {
        if (!slug || catIdx < 0) return -1;
        var items = CATEGORIES[catIdx].items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === slug) return i;
        }
        return -1;
    }

    function currentRoute() {
        var cat = CATEGORIES[state.catIndex];
        var item = cat.items[state.itemIndex[state.catIndex]];
        if (state.contentOpen) return '/' + cat.id + '/' + item.id;
        if (state.catIndex === 0) return '/';
        return '/' + cat.id;
    }

    function setAttrIfEl(selector, attr, value) {
        var el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
    }

    function updateMeta() {
        var cat = CATEGORIES[state.catIndex];
        var item = cat.items[state.itemIndex[state.catIndex]];
        var title, desc;
        if (state.contentOpen) {
            title = item.label + ' – ' + cat.label + ' | ' + SITE_TITLE;
            desc = item.preview || (SITE_TITLE + ' – ' + item.label);
        } else if (state.catIndex === 0) {
            title = HOME_TITLE;
            desc = HOME_DESC;
        } else {
            title = cat.label + ' | ' + SITE_TITLE;
            desc = SITE_TITLE + ' – ' + cat.label + ' section of personal portfolio.';
        }
        document.title = title;
        setAttrIfEl('meta[name="description"]', 'content', desc);
        setAttrIfEl('meta[property="og:title"]', 'content', title);
        setAttrIfEl('meta[property="og:description"]', 'content', desc);
        setAttrIfEl('meta[property="og:url"]', 'content', window.location.origin + currentRoute());
        setAttrIfEl('link[rel="canonical"]', 'href', window.location.origin + currentRoute());
    }

    function syncUrl(push) {
        var path = currentRoute();
        updateMeta();
        if (window.location.pathname === path) return;
        var target = path + window.location.search + window.location.hash;
        var s = { cat: state.catIndex, item: state.itemIndex[state.catIndex], open: state.contentOpen };
        try {
            if (push) window.history.pushState(s, '', target);
            else window.history.replaceState(s, '', target);
        } catch (e) {}
    }

    function applyRoute(path) {
        var clean = path || '/';
        var parts = clean.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
        var catSlug = parts[0] || 'home';
        var itemSlug = parts[1] || '';

        var ci = findCategoryIndex(catSlug);
        if (ci === -1) ci = 0;
        state.catIndex = ci;

        var wantOpen = false;
        if (itemSlug) {
            var ii = findItemIndex(ci, itemSlug);
            if (ii !== -1) {
                state.itemIndex[ci] = ii;
                wantOpen = true;
            }
        }

        updatePositions();
        updateWaveColors();
        updatePreview();

        if (wantOpen) {
            openContent({ skipUrl: true });
        } else if (state.contentOpen) {
            closeContent({ skipUrl: true });
        }

        updateMeta();
    }

    /* ═══════════════════════════════════════════════════════════
       RESPONSIVE HELPERS
       ═══════════════════════════════════════════════════════════ */

    function getCatWidth() {
        if (window.innerWidth <= 480) return 75;
        if (window.innerWidth <= 768) return 90;
        return 120;
    }

    function getItemHeight() {
        // Vertical distance between stacked sub-items. Must comfortably
        // clear the selected icon (56px) + label (14px) + gap, so stacked
        // neighbours don't overlap the focal glyph.
        if (window.innerWidth <= 480) return 60;
        if (window.innerWidth <= 768) return 72;
        if (window.innerHeight <= 600) return 72;
        return 90;
    }

    /* ═══════════════════════════════════════════════════════════
       RENDERING — builds all columns with their items
       ═══════════════════════════════════════════════════════════ */

    function renderBar() {
        dom.bar.innerHTML = '';

        for (var c = 0; c < CATEGORIES.length; c++) {
            var cat = CATEGORIES[c];

            var col = document.createElement('div');
            col.className = 'xmb-col';
            col.setAttribute('data-cat', c);

            // Top: icon + label
            var top = document.createElement('div');
            top.className = 'xmb-col-top';
            top.innerHTML =
                '<i class="xmb-col-icon ' + cat.icon + '"></i>' +
                '<span class="xmb-col-label">' + cat.label + '</span>';
            col.appendChild(top);

            // Items
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'xmb-col-items';

            for (var j = 0; j < cat.items.length; j++) {
                var item = cat.items[j];
                var itemEl = document.createElement('div');
                itemEl.className = 'xmb-sub-item';
                itemEl.setAttribute('data-item', j);
                itemEl.setAttribute('data-cat', c);

                var iconClass = item.icon || 'fa-solid fa-circle';
                itemEl.innerHTML =
                    '<i class="xmb-sub-icon ' + iconClass + '"></i>' +
                    '<span class="xmb-sub-label">' + item.label + '</span>';

                itemsDiv.appendChild(itemEl);
            }

            col.appendChild(itemsDiv);
            dom.bar.appendChild(col);
        }

        updatePositions();
        updatePreview();
    }

    /* ═══════════════════════════════════════════════════════════
       UPDATE POSITIONS — the core PS3 cross-scroll effect
       ═══════════════════════════════════════════════════════════ */

    function updatePositions() {
        // 1. Shift bar horizontally to center active column
        var centerX = window.innerWidth / 2;
        var w = getCatWidth();
        var offset = centerX - (state.catIndex * w) - (w / 2);
        dom.bar.style.transform = 'translateX(' + offset + 'px)';

        var cols = dom.bar.children;
        var h = getItemHeight();

        for (var c = 0; c < cols.length; c++) {
            var isActive = c === state.catIndex;
            var dist = Math.abs(c - state.catIndex);

            cols[c].classList.toggle('active', isActive);
            cols[c].style.opacity = isActive ? '' : Math.max(0.15, 0.5 - dist * 0.12);

            var itemsDiv = cols[c].querySelector('.xmb-col-items');
            var selIdx = state.itemIndex[c];
            var items = itemsDiv.children;

            for (var i = 0; i < items.length; i++) {
                var rel = i - selIdx; // <0 scrolled past (above main), 0 selected (below main), >0 upcoming
                var absRel = Math.abs(rel);

                items[i].classList.toggle('selected', isActive && rel === 0);

                // Main icon is anchored at y=0 and never moves.
                // Sub-items skip y=0 entirely — main icon stands alone there.
                // Extra breathing room below main so the selected sub isn't crowded.
                var BELOW_MAIN_GAP = 36;
                var BELOW_SELECTED_GAP = 28;
                var y = rel < 0 ? rel * h : (rel + 1) * h + BELOW_MAIN_GAP;
                if (rel > 0) y += BELOW_SELECTED_GAP;

                if (rel === 0) {
                    items[i].style.transform = 'translateY(' + y + 'px) scale(1)';
                    items[i].style.opacity = isActive ? '1' : '0';
                    items[i].style.zIndex = '50';
                } else {
                    var scale = Math.max(0.55, 0.85 - absRel * 0.1);
                    var opacity = isActive ? Math.max(0.15, 0.6 - absRel * 0.15) : 0;
                    items[i].style.transform =
                        'translateY(' + y + 'px) scale(' + scale + ')';
                    items[i].style.opacity = opacity;
                    // Items above main icon (rel < 0) sit in front of it; closer = higher z.
                    items[i].style.zIndex = rel < 0 ? (40 - absRel) : (30 - absRel);
                }
            }
        }
    }

    /* ═══════════════════════════════════════════════════════════
       PREVIEW & WAVE COLORS
       ═══════════════════════════════════════════════════════════ */

    function updatePreview() {
        var cat = CATEGORIES[state.catIndex];
        var item = cat.items[state.itemIndex[state.catIndex]];
        dom.preview.textContent = item.preview || '';
    }

    function updateWaveColors() {
        var colors = CATEGORIES[state.catIndex].waveColors;
        if (colors) {
            document.documentElement.style.setProperty('--wave-c1', colors.c1);
            document.documentElement.style.setProperty('--wave-c2', colors.c2);
            document.documentElement.style.setProperty('--wave-c3', colors.c3);
        }
    }

    /* ═══════════════════════════════════════════════════════════
       CONTENT PANEL
       ═══════════════════════════════════════════════════════════ */

    function openContent(opts) {
        var cat = CATEGORIES[state.catIndex];
        var item = cat.items[state.itemIndex[state.catIndex]];
        if (!item.getContent) return;

        state.contentOpen = true;
        dom.contentBody.innerHTML = item.getContent();
        dom.contentBody.scrollTop = 0;
        dom.content.classList.add('open');
        dom.content.setAttribute('aria-hidden', 'false');
        dom.cross.classList.add('shifted');

        if (item.onOpen) {
            setTimeout(item.onOpen, 100);
        }

        if (!opts || !opts.skipUrl) syncUrl(true);
    }

    function closeContent(opts) {
        state.contentOpen = false;
        dom.content.classList.remove('open');
        dom.content.setAttribute('aria-hidden', 'true');
        dom.cross.classList.remove('shifted');

        if (!opts || !opts.skipUrl) syncUrl(true);
    }

    /* ═══════════════════════════════════════════════════════════
       NAVIGATION
       ═══════════════════════════════════════════════════════════ */

    function moveCategory(dir) {
        if (state.contentOpen || state.transitioning) return;
        var next = state.catIndex + dir;
        if (next < 0 || next >= CATEGORIES.length) return;

        state.transitioning = true;
        state.catIndex = next;
        updatePositions();
        updateWaveColors();
        updatePreview();
        applyRandomHue();
        syncUrl(false);
        setTimeout(function () { state.transitioning = false; }, TRANSITION_MS);
    }

    function moveItem(dir) {
        if (state.contentOpen || state.transitioning) return;
        var cat = CATEGORIES[state.catIndex];
        var idx = state.itemIndex[state.catIndex];
        var next = idx + dir;
        if (next < 0 || next >= cat.items.length) return;

        state.itemIndex[state.catIndex] = next;
        updatePositions();
        updatePreview();
    }

    /* ═══════════════════════════════════════════════════════════
       KEYBOARD
       ═══════════════════════════════════════════════════════════ */

    document.addEventListener('keydown', function (e) {
        var tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                state.contentOpen ? closeContent() : moveCategory(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                state.contentOpen ? closeContent() : moveCategory(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!state.contentOpen) moveItem(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!state.contentOpen) moveItem(1);
                break;
            case 'Enter':
                e.preventDefault();
                if (!state.contentOpen) openContent();
                break;
            case 'Escape':
            case 'Backspace':
                if (state.contentOpen) { e.preventDefault(); closeContent(); }
                break;
        }
    });

    /* ═══════════════════════════════════════════════════════════
       CLICK / TAP
       ═══════════════════════════════════════════════════════════ */

    dom.bar.addEventListener('click', function (e) {
        if (state.contentOpen) return;

        // Clicked on a sub-item?
        var subItem = e.target.closest('.xmb-sub-item');
        if (subItem) {
            var catIdx = parseInt(subItem.getAttribute('data-cat'), 10);
            var itemIdx = parseInt(subItem.getAttribute('data-item'), 10);
            if (catIdx === state.catIndex) {
                if (itemIdx === state.itemIndex[catIdx]) {
                    openContent();
                } else {
                    state.itemIndex[catIdx] = itemIdx;
                    updatePositions();
                    updatePreview();
                }
            }
            return;
        }

        // Clicked on a column top (category switch)
        var col = e.target.closest('.xmb-col');
        if (col) {
            var ci = parseInt(col.getAttribute('data-cat'), 10);
            if (ci !== state.catIndex) {
                state.transitioning = true;
                state.catIndex = ci;
                updatePositions();
                updateWaveColors();
                updatePreview();
                applyRandomHue();
                syncUrl(false);
                setTimeout(function () { state.transitioning = false; }, TRANSITION_MS);
            }
        }
    });

    dom.back.addEventListener('click', function () { closeContent(); });

    /* ═══════════════════════════════════════════════════════════
       MOUSE WHEEL
       ═══════════════════════════════════════════════════════════ */

    var wheelLocked = false;

    document.addEventListener('wheel', function (e) {
        if (state.contentOpen || state.transitioning || wheelLocked) return;
        var absX = Math.abs(e.deltaX);
        var absY = Math.abs(e.deltaY);
        if (absX < 15 && absY < 15) return;

        wheelLocked = true;
        setTimeout(function () { wheelLocked = false; }, WHEEL_DEBOUNCE);

        if (absX > absY && absX > 20) {
            moveCategory(e.deltaX > 0 ? 1 : -1);
        } else if (absY > 20) {
            moveItem(e.deltaY > 0 ? 1 : -1);
        }
    }, { passive: true });

    /* ═══════════════════════════════════════════════════════════
       TOUCH / SWIPE
       ═══════════════════════════════════════════════════════════ */

    var touchStartX = 0, touchStartY = 0, touchStartTime = 0;

    dom.xmb.addEventListener('touchstart', function (e) {
        if (state.contentOpen) return;
        var t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    dom.xmb.addEventListener('touchend', function (e) {
        if (state.contentOpen) return;
        var t = e.changedTouches[0];
        var dx = t.clientX - touchStartX;
        var dy = t.clientY - touchStartY;
        if (Date.now() - touchStartTime > 500) return;

        var absDx = Math.abs(dx), absDy = Math.abs(dy);
        if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

        if (absDx > absDy) {
            moveCategory(dx > 0 ? -1 : 1);
        } else {
            moveItem(dy > 0 ? -1 : 1);
        }
    }, { passive: true });

    var contentTouchStartX = 0;
    dom.content.addEventListener('touchstart', function (e) {
        contentTouchStartX = e.touches[0].clientX;
    }, { passive: true });
    dom.content.addEventListener('touchend', function (e) {
        if (e.changedTouches[0].clientX - contentTouchStartX > 80) closeContent();
    }, { passive: true });

    /* ═══════════════════════════════════════════════════════════
       RESIZE
       ═══════════════════════════════════════════════════════════ */

    var resizeTimer = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updatePositions, 100);
    });

    /* ═══════════════════════════════════════════════════════════
       CLOCK
       ═══════════════════════════════════════════════════════════ */

    function updateClock() {
        var now = new Date();
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var h = now.getHours(), m = now.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        dom.clock.textContent = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() + '  ' + h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
    }

    /* ═══════════════════════════════════════════════════════════
       TYPEWRITER
       ═══════════════════════════════════════════════════════════ */

    function typeWriter(element, text, speed) {
        var idx = 0;
        function tick() {
            if (idx < text.length) {
                element.textContent += text.charAt(idx);
                idx++;
                setTimeout(tick, speed);
            }
        }
        tick();
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */

    window.addEventListener('popstate', function () {
        applyRoute(window.location.pathname);
    });

    function init() {
        renderBar();
        applyRoute(window.location.pathname);
        syncUrl(false);
        updateClock();
        setInterval(updateClock, 30000);
        waitForAssetsThenReveal();
    }

    function waitForAssetsThenReveal() {
        var loader = document.getElementById('xmb-loader');
        if (!loader) return;

        var MIN_DISPLAY_MS = 700;
        var MAX_WAIT_MS = 6000;
        var startedAt = Date.now();

        function once(target, evt) {
            return new Promise(function (resolve) {
                target.addEventListener(evt, function handler() {
                    target.removeEventListener(evt, handler);
                    resolve();
                });
            });
        }

        var windowLoad = document.readyState === 'complete'
            ? Promise.resolve()
            : once(window, 'load');

        var fontsReady = (document.fonts && document.fonts.ready)
            ? document.fonts.ready
            : Promise.resolve();

        var videoReady = new Promise(function (resolve) {
            var v = dom.bgVideo;
            if (!v) return resolve();
            if (v.readyState >= 3) return resolve();
            var done = false;
            function finish() { if (!done) { done = true; resolve(); } }
            v.addEventListener('canplay', finish, { once: true });
            v.addEventListener('loadeddata', finish, { once: true });
            v.addEventListener('error', finish, { once: true });
        });

        var ready = Promise.all([windowLoad, fontsReady, videoReady]);
        var maxWait = new Promise(function (r) { setTimeout(r, MAX_WAIT_MS); });

        Promise.race([ready, maxWait]).then(function () {
            var elapsed = Date.now() - startedAt;
            var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
            setTimeout(function () {
                loader.classList.add('hidden');
                setTimeout(function () {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 800);
            }, remaining);
        });
    }

    init();
})();
