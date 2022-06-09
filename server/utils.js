const nodeMailer = require('nodemailer')
module.exports.SendVerificationCode = (code,email_to,uuid)=>{

    const transport = nodeMailer.createTransport({
        service: "gmail",
        secure: true,
        auth:{
            user: process.env.FROM,
            pass: process.env.FROM_PASS
        },
        tls: {rejectUnauthorized: false}
    })

    const htmlMail = `
                    <section style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background: linear-gradient(30deg, rgb(83, 175, 221),rgb(231, 105, 235));padding: 10px;color: #fff;">
                    <header>
                        <h2>ViiGram</h2>
                    </header>
                    <p>Thank you fo creating DUSH-FORMS account</p>
                    <p>Click the following link to activate your account</p>
                    
                    <a target="_blank" href="http://172.22.112.1:3000/auth/verfication?code=${code}?uid=${uuid}">http://localhost:3000/auth/verfication?code=${code}</a>
                    </section>`

    const mailDetails = {
        from : process.env.FROM,
        to: email_to,
        subject: "ViiGram account activation",
        html: htmlMail
    }

    try {

        transport.sendMail(mailDetails,(err,data)=>{
            if(err) {
                console.log(err)
                
            }
        })
        
    } catch (err) {
        console.log("error : " + err);
    }
}