const mongoose = require('mongoose');

const contactSchemaRules = {
    type: {
        type: String,
        required: true,
        default: 'Beneficiary'
    },
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String
    },
    createdAt: { 
        type: Date,
        default: Date.now()
    }
}

const ContactSchema = new mongoose.Schema(contactSchemaRules);

const ContactModel = mongoose.model("contactModel", ContactSchema);
module.exports = ContactModel;
