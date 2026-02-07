import express from 'express';

const router = express.Router();
router.route('/')
.post((req, res) => {
    res.send('testing')
})
.get( (req, res) => {
    res.send("read")
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