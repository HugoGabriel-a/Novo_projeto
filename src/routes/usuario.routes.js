import {Router} from "express"

import{
    ListaUser,
    FindUserbyId,
    CreateUser,
    UpidateUser,
    DeleteUser

}from  "../controller/usuario.controller.js"

const router=Router()

router.get("/User",ListaUser)

router.get("/User/:id",FindUserbyId)

router.post("/Createuser",CreateUser)

router.put("/UpidateUser/:id", UpidateUser)

router.delete("/DeleteUser/:id", DeleteUser)

export default router