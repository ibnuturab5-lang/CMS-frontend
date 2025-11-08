import mongoose from "mongoose"

const connectDB=async () => {
    const url=process.env.MONGO
    if(url === undefined){
        console.error('MongoDB connection URL is not defined in env')
        process.exit(1)
    }
    try {
       await mongoose.connect(url ) 
    } catch (error) {
        console.log(`MondoDB Connection error`,error)
        process.exit(1)
    }
}
export default connectDB