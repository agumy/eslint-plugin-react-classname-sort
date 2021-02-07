import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  create: context => {
    return {
      JSXAttribute: (node: any) => {
        if (!node.value || node.name.name !== "className") {
          return;
        }

        const classNames = node.value.value.split(" ");
        const sortedclassNames = Array.from(classNames).sort();

        if (classNames.join(" ") !== sortedclassNames.join(" ")) {
          context.report({
            message: "order is incorrect.",
            node,
            fix: fixer => {
              return fixer.replaceText(node.value, `"${sortedclassNames.join(" ")}"`);
            },
          });
        }
      },
    };
  },
  meta: {
    fixable: "code",
  },
};

export = rule;
