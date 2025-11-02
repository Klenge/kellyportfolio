function activateLink(link) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    if (navLinks.length === 0) {
        return;
    }

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    let isActiveSet = false;

    if (currentHash) {
        navLinks.forEach((link) => {
            const url = new URL(link.href);
            const linkFile = url.pathname.split('/').pop() || 'index.html';
            if (url.hash && url.hash === currentHash && linkFile === currentFile) {
                activateLink(link);
                isActiveSet = true;
            }
        });
    }

    if (!isActiveSet) {
        navLinks.forEach((link) => {
            const url = new URL(link.href);
            const linkFile = url.pathname.split('/').pop() || 'index.html';
            if (!url.hash && linkFile === currentFile && !isActiveSet) {
                activateLink(link);
                isActiveSet = true;
            }
        });
    }

    if (!isActiveSet && currentFile === 'index.html') {
        const homeLink = navLinks.find((link) => {
            const url = new URL(link.href);
            const linkFile = url.pathname.split('/').pop() || 'index.html';
            return !url.hash && linkFile === 'index.html';
        });
        if (homeLink) {
            activateLink(homeLink);
        }
    }
});
