//  any request with prefix - /api/auth will comes here 


import express from 'express';
import {login, logout, signup} from '../controllers/auth.js';


const router = express.Router();




// router.get('/signup', (req,res) =>{
//     res.send('sign-up route ');
// });

// each arrow function will have a lot of code in it so we will again redirect that functionality to a controller 

router.post('/signup', signup);




router.post('/login', login);





router.post('/logout', logout);



export default router; 

