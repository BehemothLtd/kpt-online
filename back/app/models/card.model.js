module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
      type: Number,
      content: String,
      board: { type: String, ref: 'board' },
      user: { type: String, ref: 'user' }
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

  const Card = mongoose.model("card", schema);
  return Card;
}