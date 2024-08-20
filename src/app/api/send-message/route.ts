import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import { Message } from "@/models/user.model";

export async function POST(request: Request) {
    await dbConnect();
    const { username, content } = await request.json();
    // console.log("Send message Section", username, content);
    try {
        const user = await UserModel.findOne(
            { username }
        ).exec();

        // console.log(user);

        if (!user) {
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }

        // Check if the user is accepting messages
        if (!user.isAcceptingMessage) {
            return Response.json(
                { message: 'User is not accepting messages', success: false },
                { status: 403 } // 403 Forbidden status
            );
        }

        const newMessage = { content, createdAt: new Date() } as Message;
        // console.log("new Message ", newMessage)
        // Push the new message to the user's messages array
        user.message.push(newMessage as Message);
        await user.save();

        return Response.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error adding message:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}