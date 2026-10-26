// src/api/utils/emailSender.js
import { Resend } from 'resend';

let resend;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("RESEND_API_KEY not set. Email sending will be disabled/mocked.");
}

const createInvitationEmailHTML = (userName, invitationLink, organizationName) => {
  // Basic HTML template. Use a proper templating engine for more complex emails.
  // You can also use React Email with Resend for more powerful templating.
  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px; margin: 20px auto; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>You're Invited to Join ${organizationName} on HelpDesk!</h2>
          <p>Hello ${userName || 'there'},</p>
          <p>You have been invited to join the ${organizationName} team on our HelpDesk platform.</p>
          <p>To accept your invitation and set up your account, please click the link below:</p>
          <p><a href="${invitationLink}" class="button">Accept Invitation</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>If you did not expect this invitation, please ignore this email.</p>
          <div class="footer">
            <p>Thanks,<br/>The ${organizationName} Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
};


export const sendInvitationEmail = async (recipientEmail, recipientName, invitationToken, organizationName) => {
  if (!resend) {
    console.log(`Email sending is disabled (Resend API key missing). Would send invitation to: ${recipientEmail} with token: ${invitationToken} for org: ${organizationName}`);
    const invitationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/accept-invitation/${invitationToken}`;
    console.log(`DEV ONLY - Invitation Link: ${invitationLink}`);
    return { success: true, message: "Email sending mocked (Resend API key missing).", link: invitationLink };
  }

   const invitationLink = `${process.env.FRONTEND_URL}/accept-invitation/${invitationToken}`;
  const emailHTML = createInvitationEmailHTML(recipientName, invitationLink, organizationName);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'HelpDesk <onboarding@resend.dev>';

  // --- DEBUG THE VALUE OF recipientEmail HERE ---
  console.log("emailSender.js: Preparing to send email. Recipient Email:", recipientEmail);
  console.log("emailSender.js: Recipient Name:", recipientName);
  console.log("emailSender.js: Invitation Token:", invitationToken);
  console.log("emailSender.js: Organization Name:", organizationName);
  // --- END DEBUG ---

  // Ensure recipientEmail is a string and not empty
  if (!recipientEmail || typeof recipientEmail !== 'string' || recipientEmail.trim() === '') {
      console.error('emailSender.js: Invalid or missing recipientEmail:', recipientEmail);
      return { success: false, error: 'Invalid or missing recipient email address.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail], // <<< Resend expects an array of strings or a single string.
                            // If recipientEmail is undefined/null here, this will be [undefined] or [null]
                            // which Resend might reject or treat as missing.
      subject: `You're invited to join ${organizationName} on HelpDesk`,
      html: emailHTML,
    });

    if (error) {
      console.error('Error sending invitation email via Resend SDK:', error);
      return { success: false, error: error.message || 'Failed to send invitation email via Resend.' };
    }

    console.log('Invitation email sent successfully via Resend:', data);
    return { success: true, messageId: data.id };
  } catch (exception) {
    // Catch any other unexpected errors during the send call
    console.error('Exception sending invitation email via Resend:', exception);
    return { success: false, error: exception.message || 'An unexpected error occurred while sending the email.' };
  }
};



