const express = require('express');
const { estudiantes } = require('./estudiantes');

const app = express();
const PORT = 3000;

function listarEstudiantes(arr) {
    let lista = [];
    for (let i = 0; i < arr.length; i++) {
        lista.push(arr[i]);
    }
    return lista;
}

function buscarPorId(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) {
            return arr[i];
        }
    }
    return { mensaje: `El estudiante con ID ${id} no fue encontrado.` };
}

function buscarPorCarrera(arr, carrera) {
    let resultado = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].carrera.toLowerCase() === carrera.toLowerCase()) {
            resultado.push(arr[i]);
        }
    }
    return resultado;
}

function obtenerAprobados(arr) {
    let aprobados = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].promedio >= 3.0) {
            aprobados.push(arr[i]);
        }
    }
    return aprobados;
}

function obtenerReprobados(arr) {
    let reprobados = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].promedio < 3.0) {
            reprobados.push(arr[i]);
        }
    }
    return reprobados;
}

function calcularPromedioGeneral(arr) {
    if (arr.length === 0) return 0;
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        suma += arr[i].promedio;
    }
    return Number((suma / arr.length).toFixed(2));
}

function obtenerMejorEstudiante(arr) {
    if (arr.length === 0) return null;
    let mejor = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].promedio > mejor.promedio) {
            mejor = arr[i];
        }
    }
    return mejor;
}

function obtenerMenorPromedio(arr) {
    if (arr.length === 0) return null;
    let menor = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].promedio < menor.promedio) {
            menor = arr[i];
        }
    }
    return menor;
}

function contarPorCarrera(arr) {
    let conteo = {};
    for (let i = 0; i < arr.length; i++) {
        let carrera = arr[i].carrera;
        if (conteo[carrera]) {
            conteo[carrera]++;
        } else {
            conteo[carrera] = 1;
        }
    }
    return conteo;
}

function buscarPorSemestre(arr, semestre) {
    let resultado = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].semestre === Number(semestre)) {
            resultado.push(arr[i]);
        }
    }
    return resultado;
}

function obtenerMayoresDeEdad(arr, edadLimite) {
    let resultado = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].edad > Number(edadLimite)) {
            resultado.push(arr[i]);
        }
    }
    return resultado;
}

function obtenerRanking(arr) {
    let copia = [];
    for (let i = 0; i < arr.length; i++) {
        copia.push(arr[i]);
    }

    for (let i = 0; i < copia.length; i++) {
        for (let j = 0; j < copia.length - 1 - i; j++) {
            if (copia[j].promedio < copia[j + 1].promedio) {
                let temp = copia[j];
                copia[j] = copia[j + 1];
                copia[j + 1] = temp;
            }
        }
    }
    return copia;
}

function generarReporte(arr) {
    const mejor = obtenerMejorEstudiante(arr);
    const menor = obtenerMenorPromedio(arr);

    console.log("========== REPORTE ACADÉMICO ==========");
    console.log(`Total de estudiantes: ${arr.length}`);
    console.log(`Estudiantes aprobados: ${obtenerAprobados(arr).length}`);
    console.log(`Estudiantes reprobados: ${obtenerReprobados(arr).length}`);
    console.log(`Promedio general: ${calcularPromedioGeneral(arr)}`);
    console.log(`Mejor estudiante: ${mejor ? mejor.nombre + " (" + mejor.promedio + ")" : 'N/A'}`);
    console.log(`Estudiante con menor promedio: ${menor ? menor.nombre + " (" + menor.promedio + ")" : 'N/A'}`);
    console.log("========================================");
    console.log("ANDERSON DIMATE DIAZ - 2026");
    return {

        totalEstudiantes: arr.length,
        aprobados: obtenerAprobados(arr).length,
        reprobados: obtenerReprobados(arr).length,
        promedioGeneral: calcularPromedioGeneral(arr),
        mejorEstudiante: mejor,
        menorEstudiante: menor
    };
}

app.get('/', (req, res) => {
    res.json({ mensaje: "API de Gestión de Estudiantes Activa", estado: "OK" });
});

app.get('/estudiantes', (req, res) => res.json(listarEstudiantes(estudiantes)));
app.get('/estudiantes/id/:id', (req, res) => res.json(buscarPorId(estudiantes, req.params.id)));
app.get('/estudiantes/carrera/:carrera', (req, res) => res.json(buscarPorCarrera(estudiantes, req.params.carrera)));
app.get('/estudiantes/aprobados', (req, res) => res.json(obtenerAprobados(estudiantes)));
app.get('/estudiantes/reprobados', (req, res) => res.json(obtenerReprobados(estudiantes)));
app.get('/estudiantes/promedio', (req, res) => res.json({ promedioGeneral: calcularPromedioGeneral(estudiantes) }));
app.get('/estudiantes/destacado', (req, res) => res.json(obtenerMejorEstudiante(estudiantes)));
app.get('/estudiantes/menor-promedio', (req, res) => res.json(obtenerMenorPromedio(estudiantes)));
app.get('/estudiantes/conteo-carrera', (req, res) => res.json(contarPorCarrera(estudiantes)));
app.get('/estudiantes/semestre/:semestre', (req, res) => res.json(buscarPorSemestre(estudiantes, req.params.semestre)));
app.get('/estudiantes/edad-mayor/:edad', (req, res) => res.json(obtenerMayoresDeEdad(estudiantes, req.params.edad)));
app.get('/estudiantes/ranking', (req, res) => res.json(obtenerRanking(estudiantes)));
app.get('/reporte', (req, res) => res.json(generarReporte(estudiantes)));

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    generarReporte(estudiantes);
});