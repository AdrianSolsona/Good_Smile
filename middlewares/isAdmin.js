const isAdmin = (req, res, next) => {
    try {
        //if the user_id is not 1, you are not a admin and you will not be able to login
        if (req.rolId !==1 ){

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
module.exports = isAdmin;