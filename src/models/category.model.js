import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 30,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true, versionKey: false },
);

categorySchema.virtual("events", {
  ref: "Event",

  localField: "_id",

  foreignField: "categories",
});

categorySchema.set("toJSON", { virtuals: true });

categorySchema.set("toObject", { virtuals: true });

export const Category = model("Category", categorySchema);
