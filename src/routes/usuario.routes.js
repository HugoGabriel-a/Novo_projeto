import {Router} from "express"

import{
    ListaUser,
    FindUserbyId,
    CreateUser,
    UpidateUser,
    DeleteUser,
    AdmUser,
    NormalUser,
    VerifUser

}from  "../controller/usuario.controller.js"

const router=Router()

router.get("/User",ListaUser)

router.get("/User/:id",FindUserbyId)

router.post("/CreateUser",CreateUser)

router.put("/UpidateUser/:id", UpidateUser)

router.delete("/DeleteUser/:id", DeleteUser)

router.put("/AdmUser/:id",AdmUser)

router.put("/NormalUser/:id",NormalUser)

router.post("/verifUser",VerifUser)



export default router