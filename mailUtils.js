const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Heritage Institute of Technology",
    link: "https://heritageit.edu",
  },
});

const generateMail = (req) => {
  const { student, roll, password } = req.body;

  const email = mailGenerator.generate({
    body: {
      name: student,
      intro:
        "Your registration is successful. Your login details are as follows:",
      table: {
        data: [
          {
            "Student Name": student,
            "Class Roll": roll,
            Password: password,
          },
        ],
      },
      text: "Yours truly,\nHeritage Institute of technology",
    },
  });
  return email;
};

module.exports = { generateMail };
