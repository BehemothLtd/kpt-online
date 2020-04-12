module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      content: String,
      createdBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      boardId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "board",
      },
      type: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sticky = mongoose.model("sticky", schema);
  return Sticky;
};
