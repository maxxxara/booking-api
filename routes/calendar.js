import  express  from "express";
import { db } from "../connect.js";

const router = express.Router();

router.post('/new', (req, res) => {
    const q = "INSERT INTO calendar (`movie_id`, `start_time`, `price`) VALUES (?)";
    const values = [req.body.movie_id, req.body.start_time, req.body.price];
    db.query(q, [values], (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/all', (req, res) => {
    const q = "SELECT calendar.id, calendar.start_time, calendar.price, movies.title, movies.id AS m_id, movies.description, movies.image FROM calendar INNER JOIN movies ON calendar.movie_id = movies.id";
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

router.get('/single/:id', (req, res) => {
    const c_id = req.params.id;
    const q = `SELECT calendar.id, calendar.price, calendar.start_time, movies.id AS movie_id, movies.title FROM calendar INNER JOIN movies ON calendar.movie_id = movies.id WHERE calendar.id=${c_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        // drois formatis shecvla
        data.map(item => {
            let date = item.start_time.toUTCString()
            let time = date.slice(17, 22);
            let h = parseInt(time.slice(0, 2)) + 4;
            let m = date.slice(22, 25)
            time = h + m
            date = date.slice(0, 17) + time;
            item.start_time = date
        })
        // !!! drois formatis shecvla
        return res.status(200).json(data)
    })
})

router.get('/dates/:id', (req, res) => {
    const m_id = req.params.id;
    const q = `SELECT * FROM calendar WHERE movie_id=${m_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        // drois formatis shecvla
        data.map(item => {
            let date = item.start_time.toUTCString()
            let time = date.slice(17, 22);
            let h = parseInt(time.slice(0, 2)) + 4;
            let m = date.slice(22, 25)
            time = h + m
            date = date.slice(0, 17) + time;
            item.start_time = date
        })
        // !!! drois formatis shecvla
        return res.status(200).json(data)
    })
})


router.get('/category/:c_id', (req, res) => {
    const c_id = req.params.c_id;
    const q = `SELECT calendar.id, calendar.start_time, calendar.price, movies.title, movies.description, movies.image, movies.id AS m_id, movies.category_id FROM calendar INNER JOIN movies ON calendar.movie_id = movies.id WHERE category_id = ${c_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(data)
    })
})

export default router;