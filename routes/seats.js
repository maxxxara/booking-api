import  express  from "express";
import { db } from "../connect.js";

const router = express.Router();


router.get('/all/:c_id', (req, res) => {
    let c_id = req.params.c_id;
    const q = `SELECT * FROM seats WHERE calendar_id=${c_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send("Ver moidzebna")
        try {
            let b = data[0].taken.split(',').map(function(item) {
                return parseInt(item, 10);
            });
            let d = {
                id: data[0].id,
                calendar_id: data[0].calendar_id,
                taken: b,
                created_at: data[0].created_at
            }
            return res.status(200).json(d)
        } catch {
            return res.status(500).json("Ver Moidzebna")
        }
    })
})

router.post('/new/:c_id', (req, res) => {
    let takenArray = []; 
    const c_id = req.params.c_id;
    const sel = req.body.selected;
    const q = `SELECT * FROM seats WHERE calendar_id=${c_id}`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).json("Ver moidzebna")
        takenArray = data[0].taken.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        let selected = [...new Set(sel)];
        takenArray.map((curr, i) => {
            selected.map(sellCurr => {
                if(i == sellCurr) takenArray[i] = 1
            })
        })
        let str = takenArray.toString();
        data[0].taken = str;
        const que = `UPDATE seats SET taken='${str}' WHERE calendar_id=${c_id}`;
        db.query(que, (err, data) => {
            if(err) {return res.status(505).json("Ar Ganaxlda")}
            return res.status(200).json(data);
        })
    })
})


function getToken(length) {
   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}

router.post('/buy', (req, res) => {
    const q = "INSERT INTO sells (`calendar_id`, `token`, `name`, `surname`, `payed`, `selected`) VALUES (?)";
    const token = getToken(10) + req.body.c_id
    const values = [req.body.c_id, token, req.body.name, req.body.surname, req.body.payed, req.body.selected];
    db.query(q, [values], (err, data) => {
        if(err) return res.status(505).send(err)
        return res.status(200).json(token)
    })
})

router.get('/getsell/:token', (req, res) => {
    const token = req.params.token; 
    const q = `SELECT *, sells.id AS s_id, sells.created_at AS buy_time FROM sells INNER JOIN calendar ON sells.calendar_id=calendar.id INNER JOIN movies ON calendar.movie_id=movies.id WHERE sells.token = '${token}'`;
    db.query(q, (err, data) => {
        if(err) return res.status(505).send("Ver Moidzebna")
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
        data.map(item => {
            let date = item.buy_time.toUTCString()
            let time = date.slice(17, 22);
            let h = parseInt(time.slice(0, 2)) + 4;
            let m = date.slice(22, 25)
            time = h + m
            date = date.slice(0, 17) + time;
            item.but_time = date
        })
        // !!! drois formatis shecvla
        return res.status(200).json(data[0])
    })
})



export default router;