/**
 * JSCodeshift скрипт для удаления `import React` из файлов, если он не используется.
 */
module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Найти import React from 'react'
  root
    .find(j.ImportDeclaration, {
      source: { value: 'react' },
    })
    .forEach((path) => {
      const specifiers = path.value.specifiers;

      // Если ничего не импортируется явно — удалить весь import
      if (!specifiers || specifiers.length === 0) {
        j(path).remove();
        return;
      }

      const defaultImport = specifiers.find(
        (s) => s.type === 'ImportDefaultSpecifier' && s.local.name === 'React',
      );

      if (defaultImport) {
        const isReactUsed = root.find(j.Identifier, { name: 'React' }).size() > 1;
        if (!isReactUsed) {
          if (specifiers.length === 1) {
            j(path).remove();
          } else {
            path.value.specifiers = specifiers.filter((s) => s !== defaultImport);
          }
        }
      }
    });

  return root.toSource({ quote: 'single' });
};
