import Mailgun from 'mailgun-js';


var mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_MY_DOMAIN,
});

export const send = (to, amount, entity, reference) => {
    var data = {
        from: 'Casa Damiao <geral@casadamiao.pt>',
        to,
        subject: 'Dados MB para a sua Doação',
        template: 'mb_notify',
        'h:X-Mailgun-Variables': JSON.stringify({
            amount, 
            entity, 
            reference
        }),
    }
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            // res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            // res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });
}
