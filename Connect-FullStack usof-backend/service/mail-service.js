const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'pustovoi2004@mail.ru',
                pass: 'jKaTrnTNQa2w5WEFxpsr'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'Illia Pustoviy <pustovoi2004@mail.ru>',
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
            from: 'Illia Pustoviy <pustovoi2004@mail.ru>',
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

module.exports = new MailService();