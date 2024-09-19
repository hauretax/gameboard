import Plato from "./PlatoHandler";

export default class MapConfig {

    constructor(mapConfig) {
        this.buttons = mapConfig.buttonId;
        this.platos = [];
        mapConfig.plato.forEach(plato => {
            this.platos.push(new Plato(plato));
        });
    }
}