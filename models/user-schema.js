import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    },
    username: {
        type: String,
        required: true,
        match: /^[A-Za-z][A-Za-z0-9-_]+$/,
        minLength: 3,
        maxLength: 15
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64
    }
});
userSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});
export default mongoose.model('user', userSchema);