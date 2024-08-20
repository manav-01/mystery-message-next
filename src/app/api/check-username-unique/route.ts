import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

// make username query schema
const UsernameQuerySchema = z.object(
    {
        username: usernameValidation,
    }
);

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        // console.log("Request Url data", request.url);
        // console.log("\n searchParams data ", searchParams);
        // console.log("\n new URL data ", new URL(request.url));

        const queryParams = {
            username: searchParams.get('username'),
        };

        const result = UsernameQuerySchema.safeParse(queryParams);
        // console.log("Result:", result);

        if (!result.success) {
            // console.log("Result:", result.error.format());
            const usernameError = result.error.format().username?._errors || [];

            return Response.json(
                {
                    success: false,
                    message:
                        usernameError?.length > 0
                            ? usernameError.join(', ')
                            : 'Invalid query parameters',
                },
                {
                    status: 400
                }
            );
        }
        // validation completed now DB functionality check
        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });

        // NOTE: check your username is Lowercase or Uppercase or Capitalize formate 

        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Username is unique',
            },
            { status: 200 }
        );


    } catch (error) {
        console.error('Error checking username:', error);
        return Response.json(
            {
                success: false,
                message: 'Error checking username',
            },
            { status: 500 }
        );
    }
}