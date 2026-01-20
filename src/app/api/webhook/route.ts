import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

interface PaystackEvent {
    event: string;
    data: {
        id: number;
        reference: string;
        amount: number;
        currency: string;
        status: string;
        customer: {
            email: string;
            customer_code: string;
        };
        metadata: {
            package_name?: string;
            custom_fields?: Array<{
                display_name: string;
                variable_name: string;
                value: string;
            }>;
        };
        paid_at: string;
        channel: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature");

        // Verify webhook signature
        if (!PAYSTACK_SECRET_KEY || !signature) {
            console.error("Missing secret key or signature");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const hash = crypto
            .createHmac("sha512", PAYSTACK_SECRET_KEY)
            .update(body)
            .digest("hex");

        if (hash !== signature) {
            console.error("Invalid signature");
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        const event: PaystackEvent = JSON.parse(body);

        // Handle different event types
        switch (event.event) {
            case "charge.success":
                // Payment was successful
                console.log("✅ Payment successful:", {
                    reference: event.data.reference,
                    amount: event.data.amount / 100, // Convert from kobo to Naira
                    email: event.data.customer.email,
                    package: event.data.metadata?.package_name,
                    paidAt: event.data.paid_at,
                });

                // TODO: Add your business logic here
                // - Send confirmation email
                // - Update database
                // - Provision services
                // - Send notification to admin

                break;

            case "charge.failed":
                console.log("❌ Payment failed:", {
                    reference: event.data.reference,
                    email: event.data.customer.email,
                });
                break;

            case "transfer.success":
                console.log("💸 Transfer successful:", event.data);
                break;

            case "transfer.failed":
                console.log("💸 Transfer failed:", event.data);
                break;

            default:
                console.log("📌 Unhandled event:", event.event);
        }

        // Acknowledge receipt of webhook
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
