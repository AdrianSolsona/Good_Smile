const { Appointment, Treatment, Dentist, Pacient } = require("../models");

const appointmentController = {};

//Function for appointment create

appointmentController.createAppointment = async (req, res) => {

    try {
        const {pacient_id,dentist_id,treatment_id,hour,status,observations,date} = req.body;

        const newAppointment = {
            pacient_id : pacient_id,
            dentist_id: dentist_id,
            treatment_id : treatment_id,
            hour : hour,
            status : status,
            observations : observations,
            date : date
        }

        const appointment = await Appointment.create(newAppointment)

        return res.json(appointment)

    }catch(error){

        return res.status(500).send(error.message)
    }
};

//Function to display all appointments

appointmentController.getAppointment = async (req, res) => {

let citasActivas = await Appointment.findAll({
    
    attributes: ['pacient_id', 'dentist_id', "treatment_id", "hour", "status"]
  });
  res.status(200).json({
    message: `These are all the appointment in the calendar`,
    citasActivas,
  });
}

//Function to display the appointment by appointment id

appointmentController.getAppointmentById = async (req, res) => {


    try{

        const appointmentId = req.params.id;

        const appointment = await Appointment.findByPk(appointmentId,{
            
                include: [
                    Treatment,
                    {
                        model:Treatment,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                        },
                    {
                        model: Pacient,
                        attributes: {
                            exclude: ["user_id", "createdAt", "updatedAt"]
                        },
                    },
                    {
                        model: Dentist,
                        attributes: {
                            exclude: ["user_id","registration_number", "createdAt", "updatedAt"]
                        },
                        
                    },
                ],
                attributes: {
                    exclude: ["pacient_id", "dentist_id", "treatment_id", "createdAt", "updatedAt"]
                }
        })

        return res.json(appointment);

    }catch(error){
        return res.status(500).send(error.message)
    }
};

//Function for Appointment modify 

appointmentController.putAppointmentById = async (req, res) =>{

    try{

        const appointmentId = req.params.id

        const {hour,status,observations,date} = req.body;

        const updateAppointment = await Appointment.update({hour:hour,status:status,observations:observations,date:date}, {where:{id:appointmentId}})

        return res.json(updateAppointment)

    }catch(error){

        return res.status(500).send(error.message)
    }
};

//Function for appointment delete

appointmentController.deleteAppointmentById = async(req, res) => {

    try{

        const appointmentId = req.params.id
    
        const deleteAppointment = await Appointment.destroy({where: { id: appointmentId}})

        return res.json(deleteAppointment);

    }catch(error){

        return res.status(500).send(error.message)
    }
};

module.exports =  appointmentController