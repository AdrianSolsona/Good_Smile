const isDentist = (req, res, next) => {
    try {
     
        //if the user_id is not 2, you are not a dentist and you will not be able to login
        if (req.rolId !==2 ){
            return res.status(500).json({
                        success: true,
                        message: "You don't have permissions.",
                      });
        }
        next();
        //Pick up the possible error
    } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Something went wrong",
              error: error.message,
            });
    }
}

module.exports = isDentist;





// const { Dentist } = require("../models");

// const isDentist = async (req, res, next) => {
//   try {
//     const dentist = await Dentist.findOne({
//       where: { userId: req.userId },
//     });

//     if (!Dentist) {
//       
//     }

//     req.dentistId = dentist.id;

//     next();

// } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// module.exports = isDentist;