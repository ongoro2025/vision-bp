// Email utility functions
// This file contains templates and helper functions for sending emails

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email - placeholder for actual implementation
 * In production, integrate with Nodemailer + Zoho SMTP or similar service
 */
export async function sendEmail(options: EmailOptions) {
  console.log('[v0] Email service:', {
    to: options.to,
    subject: options.subject,
    // HTML preview truncated
    htmlLength: options.html.length,
  });

  // TODO: Implement actual email sending with:
  // - Nodemailer + Zoho SMTP (notifications@ongoro.top)
  // - HTML email templates with Vision Blueprints branding
  // - Error handling and retry logic

  return Promise.resolve();
}

/**
 * Email verification template
 */
export function getEmailVerificationTemplate(
  recipientName: string,
  verificationLink: string
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a1a1a; color: #ffd700; padding: 20px; text-align: center; }
          .content { background-color: #f5f5f5; padding: 20px; margin-top: 20px; }
          .button { display: inline-block; background-color: #d4af37; color: #1a1a1a; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; color: #666666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Vision Blueprints</h1>
            <p>Verify Your Email Address</p>
          </div>
          <div class="content">
            <p>Hi ${recipientName},</p>
            <p>Thank you for joining Vision Blueprints! To complete your registration, please verify your email address by clicking the button below:</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666666;">${verificationLink}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Vision Blueprints. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Newsletter welcome template
 */
export function getNewsletterWelcomeTemplate(recipientEmail: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a1a1a; color: #ffd700; padding: 20px; text-align: center; }
          .content { background-color: #f5f5f5; padding: 20px; margin-top: 20px; }
          .highlight { color: #d4af37; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Vision Blueprints</h1>
            <p>Newsletter Subscription</p>
          </div>
          <div class="content">
            <p>Welcome to our community!</p>
            <p>You've successfully subscribed to the Vision Blueprints newsletter. You'll now receive exclusive insights, new resources, and special member opportunities delivered to your inbox.</p>
            <p>Get ready to discover:</p>
            <ul>
              <li>Curated self-help books and programs</li>
              <li>Expert guidance and mentorship</li>
              <li>Exclusive member events</li>
              <li>Success stories from our community</li>
            </ul>
            <p>Stay tuned for amazing content coming your way!</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Contact form confirmation template
 */
export function getContactConfirmationTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #1a1a1a; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a1a1a; color: #ffd700; padding: 20px; text-align: center; }
          .content { background-color: #f5f5f5; padding: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Vision Blueprints</h1>
            <p>Message Received</p>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for contacting Vision Blueprints. We've received your message and will get back to you as soon as possible.</p>
            <p>We appreciate your interest and look forward to connecting with you.</p>
            <p>Best regards,<br>The Vision Blueprints Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
