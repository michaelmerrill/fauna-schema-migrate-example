import faunadb from "faunadb";

const { Collection, CreateRole, Index } = faunadb.query;

export default CreateRole({
  name: "functionrole_create_account",
  privileges: [
    {
      resource: Collection("accounts"),
      actions: { create: true },
    },
    {
      resource: Index("accounts_by_email"),
      actions: { read: true },
    },
  ],
});
