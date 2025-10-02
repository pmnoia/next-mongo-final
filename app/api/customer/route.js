import Customer from "@/models/Customer";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request) {
    try {
        await dbConnect();
        const customers = await Customer.find();
        console.log("Customer route success!")
        return NextResponse.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ 
            error: "Failed to fetch customers",
            details: error.message 
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        console.log('POST request body:', body);
        const customer = new Customer(body);
        await customer.save();
        console.log('Customer created successfully:', customer);
        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json({ 
            error: "Failed to create customer",
            details: error.message 
        }, { status: 500 });
    }
}

