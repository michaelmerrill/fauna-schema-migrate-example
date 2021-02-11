import faunadb from "faunadb";

const q = faunadb.query;

const {
  CreateFunction,
  Query,
  Var,
  Lambda,
  Role,
  If,
  Exists,
  Match,
  Index,
  Get,
} = q;

const GetAccount = (email) => {
  return If(
    Exists(Match(Index("accounts_by_email"), email)),
    Get(Match(Index("accounts_by_email"), email)),
    false
  );
};

export default CreateFunction({
  name: "get_account",
  body: Query(Lambda("email", GetAccount(Var("email")))),
  role: Role("functionrole_get_account"),
});
