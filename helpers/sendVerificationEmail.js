const sendMail = require('../utils/sendEmail');

module.exports = async (email, name, url) => {
    const subject = "Verify Email";
    const emailBody = `
        <p style="font-size: 16px; color: #333; font-family: Arial, sans-serif;">Dear ${name},</p>
        <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif;">Thank you for registering with CipherSafe. To complete your registration and verify your email address, please click the link below:</p>

        <p style="font-size: 16px;">
            <a href="${url}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none;">Verify</a>
        </p>

        <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif;">or copy the below URL to your browser:</p>
        <p style="font-size: 14px;">
            <a href="${url}" style="color: #007bff; text-decoration: none;">${url}</a>
        </p>

        <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif;">If you did not sign up for CipherSafe, please ignore this email.</p>
        
        <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif;">Thank you for using our service.</p>
        
        <p style="font-size: 14px; color: #666; font-family: Arial, sans-serif;">Best regards,</p>
        <p style="font-size: 16px; color: #007bff; font-family: Arial, sans-serif;">CipherSafe Team</p>
        <p style="font-size: 14px;">
            <a href="https://ciphersafe.vercel.app" style="color: #007bff; text-decoration: none;">CipherSafe</a>
        </p>
    `;

    sendMail(email, subject, emailBody);
};