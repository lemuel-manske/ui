const booleanNamePattern = /^(is|has|should|can|was|will)[A-Z]/;

function containsNode(node, types) {
  if (types.includes(node.type)) {
    return true;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'parent' || value == null || typeof value !== 'object') {
      continue;
    }

    const values = Array.isArray(value) ? value : [value];

    for (const child of values) {
      if (
        child != null &&
        typeof child === 'object' &&
        typeof child.type === 'string' &&
        containsNode(child, types)
      ) {
        return true;
      }
    }
  }

  return false;
}

function containsCallExpression(node) {
  return containsNode(node, ['CallExpression']);
}

function isExtracted(node) {
  let current = node.parent;

  while (current != null) {
    if (
      current.type === 'VariableDeclarator' &&
      current.id.type === 'Identifier' &&
      booleanNamePattern.test(current.id.name)
    ) {
      return true;
    }

    if (
      current.type === 'AssignmentExpression' &&
      current.left.type === 'Identifier' &&
      booleanNamePattern.test(current.left.name)
    ) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function flattenLogical(node, terms = []) {
  if (node.type === 'LogicalExpression') {
    flattenLogical(node.left, terms);
    flattenLogical(node.right, terms);
    return terms;
  }

  terms.push(node);
  return terms;
}

function isRenderableTerm(node) {
  return (
    containsNode(node, ['JSXElement', 'JSXFragment']) ||
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'FunctionExpression'
  );
}

function isFallbackExpression(node) {
  const terms = flattenLogical(node);

  return terms.some(
    (term) =>
      (term.type === 'Identifier' && term.name === 'undefined') ||
      (term.type === 'Literal' && (term.value == null || term.value === '')),
  );
}

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require long or computed boolean expressions to be extracted into named variables.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxLength: {
            type: 'integer',
            minimum: 1,
          },
          maxTerms: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      extract: 'Extract this boolean expression into a named variable such as `isReady`.',
    },
  },

  create(context) {
    const { maxLength = 100, maxTerms = 3 } = context.options[0] ?? {};
    const reported = new Set();

    function report(node) {
      const key = `${node.range[0]}-${node.range[1]}`;

      if (reported.has(key)) {
        return;
      }

      reported.add(key);
      context.report({ node, messageId: 'extract' });
    }

    function hasReportedAncestor(node) {
      let current = node.parent;

      while (current != null) {
        if (reported.has(`${current.range[0]}-${current.range[1]}`)) {
          return true;
        }

        current = current.parent;
      }

      return false;
    }

    return {
      BinaryExpression(node) {
        const comparisons = ['>', '<', '>=', '<=', '===', '!=='];

        if (!comparisons.includes(node.operator)) {
          return;
        }

        if (isExtracted(node) || hasReportedAncestor(node)) {
          return;
        }

        if (containsCallExpression(node.left) || containsCallExpression(node.right)) {
          report(node);
        }
      },

      LogicalExpression(node) {
        if (isExtracted(node) || hasReportedAncestor(node) || isFallbackExpression(node)) {
          return;
        }

        const terms = flattenLogical(node);
        const conditionLength = terms
          .filter((term) => !isRenderableTerm(term))
          .reduce((length, term) => length + context.sourceCode.getText(term).length, 0);

        if (terms.length > maxTerms || conditionLength > maxLength) {
          report(node);
        }
      },
    };
  },
};

export default rule;
