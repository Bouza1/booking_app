template = """
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
      @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
      @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
  }
  body,
  table,
  td,
  a {
      -ms-text-size-adjust: 100%; 
      -webkit-text-size-adjust: 100%; 
  }

  table,
  td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
  }

  img {
      -ms-interpolation-mode: bicubic;
  }

  a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
  }

  div[style*="margin: 16px 0;"] {
      margin: 0 !important;
  }
  body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
  }

  table {
      border-collapse: collapse !important;
  }
  a {
      color: #1a82e2;
  }
  img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
  }
  </style>

  </head>
  <body style="background-color: #e9ecef;">


  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
      Password Request Link Attached.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
      <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
              <td align="center" valign="top" style="padding: 10px 10px;">
              <a href="https://tennisbooking.s4820791.repl.co" target="_blank" style="display: inline-block;">
                  <img src="https://tennisbooking.s4820791.repl.co/static/tennis_ball.png" alt="Logo" border="0" width="100" style="display: block; width: 60px; max-width: 100px; min-width: 100px;">
              </a>
              </td>
          </tr>
          </table>

      </td>
      </tr>
      <!-- start hero -->
      <tr>
      <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Password</h1>
              </td>
          </tr>
          </table>

      </td>
      </tr>
      <tr>
      <td align="center" bgcolor="#e9ecef">
        
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to change your password.</p>
              </td>
          </tr>

          <tr>
              <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                          <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="$url_1" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset</a>
                          </td>
                      </tr>
                      </table>
                  </td>
                  </tr>
              </table>
              </td>
          </tr>

          <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="$url_1" target="_blank">Link</a></p>
              </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Regards,<br> WSSCC</p>
              </td>
          </tr>
          <!-- end copy -->

          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
      </td>
      </tr>
      <!-- end copy block -->
      <!-- start footer -->
      <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <!-- start permission -->
          <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for a password reset for your account.</p>
              <p style="margin: 0;"> If you didn't create request a password reset link with <a href="https://tennisbooking.s4820791.repl.co/">WSSCC</a>, please contact us immediatetly</p>
              </td>
          </tr>
          <!-- end permission -->
          </table>
      </td>
      </tr>
  </table>
  </body>
  </html>
  """