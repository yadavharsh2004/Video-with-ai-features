import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// get data from frontend 
// validate
// existing user check 
// create user in Db 
// return success response 

export async function POST(request: NextRequest) {
    try {
        const {email ,password} = await request.json();

        if(!email || !password) {
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }
        
        await connectToDatabase();
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User alreasy registered"},
                {status: 400}
            )
        }

        await User.create({email, password});

        return NextResponse.json(
            {message: "User registeration successful"},
            {status: 200}
        )
    }
     catch (error) {
        console.log("Registration error: ", error);
          return NextResponse.json(
            {error: "Failed to register user"},
            {status: 400}
        )
    }
}