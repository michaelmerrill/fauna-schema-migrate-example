import faunadb from "faunadb";

const q = faunadb.query;

const { CreateIndex, Collection } = q;

export default CreateIndex({
  name: "accounts_by_email",
  source: Collection("accounts"),
  terms: [
    {
      field: ["data", "email"],
    },
  ],
  unique: true,
  serialized: true,
});
