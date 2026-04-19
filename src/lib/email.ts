import { Resend } from "resend";

const resend = new Resend("re_DnnZx3kt_Med3777VGXCa4EuYdSnz1YGk");

const ADMIN_EMAIL = "heathporter2155@gmail.com";
const FROM_EMAIL = "Sugar Sands <noreply@sugarsandshuntingpreserve.com>";
const SITE_URL = "https://sugarsandshuntingpreserve.com";

export async function sendUploadNotification(uploaderName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "📸 New photo pending approval — Sugar Sands",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a3a2a; margin-bottom: 8px;">New Photo Upload</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">
            <strong>${uploaderName}</strong> uploaded a new photo to the gallery and it's waiting for your approval.
          </p>
          <a href="${SITE_URL}/admin/photos" 
             style="display: inline-block; background: #2d5a3d; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px; font-weight: bold;">
            Review Photo →
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Sugar Sands Hunting Preserve
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send upload notification:", error);
    return false;
  }
}
