import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Connecting to the database
    await connectDB();

    // Checking if the store already exists with either email or phone number
    const user = await User.findOne({
      username,
    });

    if (user) {
      if (user.password !== password) {
        return NextResponse.json({
          success: false,
          message: "Invalid Credentials",
          error: "Invalid Credentials",
        });
      }
      const token = jwt.sign(
        { id: user._id, username: user.user },
        process.env.SECRET_KEY
      );
      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user_token: token,
        user,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "An error occurred while logging in the user",
    });
  }
}
