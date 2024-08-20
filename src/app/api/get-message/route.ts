import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";
import { User } from "next-auth"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;


    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(_user._id);
    console.log(userId)
    try {
        const user = await UserModel.aggregate(
            [
                { $match: { _id: userId } },
                { $unwind: { path: "$message", preserveNullAndEmptyArrays: true } }, // Handle documents with empty or missing `message`
                { $sort: { 'message.createdAt': -1 } },
                {
                    $group: {
                        _id: '$_id',
                        message: {
                            $push: '$message'
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        message: {
                            $cond: {
                                if: { $eq: [{ $size: '$message' }, 1] },
                                then: {
                                    $cond: {
                                        if: { $eq: [{ $first: '$message' }, null] },
                                        then: [],
                                        else: '$message'
                                    }
                                },
                                else: '$message'
                            }
                        }
                    }
                }
            ]

        );

        if (!user || user.length === 0) {

            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }

        return Response.json(
            { messages: user[0].message },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}


/* old Logic
 const user = await UserModel.aggregate(
            [
                { $match: { _id: userId } },
                { $unwind: "$message" },
                { $sort: { 'message.createdAt': -1 } },
                { $group: { _id: '$_id', message: { $push: '$message' } } }
            ]
        );
*/