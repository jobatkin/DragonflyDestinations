import emailjs from '@emailjs/browser';

class EmailHelper {

    static async sendFormEmail(form: HTMLFormElement) {
        const response = await emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || 'service_zch8d3q', 
            process.env.NEXT_PUBLIC_CONTACT_EMAIL_TEMPLATE_ID || 'template_8guejre', form, {
            publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
        })

        return response;
    }
}

export default EmailHelper