const nodeMailer = require('nodemailer');

const html = `
<h1 align="center"> New application received from ${formData.fullname} at ${formData.email}! </h1>

    <h2> Basic Info </h2>
    Full Name: ${formData.fullname}
    Birthday: ${formData.age}
    Email: ${formData.email}
    Hobbies: ${formData.hobbies}
    Favorite Food: ${formData.favfood}

    <h2> Questionnaire </h2>
    What do you like about me?: ${formData.question1}
    Perfect Saturday: ${formData.question2}
    Cheer-up Strategy: ${formData.question3}
    Vibe Description: ${formData.question4}
    Ideal First Date: ${formData.question5}
    Movie Genre: ${formData.question6}

    <h2> HR Questionnaire </h2>
    Crime Conviction: ${formData.hrq1}
    Drug Use: ${formData.hrq2}
    Current Relationships: ${formData.hrq3}
    Situationships: ${formData.hrq4}
    Kids' Activities: ${formData.hrq5}
    Employment Status: ${formData.hrq6}
    Family Relationship: ${formData.hrq7}
    Relationship Type: ${formData.hrq8}
    Additional Comments: ${formData.hrq9}
`;

const emails = [ 'contact@rossjm.net',]

async function main() {

 const transporter = nodeMailer.createTransport({
      host:
      port:
      secure: true,
      auth: {
        user:
        pass:
      }
  });

  const info = await transporter.sendMail({
      from: 'App Admin' <applications@jersh.love>',
      to: emails,
      subject: 'New application received from ${formData.fullname} at ${formData.email}!',
      html: html,

  })

  console.log("Message sent: " + info.messageId);
  console.log(info.accepted);
  console.log(info.rejected);

}

main();