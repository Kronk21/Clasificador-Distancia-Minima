"use strict";

const botonPaso1 = document.querySelector(".form__button--paso-1");
const inputNumeroClases = document.querySelector(
    ".form__input--numero-de-clases"
);
const inputNumeroVariables = document.querySelector(
    ".form__input--numero-variables"
);

const divPaso2 = document.querySelector(".bloque--2");
const divClases = document.querySelector(".clases");
divPaso2.style.opacity = 0;

const divPaso3 = document.querySelector(".bloque--3");
divPaso3.style.opacity = 0;

const divPaso4 = document.querySelector(".bloque--4");
divPaso4.style.opacity = 0;

const divPaso5 = document.querySelector(".bloque--5");
divPaso5.style.opacity = 0;

const divPaso6 = document.querySelector(".bloque--6");
divPaso6.style.opacity = 0;

let clases = [];

botonPaso1.addEventListener("click", function (e) {
    e.preventDefault();

    const numeroClases = Number(inputNumeroClases.value);
    const numeroVariables = Number(inputNumeroVariables.value);

    if (
        typeof numeroClases === "number" &&
        typeof numeroVariables === "number" &&
        numeroClases > 1 &&
        numeroVariables > 0
    ) {
        clases = [];
        divPaso3.style.opacity = 0;
        divPaso4.style.opacity = 0;
        divPaso5.style.opacity = 0;
        divPaso6.style.opacity = 0;
        mostrarPaso2(numeroClases, numeroVariables);
    } else {
        divPaso2.style.opacity = 0;
    }
});

////////////////////////////////////////
//              Paso 2
////////////////////////////////////////

const mostrarPaso2 = function (numeroClases, numeroVariables) {
    divClases.innerHTML = "";
    // const html = "";

    for (let i = 0; i < numeroClases; i++) {
        const htmlNumeroObjetos = `
        <div class="clase clase--${i}">
            <h3>Clase ${i}</h3>
            <form class="form--numero-objetos">
                <div>
                    <label>No. Objetos</label>
                    <input
                        type="number"
                        class="form__input--numero-objetos form__input--numero-objetos-${i}"
                    />
                </div>
            </form>
        </div>`;
        // html += htmlNumeroObjetos;
        divClases.insertAdjacentHTML("beforeend", htmlNumeroObjetos);
    }
    divClases.insertAdjacentHTML(
        "beforeend",
        `<button class="form__button--numero-objetos">
            Continuar
        </button>`
    );

    document
        .querySelector(".form__button--numero-objetos")
        .addEventListener("click", function (e) {
            e.preventDefault();

            clases = [];

            const objetosPorClase = [
                ...document.querySelectorAll(".form__input--numero-objetos"),
            ].map((el) => Number(el.value));

            if (objetosPorClase.every((num) => num > 0)) {
                formularioLlenarObjetos(objetosPorClase, numeroVariables);
            } else {
                console.log("Datos invalidos");
            }
        });

    divPaso2.style.opacity = 1;
};

////////////////////////////////////////
//              Paso 3
////////////////////////////////////////

let indiceObjeto = 0;
const formularioLlenarObjetos = function (objetosPorClase, numeroVariables) {
    const divClases = document.querySelector(".clases--llenar");
    divClases.innerHTML = "";

    indiceObjeto = 0;

    const numeroClases = objetosPorClase.length;

    //  Ciclo para generar las estructuras logicas de los objetos
    //  El ciclo va iterar el numero de veces que sea igual al numero de clases
    for (let i = 0; i < numeroClases; i++) {
        clases.push({
            clase: i,
            numeroDeObjetos: objetosPorClase[i],
            niveles: [],
            promedio: [],
            objetos: [],
        });

        let htmlObjeto = "";

        htmlObjeto += `
        <div class="clase clase--llenar">
            <h3>Clase ${i}</h3>

            <div class="objetos">`;

        for (let j = 0; j < clases[i].numeroDeObjetos; j++) {
            let htmlFormLlenar = "";
            for (let k = 0; k < numeroVariables; k++) {
                htmlFormLlenar += `<input type="number" class="nivel--${k}"/>`;
            }

            htmlObjeto += `
                <form class="objeto">
                    <label>Ob ${indiceObjeto}</label>
                    <div class="objeto--variables">
                        ${htmlFormLlenar}
                    </div>
                </form>
            `;

            indiceObjeto++;
        }
        htmlObjeto += `
            </div>
        </div>`;

        divClases.insertAdjacentHTML("beforeend", htmlObjeto);
    }

    divClases.insertAdjacentHTML(
        "beforeend",
        `<button class="form__button--enviar-objetos">
            Continuar
        </button>`
    );

    document
        .querySelector(".form__button--enviar-objetos")
        .addEventListener("click", function (e) {
            e.preventDefault();

            llenarObjetoClases(numeroVariables);
        });

    divPaso3.style.opacity = 1;
    divPaso4.style.opacity = 0;
    divPaso5.style.opacity = 0;
    divPaso6.style.opacity = 0;
};

const llenarObjetoClases = function (numeroVariables) {
    // const eleClases = [...document.querySelectorAll(".clase--llenar")].map(
    //     (ele) => ele.querySelectorAll(".objetos")
    // );
    const eleClases = Array.from(document.querySelectorAll(".clase--llenar"));
    // console.log(clases);
    // const todosLosNumeros = [];

    for (let i = 0; i < eleClases.length; i++) {
        // console.log(eleClases[i]);
        clases[i].niveles = [];
        clases[i].promedio = [];
        clases[i].objetos = [];
        clases[i].objetosNuevos = [];

        for (let j = 0; j < numeroVariables; j++) {
            // const nivel = eleClases[i].querySelectorAll(`.nivel--${j}`);
            const nivel = Array.from(
                eleClases[i].querySelectorAll(`.nivel--${j}`)
            ).map((ele) => Number(ele.value));

            /*
            //
            //  Aqui pasa algo raro
            //
            */
            clases[i].niveles.push(nivel);
            // console.log(clases[i].niveles[j]);

            // console.log(nivel);
            clases[i].promedio.push(
                nivel.reduce((sum, num) => sum + num, 0) /
                    clases[i].numeroDeObjetos
            );

            // todosLosNumeros.push(nivel);
        }
        // console.log(clases[i].promedio);
        // console.log(clases[i].niveles);
        // console.log(clases[i]);

        for (let j = 0; j < clases[i].numeroDeObjetos; j++) {
            const ob = [];

            for (let k = 0; k < clases[i].niveles.length; k++) {
                ob.push(clases[i].niveles[k][j]);
            }
            clases[i].objetos.push(ob);
        }
    }
    // console.log(todosLosNumeros);

    ////////////////////////////////////////
    //              Paso 4
    ////////////////////////////////////////
    divPaso4.style.opacity = 1;
    divPaso5.style.opacity = 0;
    divPaso6.style.opacity = 0;

    document
        .querySelector(".form__button--numero-nuevo")
        .addEventListener("click", function (e) {
            e.preventDefault();

            const numeroDeObjetos = Number(
                document.querySelector(".form__input--numero-nuevo").value
            );

            if (numeroDeObjetos > 0) {
                llenarNuevosObjetos(numeroDeObjetos, numeroVariables);
            }
            // divPaso5.style.opacity = 1;
        });
};

////////////////////////////////////////
//              Paso 5
////////////////////////////////////////

const llenarNuevosObjetos = function (numeroDeObjetos, numeroVariables) {
    divPaso6.style.opacity = 0;
    // console.log(numeroDeObjetos);
    let indiceObjetoAux = indiceObjeto;

    const divObjetosNuevos = document.querySelector(".clase-aux .clase");
    divObjetosNuevos.innerHTML = "";
    divObjetosNuevos.innerHTML += `<h3>Objetos Nuevos</h3>`;
    // divObjetosNuevos.innerHTML += `<div class="objetos objetos-nuevos">`;

    // console.log(divObjetosNuevos);
    let html = "";
    for (let i = 0; i < numeroDeObjetos; i++) {
        let htmlFormLlenar = "";
        for (let j = 0; j < numeroVariables; j++) {
            htmlFormLlenar += `<input type="number" class="nivel--${j}"/>`;
        }

        html += `
            <form class="objeto objeto-nuevo">
                <label>Ob ${indiceObjetoAux}</label>
                <div class="objeto--variables">
                    ${htmlFormLlenar}
                </div>
            </form>`;
        indiceObjetoAux++;
    }
    divObjetosNuevos.innerHTML +=
        `<div class="objetos objetos-nuevos">` +
        html +
        `<button class="form__button--enviar-nuevos align--end">Continuar</button>
        </div>`;

    document
        .querySelector(".form__button--enviar-nuevos")
        .addEventListener("click", function (e) {
            e.preventDefault();

            const elementoObjetosNuevos = Array.from(
                document.querySelectorAll(".objeto-nuevo")
            );

            clasificarNuevos(elementoObjetosNuevos);
        });

    // divObjetosNuevos.innerHTML += `</div>`;

    divPaso5.style.opacity = 1;
};

const clasificarNuevos = function (elementoObjetosNuevos) {
    // console.log(elementoObjetosNuevos);

    const arrayObjetosNuevos = elementoObjetosNuevos.map((el) =>
        Array.from(el.querySelectorAll("input")).map((input) =>
            Number(input.value)
        )
    );

    const resultadosClases = JSON.parse(JSON.stringify(clases));
    // console.log(arrayObjetosNuevos);

    // arrayObjetosNuevos.forEach((ob) => console.log(ob));

    for (let i = 0; i < arrayObjetosNuevos.length; i++) {
        const objNuevo = arrayObjetosNuevos[i];
        let clasePertenencia, distanciaMenor;

        for (let j = 0; j < clases.length; j++) {
            // resultadosClases[j].objetosNuevos = [];
            const claseJ = clases[j].promedio;
            const distancia = distanciaEuclidea(objNuevo, claseJ);

            if (j === 0) {
                distanciaMenor = distancia;
                clasePertenencia = j;
            }

            if (distancia < distanciaMenor) {
                distanciaMenor = distancia;
                clasePertenencia = j;
            }

            // console.log(distanciaEuclidea(objNuevo, claseJ));
        }

        resultadosClases[clasePertenencia].objetosNuevos.push(objNuevo);
        resultadosClases[clasePertenencia].numeroDeObjetos += 1;
        // resultadosClases[clasePertenencia].objetosNuevos.push(objNuevo);
        // console.log(
        //     `El objeto nuevo ${indiceObjeto + i} pertenece a la clase ${
        //         clases[clasePertenencia].clase
        //     }, con una distancia euclidea de ${distanciaMenor}`
        // );
    }

    // document
    //     .querySelector(".form__button--enviar-nuevos")
    //     .addEventListener("click", function (e) {
    //         e.preventDefault();

    //     });

    mostrarResultados(resultadosClases);
    divPaso6.style.opacity = 1;
};

const distanciaEuclidea = function (obj1, obj2) {
    let sumaDeDiferencias = 0;

    for (let i = 0; i < obj1.length; i++) {
        sumaDeDiferencias += Math.pow(obj1[i] - obj2[i], 2);
    }

    return Math.sqrt(sumaDeDiferencias);
};

const mostrarResultados = function (resultados) {
    // divPaso6.style.opacity = 1;
    // console.log("asdfasdf");
    // console.log(resultados);

    const divResultados = divPaso6.querySelector(".clases--resultado");
    divResultados.innerHTML = "";
    // console.log(divResultados);

    for (let i = 0; i < resultados.length; i++) {
        const html = `
        <div class="clase clase--resultado">
            <h3>Clase ${i}</h3>

            <h4>&horbar; Promedio de la clase:</h4>
            <p>[${resultados[i].promedio.join(", ")}]</p>

            <h4>&horbar; Objetos:</h4>
            <p>${resultados[i].objetos
                .map((ob) => `[${ob.join(", ")}]`)
                .join(", ")}</p>

            <h4>&horbar; Objetos Nuevos:</h4>
            <p>${resultados[i].objetosNuevos
                .map((ob) => `[${ob.join(", ")}]`)
                .join(", ")}</p>
        </div>`;

        divResultados.insertAdjacentHTML("beforeend", html);
    }
};

/*
const formularioLlenarObjetos = function (index, numeroVariables) {
    // console.log(index);

    const divClase = document.querySelector(`.clase--${index}`);
    // console.log(divClase);
    const numeroObjetos = Number(
        document.querySelector(`.form__input--numero-objetos-${index}`).value
    );

    if (numeroObjetos > 0) {
        let html = `<div class="objetos">`;
        let htmlObjeto = "";

        for (let i = 0; i < numeroObjetos; i++) {
            htmlObjeto += `
                <form class="objeto">
                    <label>Ob ${i}</label>
                    <div class="objeto--variables">`;
            for (let j = 0; j < numeroVariables; j++) {
                htmlObjeto += `<input type="number" />`;
            }
            htmlObjeto += `
                    </div>
                </form>`;
        }

        // console.log(htmlObjeto);
        html += `${htmlObjeto}</div>`;

        divClase.insertAdjacentHTML("beforeend", html);
    }
};
*/