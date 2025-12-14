import { prisma } from "../db.js"



export async function ListaUser(req, res){
    try{
        const users= await prisma.usuario.findMany()    
        res.json(users)
    }catch (error) {
        console.log(error)
        res.send({error:"erro ao BUSCAR usuario111"})
    }

}

export async function FindUserbyId(req,res){
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
    
}

export async function CreateUser(req,res) {
    
    const {nome, senha, email} = req.body
    try{
        if(!nome && !senha && !email){
        res.json({mensagem:"os campos nome e senha não foram preenchidos"})
        return
    }if(!senha){
        res.json({mensagem:"o campo senha não foi preenchido"})
        return
    }if(!nome){
        res.json({mensagem:"o campo nome não foi preenchido"})
        return
    }if(!email){
        res.json({mensagem:"o campo email não foi preenchido"})
        return
    }
    const user=await prisma.usuario.create({
        data:{
            nome:nome,
            senha:senha,
            email:email
        }
    })
    res.json(user )
    }catch(error){
        res.json({error:"erro ao cadastrar usuario"},
        console.log(error)
        )
    }
    

}

export async function UpidateUser(req,res) {

    const {id}= req.params
    const {nome,email}=req.body
    try{
        const user= await prisma.usuario.update({
        where:{id:id},
        data: {nome:nome,email:email}
    })
    res.json(user)
    }catch(error){
        res.json({erro:"erro ao atualizar usuario"})
    }
    
}

export async function DeleteUser(req,res) {

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
    
}

export async function AdmUser(req, res) {
  const { id } = req.params

  try {
    const user = await prisma.usuario.update({
      where: { id },
      data: { isAdmin: true }
    })

    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao promover usuário' })
  }
}

export async function NormalUser(req, res) {
  const { id } = req.params

  try {
    const user = await prisma.usuario.update({
      where: { id },
      data: { isAdmin: false }
    })

    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao rebaixar usuário' })
  }
}

export async function VerifUser(req, res) {
    const { email, senha } = req.body

    const user = await prisma.usuario.findFirst({
    where: {
        email,
        senha
    }
    })

    if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json({
    id: user.id,
    nome: user.nome,
    isAdmin: user.isAdmin
    })
}

