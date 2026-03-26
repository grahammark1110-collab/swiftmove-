import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json();

    const { error } = await resend.emails.send({
      from: "SwiftMove <onboarding@resend.dev>",
      to: order.senderEmail,
      subject: `📦 Your Delivery Receipt — ${order.trackingId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"/></head>
          <body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',system-ui,sans-serif;">
            <div style="max-width:560px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

              <!-- Header -->
              <div style="background:#f97316;padding:32px;text-align:center;">
                <h1 style="color:white;margin:0;font-size:24px;font-weight:800;">🚚 SwiftMove</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Delivery Receipt Confirmation</p>
              </div>

              <!-- Tracking ID -->
              <div style="padding:24px 32px;background:#fff7ed;border-bottom:1px solid #fed7aa;">
                <p style="margin:0;font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Your Tracking ID</p>
                <p style="margin:8px 0 0;font-size:28px;font-weight:800;color:#f97316;letter-spacing:3px;font-family:monospace;">${order.trackingId}</p>
                <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">Use this ID to track your package anytime at our website</p>
              </div>

              <!-- Details -->
              <div style="padding:32px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="width:50%;vertical-align:top;padding-right:16px;">
                      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Sender</p>
                      <p style="margin:0;font-weight:700;color:#111827;font-size:15px;">${order.senderName}</p>
                      <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">${order.senderPhone}</p>
                      <p style="margin:2px 0 0;color:#6b7280;font-size:13px;">${order.senderAddress}</p>
                    </td>
                    <td style="width:50%;vertical-align:top;padding-left:16px;border-left:1px solid #f3f4f6;">
                      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Receiver</p>
                      <p style="margin:0;font-weight:700;color:#111827;font-size:15px;">${order.receiverName}</p>
                      <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">${order.receiverPhone}</p>
                      <p style="margin:2px 0 0;color:#6b7280;font-size:13px;">${order.receiverAddress}</p>
                    </td>
                  </tr>
                </table>

                <hr style="border:none;border-top:1px dashed #e5e7eb;margin:24px 0;"/>

                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  ${[
                    ["Package", order.packageDesc],
                    ["Weight", order.weight || "Not specified"],
                    ["Delivery Type", order.deliveryType.charAt(0).toUpperCase() + order.deliveryType.slice(1)],
                    ["Payment", "Payment Received ✓"],
                    ["Date", order.date],
                    ["Price", order.price],
                  ].map(([label, value]) => `
                    <tr>
                      <td style="padding:8px 0;color:#9ca3af;">${label}</td>
                      <td style="padding:8px 0;text-align:right;font-weight:600;color:#111827;">${value}</td>
                    </tr>
                  `).join("")}
                </table>
              </div>

              <!-- Track Button -->
              <div style="padding:0 32px 32px;text-align:center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://swiftmove.vercel.app"}/tracking" 
                   style="display:inline-block;background:#f97316;color:white;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">
                  🔍 Track My Package
                </a>
              </div>

              <!-- Footer -->
              <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Thank you for choosing SwiftMove!</p>
                <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Questions? Email us at <a href="mailto:hello@swiftmove.com" style="color:#f97316;">hello@swiftmove.com</a></p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}