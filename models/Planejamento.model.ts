import { model, Schema } from "mongoose";
import Planejamento from "../types/Planejamento.type";

const PlanejamentoSchema = new Schema<Planejamento>(
    {
        inicioPrevisto : {type : Date, required : true},
        fimPrevisto :  {type : Date, required : true},
        inicioExecutado : {type : Date, required : true},
        fimExecutado: {type : Date, required : true},
    }
)

const PlanejamentoModel = model<Planejamento>('Planejamento', PlanejamentoSchema, '_planejamento')
export default PlanejamentoModel