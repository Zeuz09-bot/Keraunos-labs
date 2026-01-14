import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

interface CheckoutRequest {
    email: string;
    amount: number; // Amount in kobo (₦1 = 100 kobo)
    packageName: string;
    callbackUrl?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: CheckoutRequest = await request.json();
        const { email, amount, packageName, callbackUrl } = body;

        if (!email || !amount || !packageName) {
            return NextResponse.json(
                { error: "Missing required fields: email, amount, packageName" },
                { status: 400 }
            );
        }

        if (!PAYSTACK_SECRET_KEY) {
            return NextResponse.json(
                { error: "Payment configuration error" },
                { status: 500 }
            );
        }

        // Initialize Paystack transaction
        const response = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    amount, // Amount in kobo
                    currency: "NGN",
                    callback_url: callbackUrl || `${request.nextUrl.origin}/success`,
                    metadata: {
                        package_name: packageName,
                        custom_fields: [
                            {
                                display_name: "Package",
                                variable_name: "package",
                                value: packageName,
                            },
                        ],
                    },
                }),
            }
        );

        const data = await response.json();

        if (!data.status) {
            return NextResponse.json(
                { error: data.message || "Failed to initialize payment" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            authorization_url: data.data.authorization_url,
            access_code: data.data.access_code,
            reference: data.data.reference,
        });
    } catch (error) {
        console.error("Paystack checkout error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
