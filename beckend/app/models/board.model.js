module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      createdBy: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      stickies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sticky' }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Board = mongoose.model("board", schema);
  return Board;
};
