import {Router} from "express"

import{
    GetBooks,
    FindBookbyId,
    CreateBook,
    UpidateBook,
    DeleteBook,
    AlugarBook
}from  "../controller/livro.controller.js"

const router=Router()

router.post("/CreateBook",CreateBook)

router.get("/book",GetBooks)

router.get("/book/:id",FindBookbyId)

router.put("/UpidateBook/:id",UpidateBook)

router.delete("/DeleteBook/:id",DeleteBook)

router.put("/AlugarBook/:id",AlugarBook)


export default router