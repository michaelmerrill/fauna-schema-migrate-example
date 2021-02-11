import faunadb from "faunadb";

const q = faunadb.query;

const {
  CreateFunction,
  Query,
  Var,
  Lambda,
  Role,
  Collection,
  Let,
  Select,
  If,
  Exists,
  Match,
  Index,
  Create,
} = q;

const CreateAccount = (email, name) => {
  return If(
    Exists(Match(Index("accounts_by_email"), email)),
    false,
    Let(
      {
        account: Create(Collection("accounts"), {
          data: { email, name },
        }),
      },
      {
        id: Select(["ref", "id"], Var("account")),
        email: Select(["data", "email"], Var("account")),
        name: Select(["data", "name"], Var("account")),
      }
    )
  );
};

export default CreateFunction({
  name: "create_account",
  body: Query(
    Lambda(["email", "name"], CreateAccount(Var("email"), Var("name")))
  ),
  role: Role("functionrole_create_account"),
});
