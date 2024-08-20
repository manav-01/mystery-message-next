import { resend } from "@/lib/resend"
import VerifyCationEmail from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        // send email
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery message || Verification code',
            react: VerifyCationEmail({ username, otp: verifyCode }),
        });

        return { success: true, message: "verification email send successfully" }
    } catch (EmailError) {
        console.error("Error sending verification Email");
        return { success: false, message: "Failed to send verification email" }
    }
}
