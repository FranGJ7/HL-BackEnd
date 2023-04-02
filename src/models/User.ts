import { Schema, model, Types } from "mongoose";
import moment from 'moment';



export interface IUser {
     name: string;
     email: string;
     password: string;
     confirmPassword: string;
     createdAt: String
     updateAt: String
     organization: Types.ObjectId;
}


const userSchema = new Schema<IUser>({
     name: {
          type: String,
          required: true 
     },
     email: {
          type: String,
          unique: true,
          required: true 
     },
     password: {
          type: String,
          minlength: 6, 
          maxlength: 60,
          required: true 
     },
     confirmPassword: {
          type: String,
          minlength: 6,
          maxlength: 60,
          required: true 
     },
     createdAt: {
          type: String, 
          default: moment().toDate()
      },
      updateAt: {
          type: String, 
          default: moment().toDate()
      }
});


export const User = model<IUser>('User', userSchema)



