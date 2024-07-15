
export default class ArrayStorage {

    constructor(key) {
        this.key = key;
    }

    save(array) {
        let arrayStr = JSON.stringify(array);
        localStorage.setItem(this.key, arrayStr);
    }

    load() {
        let arrayStr = localStorage.getItem(this.key);
        if (arrayStr) {
            return JSON.parse(arrayStr);
        }
        return null; 
    }

    update(index, newValue) {
        let array = this.load();
        if (array && index >= 0 && index < array.length) {
            array[index] = newValue;
            this.save(array);
        } else {
            console.error("Invalid index or array not found");
        }
    }

    add(newValue) {
        let array = this.load() || [];
        array.push(newValue);
        this.save(array);
    }

    remove(index) {
        let array = this.load();
        if (array && index >= 0 && index < array.length) {
            array.splice(index, 1);
            this.save(array);
        } else {
            console.error("Invalid index or array not found");
        }
    }
}
