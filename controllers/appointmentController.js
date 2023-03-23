const { Appointment, Treatment, Dentist, Pacient } = require("../models");

const appointmentController = {};

//Function for appointment create

appointmentController.createAppointment = async (req, res) => {

    try {
        const {pacient_id,dentist_id,treatment_id,status,observations,date} = req.body;

        const newAppointment = {
            pacient_id : pacient_id,
            dentist_id: dentist_id,
            treatment_id : treatment_id,
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
    
    attributes: ['pacient_id', 'dentist_id', "treatment_id", "status"]
  });
  res.status(200).json({
    message: `These are all the appointment in the calendar`,
    citasActivas,
  });
}

//function to display the appointments the user has

appointmentController.getAppointmentById = async (req, res) => {
    try {
        const userId = req.userId;

        // I search the Patients table for the record corresponding to the token's userId.
        const paciente = await Pacient.findOne({ where: { user_id: userId } });
    
        if (!paciente) {

          // If a record is not found in Patients, I return an error message.
          return res.status(404).json({ message: "No patients were found associated with this user"});
        }
    
        // If I find a record in Patients, I get its pacient_id
        const pacientId = paciente.id;
    
      const appointments = await Appointment.findAll({
        where: {
          pacient_id: pacientId,
        },
        include: [
          Treatment,
          {
            model: Treatment,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Pacient,
            attributes: {
              exclude: ['user_id', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Dentist,
            attributes: {
              exclude: ['user_id', 'registration_number', 'createdAt', 'updatedAt'],
            },
          },
        ],
        attributes: {
          exclude: ['pacient_id', 'dentist_id', 'treatment_id', 'createdAt', 'updatedAt'],
        },
      });
  
      res.json(appointments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

//Function for Appointment modify 

appointmentController.putAppointmentById = async (req, res) =>{

    try{
        const userId = req.userId;
        const appointmentId = req.params.id
        

        const paciente = await Pacient.findOne({ where: { user_id: userId } });
        
        if (!paciente) {

          // If a patient record is not found in appointment, I return an error message.
          return res.status(404).json({ message: "No patient found associated with this user"});
        }

        const pacientId = paciente.id;
        
        const {date} = req.body;

        const updateAppointment = await Appointment.update({date:date},{where: {id: appointmentId, pacient_id:pacientId}})

        return res.json(updateAppointment)

    }catch(error){

        return res.status(500).send(error.message)
    }
};

//Function for appointment delete

appointmentController.deleteAppointmentById = async(req, res) => {

    try{

        const userId = req.userId;

        const paciente = await Pacient.findOne({ where: { user_id: userId } });
    
        if (!paciente) {

          // If a patient record is not found in appointment, I return an error message.
          return res.status(404).json({ message: "No patient found associated with this user"});
        }

        const pacientId = paciente.id;
    
        const deleteAppointment = await Appointment.destroy({where: { pacient_id:pacientId}})

        return res.json(deleteAppointment);

    }catch(error){

        return res.status(500).send(error.message)
    }
};

module.exports =  appointmentController
