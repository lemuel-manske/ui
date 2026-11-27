const rule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Require a blank line between TypeScript interface members.',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingBlankLine: 'Add a blank line between interface members.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;

    return {
      TSInterfaceDeclaration(node) {
        const members = node.body.body;

        for (let index = 1; index < members.length; index += 1) {
          const previous = members[index - 1];
          const current = members[index];

          if (current.loc.start.line - previous.loc.end.line < 2) {
            context.report({
              node: current,
              messageId: 'missingBlankLine',
              fix(fixer) {
                return fixer.insertTextBefore(current, '\n');
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
