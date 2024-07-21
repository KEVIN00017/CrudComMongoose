import express from 'express'
import mod from './connection.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get("/", async (req, res) => {
    const find = await mod.find()
    res.send(find)
});

app.post("/insert", async (req, res) => {
    //pegando info do body:
    const filme = req.body.film
    const data = req.body.date
    //usando o metodo para inserir no meu model de banco de dados
    const NewFilm = new mod({
        filme: filme,
        data: data
    })
    //tentando salvar e tratando os erros 
    try {
        await NewFilm.save()
        res.send("Salvo Com Sucesso!.")
    } catch (error) {
        console.log(error)
    }
})
app.delete("/:ID", async (req, res) => {
    //pegando o id do filme pelo parametro
    const id = req.params.ID
    try {
        const deletar = await mod.deleteOne({ _id: id })
        //usando o metodo do mongoose de deletar
        res.status(200).send("Deletado Com Sucesso!")
    } catch (error) {
        console.log(error)
    }

})
app.put("/:ID", async (req, res) => {
    //pegando info dos params/body
    const id = req.params.ID
    const filme = req.body.film
    const data = req.body.date
    //
    const src = mod.findOne({ _id: id })
    //fazendo a verificação:
    if (src) {
        try {
            const atualization = await mod.updateOne({ _id: id, filme: filme, data: data })
//usando o metodo de atualização
            res.send("Atualizado Com Sucesso!")

        } catch (error) {
            //tratando o erro:
            console.error(error)
        }
    }

})


app.listen(PORT, () => {
    console.log("RUNNING SERVER PORT :" + PORT)
})