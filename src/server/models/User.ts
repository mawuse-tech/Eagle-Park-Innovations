import 'server-only';
import bcrypt from 'bcryptjs';
import mongoose, { type HydratedDocument, type Model, Schema } from 'mongoose';
import type { AuthUser, UserRole } from '../../types/auth';

export interface UserFields {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
interface UserMethods { comparePassword(password: string): Promise<boolean>; }
type UserModel = Model<UserFields, object, UserMethods>;
export type UserDocument = HydratedDocument<UserFields, UserMethods>;

const schema = new Schema<UserFields, UserModel, UserMethods>({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: [8, 'Password must be at least 8 characters long'], select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  timestamps: true,
  toJSON: { transform: (_document, returnedObject) => { Reflect.deleteProperty(returnedObject, 'password'); return returnedObject; } },
});
schema.pre('save', async function () {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);
});
schema.methods.comparePassword = function (password: string) { return bcrypt.compare(password, this.password); };
export const User = (mongoose.models.User as UserModel | undefined) ?? mongoose.model<UserFields, UserModel>('User', schema);
export function safeUser(user: UserDocument): AuthUser {
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}
