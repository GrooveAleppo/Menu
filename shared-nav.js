/**
 * shared-nav.js — Groove Admin Unified Navigation Bar
 * Include this script in any admin page to auto-inject the nav.
 */
(function () {
    const PAGES = [
        { href: 'settings.html',  icon: 'settings-2', label: 'Settings'    },
        { href: 'cashier.html',   icon: 'coffee',      label: 'Cashier'     },
        { href: 'users.html',     icon: 'users',       label: 'Customers'   },
        { href: 'giftcards.html', icon: 'gift',        label: 'Gift Cards'  },
    ];

    const current = window.location.pathname.split('/').pop() || '';

    /* ── Styles ── */
    const style = document.createElement('style');
    style.textContent = `
        html, body {
            height: 100dvh;
            max-height: 100dvh;
        }
        #groove-nav {
            position: sticky;
            top: 0;
            z-index: 200;
            height: 52px;
            background: #ffffff;
            border-bottom: 1.5px solid #e8ede9;
            box-shadow: 0 2px 14px -3px rgba(95,117,97,0.10);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.25rem;
            font-family: 'Outfit', system-ui, sans-serif;
            flex-shrink: 0;
        }
        .gnav-logo { display:flex; align-items:center; text-decoration:none; flex-shrink:0; }
        .gnav-logo img { height:28px; object-fit:contain; }
        .gnav-links { display:flex; align-items:center; gap:2px; }
        .gnav-link {
            display: flex; align-items: center; gap: 5px;
            padding: 5px 11px;
            border-radius: 10px;
            font-size: 0.72rem; font-weight: 700;
            text-decoration: none;
            color: #6b7280;
            transition: background .15s, color .15s;
            white-space: nowrap;
        }
        .gnav-link:hover { background:#f3f4f6; color:#374151; }
        .gnav-link.gnav-active { background:#eef2ef; color:#5f7561; }
        .gnav-link svg { width:13px; height:13px; flex-shrink:0; }
        .gnav-sep { width:1px; height:20px; background:#e8ede9; margin:0 4px; }
        #gnav-logout {
            display:flex; align-items:center; gap:5px;
            padding:5px 11px; border-radius:10px;
            font-size:0.72rem; font-weight:700;
            color:#9ca3af; border:none; background:transparent; cursor:pointer;
            font-family:inherit; transition:color .15s, background .15s;
        }
        #gnav-logout:hover { color:#ef4444; background:#fef2f2; }
        #gnav-logout svg { width:13px; height:13px; }

        /* On very small screens collapse labels */
        @media (max-width: 480px) {
            .gnav-link span { display:none; }
            .gnav-link { padding:6px; }
            #gnav-logout span { display:none; }
        }
    `;
    document.head.appendChild(style);

    /* ── Build nav HTML ── */
    function buildNav() {
        const nav = document.createElement('nav');
        nav.id = 'groove-nav';
        nav.setAttribute('aria-label', 'Admin navigation');

        const linksHTML = PAGES.map(p => {
            const isActive = current === p.href;
            return `<a href="./${p.href}" class="gnav-link${isActive ? ' gnav-active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                <i data-lucide="${p.icon}"></i>
                <span>${p.label}</span>
            </a>`;
        }).join('');

        nav.innerHTML = `
            <a href="./index.html" class="gnav-logo">
                <img src="./assets/logo.png" alt="Groove Coffee Shop">
            </a>
            <div class="gnav-links">${linksHTML}</div>
            <button id="gnav-logout" title="Sign out"
                onclick="if(typeof firebase!=='undefined'){firebase.auth().signOut().then(()=>{window.location.href='./settings.html';});}">
                <i data-lucide="log-out"></i>
                <span>Logout</span>
            </button>`;

        /* Insert as very first element inside <body> */
        document.body.insertAdjacentElement('afterbegin', nav);

        /* Refresh lucide icons scoped to the nav */
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ nodes: [nav] });
        } else {
            /* lucide not loaded yet — wait for it */
            document.addEventListener('DOMContentLoaded', () => {
                if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [nav] });
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }
})();
