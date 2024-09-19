export default class Plato {

    constructor(plato) {
        this.id = plato.id;
        this.joystick = plato.joystick;
        //liste de touche mapper avec l'id des touches
        this.keys = plato.keys;
        this.selected = false;

        //lister les touches
        this.keyList = []; 
        Object.entries(plato.keys).forEach(([buttonId, key]) => {
            if (key && key !== "void" && key !== "" &&
                !["Space", "Backspace", "Tab", "Enter", "Esc"].includes(key)) {
                this.keyList.push(key);
            }
        });
    }

    sameJostick(joystick) {
        if (this.joystick[0] === joystick[0] && this.joystick[1] === joystick[1]) {
            return true;
        }
        return false;
    }
}
