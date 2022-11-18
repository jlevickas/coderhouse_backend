import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
},{_id: false});

userSchema.methods.comparePassword = async function (password) {
    const user = this;

    return await bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

export default User;