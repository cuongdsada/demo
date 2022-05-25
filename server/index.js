const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "01092001",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", ( req, res)=> {
    const sqlGet =" SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
})

app.post("/api/post", (req,res)=>{
    console.log(req.body);
    const{name, email, contact}= req.body;
    const sqlInsert =  " INSERT INTO contact_db (name, email, contact ) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error){
            console.log(error);
        }
    });
    return res.status(200).json({ success: true});
});

app.delete("/api/remove/:id", (req,res)=>{
    const{ id }= req.params;
    const sqlRemove =  " DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id", ( req, res)=> {
    const {id} =req.params;
    const sqlGet =" SELECT * FROM contact_db where id= ?";
    db.query(sqlGet,id, (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/put/:id", ( req, res)=> {
    const {id} =req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate =" UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id= ?";
    db.query(sqlGet, [name, email, contact, id], (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})



app.get("/", (req, res)  => {
    // const sqlInsert =
    // " INSERT INTO contact_db (name, email, contact ) VALUES ('Cuong', 'mqcuong@gmail.com', 123456)";
    // db.query (sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send(" Hello Cuong");
    // });
   
});

app.listen(5000,()=> {
    console.log("Server is running on port 5000");
})