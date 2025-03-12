//Use o export para poder usar em outro arquivo
export const tabelaIMC = [
    {limite: 18.5, classificação: "Magreza"},
    {limite: 24.9, classificação: "Normal"},
    {limite: 29.9, classificação: "Sobrepeso"},
    {limite: 34.9, classificação: "Obesidade grau I"},
    {limite: 39.9, classificação: "Obesidade grau II"},
    {limite: 40, classificação: "Obesidade grau III"},
]

export const calcularIMC = (peso, altura) => {
    return peso / (altura * altura) 
}