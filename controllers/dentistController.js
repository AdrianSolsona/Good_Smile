const { Dentist, Appointment, Speciality, Pacient, Treatment } = require("../models");

const dentistController = {};

//Function for dentist creation

dentistController.createDentist = async (req, res) => {

    try {
        const { user_id, speciality_id, registration_number } = req.body;

        const newDentist = {
            user_id : user_id,
            speciality_id : speciality_id,
            registration_number : registration_number,
        }

   const dentist = await Dentist.create(newDentist)

   return res.json(dentist)

}catch(error){

    return res.status(500).send(error.message)
}
};

//Function to display all dentists

dentistController.getDentist = async(req, res)=> {
    
    try{

        const dentist = await Dentist.findAll();

        return res.json(dentist);

    }catch(error){

    return res.status(500).send(error.message)
    }
};

//Function to display the dentist by dentist id

dentistController.getDentistById = async (req, res) => {

    try{

        const dentistId = req.params.id;

        const dentist = await Dentist.findByPk(dentistId,{

            include: [
                Appointment,
                {
                    model: Appointment,
                    attributes: {
                        exclude: ["pacient_id","dentist_id","treatment_id", "createdAt", "updatedAt"],
                    },
                    include:{
                        model: Pacient,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        },
                    },
                },
                {
                    model: Appointment,
                    attributes: {
                        exclude: ["pacient_id","dentist_id", "createdAt", "updatedAt"],
                    },
                    include:{
                        model: Treatment,
                        attributes: {
                            exclude: ["treatment_id","createdAt", "updatedAt"],
                            include:["name", "duration", "price", "session_num", "status"] 
                        },
                    },
                },
                Speciality,
                {
                    model: Speciality,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                }
            ],
            attributes: {
                exclude: ["user_id", "speciality_id", "createdAt", "updatedAt"]
            }
        })

        return res.json(dentist);

    }catch(error){

        return res.status(500).send(error.message)
    }
    };

//Function for Treatment modify    

dentistController.putDentistById = async (req, res) =>{

    try{

        const dentistId = req.params.id

        const { user_id,speciality_id,name, surname, email, address,registration_number,phone } = req.body;

        const updateDentist = await Dentist.update({user_id:user_id,speciality_id,name:name,surname:surname,email:email,address:address,registration_number:registration_number,phone:phone}, {where:{id:dentistId}})

        return res.json(updateDentist)

    }catch(error){

        return res.status(500).send(error.message)
    }
};

//Function for dentist delete

dentistController.deleteDentistsById = async (req, res) => {

    try{

        const dentistId = req.params.id
    
        const deleteDentist = await Dentist.destroy({where: { id: dentistId}})

        return res.json(deleteDentist);

    }catch(error){

        return res.status(500).send(error.message)
    }
};


module.exports =  dentistController