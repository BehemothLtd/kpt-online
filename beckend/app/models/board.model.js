module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      stickys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sticky' }],
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
