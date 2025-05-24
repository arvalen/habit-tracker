import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User from "@/app/Models/UserSchema";
import connectToDB from "@/app/lib/connectToDB";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.SVIX_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add a SVIX_WEBHOOK_SECRET environment variable");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            svix_id,
            svix_timestamp,
            svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.log("Error verifying webhook: ", err);
        return new Response("Error occurred", {
            status: 400,
        });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses } = evt.data;

        const newUser = {
            clerkUserId: id,
            EmailAddress: email_addresses[0].email_address,
        };

        console.log(newUser);

        try {
            await connectToDB();
            await User.create(newUser);
            console.log("User created");
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    }

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log("Webhook body: ", body);

    return new Response("", { status: 200 });
}
