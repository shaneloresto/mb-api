// import z from 'zod';
// // Data Schema for a New Message
// // matches (mostly) the one from the front-end App!
// const messageSchema = z.object({
//     text: z
//         .string()
//         .trim()
//         .min(3)
//         .max(30)
// });
// export default messageSchema;

import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    owner: {
        type: String,
        required: true,
        match: /^[A-Za-z][A-Za-z0-9-_]+$/,
        minLength: 3,
        maxLength: 15
    }
});
messageSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});
export default mongoose.model('message', messageSchema);