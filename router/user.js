import express from 'express';
import { user } from '../db.js';

const router = express.Router();

router.route('/')
.post((req, res) => {
    const name = req.body.name;
    const email =req.body.email;

//  const {name, email } =req.body;

    if (!name){
        return res.status(400).json({error:"name required"});
    }
    
    const newUser = {
        id: user.length + 1, 
        name: name,
        email: email || "" 
    };
   
    user.push(newUser); 

    res.status(201).json(newUser); 

})

//filtering
.get( (req, res) => {
    let result = user;
    if (req.query.name) {
        result = user.filter(u => u.name.includes(req.query.name)); //filters onyl based on name cuz of req.query.name
    }
    res.json(result);
});
//     router.get("/:id/home",)
//     let category = req.params.cat;

//     let filteredData = db.filter((todo) => todo.category == category);
//     res.json({filteredData});
// });

router.route("/:id")

.put( (req, res) => {
    let id = parseInt(req.params.id);

    // const userIndex = db.users.findIndex(user => user.id === id);

    let updated = user.find( function (u){  // u is the object in array
        if(u.id === id){
            let keys =Object.keys(req.body);
            for (let i=0;i<keys.length;i++){

                u[keys[i]]=req.body[keys[i]];
            }
            return true;
        }
    });

    if(updated){
        res.json(updated);
    }else{
        res.status(404).json({error:"not found"});
    }
})
.delete( (req, res) => {
    let id = parseInt(req.params.id);

    // let deleted= u.find(function(user,i){
    //     if(user.id == id) {
    //         return db.splice(i,1);

    //     }
    // });

    let index = user.findIndex(function(u){ 
        return u.id === id; 
    });

    if (index !==-1){
       let deleted = user.splice(index, 1)[0];
        res.json(deleted);
    }else{
        res.status(400).json({ error: "Not found" });
    }
});

export default router;