import EmpreendimentoRouter from "./routes/Empreendimento.router"
import InsumoRouter from "./routes/Insumo.router"
import ObjetoBIMRouter from "./routes/ObjetoBIM.router"
import QuantitativoRouter from "./routes/Quantitativo.router"
import ServicoRouter from "./routes/Servico.router"

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.port || 5000;

app.use((cors()))
app.use(express.json({limit : '5mb'}))

app.use('/insumos', InsumoRouter)
app.use('/quantitativos', QuantitativoRouter)
app.use('/servicos', ServicoRouter)
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