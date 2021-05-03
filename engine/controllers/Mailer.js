var nodemailer = require('nodemailer')

exports.Mailer = () => {
    var clientmail = ''
    var tp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fluorescenthash@gmail.com',
            pass: 'hairtai64'
        }
    })
    
    var options = {
        from: 'fluorescenthash@gmail.com',
        to: clientmail,
        subject: 'Test email',
        text: 'from mailer'
    }
    
    tp.sendMail(options, (error, success) => {
        if(error) {
            console.log(error)
        }
        console.log(success)
    })
}