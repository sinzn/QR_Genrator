const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.post('/generate', async (req, res) => {
  const { text } = req.body;
  try {
    const qr = await QRCode.toDataURL(text);
    const html = `
      <html>
        <body style="text-align:center; margin-top:50px;">
          <h1>Your QR Code</h1>
          <img src="${qr}" alt="QR Code" />
          <p><a href="/">Generate another</a></p>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.send('Error generating QR code.');
  }
});

app.listen(port, () => {
  console.log(`QR Code Generator running at http://localhost:${port}`);
});
