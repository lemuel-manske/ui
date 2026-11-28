function isHookCall(node) {
  if (node.init?.type !== 'CallExpression') {
    return false;
  }

  const callee = node.init.callee;

  if (callee.type === 'Identifier') {
    return /^use[A-Z]/.test(callee.name);
  }

  return (
    callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier' &&
    /^use[A-Z]/.test(callee.property.name)
  );
}

const rule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Keep local variable declarations close to their first usage.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxLines: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooFar: "Move '{{name}}' closer to its first usage; it is {{distance}} lines away.",
    },
  },

  create(context) {
    const maxLines = context.options[0]?.maxLines ?? 8;

    return {
      VariableDeclarator(node) {
        const declaration = node.parent;

        if (
          declaration.parent.type === 'ExportNamedDeclaration' ||
          declaration.parent.type === 'ExportDefaultDeclaration'
        ) {
          return;
        }

        const scope = context.sourceCode.getScope(node);

        if (scope.type === 'global' || scope.type === 'module') {
          return;
        }

        const variable = scope.variables.find((candidate) =>
          candidate.defs.some((definition) => definition.node === node),
        );

        if (variable == null || node.id.type !== 'Identifier') {
          return;
        }

        if (isHookCall(node) || variable.references.some((reference) => reference.isWrite())) {
          return;
        }

        const references = variable.references.filter(
          (reference) => reference.isRead() && reference.identifier.range[0] > node.range[1],
        );

        if (references.length === 0) {
          return;
        }

        const firstReference = references.reduce((closest, reference) =>
          reference.identifier.range[0] < closest.identifier.range[0] ? reference : closest,
        );
        const distance = firstReference.identifier.loc.start.line - node.loc.end.line;

        if (distance > maxLines) {
          context.report({
            node,
            messageId: 'tooFar',
            data: {
              name: node.id.name,
              distance: String(distance),
            },
          });
        }
      },
    };
  },
};

export default rule;
