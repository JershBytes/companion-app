function saveData() {
    const formData = {
      fullname: document.getElementById('fullname').value,
      age: document.getElementById('age').value,
      hobbies: document.getElementById('hobbies').value,
      favfood: document.getElementById('favfood').value,
      question1: document.getElementById('question1').value,
      question2: document.getElementById('question2').value,
      question3: document.getElementById('question3').value,
      question4: document.getElementById('question4').value,
      question5: document.getElementById('question5').value,
      question6: document.getElementById('question6').value,
      hrq1: document.getElementById('hrq1').value,
      hrq2: document.getElementById('hrq2').value,
      hrq3: document.getElementById('hrq3').value,
      hrq4: document.getElementById('hrq4').value,
      hrq5: document.getElementById('hrq5').value,
      hrq6: document.getElementById('hrq6').value,
      hrq7: document.getElementById('hrq7').value,
      hrq8: document.getElementById('hrq8').value,
      hrq9: document.getElementById('hrq9').value
    };
  
    const fileData = `
      Full Name: ${formData.fullname}
      Birthday: ${formData.age}
      Hobbies: ${formData.hobbies}
      Favorite Food: ${formData.favfood}
  
      What do you like about me?: ${formData.question1}
      Perfect Saturday: ${formData.question2}
      Cheer-up Strategy: ${formData.question3}
      Vibe Description: ${formData.question4}
      Ideal First Date: ${formData.question5}
      Movie Genre: ${formData.question6}
  
      HR Questions:
      Crime Conviction: ${formData.hrq1}
      Drug Use: ${formData.hrq2}
      Current Hoes: ${formData.hrq3}
      Situationships: ${formData.hrq4}
      Kids' Activities: ${formData.hrq5}
      Employment Status: ${formData.hrq7}
      Family Relationship: ${formData.hrq8}
      Relationship Type: ${formData.hrq9}
    `;
  
    const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.fullname}_application.txt`;
    link.click();
  }
  