import  express  from "express";
import { db } from "../connect.js";

const router = express.Router();

router.post('/new', (req, res) => {
    const q = "INSERT INTO movies (`title`, `description`, `image`, `category`) VALUES (?)";
    const values = [req.body.title, req.body.description, req.body.image, req.body.category];
    db.query(q, [values], (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/all', (req, res) => {
    const q = "SELECT * FROM movies";
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/single/:id', (req, res) => {
    const m_id = req.params.id;
    const q = `SELECT * FROM movies WHERE id=${m_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/filter', (req, res) => { // /filter?max=5
    const max = req.query.max;
    const q = `SELECT * FROM movies LIMIT ${max}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})
router.get('/newest', (req, res) => { // /filter?max=5
    const max = req.query.max ? req.query.max : 2;
    const q = `SELECT calendar.id, calendar.start_time, movies.title, movies.image, movies.category, movies.id AS m_id, movies.description, movies.image FROM calendar INNER JOIN movies ON calendar.movie_id = movies.id ORDER BY start_time DESC LIMIT ${max}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})



router.get('/category', (req, res) => {
    const c = req.query.c;
    const q = `SELECT * FROM movies WHERE category='${c}'`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send("Ver Moidzebna")
        return res.status(200).json(data)
    })
})



export default router;