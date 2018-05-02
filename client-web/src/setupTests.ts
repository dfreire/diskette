Object.defineProperty(window, 'localStorage', {
    value: (function () {
        var store = {};

        return {
            getItem(key) {
                // console.log('+++ localStorage getItem', key, store[key]);
                return store[key] || null;
            },
            setItem(key, value) {
                // console.log('+++ localStorage setItem', key, value);
                store[key] = value.toString();
            },
            clear() {
                store = {};
            },
        };
    })()
});
