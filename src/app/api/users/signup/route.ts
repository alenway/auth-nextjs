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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
