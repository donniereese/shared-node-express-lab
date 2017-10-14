export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <!-- <link rel="stylesheet" href="/index.css" /> -->
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/bundle.js"></script>
    </html>
  `;
};
