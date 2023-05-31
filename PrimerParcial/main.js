import { Armas } from './armas.js';
import { Heroes } from './heroes.js';
import { Superheroe } from './superheroe.js';
import { CrearTabla } from './tabla.js';
import { ModificarTabla } from './tabla.js';

const fr = document.getElementById('fr');
const tabla = document.getElementById('tTabla');
let id = 0;
let bandera = false;

localStorage.setItem('heroes',JSON.stringify(Heroes));
let array = JSON.parse(localStorage.getItem('heroes')) || [];
tabla.appendChild(CrearTabla(array));


window.addEventListener('DOMContentLoaded', () => 
{
    Armas.forEach((x) => 
    {
        const opcion = document.createElement('option');
        opcion.value = x;
        opcion.text= x;
        fr.armas.appendChild(opcion);
    });
    
    fr.guardar.addEventListener('click', manejarEventos);
    fr.borrar.addEventListener('click', borrarAnuncio);
    fr.cancelar.addEventListener('click', Limpiar);
});

window.addEventListener('click', (x) =>
{
    if(x.target.matches('td'))
    {
        fr.guardar.value = "Modificar";
        const indice = x.target.parentElement.dataset.id;
        const seleccionado = array.find((x) => x.id == indice);
        console.log(seleccionado);
        id = indice;
        actualizar(seleccionado);
        bandera = true;
    }
});

function borrarAnuncio()
{
    if(id > 0)
    {
        let arrayNuevo = [];
        array.find((x) => 
        {
            if(x.id != id)
            {
                arrayNuevo.push(x);
            }
        });
        array = arrayNuevo;
        ModificarTabla(tabla, array);
        Limpiar();
    }
}

function actualizar(seleccionado)
{
    fr.nombre.value = seleccionado.nombre;
    fr.alias.value = seleccionado.alias;
    fr.fuerza.value = seleccionado.fuerza;

    for(const key in Armas)
    {
        if(Armas[key]== seleccionado.armas)
        {
          fr.armas.selectedIndex= key;
        }
    }
    
    const dc = document.getElementById('dc');
    const marvel = document.getElementById('marvel');

    if(seleccionado.transaccion == "dc")
    {
        dc.checked = true;
    }
    else
    {
        marvel.checked = true;
    }
}

function manejarEventos(accion)
{
    accion.preventDefault(); 
    if(!bandera)
    {
        guardar();
    }
    else
    {
        modificar();
    }
}

function guardar()
{
    const id = generarId();
    const nombre = document.getElementById('nombre').value;
    const alias = document.getElementById('alias').value;
    const editorial = document.getElementsByName('editorial');
    const fuerza = document.getElementById('fuerza').value;
    const arma = document.getElementById('armas').options[document.getElementById('armas').selectedIndex].text;

    let elemento;

    editorial.forEach((x) => 
    {
        if(x.checked)
        {
            elemento = x.value;
        }
    });

    const heroe = new Superheroe(id, nombre, alias, elemento, fuerza, arma);
    console.log(heroe);

    array.push(heroe);
    console.log(heroe);
    ModificarTabla(tabla, array);
    Limpiar();
}

function modificar()
{
    array.find((x) => 
    {
        if(x.id == id)
        {
            x.nombre = document.getElementById('nombre').value;
            x.alias = document.getElementById('alias').value;
            const editorial = document.getElementsByName('editorial');
            x.fuerxa = document.getElementById('fuerza').value;
            x.armas = document.getElementById('armas').options[document.getElementById('armas').selectedIndex].text;

            let elemento;

            editorial.forEach((x) => 
            {
                if(x.checked)
                {
                    elemento = x.value;
                }
            });

            x.editorial = elemento;
        }
    });
    ModificarTabla(tabla, array);
    Limpiar();
}

function Limpiar()
{
    localStorage.setItem('heroes',JSON.stringify(array));
    fr.nombre.value = "";
    fr.fuerza.value = 50;
    fr.alias.value = "";
    fr.armas.selectedIndex = 0;
    bandera = false;
    id = 0;
    fr.guardar.value = "Guardar";
}

function generarId()
{
    let id;
    for(var i = 0; i < array.length; i++)
    {
        if(i == (array.length - 1))
        {
            id = array[i].id;
        }
    }
    return id + 1;
}


