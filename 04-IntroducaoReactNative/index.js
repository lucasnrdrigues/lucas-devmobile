//Módulos ES6 importando
import {  tabelaIMC, calcularIMC } from "./CalculadoraIMC.js";

console.log("Calculo do IMC");
console.log(">>> Tabela do IMC <<<")
console.table(tabelaIMC)

const peso = 80
const altura = 1.70

const resultado = calcularIMC(peso, altura)

console.log(">>> Resultado do IMC: >>>")
console.log(`IMC: ${resultado.toFixed(2)} `)

// Importando biblioteca moment e usando
//exporta o múdulo todo, se fosse import { funcionalidade } from .. ai importaria somente a funcionalidade, e não módulo todo
import moment from "moment"; 

const hoje = moment().locale('pt-br')

console.log('>>> Hoje é: <<<')
console.log(hoje.format('DD/MM/YYYY'))