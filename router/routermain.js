import express from 'express';
import { user,home,interests } from '../db';

const router = express.Router();

router.route('/')
.post((req, res) => {

 const {name, email } =req.body;

    if (!name){
        return res.status(400).jason({error:"name required"});
    }

    const newUser = {
        id: db.users.length + 1, 
        name: name,
        email: email || "" 
    };
   
    db.users.push(newUser); 
    res.status(201).json(newUser); 

})
.get( (req, res) => {
    res.json(db.user);
    router.get("/:id/home",)
    let category = req.params.cat;

    let filteredData = db.filter((todo) => todo.category == category);
    res.json({filteredData});
});

router.route("/:id")

.put( (req, res) => {
    let id = parseInt(req.params.id);

    const userIndex = db.users.findIndex(user => user.id === id);

    let updated = db.find( function (user){
        if(user.id = id){
            for (let i=0;i<Key.length;i++){
                user[key]=req.body[key];
            }
            return true;
        }
    });
    if(updated){
        res.json({updated});
    }else{
        res.status(400).jason();
    }
})
.delete( (req, res) => {
    let id = req.params.id;

    let deleted= db.find(function(user,i){
        if(user.id == id) {
            return db.splice(i,1);

        }
    });

    if (deleted){
        res.json({deleted});
    }else{
        res.status(400).json();
    }
});

export default router;