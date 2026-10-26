// src/api/services/email.service.js

// Remove Mailgun imports
// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);

// Add Resend import
import { Resend } from 'resend';

// Initialize the Resend client
// const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);


class EmailService {
  async sendInvitationEmail(toEmail, toName, invitationToken, organizationName) {
     // Keep the placeholder link
     const invitationLink ="http://localhost:3001/accept-invitation?token=re_fAVqsmBD_PE5hi6Y9eTGVG12PNeEKSMiN";

     // Data structure is similar, but no domain is passed to the method
      const emailData = {
          from:  'onboarding@resend.dev', // Uses RESEND_FROM_EMAIL
          to: 'pytsud@gmail.com', // MUST be your account email if using onboarding@resend.dev
          subject: `[TEST INVITATION RESEND] You are invited to join ${organizationName}`,
          // Use the simple text template for Postman testing
           text: `Hello ${toName},

This is a test invitation from Resend to join the ${organizationName} team.

You do not need to click any links. To accept this invitation using Postman, you will need the INVITATION TOKEN.

YOUR INVITATION TOKEN:
${invitationToken}

---
To complete the process in Postman:
1. Open your 'accept-invitation' request.
2. In the body, set the "token" value to the token above.
3. Set a "password" and send the request.
---

For reference, a real frontend would use this link: ${invitationLink}
`
     };

    try {
        console.log(`Sending Postman test invitation email to ${toEmail} via Resend...`);
        
        // --- Resend's send method pattern ---
        const { data, error } = await resend.emails.send(emailData);
        // ---  ---

        if (error) {
             // Resend returns an error object instead of throwing for API errors
             console.error('Error sending email via Resend:', error);
             throw new Error(`Failed to send invitation email: ${error.message || error.name}`);
        }

        console.log('Email sent successfully via Resend!', data);
        return data; // data usually contains the email ID

    } catch (error) {
         // Catch network errors or errors thrown from the if(error) block
        console.error('Critical Error in sendInvitationEmail:', error);
        // Re-throw or handle as appropriate
         throw new Error('Failed to send invitation email.');
    }
  }
}

// Export a singleton instance of the service
module.exports = new EmailService();