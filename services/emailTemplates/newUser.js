module.exports = () => (portal, firstName, lastName, token) => `
  <html>
    <body>
      <div style="overflow: hidden;">
        <div style="width: 100%; background-color: #FDFDFD; border-collapse: separate !important; border-spacing: 0">
          <div style="font-size: 16px; padding: 30px; vertical-align: top; display: block; width: 675px; max-width: 675px; margin: 0 auto;">
            <div style="margin-bottom: 30px; margin-top: 15px;">
              <h3 style="font-size: 20px; color: #2E323B;">@Subskribble</h3>
            </div>
            <div style="background-color: #FFFFFF; border: 1px solid #f0f0f0;">
              <div style="font-size: 16px; padding: 30px; vertical-align: top; display: block;">
                <h2 style="margin-bottom: 30px; color: #03a9f3;">
                  Thank you for registering, ${firstName} ${lastName}!
                </h2>
                <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
                  Before logging into your account, please click the button below to verify your email address.
                </p>
                <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
                  If you did not initiate this request, please contact us immediately at <a href="mailto:helpdesk@subskribble.com" target="_blank" rel="noopener noreferrer">helpdesk@subskribble.com</a>
                </p>
                <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
                  Thank you,
                  <br />
                  The Subskribble Team
                </p>
                <div style="margin-bottom: 20px; text-align: center">
                  <a style="font-size: 18px; text-decoration: none; line-height: 40px; width: 200px; color: #FFFFFF; background-color: #03A9F3; display: inline-block;" href="${portal}/subskribble/email/verify?token=${token}">Verify Email</a>
                </div>
                <small style="color: #999999; font-size: 11px; text-align: center">
                  Or click on this link:
                  <a style="color: #999999; text-decoration: underline; margin-left: 4px;" href="${portal}subskribble/email/verify?token=${token}">${portal}/subskribble/email/verify?token=${token}</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
