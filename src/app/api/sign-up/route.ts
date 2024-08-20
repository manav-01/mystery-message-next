import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    // DB Connection
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        // check if user already existed or not and also it verified or not?
        const existingVerifiedUserByUsername = await UserModel.findOne({ username, isVerified: true });

        // if user already registered with this username and also he is verified
        if (existingVerifiedUserByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken",
            },
                {
                    status: 400
                }
            );
        }

        // if user not neither exist nor verified

        const existingUserByEmail = await UserModel.findOne({ email });
        // make verified code;
        let verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Verified code is: ", verifiedCode);

        // step 1: if user is exist
        if (existingUserByEmail) {
            // if  user also verified return 400 error
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email",
                },
                    {
                        status: 400
                    });
            } else {
                // if user is existed but not verified
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifiedCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            // if user is not exist
            // then create new User
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            // make user model
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifiedCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })

            // save model in DB
            await newUser.save();
        }

        // in above code we cover all possibilities.
        // Now, Let's send email verification
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifiedCode
        );

        // get error in Email response
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message || "get Error in Email sending",
                },
                { status: 500 }
            );
        }

        // if successfully send email then

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }

}
