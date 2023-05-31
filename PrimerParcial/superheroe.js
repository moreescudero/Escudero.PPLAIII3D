import { Personaje } from "./personaje.js";

export function Superheroe (id, nombre, alias, editorial, fuerza, arma)
{
    Personaje.call(this, id, nombre, arma)
    this.alias = alias;
    this.editorial = editorial;
    this.fuerza = fuerza;
}