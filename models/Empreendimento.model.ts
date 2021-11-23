import { model, Schema } from "mongoose";
import { CustoSchemaType } from "../types/Custo.type";
import Empreendimento from "../types/Empreendimento.type";

const EmpreendimentoSchema = new Schema<Empreendimento>(
    {
        idbuilding : {type: String, required:true},
        dados : {
            nome : {type: String, required:true},
            pais : {type: String, required:true},
            estado : {type: String, required:true},
            cidade : {type: String, required:true},
            endereco : {type: String, required:true},
            cliente : {type: String, required:true},
            descricao : {type: String, required:true},
            areaConstruida : {type: String, required:true},
            areaTerreno : {type: String, required:true},
            bdi : {type: String, required:true},
        },
        custo : CustoSchemaType
    }
)

const EmpreendimentoModel = model<Empreendimento>('Empreendimento', EmpreendimentoSchema, '_empreendimentos')
export default EmpreendimentoModel