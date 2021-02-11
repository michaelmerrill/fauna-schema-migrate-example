import faunadb from "faunadb";

const q = faunadb.query;

const { CreateCollection } = q;

export default CreateCollection({ name: "accounts" });
