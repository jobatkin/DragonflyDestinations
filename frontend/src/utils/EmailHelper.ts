import emailjs from '@emailjs/browser';

class EmailHelper {

    static async sendFormEmail(form: HTMLFormElement) {
        const response = await emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || 'service_zch8d3q', 
            process.env.NEXT_PUBLIC_CONTACT_EMAIL_TEMPLATE_ID || 'template_8guejre', form,
            { publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY }
        )

        return response;
    }

    static async sendPasswordResetEmail(code: string, email: string) {
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || 'service_zch8d3q', 
            'template_vofbmkr', { resetCode: code, email: email }, 
            { publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY }
        )

        return response;
    }    
}

export default EmailHelper