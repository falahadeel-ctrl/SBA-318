import express from 'express';

const router = express.Router();
router.route('/')
.post((req, res) => {
    if (!name){
        return res.status(400)
    }
    else {
        db.push("i actually got no name");
    }
    res.json(db.user);
})
.get( (req, res) => {
    res.json(db.user);
});

router.route("/:id")

.put( (req, res) => {
    console.log(req.params.id);
    res.send("update");
})
.delete( (req, res) => {
    res.send("delete")
});

export default router;