import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email.trim() || !password.trim()) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    // check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }

    // check password validity
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Password is invalid " },
        { status: 400 }
      );
    }

    // token creation
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successsful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
