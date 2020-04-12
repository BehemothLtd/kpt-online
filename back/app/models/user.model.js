module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      email: String,
      name: String,
      board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "board"
      }
    },
    { timestamps: true }
  )

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);

  return User;
}