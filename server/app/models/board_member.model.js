module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      boardId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'board' },
      memberId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("board_member", schema);
};
