import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      unique: true,
      minLength: [2, 'Mínimo 2 caracteres'],
      maxLength: [30, 'Máximo 30 caracteres']
    },
    description: {
      type: String,
      maxLength: [200, 'Máximo 200 caracteres']
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
  }
);

categorySchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'categories' 
});

export const Category = model('Category', categorySchema);