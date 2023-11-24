class Aereo extends Vehiculo {
    constructor(id, marca, modelo, año, altMax, autonomia) {
        super(id, marca, modelo, año);
        this.altMax = altMax;
        this.autonomia = autonomia;
    }

    update(data) {
        super.update(data);
        this.altMax = Number(data.altMax);
        this.autonomia = Number(data.autonomia);
    }
}