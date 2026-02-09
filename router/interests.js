import express from 'express';
import { interests} from '../db.js';

const router = express.Router();

router.route('/')
.post((req, res) => {
    const books = req.body.books;
    const movie =req.body.movie;


    if (!books){
        return res.status(400).json({error:"books required"});
    }
    else {
    const newinterests = {
        id: interests.length + 1, 
        games: req.body.games || "",
        books: books,
        movie: movie || "" 
    };
   
    interests.push(newinterests); 
}
    res.status(201).json(newinterests); 

})
.get( (req, res) => {
    let result = interests;
    if (req.query.books) {
        result = interests.filter(u => u.books.includes(req.query.books));
    }
    res.json(result);
});

router.route("/:id")

.put( (req, res) => {
    let id = parseInt(req.params.id);


    let updated = interests.find( function (u){
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


    let index = interests.findIndex(function(u){ 
        return u.id === id; 
    });

    if (index !==-1){
       let deleted = interests.splice(index, 1)[0];
        res.json(deleted);
    }else{
        res.status(404).json({ error: "Not found" });
    }
});

export default router;