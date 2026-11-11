import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import ts from 'typescript';

type Options = [{ messageIdsFile: string }];
type MessageIds = 'useGeneratedId';

const translatorTypes = fileURLToPath(new URL('./index.d.ts', import.meta.url));
const defaultOptions: Options = [{ messageIdsFile: './src/i18n/message-ids.ts' }];

const rule: TSESLint.RuleModule<MessageIds, Options> = {
  defaultOptions,

  meta: {
    type: 'problem',
    docs: { description: 'Require generated message IDs in i18n translation calls.' },
    schema: [
      {
        type: 'object',
        properties: { messageIdsFile: { type: 'string', minLength: 1 } },
        required: ['messageIdsFile'],
        additionalProperties: false,
      },
    ],
    messages: {
      useGeneratedId: 'Pass a named import from the generated message IDs file.',
    },
  },

  create(context) {
    const services = context.sourceCode.parserServices;

    if (!services?.program || !services.esTreeNodeToTSNodeMap) {
      throw new Error(
        'The i18n ESLint rule requires typescript-eslint with typed linting enabled.',
      );
    }

    const { esTreeNodeToTSNodeMap, program } = services;
    const checker = program.getTypeChecker();
    const { messageIdsFile } = context.options[0] ?? defaultOptions[0];
    const generatedFile = resolve(context.cwd, messageIdsFile);

    function isGeneratedImport(argument: ts.Expression | undefined) {
      if (!argument || !ts.isIdentifier(argument)) {
        return false;
      }

      const declaration = checker.getSymbolAtLocation(argument)?.declarations?.[0];

      if (!declaration || !ts.isImportSpecifier(declaration)) {
        return false;
      }

      const importDeclaration = declaration.parent.parent.parent;
      const source = checker.getSymbolAtLocation(importDeclaration.moduleSpecifier);

      return source?.declarations?.some(
        (target) => ts.isSourceFile(target) && resolve(target.fileName) === generatedFile,
      );
    }

    return {
      CallExpression(node: TSESTree.CallExpression) {
        const call = esTreeNodeToTSNodeMap.get(node);
        const parameter = checker.getResolvedSignature(call)?.getParameters()[0];

        if (!parameter) {
          return;
        }

        const parameterType = checker.getTypeOfSymbolAtLocation(parameter, call);
        const acceptsMessageId = parameterType
          .getProperties()
          .some((property) =>
            property.declarations?.some(
              (declaration) =>
                ts.isPropertySignature(declaration) &&
                ts.isComputedPropertyName(declaration.name) &&
                ts.isIdentifier(declaration.name.expression) &&
                declaration.name.expression.text === 'messageId' &&
                resolve(declaration.getSourceFile().fileName) === translatorTypes,
            ),
          );

        if (acceptsMessageId && !isGeneratedImport(call.arguments[0])) {
          context.report({ node: node.arguments[0] ?? node, messageId: 'useGeneratedId' });
        }
      },
    };
  },
};

const plugin = {
  meta: { name: '@lemuel-manske/i18n' },
  rules: { 'generated-message-id': rule },
};

export default plugin;
