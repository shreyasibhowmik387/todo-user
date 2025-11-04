import mongoose from "mongoose";
import dotenv from 'dotenv/config'

// const url = "mongodb+srv://ayush:ayush@cluster0.o2hwnuh.mongodb.net/"

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.URL)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("Not Connected", error);       
    }
}