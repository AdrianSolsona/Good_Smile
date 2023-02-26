const express = require('express');
const db = require('./db/db.js');
const {Rol} = require ("./models/index");
const {User} = require ("./models/index");
const {Dentist} = require ("./models/index");
const {Speciality} = require ("./models/index");
const app = express();


app.use(express.json());

const PORT = 3000;

app.get("/rols", (req,res) =>{
    return res.send("Welcome to the aplication")
});

app.post("/rols", async (req,res) =>{

    const { privilege } = req.body;

    const newRol = {
        privilege: privilege
    }

    // Guardar la informacion
    const rol = await Rol.create(newRol)

    return res.json(rol)

});

app.get("/users", (req,res) =>{
    return res.send("Welcome to the app")
});

app.post("/users", async (req,res) =>{

    const { date } = req.body;

    const newUser = {
        date : date
    }

    // Guardar la informacion
    const user = await User.create(newUser)

    return res.json(user)

});

app.get("/dentists", (req,res) =>{
    return res.send("Welcome dentist")
});

app.post("/dentists", async (req,res) =>{

    const { name, surname, email, address,registration_number,phone } = req.body;

    const newDentist = {
        name : name,
        surname : surname,
        email : email,
        address : address,
        registration_number : registration_number,
        phone : phone
    }

    // Guardar la informacion
    const dentist = await Dentist.create(newDentist)

    return res.json(dentist)

});



app.put("/dentists/:id", async (req, res) =>{
    const dentistId = req.params.id
    const name = req.body.name
    const updateDentist = await Dentist.update({name:name}, {where:{id:dentistId}})
    return res.json(updateDentist)
})

app.get("/Specialities", (req,res) =>{
    return res.send("Your Specialities is")
});

app.post("/Specialities", async (req,res) =>{

    const { name, description} = req.body;

    const newSpeciality = {
        name : name,
       description : description
    }

    // Guardar la informacion
    const speciality = await Speciality.create(newSpeciality)

    return res.json(speciality)

});









// Starting server
app.listen(PORT, () => console.log("Server on port " + PORT));


