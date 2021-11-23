import Custo from "./Custo.type";

export default interface Empreendimento {
    idbuilding : string,
    dados : {
        nome : string,  
        pais : string,
        estado : string,
        cidade : string,
        endereco : string,
        cliente : string,
        descricao : string,
        areaConstruida : number,
        areaTerreno : number,
        bdi : number,
    },
    custo : Custo,
}
