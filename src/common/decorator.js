/* eslint-disable import/prefer-default-export,no-param-reassign */
export function markdownRenderer(targetConstructor) {
  targetConstructor.prototype.renderMarkdown = content => (`
    <mark-down>
        ${content}
    </mark-down>
  `);
}
