import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: '',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: ''
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'Illia Pustoviy <>',
            to,
            subject: 'Activation of Account on ' + process.env.API_URL,
            text: '',
            html:
            `
                <div>
                    <h1>For activation go by link</h1>
                    <a href="${link}"> ${link}</a>
                </div>
            `
        })
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: 'Illia Pustoviy <>',
            to,
            subject: 'Reset your password on ' + process.env.API_URL,
            text: '',
            html:
            `
                <div>
                    <h1>Reset your password by link</h1>
                    <a href="${link}"> ${link}</a>
                </div>
            `
        })
    }
}

export default new MailService();