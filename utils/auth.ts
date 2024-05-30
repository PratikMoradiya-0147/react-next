import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

};

export const comparePassword = async (password: string, hash: string) => {
    console.log('password :>> ', password);
    console.log('hash :>> ', hash);
    return await bcrypt.compare(password, hash);
};

export const generateToken = (user: any) => {
    return jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: '1d'});
}
