module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      name: String
    },
    {
      timestamps: true
    }
  )

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Board = mongoose.model("board", schema);

  return Board;
}