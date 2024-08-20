/*
import { google } from '@ai-sdk/google';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, StreamingTextResponse, streamText } from 'ai';
import { Settings } from 'lucide-react';
import { text } from 'stream/consumers';
import { GoogleGenerativeAIStream } from "ai";

export async function POST(req: Request) {
    try {

        console.log("\n\n\n HOLLA \n");
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);

        const google = createGoogleGenerativeAI({
            // custom settings
            baseURL: "https://generativelanguage.googleapis.com/v1beta",
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,

        });

        // # Create the model
        const generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const result = await generateText({
            model: google('models/gemini-1.5-flash-latest', { topK: 64, }),
            prompt: prompt
        })

        // const result = await streamText({
        //     model: google('models/gemini-1.5-flash-latest', { topK: 64, }),
        //     prompt: prompt
        // })
        // console.log(text);
        // GoogleGenerativeAIStream(result);
        return (result);

    } catch (error) {

    }
}

*/











/**
 * ! Open AI

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            max_tokens: 400,
            stream: true,
            prompt,
        });

        const stream = OpenAIStream(response);


        return new StreamingTextResponse(stream);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            // OpenAI API error handling
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            // General error handling
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}
 */