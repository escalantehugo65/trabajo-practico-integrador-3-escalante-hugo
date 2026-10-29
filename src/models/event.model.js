import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    venue: {
      type: String,
      required: [true, 'El recinto es obligatorio'],
      minLength: [3, 'Mínimo 3 caracteres'],
      maxLength: [100, 'Máximo 100 caracteres']
    },
    address: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      minLength: [5, 'Mínimo 5 caracteres'],
      maxLength: [150, 'Máximo 150 caracteres']
    },
    city: {
      type: String,
      required: [true, 'La ciudad es obligatoria'],
      minLength: [2, 'Mínimo 2 caracteres'],
      maxLength: [50, 'Máximo 50 caracteres']
    }
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      unique: true,
      minLength: [3, 'Mínimo 3 caracteres'],
      maxLength: [150, 'Máximo 150 caracteres']
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      minLength: [20, 'Mínimo 20 caracteres']
    },
    startDate: {
      type: Date,
      required: [true, 'La fecha de inicio es obligatoria']
    },
    endDate: {
      type: Date,
      required: [true, 'La fecha de fin es obligatoria']
    },
    capacity: {
      type: Number,
      required: [true, 'La capacidad es obligatoria'],
      min: [1, 'La capacidad mínima es 1'] 
    },
    price: {
      type: Number,
      min: [0, 'El precio no puede ser negativo'],
      default: 0
    },
    status: {
      type: String,
      enum: ['scheduled', 'cancelled', 'finished'],
      default: 'scheduled'
    },
    location: {
      type: locationSchema,
      required: true
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category' 
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Event = model('Event', eventSchema);