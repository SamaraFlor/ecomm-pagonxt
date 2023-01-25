import { Router } from "express";
import { createUserUseCase } from "./use-case/createUserAccount.js";
import {createUserTokenUseCase} from "./use-case/tokenCreate.js"


const router = Router();

router.post('/accounts', async (request, response) => {

    const createdUser = await createUserUseCase(name, email, password);
    const email = req.body.email;
    isValidEmail(email, (err) => {
        if(err) {
            res.status(400).send(err.message);
        } 
        return response.status(201).json({
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            createdDate: createdUser.createdDate,
        });
    
    });
    
   
});

router.post('/tokens', async (request, response) => {
    const { email, password } = request.body;
    const authToken = await createUserTokenUseCase(email, password);

    if(authToken) {
        return response.status(201).json({
            token: authToken
        });
    }

    return response.status(401).json({
        message: 'user e-mail or password incorrect',
    });
});



export {router}