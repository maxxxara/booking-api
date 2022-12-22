import  express  from "express";
import { db } from "../connect.js";

const router = express.Router();

router.post('/new', (req, res) => {
    const token = req.body.token;
    const message = req.body.message;
    const author = req.body.author;
    const q = "INSERT INTO chat (`token`, `message`, `author`) VALUES (?)";
    const values = [token, message, author];
    db.query(q, [values], (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/all/:token', (req, res) => {
    const token = req.params.token;
    const q = `SELECT * FROM chat WHERE token='${token}'`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        console.log(data);
        // drois formatis shecvla
        data.map(item => {
            let date = new Date(item.created_at)
            date.setHours(date.getHours() + 4);
            date = date.toUTCString()
            item.created_at = date
        })
        // !!! drois formatis shecvla
        return res.status(200).json(data)
    })
})

export default router;