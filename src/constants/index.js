import {
    mobile,
    backend,
    creator,
    web,
    linux,
    python,
    mysql,
    gitcollege,
    c,
    virtualmachine,
    genai,
    carrent,
    jobit,
    tripguide,
    comingsoon,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Cyber Security Student",
      icon: web,
    },
    {
      title: "Linux",
      icon: mobile,
    },
    {
      title: "Python Programming Language",
      icon: backend,
    },
    {
      title: "C Programming Language (Basic)",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "Python",
      icon: python,
    },
    {
      name: "C/C++",
      icon: c,
    },
    {
      name: "Linux",
      icon: linux,
    },
    {
      name: "MySQL",
      icon: mysql,
    },
    {
      name: "Virtual Machines",
      icon: virtualmachine,
    },
    {
      name: "Generative AI",
      icon: genai,
    },
  ];
  
  const experiences = [
    {
      title: "Python",
      company_name: "",
      icon: python,
      iconBg: "#E6DEDD",
      date: "August 2022 - April 2024",
      points: [
        "Learned basics of Python such as Variables, Tuples, Lists, Dictionaries. ",
        "Learned connectivity of Python program with MySQL.",
        "Learned logical and analytical approach on how to write the code for particular problem and how it could get executed.",
        "Participating in code reviews and providing constructive feedback to other of my classmates.",
      ],
    },
    {
      title: "MySQL",
      company_name: "",
      icon: mysql,
      iconBg: "#E6DEDD",
      date: "November 2023 - April 2024",
      points: [
        "Learned basics of MySQL such as use of Wrokbench, implementing DML and DDL commands on the database.",
        "Learned the uses of different types of keys such as PRIMARY KEY, FOREIGN KEY, CANDIDATE KEY, ALTERNATE KEY, UNIQUE KEY.",
        "Learned different types of joins such as INNER JOIN, LEFT JOIN, RIGHT JOIN, CROSS JOIN, OUTER JOIN, SELF JOIN.",
        "Participating in code reviews and providing constructive feedback to other of my classmates.",
      ],
    },
    {
      title: "Linux",
      company_name: "",
      icon: linux,
      iconBg: "#E6DEDD",
      date: "June 2024 - Current",
      points: [
        "Learning about how to use Linux.",
        "Trying to use it as my primary OS.",
        "Learning about commands and tools required for Ethical Hacking and Cyber Security purposes."
      ],
    },{
      title: "C/C++",
      company_name: "",
      icon: c,
      iconBg: "#E6DEDD",
      date: "June 2024 - Current",
      points: [
        "Currently in progress..."
      ],
    },
    {
      title: "Cyber Security Student",
      company_name: "Global Institute of Technology",
      icon: gitcollege,
      iconBg: "#E6DEDD",
      date: "August 2024 - Current",
      points: [
        "Currently a 1st Year student.",
        "Persuing B.Tech in Cyber Security."
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as safe as our product, but Pranav proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a pen tester who truly cares about their clients' success like Pranav does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Pranav optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      testimonial:
        "After Pranav told us the vulnerabilities we were unaware of, we were able to fix them before they were exploited.",
      name: "James Williamson",
      designation: "CEO",
      company: "ABC Corporation",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Coming Soon...",
      description:
        "Not started any project yet.",
      tags: [
        {
          name: "ethicalhacking",
          color: "blue-text-gradient",
        },
        {
          name: "cybersecurity",
          color: "green-text-gradient",
        },
        {
          name: "linux",
          color: "pink-text-gradient",
        },
      ],
      image: comingsoon,
      source_code_link: "https://github.com/Pranav-Sharma-Official",
    },
    {
      name: "Coming Soon...",
      description:
        "Not started any project yet.",
      tags: [
        {
          name: "ethicalhacking",
          color: "blue-text-gradient",
        },
        {
          name: "cybersecurity",
          color: "green-text-gradient",
        },
        {
          name: "linux",
          color: "pink-text-gradient",
        },
      ],
      image: comingsoon,
      source_code_link: "https://github.com/Pranav-Sharma-Official",
    },
    {
      name: "Coming Soon...",
      description:
        "Not started any project yet.",
      tags: [
        {
          name: "ethicalhacking",
          color: "blue-text-gradient",
        },
        {
          name: "cybersecurity",
          color: "green-text-gradient",
        },
        {
          name: "linux",
          color: "pink-text-gradient",
        },
      ],
      image: comingsoon,
      source_code_link: "https://github.com/Pranav-Sharma-Official",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };