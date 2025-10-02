import Customer from "@/models/Customer";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const customer = await Customer.findById(id);
        
        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }
        
        return NextResponse.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        return NextResponse.json({ 
            error: "Failed to fetch customer",
            details: error.message 
        }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await request.json();
        
        console.log('PUT request for customer ID:', id);
        console.log('Update data:', body);
        
        const customer = await Customer.findByIdAndUpdate(id, body, { 
            new: true,
            runValidators: true 
        });
        
        if (!customer) {
            console.log('Customer not found with ID:', id);
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }
        
        console.log('Customer updated successfully:', customer);
        return NextResponse.json(customer);
    } catch (error) {
        console.error('Error updating customer:', error);
        return NextResponse.json({ 
            error: "Failed to update customer", 
            details: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        
        console.log('DELETE request for customer ID:', id);
        
        const customer = await Customer.findByIdAndDelete(id);
        
        if (!customer) {
            console.log('Customer not found with ID:', id);
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }
    
        console.log('Customer deleted successfully:', customer);
        return NextResponse.json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error('Error deleting customer:', error);
        return NextResponse.json({ 
            error: "Failed to delete customer",
            details: error.message 
        }, { status: 500 });
    }
}