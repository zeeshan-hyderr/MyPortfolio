// Run with: npm run seed
// Creates the admin user and pre-fills About/Contact/Skills with starter content.
// Safe to run more than once — it won't duplicate the admin user or the singleton docs.
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import About from "./models/About.js";
import { ContactInfo } from "./models/Contact.js";
import Skill from "./models/Skill.js";

dotenv.config();

const run = async () => {
  await connectDB();

  // 1. Admin user
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL?.toLowerCase() });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("Admin user created:", process.env.ADMIN_EMAIL);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  // 2. About section
  const existingAbout = await About.findOne();
  if (!existingAbout) {
    await About.create({
      name: "Zeeshan Hyder",
      title: "Full Stack Developer & AI/ML Specialist",
      summary:
        "Software Engineer with 2+ years of professional experience building AI solutions, REST APIs and microservices for clients on Fiverr. Passionate about full-stack web development and applied machine learning.",
      resumeLink: "",
      education: [
        {
          degree: "B.S. in Computer Science",
          institution: "Sukkur IBA University",
          duration: "2022 - 2026",
          details: "CGPA 3.41/4.0",
        },
      ],
      experience: [
        {
          role: "Software Engineer",
          company: "Fiverr (Freelance)",
          duration: "Oct 2022 - Present",
          details: "Developed AI solutions for 20+ clients; built REST APIs, microservices and deep learning models.",
        },
      ],
      achievements: [
        "Prime Minister's Laptop Scheme 2023 - Academic Excellence",
        "NSCT Test 2026 - 98th Percentile",
        "STHP Program Full Undergraduate Scholarship (2022-2026)",
      ],
      socialLinks: {
        github: "https://github.com/zeeshan-hyderr",
        linkedin: "https://linkedin.com/in/zeeshanhyderr",
        email: "hyderzeshan94@gmail.com",
      },
    });
    console.log("About section seeded.");
  } else {
    console.log("About section already exists, skipping.");
  }

  // 3. Contact info
  const existingContact = await ContactInfo.findOne();
  if (!existingContact) {
    await ContactInfo.create({
      email: "hyderzeshan94@gmail.com",
      phone: "+92 313 2769597",
      location: "Karachi, Sindh, Pakistan",
      github: "https://github.com/zeeshan-hyderr",
      linkedin: "https://linkedin.com/in/zeeshanhyderr",
    });
    console.log("Contact info seeded.");
  } else {
    console.log("Contact info already exists, skipping.");
  }

  // 4. Skills
  const existingSkills = await Skill.countDocuments();
  if (existingSkills === 0) {
    const skills = [
      // Programming Languages
      ["Python", "Programming Languages"],
      ["Java", "Programming Languages"],
      ["JavaScript", "Programming Languages"],
      ["Kotlin", "Programming Languages"],
      ["C++", "Programming Languages"],
      ["SQL", "Programming Languages"],
      // Frontend
      ["React", "Frontend"],
      ["Angular", "Frontend"],
      ["HTML5 / CSS3", "Frontend"],
      ["Tailwind CSS", "Frontend"],
      // Backend
      ["Node.js", "Backend"],
      ["Express", "Backend"],
      ["REST APIs", "Backend"],
      ["FastAPI", "Backend"],
      // Database
      ["MongoDB", "Database"],
      ["MySQL", "Database"],
      ["PostgreSQL", "Database"],
      ["Firebase", "Database"],
      // Mobile Development
      ["Android (Kotlin/Java)", "Mobile Development"],
      ["BLE Integration", "Mobile Development"],
      ["IoT Integration", "Mobile Development"],
      // Tools
      ["Git & GitHub", "Tools"],
      ["Docker", "Tools"],
      ["VS Code", "Tools"],
      ["Linux", "Tools"],
      ["AWS", "Tools"],
    ];
    await Skill.insertMany(skills.map(([name, category], i) => ({ name, category, order: i })));
    console.log(`${skills.length} skills seeded.`);
  } else {
    console.log("Skills already exist, skipping.");
  }

  console.log("Seeding complete.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
