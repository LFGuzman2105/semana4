function Mostrar() {
    let Limite1 = document.getElementById("limiteInferior").value;
    let Limite2 = document.getElementById("limiteSuperior").value;
    
    if (!document.getElementById("Switch").checked && (Limite1 == "" || Limite2 == "")) {
        alert("Los campos no pueden estar vacíos.");
    }
    else if (!document.getElementById("Switch").checked && (parseInt(Limite1) > parseInt(Limite2))) {
        alert("El limite inferior debe ser menor que el limite superior.");
    }
    else if (!document.getElementById("Switch").checked && ((parseInt(Limite1) <= 0) || (parseInt(Limite1) > 100) ||
             (parseInt(Limite2) <= 0 ) || (parseInt(Limite2) > 100))) {
        alert("Los intervalos de los límites deben ser entre 1 y 100.");
    }
    else if (!document.getElementById("Switch").checked && (parseInt(Limite1) <= parseInt(Limite2))) {
        getData(Limite1, Limite2);
    }
    else if (document.getElementById("Switch").checked && (Limite1 == "")) {
        alert("El campo del límite no puede estar vacío.");
    }
    else if (document.getElementById("Switch").checked && ((parseInt(Limite1) <= 0) || (parseInt(Limite1) > 100))) {
        alert("El intervalo del límite debe ser entre 1 y 100.");
    }
    else if (document.getElementById("Switch").checked && ((parseInt(Limite1) >= 1) && (parseInt(Limite1) <= 100))) {
        Limite2 = Limite1;
        getData(Limite1, Limite2);
    }
}

async function getData(Limite1, Limite2) {
    try {
        let HTMLtext = "";
        
        for (let i = parseInt(Limite1); i <= parseInt(Limite2); i++) {
            const Id = i.toString();

            const URL = "http://jsonplaceholder.typicode.com/photos/" + Id;
            const Response = await fetch(URL);
            if (Response.ok) {
                const Data = await Response.json();
                console.log(Data);
                HTMLtext = HTMLtext + `<div>
                                        <img src="${Data.url}" alt="Imagen ${Id}">
                                        <label>Imagen ${Id}</label>
                                       </div>`;
            }
            else {
                throw new Error("Error: " + Response.statusText);
            }
        }

        document.getElementById("Imagenes").innerHTML = HTMLtext;
    }
    catch (Error) {
        console.error("Error", Error);
        throw Error;
    }   
}

document.getElementById('Switch').addEventListener('change', function() {
    let Objeto = document.getElementById('Ocultar');

    if (this.checked) {
        Objeto.classList.add('hidden');
    } else {
        Objeto.classList.remove('hidden');
    }
});