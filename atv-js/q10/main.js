// Importando a função do script calcularArea.js
const calcularAreaCirculo = require('./calcularArea');

// Calculando a área de um círculo com raio 5
const raio = 5;
const area = calcularAreaCirculo(raio);

console.log(`A área do círculo com raio ${raio} é: ${area}`);
