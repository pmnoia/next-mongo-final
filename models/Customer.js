import mongoose, { mongo } from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    memberNum: { type: Number, required: true },
    interests: { type: String, required: true }
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;