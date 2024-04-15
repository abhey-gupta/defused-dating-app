import User from "@/models/User";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { name, username, gender, state, personality, hobbies, password } =
      await req.json();

    // Connecting to the database
    await connectDB();

    const user = await User.findOne({
      username,
    });

    if (!user) {
      const user = await User.create({
        name,
        username,
        gender,
        state,
        personality,
        hobbies,
        password,
      });
      const token = jwt.sign(
        { id: user._id, username: user.user },
        process.env.SECRET_KEY
      );
      return NextResponse.json({
        success: true,
        message: "Registered successfully",
        user_token: token,
        user,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Username already exists",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "An error occurred while registering the user",
    });
  }
}
