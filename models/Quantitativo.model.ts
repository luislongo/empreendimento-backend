import { model, Schema } from "mongoose";
import Quantitativo from "../types/Quantitativo.type";

const QuantitativoSchema = new Schema<Quantitativo>(
    {
        idbuilding : {type: String, required:true},
        descricao : {type: String, required:true},
        unidade : {type : String, required:true},
        quantidade : {type : Number, required:true},
        insumos : [{
            idRef : {type : String, required:true},
            quantidade : {type : Number, required:true}
        }]
    }
)

const QuantitativoModel = model<Quantitativo>('Quantitativo', QuantitativoSchema, '_quantitativos')
export default QuantitativoModel