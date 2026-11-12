import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    birthDate: {
      type: Date,
      validate: {
        validator: (date) => !date || date.getTime() <= Date.now(),
        message: "La fecha de nacimiento no puede ser futura",
      },
    },

    phone: {
      type: String,
      minlength: 8,
      maxlength: 15,
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profile: {
      type: profileSchema,
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.virtual("events", {
  ref: "Event",

  localField: "_id",

  foreignField: "organizer",
});

userSchema.set("toJSON", {
  virtuals: true,

  transform: (_document, user) => {
    delete user.password;
    return user;
  },
});

userSchema.set("toObject", {
  virtuals: true,

  transform: (_document, user) => {
    delete user.password;
    return user;
  },
});

export const User = model("User", userSchema);
