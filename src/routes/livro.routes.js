import {Router} from "express"

import{
    GetBooks,
    FindBookbyId,
    CreateBook,
    UpidateBook,
    DeleteBook,
}from  "../controller/livro.controller.js"

const router=Router()

router.post("/CreateBook",CreateBook)

router.get("/book",GetBooks)

router.get("/book/:id",FindBookbyId)

router.put("/UpidateBook/:id",UpidateBook)

router.delete("/DeleteBook/:id",DeleteBook)


export default router