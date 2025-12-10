interface EmailTemplateOptions {
    title: string;
    content: string;
    year?: number;
    footerText?: string;
}

export class EmailTemplateBuilder {
    static buildBaseTemplate(options: EmailTemplateOptions): string {
        const { title, content, year = new Date().getFullYear(), footerText } = options;

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center;">
                                        <h1 style="color: #ffffff !important; margin: 0; font-size: 28px; font-weight: 600;">TechStore</h1>
                                    </td>
                                </tr>
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        ${content}
                                    </td>
                                </tr>
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                                        <p style="font-size: 12px; color: #999; margin: 0 0 5px 0;">© ${year} TechStore. ${title}</p>
                                        ${footerText ? `<p style="font-size: 11px; color: #bbb; margin: 0;">${footerText}</p>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;
    }

    static buildButton(url: string, text: string): string {
        return `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                    <td align="center">
                        <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(52, 152, 219, 0.3);">
                            ${text}
                        </a>
                    </td>
                </tr>
            </table>
        `;
    }

    static buildLinkBox(url: string, label: string): string {
        return `
            <p style="font-size: 14px; color: #777; margin: 20px 0 10px 0;">${label}</p>
            <p style="font-size: 13px; color: #3498db; word-break: break-all; background-color: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 3px solid #3498db;">${url}</p>
        `;
    }

    static buildInfoBox(items: string[]): string {
        return `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                ${items.map(item => `<p style="font-size: 13px; color: #999; margin: 0 0 10px 0;">${item}</p>`).join('')}
            </div>
        `;
    }
}
