import { prisma } from "../db.js"

export async function CreateBook(req, res) {
  const { titulo, autor, genero } = req.body

  try {
    if (!titulo && !autor && !genero) {
      return res.status(400).json({ mensagem: "os campos não foram preenchidos" })
    }
    if (!titulo) {
      return res.status(400).json({ mensagem: "o campo titulo não foi preenchido" })
    }
    if (!autor) {
      return res.status(400).json({ mensagem: "o campo autor não foi preenchido" })
    }
    if (!genero) {
      return res.status(400).json({ mensagem: "o campo genero não foi preenchido" })
    }

    const book = await prisma.livro.create({
      data: {
        titulo,
        autor,
        genero,
        status: false
      }
    })

    return res.status(201).json(book)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "erro ao cadastrar livro" })
  }
}

export async function GetBooks(req, res){
    try{
        const books= await prisma.livro.findMany()    
        res.json(books)
    }catch (error) {
        console.log(error)
        res.send({error:"erro ao BUSCAR livros"})
    }

}

export async function FindBookbyId(req,res){
    const bookId =req.params.id
    try{
        const book= await prisma.livro.findUnique({
            where:{
                id: bookId
            }
        })
        res.json(book)
    }catch(error){
        console.log(error)
        res.send({error:"erro ao BUSCAR livro"})
    }
}

export async function UpidateBook(req,res) {

    const {id}= req.params
    const {titulo, autor, genero}=req.body
    try{
        const book= await prisma.livro.update({
        where:{id:id},
        data: {titulo: titulo,autor: autor,genero: genero,}
    })
    res.json(book)
    }catch(error){
        res.json({erro:"erro ao atualizar livro"})
    }
    
}

export async function DeleteBook(req,res) {

    const {id}= req.params
    try{
        const book= await prisma.livro.delete({
        where:{
            id:id
        }
        })
        res.json({
            mensagem:"livro excluido com sucesso",
            book
        })
    }catch(error){
        res.json({error:"erro ao deletar livro"})
    }
    
}
