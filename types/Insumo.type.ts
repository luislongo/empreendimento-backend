import Custo from "./Custo.type";

export default interface Insumo {
    idbuilding : string     // Building id
    codigo : string           // Code used as reference in table.
    refTabela : string        // Reference table
    descricao : string     // Input description
    unidade : string    // Measure unity used to quantify input
    custoUn : Custo    // Unitary cost 
}