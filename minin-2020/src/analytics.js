function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    const listner = () => counter++;

    document.addEventListener('click', listner);

    return {
        destroy() {
            document.removeEventListener('click', listner);
            isDestroyed = true;
        },

        getClicks() {
            return isDestroyed ? 'Analytics is destroyed' : counter;
        }
    }
}

window.analytics = createAnalytics();