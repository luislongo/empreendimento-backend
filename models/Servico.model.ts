import { model, Schema } from "mongoose";
import { CustoSchemaType } from "../types/Custo.type";
import { PlanejamentoSchemaType } from "../types/Planejamento.type";
import Servico from "../types/Servico.type";

const ServicoSchema = new Schema<Servico>(
    {
        idbuilding : {type: String, required:true},
        descricao : {type: String, required:true},
        quantitativoRef : {type: [String], required:true},
        planejamento : PlanejamentoSchemaType,
        custoTotal : CustoSchemaType
    }
)

const ServicoModel = model<Servico>('Servico', ServicoSchema, '_servicos')
export default ServicoModel