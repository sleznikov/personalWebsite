(function () {
    'use strict';

    /* ═══════════════════════════════════════════════════════════
       CONFIGURATION
       ═══════════════════════════════════════════════════════════ */

    var ITEM_H = 52;
    var CAT_W = 140;
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
                            '<div class="xc-about-photo">' +
                                '<img src="images/FullSizeRender.jpg" alt="Stephan Leznikov">' +
                            '</div>' +
                            '<p class="xc-about-text">Hello there! I\'m Stephan, a Computer Science and AI student at Queen\'s University with a hands-on approach to building intelligent systems. Currently, I\'m working as an AI/Machine Learning Intern at Kyndryl, where I designed and developed an AI-powered document validation and data extraction system that automated a client\'s mortgage application review process, effectively doubling their application throughput. From deep learning models and NLP pipelines to full-stack web apps, I love taking an idea from concept to production. I\'m always looking for the next challenging problem to solve, whether that\'s training a neural network, architecting a clean API, or collaborating with a team to ship something meaningful.</p>' +
                        '</div>';
                    }
                },
                {
                    id: 'experience',
                    icon: 'fa-solid fa-briefcase',
                    label: 'Experience',
                    preview: 'Kyndryl \u2014 AI / Machine Learning Intern',
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
                    preview: 'Queen\'s University \u2014 B.Sc. Computer Science / AI',
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
                    thumb: 'images/habitat.jpg',
                    label: 'Document Validator & Extractor',
                    preview: 'AI-powered document validation and data extraction system deployed on Azure Functions',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Document Validator &amp; Extractor</h2>' +
                            '<div class="xc-project-image"><img src="images/habitat.jpg" alt="Document Validator"></div>' +
                            '<p class="xc-project-desc">AI-powered document validation and data extraction system built for a real-world client engagement at Kyndryl. The system is deployed on Azure Functions and automates the review of supporting documents submitted during mortgage applications \u2014 identifying document types, validating completeness, and extracting key data fields using a combination of OCR, NLP, and custom classification logic.</p>' +
                            '<p class="xc-project-desc">Extracted data is transmitted directly to Salesforce for centralized case management, eliminating manual data entry and significantly reducing turnaround times for application reviewers. The solution effectively doubled the client\u2019s mortgage application throughput.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Azure Functions</span><span class="xc-tag">Python</span><span class="xc-tag">OCR</span><span class="xc-tag">NLP</span><span class="xc-tag">Salesforce</span></div>' +
                        '</div>';
                    }
                },
                {
                    id: 'autodrive',
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
                    thumb: 'images/food classifier.jpg',
                    label: 'Food Classifier',
                    preview: 'Deep learning model classifying 41 food categories with 85-90% accuracy',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Food Classifier</h2>' +
                            '<div class="xc-project-image"><img src="images/food classifier.jpg" alt="Food Classifier"></div>' +
                            '<p class="xc-project-desc">A deep learning image classification model built using MobileNetV2 transfer learning to accurately identify and categorize 41 different food types with 85\u201390% accuracy. The model was trained on a large labeled dataset with extensive data augmentation techniques \u2014 including random rotation, flipping, zoom, and brightness adjustments \u2014 to improve generalization and reduce overfitting.</p>' +
                            '<p class="xc-project-desc">The training pipeline was optimized for GPU acceleration, with real-time performance monitoring through TensorBoard. The architecture leverages MobileNetV2\'s lightweight design, making it suitable for deployment on resource-constrained devices and mobile applications.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">TensorFlow</span><span class="xc-tag">MobileNetV2</span><span class="xc-tag">Transfer Learning</span><span class="xc-tag">Python</span><span class="xc-tag">TensorBoard</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/food-classifier" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'statzone',
                    thumb: 'images/Stocks-market.jpg',
                    label: 'StatZone',
                    preview: 'Sports analyst chatbot powered by OpenAI API',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">StatZone</h2>' +
                            '<div class="xc-project-image"><img src="images/Stocks-market.jpg" alt="StatZone"></div>' +
                            '<p class="xc-project-desc">An intelligent sports analyst chatbot powered by the OpenAI API, designed to provide real-time insights into team performances, player statistics, historical matchups, and game strategies. Users can interact with the chatbot through natural language queries to get detailed breakdowns, comparisons, and predictions \u2014 making complex sports data accessible and conversational.</p>' +
                            '<p class="xc-project-desc">The system integrates advanced machine learning models with live and historical data analytics to generate outcome predictions, identify trends, and surface non-obvious statistical patterns. Built with a focus on delivering fast, accurate, and contextually relevant responses to both casual fans and serious analysts.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">OpenAI API</span><span class="xc-tag">Python</span><span class="xc-tag">NLP</span><span class="xc-tag">Data Analytics</span><span class="xc-tag">Chatbot</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/StatZone_OpenAI" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'sentiment',
                    thumb: 'images/sentiment analysis.jpg',
                    label: 'Sentiment Analysis',
                    preview: 'Advanced NLP system combining Random Forest ML with rule-based analysis',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">Sentiment Analysis</h2>' +
                            '<div class="xc-project-image"><img src="images/sentiment analysis.jpg" alt="Sentiment Analysis"></div>' +
                            '<p class="xc-project-desc">An advanced natural language processing system that combines a Random Forest machine learning classifier with a sophisticated rule-based analysis engine for nuanced text sentiment classification. The hybrid approach allows the system to handle complex linguistic constructs that trip up purely statistical models \u2014 including negation detection (e.g., "not good"), intensity modifiers (e.g., "very," "slightly"), and context-dependent phrasing.</p>' +
                            '<p class="xc-project-desc">The system integrates a comprehensive sentiment lexicon and custom feature engineering pipeline to extract meaningful signals from raw text. It delivers accurate positive, negative, and neutral classifications across a variety of domains, from product reviews to social media posts.</p>' +
                            '<div class="xc-project-tags"><span class="xc-tag">Python</span><span class="xc-tag">scikit-learn</span><span class="xc-tag">NLP</span><span class="xc-tag">Random Forest</span><span class="xc-tag">Feature Engineering</span></div>' +
                            '<a class="xc-project-link" href="https://github.com/sleznikov/sentiment-analysis-tool" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>' +
                        '</div>';
                    }
                },
                {
                    id: 'platformer',
                    thumb: 'images/unity game.png',
                    label: '2D Platformer',
                    preview: 'A 2D platformer game built with Unity and C#',
                    getContent: function () {
                        return '<div class="xc-project">' +
                            '<h2 class="xc-title">2D Platformer</h2>' +
                            '<div class="xc-project-image"><img src="images/unity game.png" alt="2D Platformer"></div>' +
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

    // Initialize per-category item indices
    for (var i = 0; i < CATEGORIES.length; i++) {
        state.itemIndex.push(0);
    }

    /* ═══════════════════════════════════════════════════════════
       DOM REFERENCES
       ═══════════════════════════════════════════════════════════ */

    var dom = {
        xmb: document.getElementById('xmb'),
        categories: document.getElementById('xmb-categories'),
        catLabel: document.getElementById('xmb-cat-label'),
        itemsRegion: document.getElementById('xmb-items-region'),
        items: document.getElementById('xmb-items'),
        content: document.getElementById('xmb-content'),
        contentBody: document.getElementById('xmb-content-body'),
        cross: document.getElementById('xmb-cross'),
        back: document.getElementById('xmb-back'),
        clock: document.getElementById('xmb-clock'),
        preview: document.getElementById('xmb-preview')
    };

    /* ═══════════════════════════════════════════════════════════
       RENDERING — CATEGORIES
       ═══════════════════════════════════════════════════════════ */

    function renderCategories() {
        dom.categories.innerHTML = '';
        for (var i = 0; i < CATEGORIES.length; i++) {
            var cat = CATEGORIES[i];
            var el = document.createElement('div');
            el.className = 'xmb-cat' + (i === state.catIndex ? ' active' : '');
            el.setAttribute('role', 'tab');
            el.setAttribute('aria-selected', i === state.catIndex ? 'true' : 'false');
            el.setAttribute('data-index', i);
            el.innerHTML =
                '<i class="xmb-cat-i ' + cat.icon + '"></i>' +
                '<i class="xmb-cat-reflect ' + cat.icon + '" aria-hidden="true"></i>';
            dom.categories.appendChild(el);
        }
        updateCategoryPositions();
        updateCatLabel();
    }

    function updateCategoryPositions() {
        var centerX = window.innerWidth / 2;
        var w = getCatWidth();
        var offset = centerX - (state.catIndex * w) - (w / 2);
        dom.categories.style.transform = 'translateX(' + offset + 'px)';

        var icons = dom.categories.children;
        for (var i = 0; i < icons.length; i++) {
            var dist = Math.abs(i - state.catIndex);
            var isActive = dist === 0;
            icons[i].className = 'xmb-cat' + (isActive ? ' active' : '');
            icons[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
            icons[i].style.opacity = isActive ? 1 : Math.max(0.15, 0.5 - dist * 0.12);
        }
    }

    function updateCatLabel() {
        dom.catLabel.textContent = CATEGORIES[state.catIndex].label;
    }

    function getCatWidth() {
        if (window.innerWidth <= 480) return 80;
        if (window.innerWidth <= 768) return 100;
        return CAT_W;
    }

    function getItemHeight() {
        if (window.innerWidth <= 768) return 48;
        if (window.innerHeight <= 600) return 44;
        return ITEM_H;
    }

    /* ═══════════════════════════════════════════════════════════
       RENDERING — ITEMS
       ═══════════════════════════════════════════════════════════ */

    function renderItems() {
        var cat = CATEGORIES[state.catIndex];
        dom.items.innerHTML = '';
        for (var i = 0; i < cat.items.length; i++) {
            var item = cat.items[i];
            var el = document.createElement('div');
            el.className = 'xmb-item';
            el.setAttribute('role', 'option');
            el.setAttribute('data-index', i);

            var inner = '';
            if (item.thumb) {
                inner += '<img class="xmb-item-thumb" src="' + item.thumb + '" alt="">';
            } else if (item.icon) {
                inner += '<i class="xmb-item-icon ' + item.icon + '"></i>';
            }
            inner += '<span class="xmb-item-label">' + item.label + '</span>';
            el.innerHTML = inner;
            dom.items.appendChild(el);
        }
        updateItemPositions();
        updatePreview();
    }

    function updateItemPositions() {
        var idx = state.itemIndex[state.catIndex];
        var h = getItemHeight();
        var regionH = dom.itemsRegion.clientHeight;
        var center = (regionH / 2) - (h / 2);
        dom.items.style.transform = 'translateY(' + (center - idx * h) + 'px)';

        var els = dom.items.children;
        for (var i = 0; i < els.length; i++) {
            var dist = Math.abs(i - idx);
            var isSelected = i === idx;
            els[i].style.opacity = isSelected ? 1 : Math.max(0.12, 0.5 - dist * 0.13);
            if (isSelected) {
                els[i].classList.add('xmb-item--selected');
                els[i].setAttribute('aria-selected', 'true');
            } else {
                els[i].classList.remove('xmb-item--selected');
                els[i].setAttribute('aria-selected', 'false');
            }
        }
    }

    function updatePreview() {
        var cat = CATEGORIES[state.catIndex];
        var idx = state.itemIndex[state.catIndex];
        var item = cat.items[idx];
        dom.preview.textContent = item.preview || '';
    }

    /* ═══════════════════════════════════════════════════════════
       RENDERING — WAVE COLORS
       ═══════════════════════════════════════════════════════════ */

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

    function openContent() {
        var cat = CATEGORIES[state.catIndex];
        var idx = state.itemIndex[state.catIndex];
        var item = cat.items[idx];

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
    }

    function closeContent() {
        state.contentOpen = false;
        dom.content.classList.remove('open');
        dom.content.setAttribute('aria-hidden', 'true');
        dom.cross.classList.remove('shifted');
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

        updateCategoryPositions();
        updateCatLabel();
        updateWaveColors();
        renderItems();

        setTimeout(function () {
            state.transitioning = false;
        }, TRANSITION_MS);
    }

    function moveItem(dir) {
        if (state.contentOpen || state.transitioning) return;

        var cat = CATEGORIES[state.catIndex];
        var idx = state.itemIndex[state.catIndex];
        var next = idx + dir;
        if (next < 0 || next >= cat.items.length) return;

        state.itemIndex[state.catIndex] = next;
        updateItemPositions();
        updatePreview();
    }

    /* ═══════════════════════════════════════════════════════════
       KEYBOARD HANDLER
       ═══════════════════════════════════════════════════════════ */

    document.addEventListener('keydown', function (e) {
        // Don't capture if user is typing in a form field
        var tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (state.contentOpen) {
                    closeContent();
                } else {
                    moveCategory(-1);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (state.contentOpen) {
                    closeContent();
                } else {
                    moveCategory(1);
                }
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
                if (state.contentOpen) {
                    e.preventDefault();
                    closeContent();
                }
                break;
        }
    });

    /* ═══════════════════════════════════════════════════════════
       MOUSE / CLICK HANDLERS
       ═══════════════════════════════════════════════════════════ */

    // Click on category icons
    dom.categories.addEventListener('click', function (e) {
        var catEl = e.target.closest('.xmb-cat');
        if (!catEl || state.contentOpen) return;
        var idx = parseInt(catEl.getAttribute('data-index'), 10);
        if (idx === state.catIndex) return;

        state.transitioning = true;
        state.catIndex = idx;
        updateCategoryPositions();
        updateCatLabel();
        updateWaveColors();
        renderItems();
        setTimeout(function () { state.transitioning = false; }, TRANSITION_MS);
    });

    // Click on items
    dom.items.addEventListener('click', function (e) {
        var itemEl = e.target.closest('.xmb-item');
        if (!itemEl || state.contentOpen) return;
        var idx = parseInt(itemEl.getAttribute('data-index'), 10);
        if (idx !== state.itemIndex[state.catIndex]) {
            state.itemIndex[state.catIndex] = idx;
            updateItemPositions();
            updatePreview();
        } else {
            openContent();
        }
    });

    // Back button
    dom.back.addEventListener('click', function () {
        closeContent();
    });

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

    var touchStartX = 0;
    var touchStartY = 0;
    var touchStartTime = 0;

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
        var dt = Date.now() - touchStartTime;

        // Only count swipes under 500ms
        if (dt > 500) return;

        var absDx = Math.abs(dx);
        var absDy = Math.abs(dy);

        if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

        if (absDx > absDy) {
            // Horizontal swipe
            moveCategory(dx > 0 ? -1 : 1);
        } else {
            // Vertical swipe
            moveItem(dy > 0 ? -1 : 1);
        }
    }, { passive: true });

    // Swipe back on content panel
    var contentTouchStartX = 0;

    dom.content.addEventListener('touchstart', function (e) {
        contentTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    dom.content.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - contentTouchStartX;
        // Swipe right to close
        if (dx > 80) {
            closeContent();
        }
    }, { passive: true });

    /* ═══════════════════════════════════════════════════════════
       WINDOW RESIZE
       ═══════════════════════════════════════════════════════════ */

    var resizeTimer = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            updateCategoryPositions();
            updateItemPositions();
        }, 100);
    });

    /* ═══════════════════════════════════════════════════════════
       CLOCK
       ═══════════════════════════════════════════════════════════ */

    function updateClock() {
        var now = new Date();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var h = now.getHours();
        var m = now.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        var timeStr = h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
        var dateStr = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
        dom.clock.textContent = dateStr + '  ' + timeStr;
    }

    /* ═══════════════════════════════════════════════════════════
       TYPEWRITER EFFECT
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
       INITIALIZATION
       ═══════════════════════════════════════════════════════════ */

    function init() {
        renderCategories();
        renderItems();
        updateWaveColors();
        updateClock();
        setInterval(updateClock, 30000);
    }

    init();
})();
