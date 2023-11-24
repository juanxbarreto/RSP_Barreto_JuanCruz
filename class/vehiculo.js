class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}, modelo: ${this.modelo}, año de fabricación: ${this.anoFab}, velocidad máxima: ${this.velMax}`;
    }

    update(data) {
        this.id = Number(data.id);
        this.modelo = data.modelo;
        this.anoFab = Number(data.anoFab);
        this.velMax = Number(data.velMax);
    }
}
