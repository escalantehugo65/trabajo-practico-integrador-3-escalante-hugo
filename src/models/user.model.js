import { Schema, model } from 'mongoose';


const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minLength: [2, 'Mínimo 2 caracteres'],
      maxLength: [50, 'Máximo 50 caracteres']
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
      minLength: [2, 'Mínimo 2 caracteres'],
      maxLength: [50, 'Máximo 50 caracteres']
    },
    birthDate: {
      type: Date,
      default: null
    },
    phone: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true,
      minLength: [3, 'El username debe tener entre 3 y 20 caracteres'],
      maxLength: [20, 'El username debe tener entre 3 y 20 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    profile: {
      type: profileSchema,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


userSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'organizer'
});

export const User = model('User', userSchema);