import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    //check if user is already exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User is already exists" },
        { status: 404 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPasswod = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      hashedPasswod,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User Created Successfully!",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
