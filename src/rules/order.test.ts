import { RuleTester } from "eslint";
import rule from "./order";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    jsx: true,
  },
});

tester.run("order", rule, {
  valid: [
    {
      filename: "valid.tsx", // filename must be set to tell parser this code is tsx
      code: `(props: props) => <button className="a b c d" />`,
    },
  ],
  invalid: [
    {
      filename: "invalid.tsx", // filename must be set to tell parser this code is tsx
      code: `(props: props) => <button className="d c b a" />`,
      output: `(props: props) => <button className="a b c d" />`,
      errors: [{ message: "order is incorrect." }],
    },
  ],
});
