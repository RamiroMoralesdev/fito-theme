const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  const cssPath = vscode.Uri.file(
    path.join(context.extensionPath, 'styles.css')
  );

  const cssContent = fs.readFileSync(cssPath.fsPath, 'utf8');

  // Inyectar el CSS personalizado
  vscode.window.activeTextEditor.edit((editBuilder) => {
    vscode.workspace.onDidChangeTextDocument(() => {
      const styleTag = `<style>${cssContent}</style>`;
      const panel = vscode.window.createWebviewPanel(
        'background',
        'Custom Background',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = `
        <html>
        <head>
          ${styleTag}
        </head>
        <body>
          <h1>Fondo personalizado cargado</h1>
        </body>
        </html>
      `;
    });
  });
}

exports.activate = activate;
