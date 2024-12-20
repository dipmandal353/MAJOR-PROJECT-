export const sendToken = (user, statusCode, res, message) => {
    // Getting the generated token
    const token = user.getJWTToken();
    

    // Set expiration for 10 days
    const expiresIn = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    const expirationDate = new Date(Date.now() + expiresIn);

    const options = {
        httpOnly: false,
        expires: expirationDate, // Use a Date object for expires
        httpOnly: true
    };

    // Setting cookie
    // res.status(statusCode).cookie("token", token, options).send({
    //     success: true,
    //     user,
    //     message,
    //     token,
    // });

    res.status(statusCode).cookie("token", token, options).send({
        success: true,
        user: {
            id: user._id,
            name : user.name,
            email: user.email,
            role: user.role, 
        },
        message,
        token,
    });
}
