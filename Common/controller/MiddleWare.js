const checkInput = (req,res,next) => {

    const input = req.body;

    const isEmpty = Object.keys(input).length === 0;

    if (isEmpty) {
        res.status(400).json({
            status: "failure",
            message: "userDetails are empty"
        })
    } else {
        next();
    }


}

module.exports = {
    checkInput
}