import { model, Schema } from "mongoose";
import ObjetoBIM from "../types/ObjetoBIM.type";

const ObjetoBIMSchema = new Schema<ObjetoBIM>(
    {
        idbuilding : {type: String, required:true},
        guidIFC : {type : String, required:true},
        guidVisus : {type : String, required:true},
        pavimento : {type : String, required:true},
        disciplina : {type : String, required:true},
        entidade : {type : String, required:true},
    }
)

const ObjetoBIMModel = model<ObjetoBIM>('ObjetoBIM', ObjetoBIMSchema, '_objetosBIM')
export default ObjetoBIMModel