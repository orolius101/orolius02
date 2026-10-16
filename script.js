/* ==========================================================================
   OROLIUS - MAIN INTERACTIVE ENGINE
   Handles View Routing, Interactive Demos, Modals, and Forms
   ========================================================================== */


document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('error', function(e) {
        alert("JS ERROR: " + e.message + "\nat " + e.filename + ":" + e.lineno);
    });
    // ----------------------------------------------------------------------
    // DOM Elements
    // ----------------------------------------------------------------------
    const landingGate = document.getElementById('landing-gate');
    const individualPortal = document.getElementById('individual-portal');
    const businessPortal = document.getElementById('business-portal');
    
    const btnSelectIndividual = document.getElementById('btn-select-individual');
    const btnSelectBusiness = document.getElementById('btn-select-business');
    const homeNavBtn = document.getElementById('home-nav-btn');
    const brandLogo = document.getElementById('brand-logo');
    const portalIndicator = document.getElementById('portal-indicator');

    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const contactEmailBtn = document.getElementById('contact-email-btn');
    const contactFbBtn = document.getElementById('contact-fb-btn');

    // Navigation is now handled natively via standard HTML anchor links.

    // ----------------------------------------------------------------------
    // Universal Modal Controllers
    // ----------------------------------------------------------------------
    function openModal(contentHtml, isWide = false) {
        const modalCard = document.getElementById('modal-card');
        if (modalCard) {
            if (isWide) {
                modalCard.classList.add('preview-wide');
            } else {
                modalCard.classList.remove('preview-wide');
            }
        }
        modalBody.innerHTML = contentHtml;
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalContainer.classList.remove('active');
        const modalCard = document.getElementById('modal-card');
        if (modalCard) modalCard.classList.remove('preview-wide');
        document.body.style.overflow = 'auto';
    }

    function openOrderModal(serviceName, prefilledDetails = '') {
        openModal(`
            <div class="demo-box" style="padding: 10px 10px;">
                <h3 class="demo-title" style="font-family: var(--font-main); font-weight: 700; margin-bottom: 8px;">Get Started with Orolius</h3>
                <p class="demo-sub" style="font-family: var(--font-main); margin-bottom: 20px;">Selected Package: <strong>${serviceName}</strong></p>

                <form class="order-form" id="customizer-form" style="text-align: left;">
                    <input type="hidden" name="service" value="${serviceName}">
                    
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; font-family: var(--font-main);">Your Full Name *</label>
                        <input type="text" placeholder="e.g. Alex Morgan" required style="width: 100%; padding: 10px 15px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: var(--font-main); font-size: 13px; outline: none; background: #fff; color: #000;">
                    </div>

                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; font-family: var(--font-main);">Email or WhatsApp Number *</label>
                        <input type="text" placeholder="e.g. alex@example.com or +1234567890" required style="width: 100%; padding: 10px 15px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: var(--font-main); font-size: 13px; outline: none; background: #fff; color: #000;">
                    </div>

                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; font-family: var(--font-main);">Project Details / Special Requests</label>
                        <textarea rows="4" style="width: 100%; padding: 10px 15px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: var(--font-main); font-size: 13px; outline: none; resize: vertical; background: #fff; color: #000;" placeholder="Tell us about recipient names, specific colors, music, or business requirements...">${prefilledDetails}</textarea>
                    </div>

                    <button type="submit" class="submit-order-btn" style="background: #000; color: #fff; border: none; border-radius: 50px; padding: 12px 30px; font-weight: 700; font-size: 14px; width: 100%; cursor: pointer; transition: all 0.2s; font-family: var(--font-main); letter-spacing: 0.5px;">Submit Request</button>
                </form>
            </div>
        `);

        // Setup form submission listener in order modal
        const form = document.getElementById('customizer-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Extract inputs dynamically from order form
                const nameInput = form.querySelector('input[placeholder*="Alex Morgan"]');
                const contactInput = form.querySelector('input[placeholder*="alex@example.com"]');
                const detailsTextarea = form.querySelector('textarea');

                const clientName = nameInput ? nameInput.value.trim() : '';
                const clientContact = contactInput ? contactInput.value.trim() : '';
                const orderDetails = detailsTextarea ? detailsTextarea.value.trim() : '';

                // Compile final structured message
                const msg = `Hello! I would like to order a Custom Website!\n\n*Package:* ${serviceName}\n*Name:* ${clientName}\n*Contact:* ${clientContact}\n\n*Customization Details:*\n${orderDetails}`;
                const encodedMsg = encodeURIComponent(msg);

                // Open WhatsApp chat prefilled with design choices in new tab
                window.open(`https://wa.me/918544746571?text=${encodedMsg}`, '_blank');

                openModal(`
                    <div class="demo-box" style="text-align: center; padding: 30px; font-family: var(--font-main);">
                        <div style="font-size: 50px; margin-bottom: 15px;">🎉</div>
                        <h3 class="demo-title" style="font-weight: 700; font-size: 20px; margin-bottom: 10px;">Thank You!</h3>
                        <p class="demo-sub" style="font-size: 13px; line-height: 1.5; color: #666; max-width: 320px; margin: 0 auto 20px;">Your customization request details have been opened in WhatsApp! Please send the pre-filled message to complete your order. Our team will contact you shortly! 😊</p>
                        <button class="customizer-outline-btn" id="btn-close-thanks" style="border: 2px solid #000; padding: 10px 25px; border-radius: 50px; font-weight: 700; cursor: pointer; background: #fff; font-family: var(--font-main); text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Close</button>
                    </div>
                `);
                const closeThanks = document.getElementById('btn-close-thanks');
                if (closeThanks) {
                    closeThanks.addEventListener('click', closeModal);
                }
            });
        }
    }

    modalClose.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    // ----------------------------------------------------------------------
    // Rakhi Cross-Theme Section Mixer & Customizer Engine
    // ----------------------------------------------------------------------
    const _RAKHI_THEMES = [
        { id: 'cinema', name: 'Cinema', icon: '🎬', file: 'raksha_bandhan_cinema_sections.html' },
        { id: 'night_sky', name: 'Night Sky', icon: '🌌', file: 'raksha_bandhan_night_sky_sections.html' },
        { id: 'passport', name: 'Passport', icon: '✈️', file: 'raksha_bandhan_passport_sections.html' },
        { id: 'recipe', name: 'Recipe', icon: '🍳', file: 'raksha_bandhan_recipe_sections.html' },
        { id: 'spy', name: 'Spy Mission', icon: '🕵️', file: 'raksha_bandhan_spy_sections.html' },
        { id: 'stats_badges', name: 'Stats & Badges', icon: '📊', file: 'raksha_bandhan_stats_badges_sections.html' },
        { id: 'weather', name: 'Weather', icon: '🌦️', file: 'raksha_bandhan_weather_sections.html' },
        { id: 'website_cute', name: 'Cute Sibling', icon: '🧸', file: 'raksha_bandhan_website_sections_cute.html' },
        { id: 'website_mockup', name: 'Classic Mockup', icon: '📱', file: 'raksha_bandhan_website_sections_mockup.html' },
        { id: 'front_pages', name: 'Front Pages', icon: '🚪', file: 'front_page_sections.html' }
    ];

    
    const _GFBF_THEMES = [
        { id: 'gfbf_garden', name: 'Garden Growth', icon: '🌻', file: 'garden_growth_sections.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_more', name: 'More Sections', icon: '💕', file: 'girlfriend_boyfriend_page_more_sections.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_more2', name: 'More Sections 2', icon: '💖', file: 'girlfriend_boyfriend_page_more_sections_2.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_basic', name: 'GF/BF Basic', icon: '💑', file: 'girlfriend_boyfriend_page_sections.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_personal', name: 'Personal GF/BF', icon: '💌', file: 'personal_girlfriend_boyfriend_page.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_treasure', name: 'Treasure Map', icon: '🗺️', file: 'treasure_map_sections.html', folder: 'new sections for gfbf sites' },
        { id: 'gfbf_front_pages', name: 'Front Pages', icon: '🚪', file: 'front_page_sections.html', folder: 'new sections for gfbf sites' }
    ];

    const RAKHI_THEMES = [..._RAKHI_THEMES, ..._GFBF_THEMES];
    const GFBF_THEMES = [..._GFBF_THEMES, ..._RAKHI_THEMES];
    const GFBF_FRONT_PAGES_THEME = _GFBF_THEMES.find(t => t.id === 'gfbf_front_pages');
    const CRUSH_THEMES = [
        { id: 'crush_confessions', name: 'Confessions Grid', icon: '💖', file: 'crush_website_sections.html', folder: 'section_for_crush' },
        { id: 'crush_countdown', name: 'Countdown', icon: '⏳', file: '1-countdown-timer.html', folder: 'sections_for_crush' },
        { id: 'crush_compliments', name: 'Compliment Jar', icon: '🍯', file: '2-compliment-jar.html', folder: 'sections_for_crush' },
        { id: 'crush_spin', name: 'Spin the Wheel', icon: '🎡', file: '4-spin-wheel.html', folder: 'sections_for_crush' },
        { id: 'crush_gallery', name: 'Photo Gallery', icon: '🖼️', file: '5-photo-gallery.html', folder: 'sections_for_crush' },
        { id: 'crush_choices', name: 'This or That', icon: '⚖️', file: '6-this-or-that.html', folder: 'sections_for_crush' },
        { id: 'crush_coupons', name: 'Love Coupons', icon: '🎟️', file: '7-love-coupons.html', folder: 'sections_for_crush' }
    ];

    const BIRTHDAY_THEMES = [
        { id: 'bd_age', name: 'Age in Numbers', icon: '🔢', file: 'section-age-in-numbers.html', folder: 'sections_for_birthday' },
        { id: 'bd_candles', name: 'Blow Candles', icon: '🎂', file: 'section-blow-out-candles.html', folder: 'sections_for_birthday' },
        { id: 'bd_timeline', name: 'Memory Timeline', icon: '📅', file: 'section-memory-timeline.html', folder: 'sections_for_birthday' },
        { id: 'bd_letters', name: 'Open When Letters', icon: '✉️', file: 'section-open-when-letters.html', folder: 'sections_for_birthday' },
        { id: 'bd_voice', name: 'Voice Message', icon: '🎙️', file: 'section-voice-message.html', folder: 'sections_for_birthday' },
        { id: 'bd_wishes', name: 'Wish Wall', icon: '📝', file: 'section-wish-wall.html', folder: 'sections_for_birthday' }
    ];

    const COLOR_PALETTES = [
        { id: 'default', name: 'Original Multi', gradient: 'linear-gradient(135deg, #3b82f6, #ec4899, #eab308)' },
        { id: 'gold', name: 'Festive Gold 🪔', gradient: 'linear-gradient(135deg, #fbbf24, #d97706)' },
        { id: 'midnight', name: 'Starry Night 🌌', gradient: 'linear-gradient(135deg, #818cf8, #0f172a)' },
        { id: 'rose', name: 'Rose Pink 🌸', gradient: 'linear-gradient(135deg, #fb7185, #e11d48)' },
        { id: 'emerald', name: 'Mint Emerald 🌿', gradient: 'linear-gradient(135deg, #34d399, #059669)' },
        { id: 'ocean', name: 'Ocean Breeze 🌊', gradient: 'linear-gradient(135deg, #38bdf8, #0284c7)' },
        { id: 'violet', name: 'Royal Violet 🔮', gradient: 'linear-gradient(135deg, #c084fc, #7c3aed)' },
        { id: 'crimson', name: 'Crimson Red 🎬', gradient: 'linear-gradient(135deg, #f87171, #8b1c1c)' }
    ];

    // Starter Templates — curated combos of sections
    const RAKHI_TEMPLATES = [
        {
            id: 'classic_sibling',
            name: 'Classic Sibling Love',
            icon: '🧸',
            description: 'Cinema posters, constellations, boarding passes, stats & cute polaroids',
            sections: [
                { themeId: 'cinema', secIndex: 0 },
                { themeId: 'night_sky', secIndex: 1 },
                { themeId: 'passport', secIndex: 1 },
                { themeId: 'stats_badges', secIndex: 1 },
                { themeId: 'website_cute', secIndex: 2 }
            ]
        },
        {
            id: 'spy_adventure',
            name: 'Secret Agent Sibling',
            icon: '🕵️',
            description: 'Classified dossier, agent ID, mission briefing & secret code words',
            sections: [
                { themeId: 'spy', secIndex: 0 },
                { themeId: 'spy', secIndex: 1 },
                { themeId: 'spy', secIndex: 2 },
                { themeId: 'spy', secIndex: 3 },
                { themeId: 'spy', secIndex: 5 },
                { themeId: 'spy', secIndex: 6 }
            ]
        },
        {
            id: 'cozy_memories',
            name: 'Cozy Memory Book',
            icon: '📖',
            description: 'Cute timeline, promise cards, playlist, recipe card & weather moods',
            sections: [
                { themeId: 'website_cute', secIndex: 0 },
                { themeId: 'website_cute', secIndex: 1 },
                { themeId: 'website_cute', secIndex: 3 },
                { themeId: 'website_cute', secIndex: 5 },
                { themeId: 'recipe', secIndex: 0 },
                { themeId: 'weather', secIndex: 0 }
            ]
        },
        {
            id: 'travel_passport',
            name: 'World Traveler',
            icon: '✈️',
            description: 'Passport cover, stamps, boarding pass, postcards & destination vibes',
            sections: [
                { themeId: 'passport', secIndex: 0 },
                { themeId: 'passport', secIndex: 1 },
                { themeId: 'passport', secIndex: 2 },
                { themeId: 'passport', secIndex: 3 },
                { themeId: 'passport', secIndex: 4 },
                { themeId: 'passport', secIndex: 5 }
            ]
        },
        {
            id: 'flower_surprise',
            name: 'Flower Surprise',
            icon: '🌸',
            description: 'Interactive flower planting intro + cinema & night sky sections',
            sections: [
                { themeId: 'front_pages', secIndex: 0 },
                { themeId: 'cinema', secIndex: 0 },
                { themeId: 'night_sky', secIndex: 0 },
                { themeId: 'stats_badges', secIndex: 2 },
                { themeId: 'website_cute', secIndex: 4 }
            ]
        }
    ];

    const GFBF_TEMPLATES = [
        {
            id: 'romantic_garden',
            name: 'Romantic Garden',
            icon: '🌻',
            description: 'Garden growth, love notes, picture wall & bloom gallery',
            sections: [
                { themeId: 'gfbf_garden', secIndex: 0 },
                { themeId: 'gfbf_garden', secIndex: 1 },
                { themeId: 'gfbf_garden', secIndex: 2 },
                { themeId: 'gfbf_personal', secIndex: 1 },
                { themeId: 'gfbf_garden', secIndex: 4 },
                { themeId: 'gfbf_garden', secIndex: 6 }
            ]
        },
        {
            id: 'love_story',
            name: 'Our Love Story',
            icon: '💑',
            description: 'Day counter, how we met, milestones, love letter & playlist',
            sections: [
                { themeId: 'gfbf_basic', secIndex: 0 },
                { themeId: 'gfbf_basic', secIndex: 1 },
                { themeId: 'gfbf_basic', secIndex: 2 },
                { themeId: 'gfbf_basic', secIndex: 3 },
                { themeId: 'gfbf_basic', secIndex: 4 },
                { themeId: 'gfbf_basic', secIndex: 5 }
            ]
        },
        {
            id: 'treasure_hunt',
            name: 'Treasure Hunt Adventure',
            icon: '🗺️',
            description: 'Treasure map, ship\'s log, chest reveal & message in a bottle',
            sections: [
                { themeId: 'gfbf_treasure', secIndex: 0 },
                { themeId: 'gfbf_treasure', secIndex: 1 },
                { themeId: 'gfbf_treasure', secIndex: 2 },
                { themeId: 'gfbf_treasure', secIndex: 3 },
                { themeId: 'gfbf_treasure', secIndex: 4 },
                { themeId: 'gfbf_treasure', secIndex: 6 }
            ]
        },
        {
            id: 'personal_touch',
            name: 'Personal & Heartfelt',
            icon: '💌',
            description: 'Hero, picture wall, voice message, favorite memory & written note',
            sections: [
                { themeId: 'gfbf_personal', secIndex: 0 },
                { themeId: 'gfbf_personal', secIndex: 1 },
                { themeId: 'gfbf_personal', secIndex: 2 },
                { themeId: 'gfbf_personal', secIndex: 3 },
                { themeId: 'gfbf_personal', secIndex: 4 },
                { themeId: 'gfbf_personal', secIndex: 5 }
            ]
        },
        {
            id: 'fun_interactive',
            name: 'Fun & Interactive',
            icon: '🎮',
            description: 'Inside jokes, compliment jar, date night generator, nicknames & firsts',
            sections: [
                { themeId: 'gfbf_more', secIndex: 2 },
                { themeId: 'gfbf_more', secIndex: 3 },
                { themeId: 'gfbf_more', secIndex: 5 },
                { themeId: 'gfbf_more', secIndex: 6 },
                { themeId: 'gfbf_more2', secIndex: 1 },
                { themeId: 'gfbf_more2', secIndex: 5 }
            ]
        }
    ];

    // Global in-memory cache of parsed theme sections
    let parsedThemeCache = {};

    function parseSectionsFromHtml(htmlString, themeId, themeName, themeIcon) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Check if it's a full HTML page
        const isFullPage = htmlString.includes('<body') || htmlString.includes('<!DOCTYPE') || doc.querySelector('body');

        if (isFullPage) {
            const bodyWrapper = document.createElement('div');
            bodyWrapper.className = 'wrap';

            // Move all body children (including wrapper and overlays) into the card wrapper
            while (doc.body.firstChild) {
                bodyWrapper.appendChild(doc.body.firstChild);
            }

            // Extract and clone style tags from head or body
            doc.querySelectorAll('style').forEach(style => {
                let cssText = style.textContent;

                if (themeId.startsWith('bd_')) {
                    // Birthday-specific CSS rewrites
                    cssText = cssText.replace(/:root\s*\{([^}]*)\}/gi, (match, rootRules) => {
                        return `.wrap {
                            --cream: var(--surface-0, #fff8ec);
                            --card: var(--surface-1, #ffffff);
                            --navy: var(--surface-2, #241a3d);
                            --ink: var(--text-primary, #3a2a1a);
                            --coral: var(--fill-primary, #ff6b5b);
                            --coral-dark: var(--fill-primary, #e14d3d);
                            --sun: var(--fill-primary, #ffc93c);
                            --teal: var(--text-secondary, #1fb6a5);
                        }`;
                    });

                    // Strip excessive heights and margins from section tags
                    cssText = cssText.replace(/section\s*\{([^}]*)\}/gi, (match, sectionRules) => {
                        return `section {
                            padding: 24px 16px !important;
                            min-height: auto !important;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            box-sizing: border-box;
                        }`;
                    });
                } else {
                    // Crush-specific CSS rewrites
                    cssText = cssText.replace(/:root\s*\{([^}]*)\}/gi, (match, rootRules) => {
                        return `.wrap {
                            --bg: var(--surface-0, #170f2b);
                            --card: var(--surface-1, #211640);
                            --gold: var(--fill-primary, #e7b955);
                            --blush: var(--text-muted, #f0a8c4);
                            --lavender: var(--text-secondary, #a394c9);
                            --cream: var(--text-primary, #f7f1e6);
                            --line: var(--border, rgba(247,241,230,0.14));
                        }`;
                    });
                }

                // Replace body/html selectors with .wrap to scope them correctly inside viewport
                cssText = cssText.replace(/html,\s*body\s*\{[^}]*\}/gi, '');
                cssText = cssText.replace(/body\s*\{([^}]*)\}/gi, (match, bodyRules) => {
                    const cleanBodyRules = bodyRules
                        .replace(/display\s*:\s*[^;]+;?/gi, '')
                        .replace(/align-items\s*:\s*[^;]+;?/gi, '')
                        .replace(/justify-content\s*:\s*[^;]+;?/gi, '')
                        .replace(/min-height\s*:\s*[^;]+;?/gi, '')
                        .replace(/padding\s*:\s*[^;]+;?/gi, '');

                    return `.wrap {
                        background: var(--bg);
                        color: var(--cream);
                        font-family: 'Poppins', sans-serif;
                        padding: 24px 20px;
                        border-radius: 18px;
                        border: 1px solid var(--line);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                        margin: 0 auto;
                        box-sizing: border-box;
                        position: relative;
                        ${cleanBodyRules}
                    }`;
                });
                const styleClone = style.cloneNode(true);
                styleClone.textContent = cssText;
                bodyWrapper.appendChild(styleClone);
            });

            // Scoping styles slightly for viewports
            bodyWrapper.style.margin = '0 auto';
            bodyWrapper.style.maxWidth = '100%';

            return [{
                uniqueId: `${themeId}-sec-0`,
                name: themeName,
                themeId: themeId,
                themeName: themeName,
                themeIcon: themeIcon,
                element: bodyWrapper
            }];
        }

        const wrapper = doc.body.firstElementChild;
        const sections = [];

        if (wrapper) {
            let currentComment = '';
            for (let i = 0; i < wrapper.childNodes.length; i++) {
                const node = wrapper.childNodes[i];
                if (node.nodeType === 8) { // Comment node
                    currentComment = node.nodeValue.trim().replace(/^-\s*|\s*-$/g, '').trim();
                } else if (node.nodeType === 1) { // Element node
                    const cleanName = currentComment || `Section ${sections.length + 1}`;
                    sections.push({
                        uniqueId: `${themeId}-sec-${sections.length}`,
                        name: cleanName,
                        themeId: themeId,
                        themeName: themeName,
                        themeIcon: themeIcon,
                        element: node.cloneNode(true)
                    });
                    currentComment = '';
                }
            }
        }
        return sections;
    }

    async function loadThemeSections(theme) {
        if (parsedThemeCache[theme.id]) {
            return parsedThemeCache[theme.id];
        }
        const folder = theme.folder || 'rakhi website sections';
        try {
            const res = await fetch(`/${folder}/${theme.file}`);
            if (res.ok) {
                const text = await res.text();
                const secs = parseSectionsFromHtml(text, theme.id, theme.name, theme.icon);
                parsedThemeCache[theme.id] = secs;
                return secs;
            }
        } catch (err) {
            console.warn(`Could not load ${theme.file}`, err);
        }
        return [];
    }

    // User's custom assembled sections & state
    
    let gfbfCustomWebsite = [];
    let gfbfCatalogueFilter = 'all';
    let gfbfSelectedPalette = 'default';

    let crushCustomWebsite = [];
    let crushCatalogueFilter = 'all';
    let crushSelectedPalette = 'default';

    let birthdayCustomWebsite = [];
    let birthdayCatalogueFilter = 'all';
    let birthdaySelectedPalette = 'default';

    let userCustomWebsite = [];
    let currentCatalogueFilter = 'all';
    let selectedColorPalette = 'default';

    function launchRakhiCustomizerFlow() {
        // Step 1: Who is here?
        openModal(`
            <div class="demo-box" style="padding: 30px; text-align: center; font-family: var(--font-main);">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.8rem; letter-spacing: 1.5px; margin-bottom: 35px;">WHO IS HERE??</h2>
                <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
                    <button class="customizer-outline-btn flow-role-btn" data-role="sister" style="background-color: #ffffff; color: #000000; border: 2px solid #000000; border-radius: var(--radius-pill); padding: 14px 48px; font-family: var(--font-main); font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">Sister &rarr;</button>
                    <button class="customizer-outline-btn flow-role-btn" data-role="brother" style="background-color: #ffffff; color: #000000; border: 2px solid #000000; border-radius: var(--radius-pill); padding: 14px 48px; font-family: var(--font-main); font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">Brother &rarr;</button>
                </div>
            </div>
        `);

        // Style outline button hover effect
        document.querySelectorAll('.customizer-outline-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-3px) scale(1.04)';
                btn.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
                btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
            });
            btn.addEventListener('click', () => {
                const role = btn.getAttribute('data-role');
                window.chosenRole = role;
                // Transition smoothly to Step 2
                setTimeout(() => {
                    promptFrontPageTemplateForRakhi();
                }, 300);
            });
        });
    }

    function promptFrontPageTemplateForRakhi() {
        // Step 2: Choose Front Page Template
        openModal(`
            <div class="demo-box" style="padding: 20px; font-family: var(--font-main); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 10px;">CHOOSE YOUR FIRST PAGE</h2>
                <p style="font-size: 13px; color: var(--color-muted); margin-bottom: 25px;">Select how your custom Rakhi website should open.</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 500px; margin: 0 auto 10px;">
                    <!-- Template 1: Flower Blooming -->
                    <div class="template-select-card" data-template="flowers" style="cursor: pointer; border: 2px solid var(--color-card-border); border-radius: var(--radius-card); padding: 15px; background: var(--color-card-bg); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: center;">
                        <img src="/assets/flower_blooming_mockup.jpg" alt="Flower Blooming Mockup" style="width: 100%; height: 130px; object-fit: contain; border-radius: 8px; margin-bottom: 12px; background: #fff;">
                        <h4 style="margin: 0 0 5px 0; font-family: var(--font-main); font-weight: 700; font-size: 14px; text-transform: uppercase;">Flower Blooming</h4>
                        <p style="font-size: 11px; color: var(--color-muted); margin: 0; line-height: 1.4;">Interactive digital flower garden intro.</p>
                    </div>
                    
                    <!-- Template 2: Passcode Lock -->
                    <div class="template-select-card" data-template="passcode" style="cursor: pointer; border: 2px solid var(--color-card-border); border-radius: var(--radius-card); padding: 15px; background: var(--color-card-bg); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: center;">
                        <img src="/assets/passcode_mockup.jpg" alt="Passcode Lock Mockup" style="width: 100%; height: 130px; object-fit: contain; border-radius: 8px; margin-bottom: 12px; background: #fff;">
                        <h4 style="margin: 0 0 5px 0; font-family: var(--font-main); font-weight: 700; font-size: 14px; text-transform: uppercase;">Passcode Lock</h4>
                        <p style="font-size: 11px; color: var(--color-muted); margin: 0; line-height: 1.4;">Enter a secret birthday code to enter.</p>
                    </div>
                    
                    <!-- Template 3: Virtual Envelope -->
                    <div class="template-select-card" data-template="envelope" style="cursor: pointer; border: 2px solid var(--color-card-border); border-radius: var(--radius-card); padding: 15px; background: var(--color-card-bg); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: center;">
                        <div style="width: 100%; height: 130px; border-radius: 8px; margin-bottom: 12px; background: #fff5f5; display: flex; align-items: center; justify-content: center; font-size: 3rem;">💌</div>
                        <h4 style="margin: 0 0 5px 0; font-family: var(--font-main); font-weight: 700; font-size: 14px; text-transform: uppercase;">Virtual Envelope</h4>
                        <p style="font-size: 11px; color: var(--color-muted); margin: 0; line-height: 1.4;">Tap to rip open a secret gift envelope.</p>
                    </div>
                    
                    <!-- Template 4: Gift Box -->
                    <div class="template-select-card" data-template="giftbox" style="cursor: pointer; border: 2px solid var(--color-card-border); border-radius: var(--radius-card); padding: 15px; background: var(--color-card-bg); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: center;">
                        <div style="width: 100%; height: 130px; border-radius: 8px; margin-bottom: 12px; background: #fdf4ff; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎁</div>
                        <h4 style="margin: 0 0 5px 0; font-family: var(--font-main); font-weight: 700; font-size: 14px; text-transform: uppercase;">Gift Box</h4>
                        <p style="font-size: 11px; color: var(--color-muted); margin: 0; line-height: 1.4;">Untie the ribbon to unwrap your website.</p>
                    </div>
                </div>
            </div>
        `);

        // Setup Card Hovers and Clicks
        document.querySelectorAll('.template-select-card').forEach(card => {
            card.addEventListener('mouseover', () => {
                card.style.borderColor = '#000000';
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            });
            card.addEventListener('mouseout', () => {
                card.style.borderColor = 'var(--color-card-border)';
                card.style.transform = 'none';
                card.style.boxShadow = 'none';
            });
            card.addEventListener('click', () => {
                const template = card.getAttribute('data-template');
                window.chosenFrontPage = template;
                // Transition smoothly to Step 3: Sections Customizer Page
                setTimeout(() => {
                    launchRakhiCustomizer();
                }, 300);
            });
        });
    }

    async function launchRakhiCustomizer() {
        // Pre-load themes
        for (const t of RAKHI_THEMES) {
            await loadThemeSections(t);
        }

        // Handle chosen front page template
        if (typeof window.chosenFrontPageTemplateIndex !== 'undefined') {
            const frontPageSecs = parsedThemeCache['front_pages'] || [];
            if (frontPageSecs[window.chosenFrontPageTemplateIndex]) {
                const chosenSec = frontPageSecs[window.chosenFrontPageTemplateIndex];
                if (userCustomWebsite.length > 0 && userCustomWebsite[0].themeId.includes('front_page')) {
                    userCustomWebsite[0] = chosenSec;
                } else {
                    userCustomWebsite.unshift(chosenSec);
                }
            }
            window.chosenFrontPageTemplateIndex = undefined;
        }

        // Initialize default 5 sections from different themes if empty (or only has front page)
        if (userCustomWebsite.length === 0 || (userCustomWebsite.length === 1 && userCustomWebsite[0].themeId.includes('front_page'))) {
            const cinemaSecs = parsedThemeCache['cinema'] || [];
            const nightSecs = parsedThemeCache['night_sky'] || [];
            const passportSecs = parsedThemeCache['passport'] || [];
            const statsSecs = parsedThemeCache['stats_badges'] || [];
            const cuteSecs = parsedThemeCache['website_cute'] || [];

            if (cinemaSecs[0]) userCustomWebsite.push(cinemaSecs[0]); // Movie poster hero
            if (nightSecs[1]) userCustomWebsite.push(nightSecs[1]);   // Constellation map
            if (passportSecs[1]) userCustomWebsite.push(passportSecs[1]); // Boarding pass
            if (statsSecs[1]) userCustomWebsite.push(statsSecs[1]);   // Year in numbers
            if (cuteSecs[2]) userCustomWebsite.push(cuteSecs[2]);     // Polaroid wall
        }

        // Build Customizer UI
        const modalHtml = `
            <div class="preview-builder-container">
                <!-- Header -->
                <div class="preview-builder-header">
                    <div class="preview-header-top">
                        <div class="preview-title-group">
                            <h3>Custom Rakhi Website Builder</h3>
                            <p>Mix & match your favorite sections across 9 different themes and choose your color palette.</p>
                        </div>
                    </div>

                    <!-- Theme Pills for filtering Catalogue -->
                    <div class="theme-pill-scroll" id="customizer-theme-pills">
                        <button class="theme-pill" data-filter="templates">🎁 Templates</button>
                        <button class="theme-pill active" data-filter="all">✨ All Themes</button>
                        ${RAKHI_THEMES.map(t => `
                            <button class="theme-pill" data-filter="${t.id}">
                                <span>${t.icon}</span> ${t.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Color Palette Selector Bar -->
                    <div class="palette-picker-container">
                        <span class="palette-picker-label">🎨 Color Palette:</span>
                        <div class="palette-swatches-group" id="palette-swatches-bar">
                            ${COLOR_PALETTES.map(p => `
                                <button class="palette-swatch-btn ${selectedColorPalette === p.id ? 'active' : ''}" data-palette="${p.id}">
                                    <span class="color-dot" style="background: ${p.gradient};"></span>
                                    <span>${p.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Workspace Split -->
                <div class="preview-builder-body">
                    <!-- Left Control Panel -->
                    <div class="preview-controls-panel">
                        <!-- Sub-tab switcher -->
                        <div class="panel-subtabs">
                            <button class="panel-subtab-btn active" id="tab-btn-selected">
                                📋 My Custom Website (<span id="badge-count">${userCustomWebsite.length}</span>)
                            </button>
                            <button class="panel-subtab-btn" id="tab-btn-catalogue">
                                ➕ Add More Sections
                            </button>
                        </div>

                        <!-- 1. Selected Sections Manager -->
                        <div id="view-selected-manager" style="display:flex; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Sections on Your Page</span>
                                <span class="section-counter-badge" id="selected-summary-badge">${userCustomWebsite.length} Sections</span>
                            </div>
                            <div class="selected-sections-list" id="selected-sections-container">
                                <!-- Dynamic items -->
                            </div>
                        </div>

                        <!-- 2. Catalogue Browser -->
                        <div id="view-catalogue-browser" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Browse & Add Sections</span>
                                <span style="font-size:11px; color:#888;">Tap "+ Add"</span>
                            </div>
                            <div class="catalogue-cards-list" id="catalogue-cards-container">
                                <!-- Dynamic catalogue cards -->
                            </div>
                        </div>

                        <!-- 3. Templates Browser -->
                        <div id="view-templates-browser" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>🎁 Starter Templates</span>
                                <span style="font-size:11px; color:#888;">Pick a full layout</span>
                            </div>
                            <div class="catalogue-cards-list" id="templates-cards-container">
                                <!-- Dynamic template cards -->
                            </div>
                        </div>

                        <!-- Friendly Disclaimer Note -->
                        <div class="preview-disclaimer-note">
                            <span>💡</span>
                            <span><strong>Note:</strong> This is a rough preview — your final website will be fully customized and polished with your personal photos, names & memories. Don't worry! 😊</span>
                        </div>

                        <!-- CTA Order Box -->
                        <div class="preview-order-cta-box">
                            <button class="btn-select-this-theme" id="btn-submit-custom-build">
                                Order This Custom Website 🚀
                            </button>
                        </div>
                    </div>

                    <!-- Right Phone Screen Mockup -->
                    <div class="preview-viewport-panel">
                        <div class="phone-mockup-frame">
                            <div class="phone-top-bar">
                                <div class="phone-notch"></div>
                            </div>
                            <div class="phone-screen" id="phone-screen-viewport">
                                <div class="custom-sections-stream" id="phone-rendered-sections">
                                    <!-- Rendered mixed sections -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        openModal(modalHtml, true);

        // Core Render Functions
        function renderPhoneView() {
            const phoneWrap = document.getElementById('phone-rendered-sections');
            const phoneViewport = document.getElementById('phone-screen-viewport');
            if (!phoneWrap || !phoneViewport) return;
            phoneWrap.innerHTML = '';

            // Update palette class on phone screen
            phoneViewport.className = 'phone-screen';
            if (selectedColorPalette !== 'default') {
                phoneViewport.classList.add(`palette-${selectedColorPalette}`);
            }

            if (userCustomWebsite.length === 0) {
                phoneWrap.innerHTML = `
                    <div style="text-align:center; padding:60px 20px; color:#888;">
                        <div style="font-size:40px; margin-bottom:10px;">🧩</div>
                        <h4 style="font-size:16px; color:#333; margin-bottom:6px;">No Sections Added Yet</h4>
                        <p style="font-size:12px;">Switch to "Add More Sections" on the left to pick cards for your website.</p>
                    </div>
                `;
                return;
            }

            userCustomWebsite.forEach((sec, idx) => {
                const wrapper = document.createElement('div');
                wrapper.className = `theme-section-wrapper theme-${sec.themeId}`;
                wrapper.setAttribute('data-user-sec-id', sec.uniqueId);

                // Clone the element so each has its own DOM node
                const clone = sec.element.cloneNode(true);
                wrapper.appendChild(clone);
                phoneWrap.appendChild(wrapper);
            });
        }

        function renderSelectedManager() {
            const container = document.getElementById('selected-sections-container');
            const badge = document.getElementById('selected-summary-badge');
            const subtabBadge = document.getElementById('badge-count');
            if (!container) return;

            container.innerHTML = '';
            badge.textContent = `${userCustomWebsite.length} Sections`;
            subtabBadge.textContent = userCustomWebsite.length;

            if (userCustomWebsite.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888; font-size:13px;">Your site is currently empty. Click "Add More Sections" above!</div>`;
                return;
            }

            userCustomWebsite.forEach((sec, idx) => {
                const item = document.createElement('div');
                item.className = 'selected-sec-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <div class="sec-title-row">
                            <span class="sec-num-badge">${idx + 1}</span>
                            <span class="sec-title-text">${sec.name}</span>
                        </div>
                        <span class="sec-theme-tag">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <div class="sec-actions-right">
                        <button class="btn-icon-action btn-move-up" data-idx="${idx}" title="Move Up" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>↑</button>
                        <button class="btn-icon-action btn-move-down" data-idx="${idx}" title="Move Down" ${idx === userCustomWebsite.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>↓</button>
                        <button class="btn-icon-action btn-view-sec" data-id="${sec.uniqueId}" title="Scroll into view">🔍</button>
                        <button class="btn-icon-action danger btn-remove-sec" data-idx="${idx}" title="Remove Section">✕</button>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function renderCatalogue() {
            const container = document.getElementById('catalogue-cards-container');
            if (!container) return;
            container.innerHTML = '';

            let allSections = [];
            RAKHI_THEMES.forEach(t => {
                if (currentCatalogueFilter === 'all' || currentCatalogueFilter === t.id) {
                    const secs = parsedThemeCache[t.id] || [];
                    allSections = allSections.concat(secs);
                }
            });

            if (allSections.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888;">No sections found.</div>`;
                return;
            }

            allSections.forEach(sec => {
                const isAlreadyAdded = userCustomWebsite.some(s => s.uniqueId === sec.uniqueId);
                const item = document.createElement('div');
                item.className = 'catalogue-card-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <span class="sec-title-text">${sec.name}</span>
                        <span class="sec-theme-tag" style="margin-left:0;">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <button class="btn-add-section ${isAlreadyAdded ? 'added' : ''}" data-id="${sec.uniqueId}">
                        ${isAlreadyAdded ? '✓ Added' : '+ Add to Site'}
                    </button>
                `;
                container.appendChild(item);
            });
        }

        function renderTemplates() {
            const container = document.getElementById('templates-cards-container');
            if (!container) return;
            container.innerHTML = '';

            RAKHI_TEMPLATES.forEach(tpl => {
                const card = document.createElement('div');
                card.className = 'catalogue-card-item template-card-item';
                card.innerHTML = `
                    <div class="sec-info-left" style="gap:4px;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:18px;">${tpl.icon}</span>
                            <span class="sec-title-text" style="font-weight:600;">${tpl.name}</span>
                        </div>
                        <span style="font-size:11px; color:#777; line-height:1.3;">${tpl.description}</span>
                        <span style="display:inline-block; margin-top:4px; background:#f0f0f0; color:#555; font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px;">${tpl.sections.length} sections</span>
                    </div>
                    <button class="btn-add-section btn-use-template" data-tpl-id="${tpl.id}" style="white-space:nowrap;">
                        Use Template
                    </button>
                `;
                container.appendChild(card);
            });
        }

        // Initial Render
        renderPhoneView();
        renderSelectedManager();
        renderCatalogue();

        // Event: Subtabs Switcher (My Selected vs Catalogue vs Templates)
        const tabBtnSelected = document.getElementById('tab-btn-selected');
        const tabBtnCatalogue = document.getElementById('tab-btn-catalogue');
        const viewSelected = document.getElementById('view-selected-manager');
        const viewCatalogue = document.getElementById('view-catalogue-browser');
        const viewTemplates = document.getElementById('view-templates-browser');

        function showPanel(panel) {
            viewSelected.style.display = panel === 'selected' ? 'flex' : 'none';
            viewCatalogue.style.display = panel === 'catalogue' ? 'flex' : 'none';
            viewTemplates.style.display = panel === 'templates' ? 'flex' : 'none';
            tabBtnSelected.classList.toggle('active', panel === 'selected');
            tabBtnCatalogue.classList.toggle('active', panel === 'catalogue');
        }

        tabBtnSelected.addEventListener('click', () => showPanel('selected'));
        tabBtnCatalogue.addEventListener('click', () => { showPanel('catalogue'); renderCatalogue(); });

        // Event: Filter Catalogue by Theme Pills
        const themePillsBar = document.getElementById('customizer-theme-pills');
        themePillsBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.theme-pill');
            if (btn) {
                themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                if (filter === 'templates') {
                    // Show templates view
                    showPanel('templates');
                    renderTemplates();
                } else {
                    currentCatalogueFilter = filter;
                    // Automatically switch to catalogue view to browse
                    showPanel('catalogue');
                    renderCatalogue();
                }
            }
        });

        // Event: Use Template
        const templatesContainer = document.getElementById('templates-cards-container');
        if (templatesContainer) {
            templatesContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-use-template');
                if (btn) {
                    const tplId = btn.getAttribute('data-tpl-id');
                    const tpl = RAKHI_TEMPLATES.find(t => t.id === tplId);
                    if (tpl) {
                        const resolvedSections = tpl.sections
                            .map(s => (parsedThemeCache[s.themeId] || [])[s.secIndex])
                            .filter(Boolean);
                        resolvedSections.forEach(sec => userCustomWebsite.push(sec));
                        showPanel('selected');
                        // Re-activate "All Themes" pill
                        themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                        const allPill = themePillsBar.querySelector('[data-filter="all"]');
                        if (allPill) allPill.classList.add('active');
                        currentCatalogueFilter = 'all';
                        renderPhoneView();
                        renderSelectedManager();
                        renderCatalogue();
                    }
                }
            });
        }

        // Event: Switch Color Palette Swatches
        const paletteSwatchesBar = document.getElementById('palette-swatches-bar');
        if (paletteSwatchesBar) {
            paletteSwatchesBar.addEventListener('click', (e) => {
                const btn = e.target.closest('.palette-swatch-btn');
                if (btn) {
                    paletteSwatchesBar.querySelectorAll('.palette-swatch-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedColorPalette = btn.getAttribute('data-palette');
                    renderPhoneView();
                }
            });
        }

        // Event: Add Section from Catalogue
        const catalogueContainer = document.getElementById('catalogue-cards-container');
        catalogueContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add-section');
            if (btn) {
                const uniqueId = btn.getAttribute('data-id');
                let foundSec = null;
                for (const t of RAKHI_THEMES) {
                    const match = (parsedThemeCache[t.id] || []).find(s => s.uniqueId === uniqueId);
                    if (match) {
                        foundSec = match;
                        break;
                    }
                }
                if (foundSec) {
                    userCustomWebsite.push(foundSec);
                    renderPhoneView();
                    renderSelectedManager();
                    renderCatalogue();
                    
                    // Quick scroll to the new section in phone
                    setTimeout(() => {
                        const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetEl.classList.remove('highlight-pulse');
                            void targetEl.offsetWidth;
                            targetEl.classList.add('highlight-pulse');
                        }
                    }, 100);
                }
            }
        });

        // Event: Selected Sections Actions (Move Up, Move Down, View, Remove)
        const selectedContainer = document.getElementById('selected-sections-container');
        selectedContainer.addEventListener('click', (e) => {
            // Remove
            const removeBtn = e.target.closest('.btn-remove-sec');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
                userCustomWebsite.splice(idx, 1);
                renderPhoneView();
                renderSelectedManager();
                renderCatalogue();
                return;
            }

            // Move Up
            const upBtn = e.target.closest('.btn-move-up');
            if (upBtn && !upBtn.disabled) {
                const idx = parseInt(upBtn.getAttribute('data-idx'), 10);
                if (idx > 0) {
                    const temp = userCustomWebsite[idx];
                    userCustomWebsite[idx] = userCustomWebsite[idx - 1];
                    userCustomWebsite[idx - 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // Move Down
            const downBtn = e.target.closest('.btn-move-down');
            if (downBtn && !downBtn.disabled) {
                const idx = parseInt(downBtn.getAttribute('data-idx'), 10);
                if (idx < userCustomWebsite.length - 1) {
                    const temp = userCustomWebsite[idx];
                    userCustomWebsite[idx] = userCustomWebsite[idx + 1];
                    userCustomWebsite[idx + 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // View / Scroll To
            const viewBtn = e.target.closest('.btn-view-sec');
            if (viewBtn) {
                const uniqueId = viewBtn.getAttribute('data-id');
                const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetEl.classList.remove('highlight-pulse');
                    void targetEl.offsetWidth;
                    targetEl.classList.add('highlight-pulse');
                }
            }
        });

        // Event: Submit Custom Website Order
        const btnSubmitCustom = document.getElementById('btn-submit-custom-build');
        if (btnSubmitCustom) {
            btnSubmitCustom.addEventListener('click', () => {
                const paletteObj = COLOR_PALETTES.find(p => p.id === selectedColorPalette);
                const paletteName = paletteObj ? paletteObj.name : 'Original Themes';
                const summaryList = userCustomWebsite.map((s, i) => `${i + 1}. ${s.name} (${s.themeIcon} ${s.themeName})`).join('\n');
                const textDetails = `Custom Rakhi Website Order (${userCustomWebsite.length} Sections):\n👤 Role Context: ${window.chosenRole === 'brother' ? 'Brother' : 'Sister'}\n🚪 Opening page: ${window.chosenFrontPage === 'flowers' ? 'Flower Blooming' : 'Passcode Lock'}\n🎨 Color Palette: ${paletteName}\n\nSections:\n${summaryList}`;
                setTimeout(() => {
                    openOrderModal("Rakhi Gift Website", textDetails);
                }, 300);
            });
        }
    }

    function launchGFBFCustomizerFlow() {
        // Step 1: Who is here? Girlfriend or Boyfriend
        openModal(`
            <div class="demo-box" style="padding: 30px; text-align: center; font-family: var(--font-main);">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.8rem; letter-spacing: 1.5px; margin-bottom: 35px;">WHO IS HERE??</h2>
                <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
                    <button class="customizer-outline-btn flow-gfbf-role-btn" data-role="girlfriend" style="background-color: #ffffff; color: #000000; border: 2px solid #000000; border-radius: var(--radius-pill); padding: 14px 48px; font-family: var(--font-main); font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">Girlfriend &rarr;</button>
                    <button class="customizer-outline-btn flow-gfbf-role-btn" data-role="boyfriend" style="background-color: #ffffff; color: #000000; border: 2px solid #000000; border-radius: var(--radius-pill); padding: 14px 48px; font-family: var(--font-main); font-size: 14px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">Boyfriend &rarr;</button>
                </div>
            </div>
        `);

        // Setup Hovers & Clicks
        document.querySelectorAll('.flow-gfbf-role-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-3px) scale(1.04)';
                btn.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
                btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
            });
            btn.addEventListener('click', () => {
                window.gfbfChosenRole = btn.getAttribute('data-role');
                setTimeout(() => {
                    promptPurposeForGFBF();
                }, 300);
            });
        });
    }

    function promptPurposeForGFBF() {
        // Step 2: Choose Purpose
        openModal(`
            <div class="demo-box" style="padding: 25px; font-family: var(--font-main); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 10px;">CHOOSE WEBSITE PURPOSE</h2>
                <p style="font-size: 13px; color: var(--color-muted); margin-bottom: 25px;">Select why you want to create this website.</p>
                
                <!-- Grid of Predefined Purpose Options -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 460px; margin: 0 auto 20px;">
                    <button class="customizer-outline-btn gfbf-purpose-btn" data-purpose="Apologize" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Apologize 🥺</button>
                    <button class="customizer-outline-btn gfbf-purpose-btn" data-purpose="Valentine's Day" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Valentine's Day 💖</button>
                    <button class="customizer-outline-btn gfbf-purpose-btn" data-purpose="Girlfriend Day" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Girlfriend Day 🌸</button>
                    <button class="customizer-outline-btn gfbf-purpose-btn" data-purpose="Asking for a Date" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Asking for a Date 🌹</button>
                </div>

                <!-- Custom Purpose Input (Written Option) -->
                <div style="border-top: 1px solid var(--color-card-border); padding-top: 20px; max-width: 460px; margin: 0 auto;">
                    <p style="font-size: 12px; color: var(--color-muted); margin-bottom: 10px;">Or write your own custom purpose:</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <input type="text" id="gfbfCustomPurposeInput" placeholder="E.g. Birthday surprise, Sorry, Anniversary..." style="flex: 1; border: 2px solid #000; border-radius: var(--radius-pill); padding: 10px 18px; font-family: var(--font-main); font-size: 13px; outline: none; transition: border-color 0.2s; background: #fff; color: #000;">
                        <button id="gfbfProceedCustomPurpose" class="customizer-outline-btn" style="padding: 10px 24px; white-space: nowrap; font-size: 13px; margin: 0; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; transition: all 0.2s; background: #fff; color: #000;">Proceed &rarr;</button>
                    </div>
                </div>
            </div>
        `);

        // Style Preset Purpose Buttons
        document.querySelectorAll('.gfbf-purpose-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
            });
            btn.addEventListener('click', () => {
                window.gfbfChosenPurpose = btn.getAttribute('data-purpose');
                setTimeout(() => {
                    launchGFBFCustomizer();
                }, 300);
            });
        });

        // Style Proceed Custom Purpose Button
        const proceedBtn = document.getElementById('gfbfProceedCustomPurpose');
        const customInput = document.getElementById('gfbfCustomPurposeInput');
        if (proceedBtn && customInput) {
            proceedBtn.addEventListener('mouseover', () => {
                proceedBtn.style.backgroundColor = '#000000';
                proceedBtn.style.color = '#ffffff';
                proceedBtn.style.transform = 'translateY(-2px)';
            });
            proceedBtn.addEventListener('mouseout', () => {
                proceedBtn.style.backgroundColor = '#ffffff';
                proceedBtn.style.color = '#000000';
                proceedBtn.style.transform = 'none';
            });

            const handleProceed = () => {
                const writtenVal = customInput.value.trim();
                window.gfbfChosenPurpose = writtenVal || "Custom Occasion";
                setTimeout(() => {
                    launchGFBFCustomizer();
                }, 300);
            };

            proceedBtn.addEventListener('click', handleProceed);
            customInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleProceed();
                }
            });
        }
    }

async function launchGFBFCustomizer() {
        // Pre-load themes
        for (const t of GFBF_THEMES) {
            await loadThemeSections(t);
        }
        await loadThemeSections(GFBF_FRONT_PAGES_THEME);

        // Initialize default 5 sections from different themes if empty
        if (gfbfCustomWebsite.length === 0) {
            const basicSecs = parsedThemeCache['gfbf_basic'] || [];
            const personalSecs = parsedThemeCache['gfbf_personal'] || [];
            const moreSecs = parsedThemeCache['gfbf_more'] || [];
            const gardenSecs = parsedThemeCache['gfbf_garden'] || [];
            const treasureSecs = parsedThemeCache['gfbf_treasure'] || [];

            if (basicSecs[0]) gfbfCustomWebsite.push(basicSecs[0]);
            if (personalSecs[0]) gfbfCustomWebsite.push(personalSecs[0]);
            if (moreSecs[0]) gfbfCustomWebsite.push(moreSecs[0]);
            if (gardenSecs[0]) gfbfCustomWebsite.push(gardenSecs[0]);
            if (treasureSecs[0]) gfbfCustomWebsite.push(treasureSecs[0]);
        }

        // Build Customizer UI
        const modalHtml = `
            <div class="preview-builder-container">
                <!-- Header -->
                <div class="preview-builder-header">
                    <div class="preview-header-top">
                        <div class="preview-title-group">
                            <h3>Custom GF/BF Website Builder</h3>
                            <p>Mix & match your favorite sections across 6 different themes and choose your color palette.</p>
                        </div>
                    </div>

                    <!-- Theme Pills for filtering Catalogue -->
                    <div class="theme-pill-scroll" id="customizer-theme-pills">
                        <button class="theme-pill" data-filter="templates">🎁 Templates</button>
                        <button class="theme-pill active" data-filter="all">✨ All Themes</button>
                        ${GFBF_THEMES.map(t => `
                            <button class="theme-pill" data-filter="${t.id}">
                                <span>${t.icon}</span> ${t.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Color Palette Selector Bar -->
                    <div class="palette-picker-container">
                        <span class="palette-picker-label">🎨 Color Palette:</span>
                        <div class="palette-swatches-group" id="palette-swatches-bar">
                            ${COLOR_PALETTES.map(p => `
                                <button class="palette-swatch-btn ${gfbfSelectedPalette === p.id ? 'active' : ''}" data-palette="${p.id}">
                                    <span class="color-dot" style="background: ${p.gradient};"></span>
                                    <span>${p.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Workspace Split -->
                <div class="preview-builder-body">
                    <!-- Left Control Panel -->
                    <div class="preview-controls-panel">
                        <!-- Sub-tab switcher -->
                        <div class="panel-subtabs">
                            <button class="panel-subtab-btn active" id="tab-btn-selected">
                                📋 My Custom Website (<span id="badge-count">${gfbfCustomWebsite.length}</span>)
                            </button>
                            <button class="panel-subtab-btn" id="tab-btn-catalogue">
                                ➕ Add More Sections
                            </button>
                        </div>

                        <!-- 1. Selected Sections Manager -->
                        <div id="view-selected-manager" style="display:flex; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Sections on Your Page</span>
                                <span class="section-counter-badge" id="selected-summary-badge">${gfbfCustomWebsite.length} Sections</span>
                            </div>
                            <div class="selected-sections-list" id="selected-sections-container">
                                <!-- Dynamic items -->
                            </div>
                        </div>

                        <!-- 2. Catalogue Browser -->
                        <div id="view-catalogue-browser" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Browse & Add Sections</span>
                                <span style="font-size:11px; color:#888;">Tap "+ Add"</span>
                            </div>
                            <div class="catalogue-cards-list" id="catalogue-cards-container">
                                <!-- Dynamic catalogue cards -->
                            </div>
                        </div>

                        <!-- 3. Templates Browser -->
                        <div id="view-templates-browser" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>🎁 Starter Templates</span>
                                <span style="font-size:11px; color:#888;">Pick a full layout</span>
                            </div>
                            <div class="catalogue-cards-list" id="templates-cards-container">
                                <!-- Dynamic template cards -->
                            </div>
                        </div>

                        <!-- Friendly Disclaimer Note -->
                        <div class="preview-disclaimer-note">
                            <span>💡</span>
                            <span><strong>Note:</strong> This is a rough preview — your final website will be fully customized and polished with your personal photos, names & memories. Don't worry! 😊</span>
                        </div>

                        <!-- CTA Order Box -->
                        <div class="preview-order-cta-box">
                            <button class="btn-select-this-theme" id="btn-submit-custom-build">
                                Order This Custom Website 🚀
                            </button>
                        </div>
                    </div>

                    <!-- Right Phone Screen Mockup -->
                    <div class="preview-viewport-panel">
                        <div class="phone-mockup-frame">
                            <div class="phone-top-bar">
                                <div class="phone-notch"></div>
                            </div>
                            <div class="phone-screen ${gfbfSelectedPalette !== 'default' ? 'palette-' + gfbfSelectedPalette : ''}" id="phone-screen-viewport">
                                <div class="custom-sections-stream" id="phone-rendered-sections">
                                    <!-- Rendered mixed sections -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        openModal(modalHtml, true);

        // Core Render Functions
        function renderPhoneView() {
            const phoneWrap = document.getElementById('phone-rendered-sections');
            const phoneViewport = document.getElementById('phone-screen-viewport');
            if (!phoneWrap || !phoneViewport) return;
            phoneWrap.innerHTML = '';

            // Update palette class on phone screen
            phoneViewport.className = 'phone-screen';
            if (gfbfSelectedPalette !== 'default') {
                phoneViewport.classList.add(`palette-${gfbfSelectedPalette}`);
            }

            if (gfbfCustomWebsite.length === 0) {
                phoneWrap.innerHTML = `
                    <div style="text-align:center; padding:60px 20px; color:#888;">
                        <div style="font-size:40px; margin-bottom:10px;">🧩</div>
                        <h4 style="font-size:16px; color:#333; margin-bottom:6px;">No Sections Added Yet</h4>
                        <p style="font-size:12px;">Switch to "Add More Sections" on the left to pick cards for your website.</p>
                    </div>
                `;
                return;
            }

            gfbfCustomWebsite.forEach((sec, idx) => {
                const wrapper = document.createElement('div');
                wrapper.className = `theme-section-wrapper theme-${sec.themeId}`;
                wrapper.setAttribute('data-user-sec-id', sec.uniqueId);

                // Clone the element so each has its own DOM node
                const clone = sec.element.cloneNode(true);
                wrapper.appendChild(clone);
                phoneWrap.appendChild(wrapper);
            });
        }

        function renderSelectedManager() {
            const container = document.getElementById('selected-sections-container');
            const badge = document.getElementById('selected-summary-badge');
            const subtabBadge = document.getElementById('badge-count');
            if (!container) return;

            container.innerHTML = '';
            badge.textContent = `${gfbfCustomWebsite.length} Sections`;
            subtabBadge.textContent = gfbfCustomWebsite.length;

            if (gfbfCustomWebsite.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888; font-size:13px;">Your site is currently empty. Click "Add More Sections" above!</div>`;
                return;
            }


            gfbfCustomWebsite.forEach((sec, idx) => {
                const item = document.createElement('div');
                item.className = 'selected-sec-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <div class="sec-title-row">
                            <span class="sec-num-badge">${idx + 1}</span>
                            <span class="sec-title-text">${sec.name}</span>
                        </div>
                        <span class="sec-theme-tag">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <div class="sec-actions-right">
                        <button class="btn-icon-action btn-move-up" data-idx="${idx}" title="Move Up" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>↑</button>
                        <button class="btn-icon-action btn-move-down" data-idx="${idx}" title="Move Down" ${idx === gfbfCustomWebsite.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>↓</button>
                        <button class="btn-icon-action btn-view-sec" data-id="${sec.uniqueId}" title="Scroll into view">🔍</button>
                        <button class="btn-icon-action danger btn-remove-sec" data-idx="${idx}" title="Remove Section">✕</button>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function renderCatalogue() {
            const container = document.getElementById('catalogue-cards-container');
            if (!container) return;
            container.innerHTML = '';

            let allSections = [];
            GFBF_THEMES.forEach(t => {
                if (gfbfCatalogueFilter === 'all' || gfbfCatalogueFilter === t.id) {
                    const secs = parsedThemeCache[t.id] || [];
                    allSections = allSections.concat(secs);
                }
            });

            if (allSections.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888;">No sections found.</div>`;
                return;
            }

            allSections.forEach(sec => {
                const isAlreadyAdded = gfbfCustomWebsite.some(s => s.uniqueId === sec.uniqueId);
                const item = document.createElement('div');
                item.className = 'catalogue-card-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <span class="sec-title-text">${sec.name}</span>
                        <span class="sec-theme-tag" style="margin-left:0;">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <button class="btn-add-section ${isAlreadyAdded ? 'added' : ''}" data-id="${sec.uniqueId}">
                        ${isAlreadyAdded ? '✓ Added' : '+ Add to Site'}
                    </button>
                `;
                container.appendChild(item);
            });
        }


        function renderTemplates() {
            const container = document.getElementById('templates-cards-container');
            if (!container) return;
            container.innerHTML = '';

            GFBF_TEMPLATES.forEach(tpl => {
                const card = document.createElement('div');
                card.className = 'catalogue-card-item template-card-item';
                card.innerHTML = `
                    <div class="sec-info-left" style="gap:4px;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:18px;">${tpl.icon}</span>
                            <span class="sec-title-text" style="font-weight:600;">${tpl.name}</span>
                        </div>
                        <span style="font-size:11px; color:#777; line-height:1.3;">${tpl.description}</span>
                        <span style="display:inline-block; margin-top:4px; background:#f0f0f0; color:#555; font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px;">${tpl.sections.length} sections</span>
                    </div>
                    <button class="btn-add-section btn-use-template" data-tpl-id="${tpl.id}" style="white-space:nowrap;">
                        Use Template
                    </button>
                `;
                container.appendChild(card);
            });
        }

        // Initial Render
        renderPhoneView();
        renderSelectedManager();
        renderCatalogue();

        // Event: Subtabs Switcher (My Selected vs Catalogue vs Templates)
        const tabBtnSelected = document.getElementById('tab-btn-selected');
        const tabBtnCatalogue = document.getElementById('tab-btn-catalogue');
        const viewSelected = document.getElementById('view-selected-manager');
        const viewCatalogue = document.getElementById('view-catalogue-browser');
        const viewTemplates = document.getElementById('view-templates-browser');

        function showPanel(panel) {
            viewSelected.style.display = panel === 'selected' ? 'flex' : 'none';
            viewCatalogue.style.display = panel === 'catalogue' ? 'flex' : 'none';
            viewTemplates.style.display = panel === 'templates' ? 'flex' : 'none';
            tabBtnSelected.classList.toggle('active', panel === 'selected');
            tabBtnCatalogue.classList.toggle('active', panel === 'catalogue');
        }

        tabBtnSelected.addEventListener('click', () => showPanel('selected'));
        tabBtnCatalogue.addEventListener('click', () => { showPanel('catalogue'); renderCatalogue(); });

        // Event: Filter Catalogue by Theme Pills
        const themePillsBar = document.getElementById('customizer-theme-pills');
        themePillsBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.theme-pill');
            if (btn) {
                themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                if (filter === 'templates') {
                    // Show templates view
                    showPanel('templates');
                    renderTemplates();
                } else {
                    gfbfCatalogueFilter = filter;
                    // Automatically switch to catalogue view to browse
                    showPanel('catalogue');
                    renderCatalogue();
                }
            }
        });

        // Event: Use Template
        const templatesContainer = document.getElementById('templates-cards-container');
        if (templatesContainer) {
            templatesContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-use-template');
                if (btn) {
                    const tplId = btn.getAttribute('data-tpl-id');
                    const tpl = GFBF_TEMPLATES.find(t => t.id === tplId);
                    if (tpl) {
                        const resolvedSections = tpl.sections
                            .map(s => (parsedThemeCache[s.themeId] || [])[s.secIndex])
                            .filter(Boolean);
                        resolvedSections.forEach(sec => gfbfCustomWebsite.push(sec));
                        showPanel('selected');
                        // Re-activate "All Themes" pill
                        themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                        const allPill = themePillsBar.querySelector('[data-filter="all"]');
                        if (allPill) allPill.classList.add('active');
                        gfbfCatalogueFilter = 'all';
                        renderPhoneView();
                        renderSelectedManager();
                        renderCatalogue();
                    }
                }
            });
        }

        // Event: Switch Color Palette Swatches
        const paletteSwatchesBar = document.getElementById('palette-swatches-bar');
        if (paletteSwatchesBar) {
            paletteSwatchesBar.addEventListener('click', (e) => {
                const btn = e.target.closest('.palette-swatch-btn');
                if (btn) {
                    paletteSwatchesBar.querySelectorAll('.palette-swatch-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    gfbfSelectedPalette = btn.getAttribute('data-palette');
                    renderPhoneView();
                }
            });
        }

        // Event: Add Section from Catalogue
        const catalogueContainer = document.getElementById('catalogue-cards-container');
        catalogueContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add-section');
            if (btn) {
                const uniqueId = btn.getAttribute('data-id');
                let foundSec = null;
                for (const t of GFBF_THEMES) {
                    const match = (parsedThemeCache[t.id] || []).find(s => s.uniqueId === uniqueId);
                    if (match) {
                        foundSec = match;
                        break;
                    }
                }
                if (foundSec) {
                    gfbfCustomWebsite.push(foundSec);
                    renderPhoneView();
                    renderSelectedManager();
                    renderCatalogue();
                    
                    // Quick scroll to the new section in phone
                    setTimeout(() => {
                        const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetEl.classList.remove('highlight-pulse');
                            void targetEl.offsetWidth;
                            targetEl.classList.add('highlight-pulse');
                        }
                    }, 100);
                }
            }
        });

        // Event: Selected Sections Actions (Move Up, Move Down, View, Remove)
        const selectedContainer = document.getElementById('selected-sections-container');
        selectedContainer.addEventListener('click', (e) => {
            // Remove
            const removeBtn = e.target.closest('.btn-remove-sec');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
                gfbfCustomWebsite.splice(idx, 1);
                renderPhoneView();
                renderSelectedManager();
                renderCatalogue();
                return;
            }

            // Move Up
            const upBtn = e.target.closest('.btn-move-up');
            if (upBtn && !upBtn.disabled) {
                const idx = parseInt(upBtn.getAttribute('data-idx'), 10);
                if (idx > 0) {
                    const temp = gfbfCustomWebsite[idx];
                    gfbfCustomWebsite[idx] = gfbfCustomWebsite[idx - 1];
                    gfbfCustomWebsite[idx - 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // Move Down
            const downBtn = e.target.closest('.btn-move-down');
            if (downBtn && !downBtn.disabled) {
                const idx = parseInt(downBtn.getAttribute('data-idx'), 10);
                if (idx < gfbfCustomWebsite.length - 1) {
                    const temp = gfbfCustomWebsite[idx];
                    gfbfCustomWebsite[idx] = gfbfCustomWebsite[idx + 1];
                    gfbfCustomWebsite[idx + 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // View / Scroll To
            const viewBtn = e.target.closest('.btn-view-sec');
            if (viewBtn) {
                const uniqueId = viewBtn.getAttribute('data-id');
                const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetEl.classList.remove('highlight-pulse');
                    void targetEl.offsetWidth;
                    targetEl.classList.add('highlight-pulse');
                }
            }
        });

        // Event: Submit Custom Website Order
        const btnSubmitCustom = document.getElementById('btn-submit-custom-build');
        if (btnSubmitCustom) {
            btnSubmitCustom.addEventListener('click', () => {
                const paletteObj = COLOR_PALETTES.find(p => p.id === gfbfSelectedPalette);
                const paletteName = paletteObj ? paletteObj.name : 'Original Themes';
                const summaryList = gfbfCustomWebsite.map((s, i) => `${i + 1}. ${s.name} (${s.themeIcon} ${s.themeName})`).join('\n');
                const textDetails = `Custom GF/BF Website Order (${gfbfCustomWebsite.length} Sections):\n👤 Role Context: ${window.gfbfChosenRole || 'Girlfriend/Boyfriend'}\n🎯 Purpose: ${window.gfbfChosenPurpose || 'Not Specified'}\n🎨 Color Palette: ${paletteName}\n\nSections:\n${summaryList}`;
                setTimeout(() => {
                    openOrderModal("GF / BF Anniversary Site", textDetails);
                }, 300);
            });
        }
    }

    function launchCrushCustomizerFlow() {
        // Step 1: Who is this for? For Him or For Her
        openModal(`
            <div class="demo-box" style="padding: 30px; text-align: center; font-family: var(--font-main);">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 30px;">WHAT'S THE STATUS OF YOUR CRUSH??</h2>
                <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 25px; flex-wrap: wrap;">
                    <button class="customizer-outline-btn flow-crush-target-btn" data-target="Silent Admirer" style="margin: 0; padding: 12px 20px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Silent Admirer 🤫</button>
                    <button class="customizer-outline-btn flow-crush-target-btn" data-target="First Move" style="margin: 0; padding: 12px 20px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">First Move 💌</button>
                    <button class="customizer-outline-btn flow-crush-target-btn" data-target="Talking Phase" style="margin: 0; padding: 12px 20px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Talking Phase 💬</button>
                    <button class="customizer-outline-btn flow-crush-target-btn" data-target="Almost Official" style="margin: 0; padding: 12px 20px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Almost Official 💖</button>
                </div>

                <!-- Custom Target Input -->
                <div style="border-top: 1px solid var(--color-card-border); padding-top: 20px; max-width: 460px; margin: 0 auto;">
                    <p style="font-size: 12px; color: var(--color-muted); margin-bottom: 10px;">Or write custom status:</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <input type="text" id="crushCustomTargetInput" placeholder="E.g. Secretly in love, Long-time crush..." style="flex: 1; border: 2px solid #000; border-radius: var(--radius-pill); padding: 10px 18px; font-family: var(--font-main); font-size: 13px; outline: none; transition: border-color 0.2s; background: #fff; color: #000;">
                        <button id="crushProceedCustomTarget" class="customizer-outline-btn" style="padding: 10px 24px; white-space: nowrap; font-size: 13px; margin: 0; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; transition: all 0.2s; background: #fff; color: #000;">Proceed &rarr;</button>
                    </div>
                </div>
            </div>
        `);

        // Setup Hovers & Clicks
        document.querySelectorAll('.flow-crush-target-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
            });
            btn.addEventListener('click', () => {
                window.crushTarget = btn.getAttribute('data-target');
                setTimeout(() => {
                    promptPurposeForCrush();
                }, 300);
            });
        });
    }

    function promptPurposeForCrush() {
        // Step 2: Choose Purpose
        openModal(`
            <div class="demo-box" style="padding: 25px; font-family: var(--font-main); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 10px;">CHOOSE WEBSITE PURPOSE</h2>
                <p style="font-size: 13px; color: var(--color-muted); margin-bottom: 25px;">Select why you want to customize this website.</p>
                
                <!-- Grid of Predefined Purpose Options -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 460px; margin: 0 auto 20px;">
                    <button class="customizer-outline-btn crush-purpose-btn" data-purpose="Confess Love" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Confess Love 💖</button>
                    <button class="customizer-outline-btn crush-purpose-btn" data-purpose="Ask Out on a Date" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Ask Out on a Date 🌹</button>
                    <button class="customizer-outline-btn crush-purpose-btn" data-purpose="Say Sorry" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Say Sorry 🥺</button>
                    <button class="customizer-outline-btn crush-purpose-btn" data-purpose="Valentine's Special" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s;">Valentine's Special ✨</button>
                </div>

                <!-- Custom Purpose Input (Written Option) -->
                <div style="border-top: 1px solid var(--color-card-border); padding-top: 20px; max-width: 460px; margin: 0 auto;">
                    <p style="font-size: 12px; color: var(--color-muted); margin-bottom: 10px;">Or write your own custom purpose:</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <input type="text" id="crushCustomPurposeInput" placeholder="E.g. Prom invite, Be mine, Sorry..." style="flex: 1; border: 2px solid #000; border-radius: var(--radius-pill); padding: 10px 18px; font-family: var(--font-main); font-size: 13px; outline: none; transition: border-color 0.2s; background: #fff; color: #000;">
                        <button id="crushProceedCustomPurpose" class="customizer-outline-btn" style="padding: 10px 24px; white-space: nowrap; font-size: 13px; margin: 0; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; transition: all 0.2s; background: #fff; color: #000;">Proceed &rarr;</button>
                    </div>
                </div>
            </div>
        `);

        // Style Preset Purpose Buttons
        document.querySelectorAll('.crush-purpose-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
            });
            btn.addEventListener('click', () => {
                window.crushPurpose = btn.getAttribute('data-purpose');
                setTimeout(() => {
                    launchCrushCustomizer();
                }, 300);
            });
        });

        // Style Proceed Button
        const proceedBtn = document.getElementById('crushProceedCustomPurpose');
        const customInput = document.getElementById('crushCustomPurposeInput');
        if (proceedBtn && customInput) {
            proceedBtn.addEventListener('mouseover', () => {
                proceedBtn.style.backgroundColor = '#000000';
                proceedBtn.style.color = '#ffffff';
                proceedBtn.style.transform = 'translateY(-2px)';
            });
            proceedBtn.addEventListener('mouseout', () => {
                proceedBtn.style.backgroundColor = '#ffffff';
                proceedBtn.style.color = '#000000';
                proceedBtn.style.transform = 'none';
            });

            const handleProceed = () => {
                const writtenVal = customInput.value.trim();
                window.crushPurpose = writtenVal || "Confession";
                setTimeout(() => {
                    launchCrushCustomizer();
                }, 300);
            };

            proceedBtn.addEventListener('click', handleProceed);
            customInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleProceed();
                }
            });
        }
    }

    function initCrushInteractiveFeatures() {
        const phone = document.getElementById('phone-rendered-sections');
        if (!phone) return;

        // Custom Confession Prompt customization depending on purpose
        let dynamicConfessionPrompt = "Will you go out with me? 💖";
        if (window.crushPurpose === "Say Sorry") {
            dynamicConfessionPrompt = "I am so sorry. Will you forgive me? 🥺❤️";
        } else if (window.crushPurpose === "Ask Out on a Date") {
            dynamicConfessionPrompt = "Will you go on a coffee date with me? ☕🌹";
        } else if (window.crushPurpose === "Confess Love") {
            dynamicConfessionPrompt = "I really have a crush on you. Will you be mine? 💖";
        } else if (window.crushPurpose === "Valentine's Special") {
            dynamicConfessionPrompt = "Will you be my Valentine? 💘";
        } else if (window.crushPurpose) {
            dynamicConfessionPrompt = `${window.crushPurpose}? 💖`;
        }

        const promptTextEl = phone.querySelector('.crush-prompt-text');
        if (promptTextEl) {
            promptTextEl.innerHTML = dynamicConfessionPrompt;
        }

        // 1. Envelope click
        phone.querySelectorAll('.crush-envelope-container').forEach(env => {
            env.addEventListener('click', () => {
                const letter = env.parentElement.querySelector('.crush-letter-content');
                if (letter) {
                    const isHidden = letter.style.display === 'none' || !letter.style.display;
                    letter.style.display = isHidden ? 'block' : 'none';
                    env.querySelector('.crush-envelope-seal').innerHTML = isHidden ? '📂' : '✉️';
                }
            });
        });

        // 2. Evasive No Button & Yes Button
        phone.querySelectorAll('.btn-crush-no').forEach(btnNo => {
            const moveButton = () => {
                const randomX = (Math.random() - 0.5) * 160;
                const randomY = (Math.random() - 0.5) * 100;
                btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
            };
            btnNo.addEventListener('mouseover', moveButton);
            btnNo.addEventListener('touchstart', moveButton);
        });
        phone.querySelectorAll('.btn-crush-yes').forEach(btnYes => {
            btnYes.addEventListener('click', () => {
                const parent = btnYes.parentElement.parentElement;
                const promptEl = parent.querySelector('.crush-prompt-text');
                const btnNo = parent.querySelector('.btn-crush-no');
                if (promptEl) {
                    promptEl.innerHTML = "YAY! Best Decision Ever! 🎉❤️🥂";
                    promptEl.style.color = "#16a34a";
                }
                btnYes.style.transform = "scale(1.2)";
                if (btnNo) btnNo.style.display = "none";
            });
        });

        // 3. Date Planner choice buttons
        phone.querySelectorAll('.date-choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement.parentElement;
                const replyEl = parent.querySelector('.date-planner-reply');
                parent.querySelectorAll('.date-choice-btn').forEach(b => {
                    b.style.borderColor = 'var(--color-card-border)';
                    b.style.background = '#ffffff';
                });
                btn.style.borderColor = '#e11d48';
                btn.style.background = '#fff1f2';
                if (replyEl) {
                    replyEl.textContent = btn.getAttribute('data-reply');
                }
            });
        });

        // 4. Message Decoder
        phone.querySelectorAll('.btn-decoder-decrypt').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement.parentElement;
                const input = parent.querySelector('.decoder-pass-input');
                const resultBox = parent.querySelector('.decoder-result-box');
                if (input && resultBox) {
                    if (input.value.trim() === '143') {
                        resultBox.style.display = 'block';
                        input.style.borderColor = '#10b981';
                    } else {
                        input.style.borderColor = '#ef4444';
                        input.classList.remove('shake-animation');
                        void input.offsetWidth;
                        input.classList.add('shake-animation');
                        resultBox.style.display = 'none';
                    }
                }
            });
        });

        // 5. Coupon Vouchers claim
        phone.querySelectorAll('.crush-voucher-card').forEach(card => {
            card.addEventListener('click', () => {
                const btn = card.querySelector('.btn-claim-voucher');
                if (btn && btn.textContent !== 'CLAIMED ✅') {
                    btn.textContent = 'CLAIMED ✅';
                    btn.style.background = '#10b981';
                    btn.style.color = '#fff';
                    card.style.background = '#f0fdf4';
                    card.style.borderColor = '#bbf7d0';
                }
            });
        });

        // 6. Polaroid Flip Memory
        phone.querySelectorAll('.polaroid-flip-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const inner = wrapper.querySelector('.polaroid-flip-inner');
                if (inner) {
                    const isFlipped = inner.style.transform === 'rotateY(180deg)';
                    inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
                }
            });
            wrapper.addEventListener('mouseenter', () => {
                const inner = wrapper.querySelector('.polaroid-flip-inner');
                if (inner) inner.style.transform = 'rotateY(180deg)';
            });
            wrapper.addEventListener('mouseleave', () => {
                const inner = wrapper.querySelector('.polaroid-flip-inner');
                if (inner) inner.style.transform = 'rotateY(0deg)';
            });
        });
    }

    async function launchCrushCustomizer() {
        // Pre-load themes
        for (const t of CRUSH_THEMES) {
            await loadThemeSections(t);
        }

        // Initialize default 6 sections if empty
        if (crushCustomWebsite.length === 0) {
            const secs = parsedThemeCache['crush_confessions'] || [];
            secs.forEach(s => crushCustomWebsite.push(s));
        }

        // Build Customizer UI
        const modalHtml = `
            <div class="preview-builder-container">
                <!-- Header -->
                <div class="preview-builder-header">
                    <div class="preview-header-top">
                        <div class="preview-title-group">
                            <h3>Custom Crush Website Builder</h3>
                            <p>Mix & match your favorite interactive cards to confession screen and choose your color palette.</p>
                        </div>
                    </div>

                    <!-- Theme Pills for filtering Catalogue -->
                    <div class="theme-pill-scroll" id="customizer-theme-pills">
                        <button class="theme-pill active" data-filter="all">✨ All Sections</button>
                        ${CRUSH_THEMES.map(t => `
                            <button class="theme-pill" data-filter="${t.id}">
                                <span>${t.icon}</span> ${t.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Color Palette Selector Bar -->
                    <div class="palette-picker-container">
                        <span class="palette-picker-label">🎨 Color Palette:</span>
                        <div class="palette-swatches-group" id="palette-swatches-bar">
                            ${COLOR_PALETTES.map(p => `
                                <button class="palette-swatch-btn ${crushSelectedPalette === p.id ? 'active' : ''}" data-palette="${p.id}">
                                    <span class="color-dot" style="background: ${p.gradient};"></span>
                                    <span>${p.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Workspace Split -->
                <div class="preview-builder-body">
                    <!-- Left Control Panel -->
                    <div class="preview-controls-panel">
                        <!-- Sub-tab switcher -->
                        <div class="panel-subtabs">
                            <button class="panel-subtab-btn active" id="tab-btn-selected">
                                📋 My Custom Website (<span id="badge-count">${crushCustomWebsite.length}</span>)
                            </button>
                            <button class="panel-subtab-btn" id="tab-btn-catalogue">
                                ➕ Add More Sections
                            </button>
                        </div>

                        <!-- 1. Selected Sections Manager -->
                        <div id="view-selected-manager" style="display:flex; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Sections on Your Page</span>
                                <span class="section-counter-badge" id="selected-summary-badge">${crushCustomWebsite.length} Sections</span>
                            </div>
                            <div class="selected-sections-list" id="selected-sections-container">
                                <!-- Dynamic items -->
                            </div>
                        </div>

                        <!-- 2. Catalogue Browser -->
                        <div id="view-catalogue-browser" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Browse & Add Sections</span>
                                <span style="font-size:11px; color:#888;">Tap "+ Add"</span>
                            </div>
                            <div class="catalogue-cards-list" id="catalogue-cards-container">
                                <!-- Dynamic catalogue cards -->
                            </div>
                        </div>

                        <!-- Friendly Disclaimer Note -->
                        <div class="preview-disclaimer-note">
                            <span>💡</span>
                            <span><strong>Note:</strong> This is a rough preview — your final website will be fully customized and polished with your personal photos, names & memories. Don't worry! 😊</span>
                        </div>

                        <!-- CTA Order Box -->
                        <div class="preview-order-cta-box">
                            <button class="btn-select-this-theme" id="btn-submit-custom-build">
                                Order This Custom Website 🚀
                            </button>
                        </div>
                    </div>

                    <!-- Right Phone Screen Mockup -->
                    <div class="preview-viewport-panel">
                        <div class="phone-mockup-frame">
                            <div class="phone-top-bar">
                                <div class="phone-notch"></div>
                            </div>
                            <div class="phone-screen ${crushSelectedPalette !== 'default' ? 'palette-' + crushSelectedPalette : ''}" id="phone-screen-viewport">
                                <div class="custom-sections-stream" id="phone-rendered-sections">
                                    <!-- Rendered mixed sections -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        openModal(modalHtml, true);

        // Core Render Functions
        function renderPhoneView() {
            const phoneWrap = document.getElementById('phone-rendered-sections');
            const phoneViewport = document.getElementById('phone-screen-viewport');
            if (!phoneWrap || !phoneViewport) return;
            phoneWrap.innerHTML = '';

            // Update palette class on phone screen
            phoneViewport.className = 'phone-screen';
            if (crushSelectedPalette !== 'default') {
                phoneViewport.classList.add(`palette-${crushSelectedPalette}`);
            }

            if (crushCustomWebsite.length === 0) {
                phoneWrap.innerHTML = `
                    <div style="text-align:center; padding:60px 20px; color:#888;">
                        <div style="font-size:40px; margin-bottom:10px;">🧩</div>
                        <h4 style="font-size:16px; color:#333; margin-bottom:6px;">No Sections Added Yet</h4>
                        <p style="font-size:12px;">Switch to "Add More Sections" on the left to pick cards for your website.</p>
                    </div>
                `;
                return;
            }

            crushCustomWebsite.forEach((sec, idx) => {
                const wrapper = document.createElement('div');
                wrapper.className = `theme-section-wrapper theme-${sec.themeId}`;
                wrapper.setAttribute('data-user-sec-id', sec.uniqueId);

                // Clone the element so each has its own DOM node
                const clone = sec.element.cloneNode(true);
                wrapper.appendChild(clone);
                phoneWrap.appendChild(wrapper);
            });

            // Re-create and execute cloned script tags to make them run
            phoneWrap.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Initialize interactive behaviors for the preview viewport
            initCrushInteractiveFeatures();
        }

        function renderSelectedManager() {
            const container = document.getElementById('selected-sections-container');
            const badgeCount = document.getElementById('badge-count');
            const summaryBadge = document.getElementById('selected-summary-badge');
            if (!container) return;
            container.innerHTML = '';

            if (badgeCount) badgeCount.textContent = crushCustomWebsite.length;
            if (summaryBadge) summaryBadge.textContent = `${crushCustomWebsite.length} Sections`;

            if (crushCustomWebsite.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding:40px 10px; color:#888;">
                        <p style="font-size:24px; margin-bottom:5px;">📋</p>
                        <p style="font-size:12px;">No sections added. Browse and add them from the catalogue.</p>
                    </div>
                `;
                return;
            }

            crushCustomWebsite.forEach((sec, idx) => {
                const item = document.createElement('div');
                item.className = 'selected-sec-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <div class="sec-title-row">
                            <span class="sec-num-badge">${idx + 1}</span>
                            <span class="sec-title-text">${sec.name}</span>
                        </div>
                        <span class="sec-theme-tag">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <div class="sec-actions-right">
                        <button class="btn-icon-action btn-move-up" data-idx="${idx}" title="Move Up" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>↑</button>
                        <button class="btn-icon-action btn-move-down" data-idx="${idx}" title="Move Down" ${idx === crushCustomWebsite.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>↓</button>
                        <button class="btn-icon-action btn-view-sec" data-id="${sec.uniqueId}" title="Scroll into view">🔍</button>
                        <button class="btn-icon-action danger btn-remove-sec" data-idx="${idx}" title="Remove Section">✕</button>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function renderCatalogue() {
            const container = document.getElementById('catalogue-cards-container');
            if (!container) return;
            container.innerHTML = '';

            let allSections = [];
            CRUSH_THEMES.forEach(t => {
                if (crushCatalogueFilter === 'all' || crushCatalogueFilter === t.id) {
                    const secs = parsedThemeCache[t.id] || [];
                    allSections = allSections.concat(secs);
                }
            });

            if (allSections.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888;">No sections found.</div>`;
                return;
            }

            allSections.forEach(sec => {
                const isAlreadyAdded = crushCustomWebsite.some(s => s.uniqueId === sec.uniqueId);
                const item = document.createElement('div');
                item.className = 'catalogue-card-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <span class="sec-title-text">${sec.name}</span>
                        <span class="sec-theme-tag" style="margin-left:0;">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <button class="btn-add-section ${isAlreadyAdded ? 'added' : ''}" data-id="${sec.uniqueId}">
                        ${isAlreadyAdded ? '✓ Added' : '+ Add to Site'}
                    </button>
                `;
                container.appendChild(item);
            });
        }

        // Event: Subtabs Switcher (My Selected vs Catalogue)
        const tabBtnSelected = document.getElementById('tab-btn-selected');
        const tabBtnCatalogue = document.getElementById('tab-btn-catalogue');
        const viewSelected = document.getElementById('view-selected-manager');
        const viewCatalogue = document.getElementById('view-catalogue-browser');

        function showPanel(panel) {
            viewSelected.style.display = panel === 'selected' ? 'flex' : 'none';
            viewCatalogue.style.display = panel === 'catalogue' ? 'flex' : 'none';
            tabBtnSelected.classList.toggle('active', panel === 'selected');
            tabBtnCatalogue.classList.toggle('active', panel === 'catalogue');
        }

        tabBtnSelected.addEventListener('click', () => showPanel('selected'));
        tabBtnCatalogue.addEventListener('click', () => { showPanel('catalogue'); renderCatalogue(); });

        // Event: Filter Catalogue by Theme Pills
        const themePillsBar = document.getElementById('customizer-theme-pills');
        themePillsBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.theme-pill');
            if (btn) {
                themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                crushCatalogueFilter = btn.getAttribute('data-filter');
                showPanel('catalogue');
                renderCatalogue();
            }
        });

        // Event: Palette Picker
        const paletteBar = document.getElementById('palette-swatches-bar');
        paletteBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.palette-swatch-btn');
            if (btn) {
                paletteBar.querySelectorAll('.palette-swatch-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                crushSelectedPalette = btn.getAttribute('data-palette');
                renderPhoneView();
            }
        });

        // Event: Catalogue Add Section
        const catalogueContainer = document.getElementById('catalogue-cards-container');
        catalogueContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add-section');
            if (btn && !btn.classList.contains('added')) {
                const secId = btn.getAttribute('data-id');
                // Find matching section in cache
                let matchedSec = null;
                CRUSH_THEMES.forEach(t => {
                    const secs = parsedThemeCache[t.id] || [];
                    const s = secs.find(x => x.uniqueId === secId);
                    if (s) matchedSec = s;
                });

                if (matchedSec) {
                    crushCustomWebsite.push(matchedSec);
                    btn.classList.add('added');
                    btn.textContent = '✓ Added';
                    renderSelectedManager();
                    renderPhoneView();
                }
            }
        });

        // Event: Selected Sections Manager Interactions (Remove, Move Up/Down, View)
        const selectedContainer = document.getElementById('selected-sections-container');
        selectedContainer.addEventListener('click', (e) => {
            // Remove
            const removeBtn = e.target.closest('.btn-remove-sec');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
                crushCustomWebsite.splice(idx, 1);
                renderPhoneView();
                renderSelectedManager();
                renderCatalogue();
                return;
            }

            // Move Up
            const upBtn = e.target.closest('.btn-move-up');
            if (upBtn && !upBtn.disabled) {
                const idx = parseInt(upBtn.getAttribute('data-idx'), 10);
                if (idx > 0) {
                    const temp = crushCustomWebsite[idx];
                    crushCustomWebsite[idx] = crushCustomWebsite[idx - 1];
                    crushCustomWebsite[idx - 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // Move Down
            const downBtn = e.target.closest('.btn-move-down');
            if (downBtn && !downBtn.disabled) {
                const idx = parseInt(downBtn.getAttribute('data-idx'), 10);
                if (idx < crushCustomWebsite.length - 1) {
                    const temp = crushCustomWebsite[idx];
                    crushCustomWebsite[idx] = crushCustomWebsite[idx + 1];
                    crushCustomWebsite[idx + 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            // View / Scroll To
            const viewBtn = e.target.closest('.btn-view-sec');
            if (viewBtn) {
                const uniqueId = viewBtn.getAttribute('data-id');
                const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetEl.classList.remove('highlight-pulse');
                    void targetEl.offsetWidth;
                    targetEl.classList.add('highlight-pulse');
                }
            }
        });

        // Event: Submit Custom Website Order
        const btnSubmitCustom = document.getElementById('btn-submit-custom-build');
        if (btnSubmitCustom) {
            btnSubmitCustom.addEventListener('click', () => {
                const paletteObj = COLOR_PALETTES.find(p => p.id === crushSelectedPalette);
                const paletteName = paletteObj ? paletteObj.name : 'Original Themes';
                const summaryList = crushCustomWebsite.map((s, i) => `${i + 1}. ${s.name} (${s.themeIcon} ${s.themeName})`).join('\n');
                const textDetails = `Custom Crush Website Order (${crushCustomWebsite.length} Sections):\n👤 Crush Status: ${window.crushTarget || 'Silent Admirer'}\n🎯 Purpose: ${window.crushPurpose || 'Confession'}\n🎨 Color Palette: ${paletteName}\n\nSections:\n${summaryList}`;
                setTimeout(() => {
                    openOrderModal("Website for Crush", textDetails);
                }, 300);
            });
        }
    }


    // ----------------------------------------------------------------------
    // Birthday Customizer Implementation
    // ----------------------------------------------------------------------
    function launchBirthdayCustomizerFlow() {
        // Step 1: Who is this for?
        openModal(`
            <div class="demo-box" style="padding: 30px; text-align: center; font-family: var(--font-main);">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.6rem; letter-spacing: 1px; margin-bottom: 30px;">WHO IS THE BIRTHDAY PERSON??</h2>
                <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 25px; flex-wrap: wrap;">
                    <button class="customizer-outline-btn flow-bd-target-btn" data-target="Best Friend" style="margin:0; padding: 12px 24px; font-size: 13px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Best Friend 👯</button>
                    <button class="customizer-outline-btn flow-bd-target-btn" data-target="Partner" style="margin:0; padding: 12px 24px; font-size: 13px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Partner 💖</button>
                    <button class="customizer-outline-btn flow-bd-target-btn" data-target="Sibling" style="margin:0; padding: 12px 24px; font-size: 13px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Sibling 🍕</button>
                    <button class="customizer-outline-btn flow-bd-target-btn" data-target="Parent" style="margin:0; padding: 12px 24px; font-size: 13px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Parent 🏡</button>
                </div>
                
                <div style="border-top: 1px solid var(--color-card-border); padding-top: 20px; max-width: 460px; margin: 0 auto;">
                    <p style="font-size: 12px; color: var(--color-muted); margin-bottom: 10px;">Or write custom relationship:</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <input type="text" id="bdCustomTargetInput" placeholder="E.g. Mentor, Cousin, Colleague..." style="flex: 1; border: 2px solid #000; border-radius: var(--radius-pill); padding: 10px 18px; font-family: var(--font-main); font-size: 13px; outline: none; transition: border-color 0.2s; background: #fff; color: #000;">
                        <button id="bdProceedCustomTarget" class="customizer-outline-btn" style="padding: 10px 24px; white-space: nowrap; font-size: 13px; margin: 0; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; transition: all 0.2s; background: #fff; color: #000;">Proceed &rarr;</button>
                    </div>
                </div>
            </div>
        `);

        // Setup Hovers & Clicks
        document.querySelectorAll('.flow-bd-target-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
            });
            btn.addEventListener('click', () => {
                window.birthdayTarget = btn.getAttribute('data-target');
                setTimeout(() => {
                    promptPurposeForBirthday();
                }, 300);
            });
        });

        const proceedBtn = document.getElementById('bdProceedCustomTarget');
        const customInput = document.getElementById('bdCustomTargetInput');
        if (proceedBtn && customInput) {
            proceedBtn.addEventListener('mouseover', () => {
                proceedBtn.style.backgroundColor = '#000000';
                proceedBtn.style.color = '#ffffff';
                proceedBtn.style.transform = 'translateY(-2px)';
            });
            proceedBtn.addEventListener('mouseout', () => {
                proceedBtn.style.backgroundColor = '#ffffff';
                proceedBtn.style.color = '#000000';
                proceedBtn.style.transform = 'none';
            });
            const handleProceed = () => {
                const val = customInput.value.trim();
                window.birthdayTarget = val || "Best Friend";
                setTimeout(() => {
                    promptPurposeForBirthday();
                }, 300);
            };
            proceedBtn.addEventListener('click', handleProceed);
            customInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleProceed();
            });
        }
    }

    function promptPurposeForBirthday() {
        // Step 2: Choose Purpose
        openModal(`
            <div class="demo-box" style="padding: 25px; font-family: var(--font-main); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px;">
                    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
                        <circle cx="17" cy="17" r="15.5" stroke="#000000" stroke-width="3" fill="#ffffff"/>
                        <rect x="12" y="10" width="10" height="2" fill="#000000"/>
                        <rect x="10" y="12" width="14" height="7" fill="#000000"/>
                        <rect x="12" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="20" y="14" width="2" height="2" fill="#ffffff"/>
                        <rect x="10" y="19" width="14" height="2" fill="#000000"/>
                        <rect x="9" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="13" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="17" y="21" width="2" height="4" fill="#000000"/>
                        <rect x="21" y="21" width="2" height="3" fill="#000000"/>
                        <rect x="23" y="22" width="2" height="3" fill="#000000"/>
                    </svg>
                    <span>Orolius.</span>
                </div>
                <h2 style="text-transform: uppercase; font-weight: 700; font-size: 1.5rem; letter-spacing: 1px; margin-bottom: 10px;">CHOOSE WEBSITE VIBE / PURPOSE</h2>
                <p style="font-size: 13px; color: var(--color-muted); margin-bottom: 25px;">Select the vibe or main focus of this birthday site.</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 460px; margin: 0 auto 20px;">
                    <button class="customizer-outline-btn bd-purpose-btn" data-purpose="Surprise Gift" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Surprise Gift 🎁</button>
                    <button class="customizer-outline-btn bd-purpose-btn" data-purpose="Roasts & Inside Jokes" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Roasts & Jokes 🎭</button>
                    <button class="customizer-outline-btn bd-purpose-btn" data-purpose="Nostalgia & Memories" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Nostalgia & Memories 📸</button>
                    <button class="customizer-outline-btn bd-purpose-btn" data-purpose="Milestone Celebration" style="margin: 0; padding: 12px 10px; font-size: 12px; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; transition: all 0.2s; background: #fff; color: #000;">Milestone Celebration 🌟</button>
                </div>

                <div style="border-top: 1px solid var(--color-card-border); padding-top: 20px; max-width: 460px; margin: 0 auto;">
                    <p style="font-size: 12px; color: var(--color-muted); margin-bottom: 10px;">Or write your own custom vibe/purpose:</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <input type="text" id="bdCustomPurposeInput" placeholder="E.g. Sweet 16, Golden birthday, Memory book..." style="flex: 1; border: 2px solid #000; border-radius: var(--radius-pill); padding: 10px 18px; font-family: var(--font-main); font-size: 13px; outline: none; transition: border-color 0.2s; background: #fff; color: #000;">
                        <button id="bdProceedCustomPurpose" class="customizer-outline-btn" style="padding: 10px 24px; white-space: nowrap; font-size: 13px; margin: 0; border: 2px solid #000; border-radius: var(--radius-pill); cursor: pointer; font-family: var(--font-main); font-weight: 600; text-transform: uppercase; transition: all 0.2s; background: #fff; color: #000;">Proceed &rarr;</button>
                    </div>
                </div>
            </div>
        `);

        // Setup Hovers & Clicks
        document.querySelectorAll('.bd-purpose-btn').forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#000000';
                btn.style.color = '#ffffff';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#ffffff';
                btn.style.color = '#000000';
                btn.style.transform = 'none';
            });
            btn.addEventListener('click', () => {
                window.birthdayPurpose = btn.getAttribute('data-purpose');
                setTimeout(() => {
                    launchBirthdayCustomizer();
                }, 300);
            });
        });

        const proceedBtn = document.getElementById('bdProceedCustomPurpose');
        const customInput = document.getElementById('bdCustomPurposeInput');
        if (proceedBtn && customInput) {
            proceedBtn.addEventListener('mouseover', () => {
                proceedBtn.style.backgroundColor = '#000000';
                proceedBtn.style.color = '#ffffff';
                proceedBtn.style.transform = 'translateY(-2px)';
            });
            proceedBtn.addEventListener('mouseout', () => {
                proceedBtn.style.backgroundColor = '#ffffff';
                proceedBtn.style.color = '#000000';
                proceedBtn.style.transform = 'none';
            });
            const handleProceed = () => {
                const val = customInput.value.trim();
                window.birthdayPurpose = val || "Surprise";
                setTimeout(() => {
                    launchBirthdayCustomizer();
                }, 300);
            };
            proceedBtn.addEventListener('click', handleProceed);
            customInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleProceed();
            });
        }
    }

    async function launchBirthdayCustomizer() {
        // Pre-load themes
        for (const t of BIRTHDAY_THEMES) {
            await loadThemeSections(t);
        }

        // Initialize default all 6 sections if empty
        if (birthdayCustomWebsite.length === 0) {
            BIRTHDAY_THEMES.forEach(t => {
                const secs = parsedThemeCache[t.id] || [];
                secs.forEach(s => birthdayCustomWebsite.push(s));
            });
        }

        const modalHtml = `
            <div class="preview-builder-container">
                <!-- Header -->
                <div class="preview-builder-header">
                    <div class="preview-header-top">
                        <div class="preview-title-group">
                            <h3>Custom Birthday Website Builder</h3>
                            <p>Mix & match your favorite interactive cards to make the perfect birthday celebration website.</p>
                        </div>
                    </div>

                    <!-- Theme Pills for filtering Catalogue -->
                    <div class="theme-pill-scroll" id="customizer-theme-pills-bd">
                        <button class="theme-pill active" data-filter="all">✨ All Sections</button>
                        ${BIRTHDAY_THEMES.map(t => `
                            <button class="theme-pill" data-filter="${t.id}">
                                <span>${t.icon}</span> ${t.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Color Palette Selector Bar -->
                    <div class="palette-picker-container">
                        <span class="palette-picker-label">🎨 Color Palette:</span>
                        <div class="palette-swatches-group" id="palette-swatches-bar-bd">
                            ${COLOR_PALETTES.map(p => `
                                <button class="palette-swatch-btn ${birthdaySelectedPalette === p.id ? 'active' : ''}" data-palette="${p.id}">
                                    <span class="color-dot" style="background: ${p.gradient};"></span>
                                    <span>${p.name}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Workspace Split -->
                <div class="preview-builder-body">
                    <!-- Left Control Panel -->
                    <div class="preview-controls-panel">
                        <!-- Sub-tab switcher -->
                        <div class="panel-subtabs">
                            <button class="panel-subtab-btn active" id="tab-btn-selected-bd">
                                📋 My Custom Website (<span id="badge-count-bd">${birthdayCustomWebsite.length}</span>)
                            </button>
                            <button class="panel-subtab-btn" id="tab-btn-catalogue-bd">
                                ➕ Add More Sections
                            </button>
                        </div>

                        <!-- 1. Selected Sections Manager -->
                        <div id="view-selected-manager-bd" style="display:flex; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Sections on Your Page</span>
                                <span class="section-counter-badge" id="selected-summary-badge-bd">${birthdayCustomWebsite.length} Sections</span>
                            </div>
                            <div class="selected-sections-list" id="selected-sections-container-bd">
                                <!-- Dynamic items -->
                            </div>
                        </div>

                        <!-- 2. Catalogue Browser -->
                        <div id="view-catalogue-browser-bd" style="display:none; flex-direction:column; gap:10px; flex:1;">
                            <div class="panel-section-title">
                                <span>Browse & Add Sections</span>
                                <span style="font-size:11px; color:#888;">Tap "+ Add"</span>
                            </div>
                            <div class="catalogue-cards-list" id="catalogue-cards-container-bd">
                                <!-- Dynamic catalogue cards -->
                            </div>
                        </div>

                        <!-- Friendly Disclaimer Note -->
                        <div class="preview-disclaimer-note">
                            <span>💡</span>
                            <span><strong>Note:</strong> This is a rough preview — your final website will be fully customized with your personal photos, names & memories. Don't worry! 😊</span>
                        </div>

                        <!-- CTA Order Box -->
                        <div class="preview-order-cta-box">
                            <button class="btn-select-this-theme" id="btn-submit-custom-build-bd">
                                Order This Custom Website 🚀
                            </button>
                        </div>
                    </div>

                    <!-- Right Phone Screen Mockup -->
                    <div class="preview-viewport-panel">
                        <div class="phone-mockup-frame">
                            <div class="phone-top-bar">
                                <div class="phone-notch"></div>
                            </div>
                            <div class="phone-screen ${birthdaySelectedPalette !== 'default' ? 'palette-' + birthdaySelectedPalette : ''}" id="phone-screen-viewport-bd">
                                <div class="custom-sections-stream" id="phone-rendered-sections-bd">
                                    <!-- Rendered mixed sections -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        openModal(modalHtml, true);

        // Core Render Functions
        function renderPhoneView() {
            const phoneWrap = document.getElementById('phone-rendered-sections-bd');
            const phoneViewport = document.getElementById('phone-screen-viewport-bd');
            if (!phoneWrap || !phoneViewport) return;
            phoneWrap.innerHTML = '';

            // Update palette class on phone screen
            phoneViewport.className = 'phone-screen';
            if (birthdaySelectedPalette !== 'default') {
                phoneViewport.classList.add(`palette-${birthdaySelectedPalette}`);
            }

            if (birthdayCustomWebsite.length === 0) {
                phoneWrap.innerHTML = `
                    <div style="text-align:center; padding:60px 20px; color:#888;">
                        <div style="font-size:40px; margin-bottom:10px;">🧩</div>
                        <h4 style="font-size:16px; color:#333; margin-bottom:6px;">No Sections Added Yet</h4>
                        <p style="font-size:12px;">Switch to "Add More Sections" on the left to pick cards for your website.</p>
                    </div>
                `;
                return;
            }

            birthdayCustomWebsite.forEach((sec, idx) => {
                const wrapper = document.createElement('div');
                wrapper.className = `theme-section-wrapper theme-${sec.themeId}`;
                wrapper.setAttribute('data-user-sec-id', sec.uniqueId);

                // Clone the element
                const clone = sec.element.cloneNode(true);
                wrapper.appendChild(clone);
                phoneWrap.appendChild(wrapper);
            });

            // Re-create and execute cloned script tags
            phoneWrap.querySelectorAll('script').forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Initialize interactive behaviors for the preview viewport
            initBirthdayInteractiveFeatures();
        }

        function renderSelectedManager() {
            const container = document.getElementById('selected-sections-container-bd');
            const badgeCount = document.getElementById('badge-count-bd');
            const summaryBadge = document.getElementById('selected-summary-badge-bd');
            if (!container) return;
            container.innerHTML = '';

            if (badgeCount) badgeCount.textContent = birthdayCustomWebsite.length;
            if (summaryBadge) summaryBadge.textContent = `${birthdayCustomWebsite.length} Sections`;

            if (birthdayCustomWebsite.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding:40px 10px; color:#888;">
                        <p style="font-size:24px; margin-bottom:5px;">📋</p>
                        <p style="font-size:12px;">No sections added. Browse and add them from the catalogue.</p>
                    </div>
                `;
                return;
            }

            birthdayCustomWebsite.forEach((sec, idx) => {
                const item = document.createElement('div');
                item.className = 'selected-sec-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <div class="sec-title-row">
                            <span class="sec-num-badge">${idx + 1}</span>
                            <span class="sec-title-text">${sec.name}</span>
                        </div>
                        <span class="sec-theme-tag">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <div class="sec-actions-right">
                        <button class="btn-icon-action btn-move-up-bd" data-idx="${idx}" title="Move Up" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>↑</button>
                        <button class="btn-icon-action btn-move-down-bd" data-idx="${idx}" title="Move Down" ${idx === birthdayCustomWebsite.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>↓</button>
                        <button class="btn-icon-action btn-view-sec-bd" data-id="${sec.uniqueId}" title="Scroll into view">🔍</button>
                        <button class="btn-icon-action danger btn-remove-sec-bd" data-idx="${idx}" title="Remove Section">✕</button>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function renderCatalogue() {
            const container = document.getElementById('catalogue-cards-container-bd');
            if (!container) return;
            container.innerHTML = '';

            let allSections = [];
            BIRTHDAY_THEMES.forEach(t => {
                if (birthdayCatalogueFilter === 'all' || birthdayCatalogueFilter === t.id) {
                    const secs = parsedThemeCache[t.id] || [];
                    allSections = allSections.concat(secs);
                }
            });

            if (allSections.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#888;">No sections found.</div>`;
                return;
            }

            allSections.forEach(sec => {
                const isAlreadyAdded = birthdayCustomWebsite.some(s => s.uniqueId === sec.uniqueId);
                const item = document.createElement('div');
                item.className = 'catalogue-card-item';
                item.innerHTML = `
                    <div class="sec-info-left">
                        <span class="sec-title-text">${sec.name}</span>
                        <span class="sec-theme-tag" style="margin-left:0;">${sec.themeIcon} ${sec.themeName}</span>
                    </div>
                    <button class="btn-add-section-bd ${isAlreadyAdded ? 'added' : ''}" data-id="${sec.uniqueId}">
                        ${isAlreadyAdded ? '✓ Added' : '+ Add to Site'}
                    </button>
                `;
                container.appendChild(item);
            });
        }

        // Subtabs Switching
        const tabBtnSelected = document.getElementById('tab-btn-selected-bd');
        const tabBtnCatalogue = document.getElementById('tab-btn-catalogue-bd');
        const viewSelected = document.getElementById('view-selected-manager-bd');
        const viewCatalogue = document.getElementById('view-catalogue-browser-bd');

        function showPanel(panel) {
            viewSelected.style.display = panel === 'selected' ? 'flex' : 'none';
            viewCatalogue.style.display = panel === 'catalogue' ? 'flex' : 'none';
            tabBtnSelected.classList.toggle('active', panel === 'selected');
            tabBtnCatalogue.classList.toggle('active', panel === 'catalogue');
        }

        tabBtnSelected.addEventListener('click', () => showPanel('selected'));
        tabBtnCatalogue.addEventListener('click', () => { showPanel('catalogue'); renderCatalogue(); });

        // Filter Catalogue
        const themePillsBar = document.getElementById('customizer-theme-pills-bd');
        themePillsBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.theme-pill');
            if (btn) {
                themePillsBar.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                birthdayCatalogueFilter = btn.getAttribute('data-filter');
                showPanel('catalogue');
                renderCatalogue();
            }
        });

        // Palette Selector
        const paletteBar = document.getElementById('palette-swatches-bar-bd');
        paletteBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.palette-swatch-btn');
            if (btn) {
                paletteBar.querySelectorAll('.palette-swatch-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                birthdaySelectedPalette = btn.getAttribute('data-palette');
                renderPhoneView();
            }
        });

        // Add Section from Catalogue
        const catalogueContainer = document.getElementById('catalogue-cards-container-bd');
        catalogueContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-add-section-bd');
            if (btn && !btn.classList.contains('added')) {
                const secId = btn.getAttribute('data-id');
                let matchedSec = null;
                BIRTHDAY_THEMES.forEach(t => {
                    const secs = parsedThemeCache[t.id] || [];
                    const s = secs.find(x => x.uniqueId === secId);
                    if (s) matchedSec = s;
                });

                if (matchedSec) {
                    birthdayCustomWebsite.push(matchedSec);
                    btn.classList.add('added');
                    btn.textContent = '✓ Added';
                    renderSelectedManager();
                    renderPhoneView();
                }
            }
        });

        // Selected Section Interactions (Move, Remove, View)
        const selectedContainer = document.getElementById('selected-sections-container-bd');
        selectedContainer.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.btn-remove-sec-bd');
            if (removeBtn) {
                const idx = parseInt(removeBtn.getAttribute('data-idx'), 10);
                birthdayCustomWebsite.splice(idx, 1);
                renderPhoneView();
                renderSelectedManager();
                renderCatalogue();
                return;
            }

            const upBtn = e.target.closest('.btn-move-up-bd');
            if (upBtn && !upBtn.disabled) {
                const idx = parseInt(upBtn.getAttribute('data-idx'), 10);
                if (idx > 0) {
                    const temp = birthdayCustomWebsite[idx];
                    birthdayCustomWebsite[idx] = birthdayCustomWebsite[idx - 1];
                    birthdayCustomWebsite[idx - 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            const downBtn = e.target.closest('.btn-move-down-bd');
            if (downBtn && !downBtn.disabled) {
                const idx = parseInt(downBtn.getAttribute('data-idx'), 10);
                if (idx < birthdayCustomWebsite.length - 1) {
                    const temp = birthdayCustomWebsite[idx];
                    birthdayCustomWebsite[idx] = birthdayCustomWebsite[idx + 1];
                    birthdayCustomWebsite[idx + 1] = temp;
                    renderPhoneView();
                    renderSelectedManager();
                }
                return;
            }

            const viewBtn = e.target.closest('.btn-view-sec-bd');
            if (viewBtn) {
                const uniqueId = viewBtn.getAttribute('data-id');
                const targetEl = document.querySelector(`[data-user-sec-id="${uniqueId}"]`);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetEl.classList.remove('highlight-pulse');
                    void targetEl.offsetWidth;
                    targetEl.classList.add('highlight-pulse');
                }
            }
        });

        // Submit Custom Website Order
        const btnSubmitCustom = document.getElementById('btn-submit-custom-build-bd');
        if (btnSubmitCustom) {
            btnSubmitCustom.addEventListener('click', () => {
                const paletteObj = COLOR_PALETTES.find(p => p.id === birthdaySelectedPalette);
                const paletteName = paletteObj ? paletteObj.name : 'Original Themes';
                const summaryList = birthdayCustomWebsite.map((s, i) => `${i + 1}. ${s.name} (${s.themeIcon} ${s.themeName})`).join('\n');
                const textDetails = `Custom Birthday Website Order (${birthdayCustomWebsite.length} Sections):\n👤 Target: ${window.birthdayTarget || 'Best Friend'}\n🎯 Focus/Vibe: ${window.birthdayPurpose || 'Surprise'}\n🎨 Color Palette: ${paletteName}\n\nSections:\n${summaryList}`;
                setTimeout(() => {
                    openOrderModal("Birthday Celebration Website", textDetails);
                }, 300);
            });
        }

        // Initial render
        renderPhoneView();
        renderSelectedManager();
    }

    function initBirthdayInteractiveFeatures() {
        const phone = document.getElementById('phone-rendered-sections-bd');
        if (!phone) return;

        // 1. Blow Out Candles Button click helper
        phone.querySelectorAll('.blow-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('#candles') || btn.parentElement;
                parent.querySelectorAll('.candle').forEach((c, i) => {
                    setTimeout(() => c.classList.add('out'), i * 180);
                });
                const madeWish = parent.querySelector('.made-wish');
                if (madeWish) {
                    setTimeout(() => madeWish.classList.add('show'), 700);
                }
            });
        });

        // 2. Open When Letters toggle
        phone.querySelectorAll('.letter').forEach(letEl => {
            letEl.addEventListener('click', () => {
                letEl.classList.toggle('opened');
            });
        });

        // 3. Simulated Tape/Audio Player
        phone.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.voice-card');
                const waveEl = parent.querySelector('.wave');
                const waveTime = parent.querySelector('.voice-time');
                if (!waveEl) return;

                let playing = btn.getAttribute('data-playing') === 'true';
                let playTimer = parseInt(btn.getAttribute('data-timer'), 10) || null;
                let progress = parseInt(btn.getAttribute('data-progress'), 10) || 0;

                const spans = waveEl.querySelectorAll('span');
                if (spans.length === 0) {
                    // Populate initial wave bars if empty
                    for (let i = 0; i < 40; i++) {
                        const h = 6 + Math.round(Math.random() * 20);
                        const s = document.createElement('span');
                        s.style.height = h + 'px';
                        s.style.width = '3px';
                        s.style.background = 'var(--coral, #ff6b5b)';
                        s.style.borderRadius = '2px';
                        s.style.marginRight = '2px';
                        waveEl.appendChild(s);
                    }
                }

                const localSpans = waveEl.querySelectorAll('span');

                if (playing) {
                    clearInterval(playTimer);
                    btn.setAttribute('data-playing', 'false');
                    btn.textContent = '▶';
                } else {
                    btn.setAttribute('data-playing', 'true');
                    btn.textContent = '❚❚';
                    
                    const interval = setInterval(() => {
                        let currentProgress = parseInt(btn.getAttribute('data-progress'), 10) || 0;
                        if (currentProgress >= localSpans.length) {
                            clearInterval(interval);
                            btn.setAttribute('data-playing', 'false');
                            btn.textContent = '▶';
                            btn.setAttribute('data-progress', '0');
                            localSpans.forEach(s => s.classList.remove('played'));
                            if (waveTime) waveTime.textContent = '0:24';
                            return;
                        }
                        localSpans[currentProgress].classList.add('played');
                        localSpans[currentProgress].style.background = 'var(--sun, #ffc93c)';
                        currentProgress++;
                        btn.setAttribute('data-progress', currentProgress.toString());
                        if (waveTime) {
                            const remaining = Math.max(0, 24 - Math.floor(currentProgress * 0.6));
                            waveTime.textContent = `0:${remaining < 10 ? '0' : ''}${remaining}`;
                        }
                    }, 300);
                    btn.setAttribute('data-timer', interval.toString());
                }
            });
        });

        // 4. Age in Numbers Counter Rollup
        phone.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current.toLocaleString();
            }, 30);
        });

        // 5. Wish Wall: Add new custom wish dynamically
        phone.querySelectorAll('.add-wish-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('#wishwall') || btn.parentElement;
                const grid = parent.querySelector('.wish-grid');
                if (!grid) return;

                const name = prompt("Enter your name:");
                if (!name) return;
                const msg = prompt("Enter your birthday wish:");
                if (!msg) return;

                const card = document.createElement('div');
                card.className = 'wish-card';
                const rotation = (Math.random() - 0.5) * 4;
                const colors = ['var(--coral)', 'var(--teal)', 'var(--grape)', 'var(--sun)', 'var(--pink)'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                card.style.setProperty('--r', `${rotation}deg`);
                card.style.setProperty('--accent', randomColor);
                card.innerHTML = `
                    <p>"${msg}"</p>
                    <div class="wish-name">— ${name}</div>
                `;
                grid.appendChild(card);
            });
        });
    }


    // ----------------------------------------------------------------------
    // Interactive Demos Handlers
    // ----------------------------------------------------------------------
    document.addEventListener('click', (e) => {
        // --- 1. Demo: Crush Website ---
        if (e.target.closest('.btn-demo-crush')) {
            launchCrushCustomizerFlow();
            return;
        }

        // --- 2. Customizer: GF / BF Website ---
        if (e.target.closest('.btn-demo-gfbf')) {
            launchGFBFCustomizerFlow();
            return;
        }

        // --- 3. Customizer: Rakhi Gift Website (Cross-Theme Section Mixer) ---
        if (e.target.closest('.btn-demo-rakhi')) {
            launchRakhiCustomizerFlow();
            return;
        }

        // --- Customizer: Birthday Website ---
        if (e.target.closest('.btn-demo-birthday')) {
            launchBirthdayCustomizerFlow();
            return;
        }

        // --- 4. Demo: Business Web Creation ---
        if (e.target.closest('.btn-demo-web')) {
            openModal(`
                <div class="demo-box">
                    <h3 class="demo-title">🌐 Web Creation Architecture</h3>
                    <p class="demo-sub">Engineered for maximum speed, modern UX, and top SEO rankings.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 24px;">
                        <div style="background: #f4f4f5; padding: 18px; border-radius: 14px; border: 1.5px solid #e4e4e7;">
                            <div style="font-size: 28px; font-weight: 800; color: #09090b;">100</div>
                            <div style="font-size: 12px; color: #71717a; font-weight: 600;">Lighthouse Speed</div>
                        </div>
                        <div style="background: #09090b; padding: 18px; border-radius: 14px; border: 1.5px solid #09090b;">
                            <div style="font-size: 28px; font-weight: 800; color: #ffffff;">&lt;0.8s</div>
                            <div style="font-size: 12px; color: #a1a1aa; font-weight: 600;">Load Time</div>
                        </div>
                        <div style="background: #f4f4f5; padding: 18px; border-radius: 14px; border: 1.5px solid #e4e4e7;">
                            <div style="font-size: 28px; font-weight: 800; color: #09090b;">100%</div>
                            <div style="font-size: 12px; color: #71717a; font-weight: 600;">SEO Score</div>
                        </div>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; text-align: left;">Every website comes standard with SSL security, automated backups, Google Analytics, mobile responsiveness, and custom domain configuration.</p>
                </div>
            `);
        }

        // --- 5. Demo: AI Assistant Chatbot ---
        if (e.target.closest('.btn-demo-ai')) {
            openModal(`
                <div class="demo-box">
                    <h3 class="demo-title">🤖 AI Assistant Chatbot Demo</h3>
                    <p class="demo-sub">Test drive an interactive AI customer agent.</p>
                    
                    <div class="chat-window">
                        <div class="chat-messages" id="chat-msgs">
                            <div class="chat-msg bot">Hello! 👋 I'm the Orolius AI Assistant. How can I help your business grow today?</div>
                        </div>
                        <div class="chat-input-bar">
                            <input type="text" id="chat-input" placeholder="Type 'pricing', 'features', or 'hello'...">
                            <button id="chat-send-btn">Send</button>
                        </div>
                    </div>
                </div>
            `);

            const chatInput = document.getElementById('chat-input');
            const chatSendBtn = document.getElementById('chat-send-btn');
            const chatMsgs = document.getElementById('chat-msgs');

            function handleSend() {
                const text = chatInput.value.trim();
                if (!text) return;

                // Add User message
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-msg user';
                userMsg.textContent = text;
                chatMsgs.appendChild(userMsg);
                chatInput.value = '';
                chatMsgs.scrollTop = chatMsgs.scrollHeight;

                // Simulate AI Thinking & Reply
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'chat-msg bot';

                    const lower = text.toLowerCase();
                    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
                        botMsg.textContent = "Our custom business websites start from affordable packages, and AI chatbot integration can be added in 24 hours! Would you like a instant quote?";
                    } else if (lower.includes('gift') || lower.includes('website')) {
                        botMsg.textContent = "We create super special personalized gift websites for crush, partners, and birthdays! Click 'Customize Now' to get started!";
                    } else {
                        botMsg.textContent = "I can answer customer inquiries 24/7, schedule bookings, and collect leads for your business automatically!";
                    }

                    chatMsgs.appendChild(botMsg);
                    chatMsgs.scrollTop = chatMsgs.scrollHeight;
                }, 600);
            }

            if (chatSendBtn) chatSendBtn.addEventListener('click', handleSend);
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleSend();
                });
            }
        }

        // --- 6. Demo: Repeat Bot ---
        if (e.target.closest('.btn-demo-loyalty')) {
            openModal(`
                <div class="demo-box">
                    <h3 class="demo-title">🔄 Repeat Bot Demo</h3>
                    <p class="demo-sub">Automated customer retention & repeat rewards system.</p>
                    
                    <div class="loyalty-card-demo">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 16px;">OROLIUS REWARDS</span>
                            <span style="font-size: 12px; opacity: 0.9;">CARD #8842</span>
                        </div>
                        
                        <div class="stamps-grid" id="stamps-grid">
                            <div class="stamp-slot stamped">✓</div>
                            <div class="stamp-slot stamped">✓</div>
                            <div class="stamp-slot stamped">✓</div>
                            <div class="stamp-slot" id="slot-4">4</div>
                            <div class="stamp-slot" id="slot-5">5</div>
                        </div>

                        <p style="font-size: 13px; opacity: 0.95; margin-bottom: 18px;" id="loyalty-status-text">3 of 5 stamps collected. 2 more stamps for a FREE reward!</p>
                        
                        <button class="card-btn primary" id="btn-add-stamp" style="background: #ffffff; color: #09090b; border: 1px solid #ffffff; font-weight: 700;">+ Add Customer Stamp</button>
                    </div>
                </div>
            `);

            let count = 3;
            const btnStamp = document.getElementById('btn-add-stamp');
            if (btnStamp) {
                btnStamp.addEventListener('click', () => {
                    if (count < 5) {
                        count++;
                        const slot = document.getElementById(`slot-${count}`);
                        if (slot) {
                            slot.classList.add('stamped');
                            slot.textContent = '✓';
                        }
                        const statusText = document.getElementById('loyalty-status-text');
                        if (count === 5) {
                            statusText.textContent = '🎉 CONGRATS! Loyalty Reward Unlocked: 50% OFF Next Service!';
                            btnStamp.style.display = 'none';
                        } else {
                            statusText.textContent = `${count} of 5 stamps collected. ${5 - count} more stamps for a FREE reward!`;
                        }
                    }
                });
            }
        }

        // --- 7. Order / Customization Form Trigger ---
        if (e.target.classList.contains('btn-order')) {
            const serviceName = e.target.getAttribute('data-service') || 'Custom Website Solution';
            openOrderModal(serviceName);
        }
    });

    // Contact Icons Modal
    if (contactEmailBtn) {
        contactEmailBtn.addEventListener('click', () => {
            openModal(`
                <div class="demo-box">
                    <h3 class="demo-title">📧 Contact Orolius</h3>
                    <p class="demo-sub">Have custom requirements? Send us a direct email or message.</p>
                    <div style="background: #f4f4f8; padding: 20px; border-radius: 14px; font-weight: 600; font-size: 18px;">
                        contact@orolius.com
                    </div>
                </div>
            `);
        });
    }

    if (contactFbBtn) {
        contactFbBtn.addEventListener('click', () => {
            openModal(`
                <div class="demo-box">
                    <h3 class="demo-title">📘 Orolius Facebook</h3>
                    <p class="demo-sub">Connect with us on Facebook for updates and client showcases.</p>
                    <div style="background: #eff6ff; padding: 20px; border-radius: 14px; color: #2563eb; font-weight: 600; font-size: 18px;">
                        facebook.com/orolius
                    </div>
                </div>
            `);
        });
    }
});
