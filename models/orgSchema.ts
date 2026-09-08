import mongoose from "mongoose";


const orgSchema = new mongoose.Schema({
    name: {type:String, required: true},
    type: {type:String, enum: ['vehicle', 'instruments', 'appliances'], default: ''},
    status: {type:String, enum: ['active', 'inactive'], default: "active"},
    admin: {type:mongoose.Schema.Types.ObjectId, default: "", ref: "users"}
}, {timestamps: true});


const orgModel = mongoose.models.organization || mongoose.model("organization", orgSchema);

export default orgModel