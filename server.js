import express from 'express'
import { prisma } from './src/db.js'
const app= express()
app.use(express.json())


// CRUD USUARIO 
app.get('/usuario',async function(req, res){
    try{
        const users= await prisma.usuario.findMany()    
        res.json(users)
    }catch (error) {
        console.log(error)
        res.send({error:"erro ao BUSCAR usuario111"})
    }

})

app.get('/:UserId', async (req,res)=>{
    const usuarioId =req.params.id
    try{
        const user= await prisma.usuario.findUnique({
            where:{
                id: usuarioId
            }
        })
        res.json(user)
    }catch(error){
        console.log(error)
        res.send({error:"erro ao BUSCAR usuario"})
    }
    
})

app.post('/cadastroUser',async(req,res)=>{
    const {nome, senha} = req.body
    try{
        if(!nome && !senha){
        res.json({mensagem:"os campos nome e senha não foram preenchidos"})
        return
    }if(!senha){
        res.json({mensagem:"o campo senha não foi preenchido"})
        return
    }if(!nome){
        res.json({mensagem:"o campo nome não foi preenchido"})
        return
    }
    const user=await prisma.usuario.create({
        data:{
            nome:nome,
            senha:senha
        }
    })
    res.json(user )
    }catch(error){
        res.json({error:"erro ao cadastrar usuario"})
    }
    

})

app.put("/:id", async(req,res)=>{
    const {id}= req.params
    const {nome, senha}=req.body
    try{
        const user= await prisma.usuario.update({
        where:{id:id},
        data: {nome:nome,senha:senha}
    })
    res.json(user)
    }catch(error){
        res.json({erro:"erro ao atualizar usuario"})
    }
    
})

app.delete("/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const user= await prisma.usuario.delete({
        where:{
            id:id
        }
        })
        res.json({
            mensagem:"usuario excluido com sucesso",
            user
        })
    }catch(error){
        res.json({error:"erro ao deletar usuario"})
    }
    
})

// CRUD LIVRO 

// app.get("/livro",async function (req,res) {
//     try{
//         const books= await prisma.livro.findMany()
//         console.log(books)
//         res.json(books)
//     }catch(error){
//         res.send({error:"erro ao BUSCAR livros"})
//     }
    

// })

// app.get('/livro/:id', async (req,res)=>{
//     const livroId =req.params
//     try{
//         const book= await prisma.livro.findUnique({
//             where:{
//                 id: livroId
//             }
//         })
//         res.json(book)
//     }catch(error){
//         console.log(error)
//         res.send({error:"erro ao BUSCAR livro"})
//     }
    
// })



app.listen(3000, ()=>{
    console.log("servidor rodando na porta 3000")
})