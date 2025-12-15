import express from 'express'
import cors from 'cors'
import usuarioRoutes from "./routes/usuario.routes.js"
import livroRoutes from "./routes/livro.routes.js"


const app= express()
app.use(express.json())



app.use(cors())  
app.use(usuarioRoutes)
app.use(livroRoutes)


app.listen(3000, ()=>{
    console.log("servidor rodando na porta 3000")
})