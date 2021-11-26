import EmpreendimentoRouter from "./routes/Empreendimento.router"
import InsumoRouter from "./routes/Insumo.router"
import ObjetoBIMRouter from "./routes/ObjetoBIM.router"
import OrcamentoRouter from "./routes/Orcamento.router"
import PlanejamentoRouter from "./routes/Planejamento.router"
import QuantitativoRouter from './routes/Quantitativo.router'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.port || 5000;

app.use((cors()))
app.use(express.json({limit : '5mb'}))

app.use('/planejamento', PlanejamentoRouter)
app.use('/insumos', InsumoRouter)
app.use('/quantitativos', QuantitativoRouter)
app.use('/orcamentos', OrcamentoRouter)
app.use('/empreendimentos', EmpreendimentoRouter)
app.use('/objetosBIM', ObjetoBIMRouter)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})