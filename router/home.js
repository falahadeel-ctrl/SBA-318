import express from 'express';
import { home} from '../db.js';

const router = express.Router();

router.route('/')
.post((req, res) => {
    const address = req.body.address;
    const mail =req.body.mail;


    if (!address){
        return res.status(400).json({error:"address required"});
    }

    else {
    const newhome = {
        id: home.length + 1, 
        address: address,
        mail: mail || "" ,
        subdivision: req.body.subdivision || ""
    };
   
    home.push(newhome); 
}
    res.status(201).json(newhome); 

})
.get( (req, res) => {
    let result = home;
    if (req.query.address) {
        result = home.filter(u => u.address.includes(req.query.address));
    }
    res.json(result);
});

router.route("/:id")

.put( (req, res) => {
    let id = parseInt(req.params.id);


    let updated = home.find( function (u){
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


    let index = home.findIndex(function(u){ 
        return u.id === id; 
    });

    if (index !==-1){
       let deleted = home.splice(index, 1)[0];
        res.json(deleted);
    }else{
        res.status(404).json({ error: "Not found" });
    }
});

export default router;