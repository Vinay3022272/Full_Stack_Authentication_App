import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token from mail: ", token);

    // finding user based on token( verify token)
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    console.log("User fetched via email token:", user);

    (user.isVerified = true),
      (user.verifyToken = undefined),
      (user.verifyTokenExpiry = undefined);

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
