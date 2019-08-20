class Storage {
    constructor() {}
    setListToStorage(key, value) {
        localStorage.setItem(key, value);
    }
    getListFromStorage(key) {
        if (localStorage.getItem(key) === null) {
            return null;
        } else {
            return JSON.parse(localStorage.getItem(key));
        }
    }
}