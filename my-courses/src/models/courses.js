const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: true,
      trim: true,
      maxlength: [100, 'Name can not be more than 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Decription can not be more than 50 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CourseSchema.pre('remove', async function(next) {
  await this.model('Lession').deleteMany({ course: this._id });
  next();
});

CourseSchema.pre('save', function(next) {
  next();
});

CourseSchema.virtual('lessions', {
  ref: 'Lession',
  localField: '_id',
  foreignField: 'course',
  justOne: false,
});

module.exports = mongoose.model('Course', CourseSchema);
