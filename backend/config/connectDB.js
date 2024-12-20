import mongoose from 'mongoose'

//connection method
const connection = async () => {
    try{
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`connected to ${process.env.MONGODB_URL}`);
    }catch(error){
        console.log("Error connecting to mongodb:",error.message);
        process.exit(1);
    }
}

export default connection
