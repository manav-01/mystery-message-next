### **Project Name**: True Feedback - Anonymous Message Platform

#### **Project Motto**:
"Unfiltered, Anonymous, True Feedback."

---

### **Project Description**:
True Feedback is an anonymous messaging platform designed to provide users with honest, anonymous feedback. Users can register to receive a unique URL, which they can share with others. Anyone with this URL can send feedback anonymously, encouraging open and honest communication. With a user-friendly toggle option, registered users can control when they’re available to respond to messages, ensuring feedback is manageable and timely. Built with Next.js, Mongoose, Next-Auth, and Radix UI components, this project emphasizes simplicity, security, and an intuitive user experience.

---


# True Feedback - Anonymous Messaging Platform

## Description
True Feedback is a Next.js-based platform enabling anonymous feedback exchange. Registered users are given a unique link that allows others to send them messages anonymously, making it ideal for feedback, suggestions, or open communication. Users can toggle message reception on and off, retaining control over when they’re open to receiving feedback. The app focuses on creating a seamless, secure, and user-friendly experience.

## Features
- **Anonymous Feedback**: Anyone with a user’s unique URL can send feedback anonymously.
- **Toggle Visibility**: Users can control message reception by toggling an option to activate or deactivate their feedback link.
- **Secure Authentication**: Next-Auth is used to secure user accounts and ensure data privacy.
- **Customizable Notifications**: Users are notified of incoming messages and can choose to respond.
- **Responsive UI**: Built with Radix UI and TailwindCSS, offering a smooth and responsive interface across devices.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/manav-01/true-feedback.git
   cd true-feedback
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=your_mongo_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

   The app will be accessible at `http://localhost:3000`.

## Tech Stack
- **Next.js**: Application framework
- **React**: Front-end library
- **Mongoose**: MongoDB ORM
- **Next-Auth**: User authentication
- **Radix UI**: UI components
- **React Hook Form**: For streamlined form management
- **TailwindCSS**: Custom styling
- **TinyMCE**: Optional rich text for user responses
- **Zod**: Schema validation
- **Resend**: Email notifications

## Usage

1. **Sign Up**: Register to receive your unique URL.
2. **Share URL**: Share your unique URL with others to receive anonymous feedback.
3. **Control Feedback**: Use the toggle button to activate or deactivate message reception as desired.
4. **Manage Messages**: View messages from your account dashboard and respond as necessary.

## Contribution
We welcome contributions! Please fork the repo, create a branch for your feature, and submit a pull request. Contributions to improve security, features, and UI are particularly welcome.

## License
This project is open-source and available under the MIT License.
