import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {type:String, required: true, trim:true},
    middleName: {type:String, required: true, trim: true},
    lastName: {type:String, required: true, trim: true},
    extName: {type:String, default: ""},
    email: {type:String, required: true, trim:true},
    password: {type:String, required: true},
    role: {type:String, enum: ['admin', 'superadmin', 'awaiting activation'], default: "awaiting activation"},
    org: {type:String, enum: ['vehicle', 'instrument', 'appliances', 'not assigned'], default: 'not assigned'}
}, {timestamps: true});


const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;