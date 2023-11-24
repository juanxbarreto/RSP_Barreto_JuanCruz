class Terrestre extends Vehiculo {
    constructor(id, marca, modelo, año, cantPue, cantRue) {
        super(id, marca, modelo, año);
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }

    update(data) {
        super.update(data);
        this.cantPue = Number(data.cantPue);
        this.cantRue = Number(data.cantRue);
    }
}