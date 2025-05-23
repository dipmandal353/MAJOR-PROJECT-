/**
 * Comprehensive data for entrance exam questions
 * Organized by exam ID -> year -> array of questions
 */

export const examQuestionsData = {
  // GATE Exam Questions
  gate: {
    2023: [
      {
        id: 1,
        question: "Which of the following sorting algorithms has the best average-case time complexity?",
        options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        answer: "Merge Sort",
        explanation:
          "Merge Sort has an average time complexity of O(n log n), which is better than Bubble Sort, Selection Sort, and Insertion Sort which all have O(n²) complexity.",
        subject: "Algorithms",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "What is the time complexity of searching for an element in a balanced binary search tree?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: "O(log n)",
        explanation:
          "In a balanced binary search tree, the height is log n, and search operations take time proportional to the height of the tree.",
        subject: "Data Structures",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "Which of the following is NOT a valid deadlock prevention technique?",
        options: ["Resource ordering", "Banker's algorithm", "Priority inheritance", "Deadlock detection"],
        answer: "Deadlock detection",
        explanation:
          "Deadlock detection is not a prevention technique but rather a method to identify deadlocks after they have occurred.",
        subject: "Operating Systems",
        difficulty: "Hard",
      },
      {
        id: 4,
        question: "In the context of computer networks, what does RTT stand for?",
        options: [
          "Real-Time Transfer",
          "Round Trip Time",
          "Remote Transfer Technology",
          "Reliable Transport Technique",
        ],
        answer: "Round Trip Time",
        explanation:
          "Round Trip Time (RTT) is the time it takes for a signal to be sent plus the time it takes for an acknowledgment of that signal to be received.",
        subject: "Computer Networks",
        difficulty: "Easy",
      },
      {
        id: 5,
        question: "Which of the following is true about virtual memory?",
        options: [
          "It increases the degree of multiprogramming",
          "It decreases the context switch time",
          "It is used only when RAM is full",
          "It decreases the overall system performance",
        ],
        answer: "It increases the degree of multiprogramming",
        explanation:
          "Virtual memory allows more processes to be loaded into memory by moving some of them to disk, thereby increasing the degree of multiprogramming.",
        subject: "Operating Systems",
        difficulty: "Medium",
      },
    ],
    2022: [
      {
        id: 1,
        question: "Which of the following is true about virtual memory?",
        options: [
          "It increases the degree of multiprogramming",
          "It decreases the context switch time",
          "It is used only when RAM is full",
          "It decreases the overall system performance",
        ],
        answer: "It increases the degree of multiprogramming",
        explanation:
          "Virtual memory allows more processes to be loaded into memory by moving some of them to disk, thereby increasing the degree of multiprogramming.",
        subject: "Operating Systems",
        difficulty: "Medium",
      },
      {
        id: 2,
        question:
          'What is the output of the following C code?\n\nint main() {\n  int x = 5;\n  printf("%d %d %d", x++, x++, x++);\n  return 0;\n}',
        options: ["5 6 7", "7 6 5", "5 5 5", "Undefined behavior"],
        answer: "Undefined behavior",
        explanation:
          "The behavior is undefined because the order of evaluation of function arguments is not specified in C.",
        subject: "Programming",
        difficulty: "Hard",
      },
      {
        id: 3,
        question: "Which of the following is NOT a principle of object-oriented programming?",
        options: ["Inheritance", "Encapsulation", "Normalization", "Polymorphism"],
        answer: "Normalization",
        explanation:
          "Normalization is a concept related to database design, not object-oriented programming. The principles of OOP are inheritance, encapsulation, polymorphism, and abstraction.",
        subject: "Object-Oriented Programming",
        difficulty: "Easy",
      },
    ],
    2021: [
      {
        id: 1,
        question: "What is the worst-case time complexity of quicksort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        answer: "O(n²)",
        explanation:
          "The worst-case time complexity of quicksort is O(n²), which occurs when the pivot chosen is always the smallest or largest element, resulting in highly unbalanced partitions.",
        subject: "Algorithms",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which of the following is a non-linear data structure?",
        options: ["Array", "Stack", "Queue", "Tree"],
        answer: "Tree",
        explanation:
          "Trees are non-linear data structures where elements are arranged in a hierarchical manner. Arrays, stacks, and queues are linear data structures.",
        subject: "Data Structures",
        difficulty: "Easy",
      },
    ],
  },

  // NET Exam Questions
  net: {
    2023: [
      {
        id: 1,
        question: "Which of the following is a characteristic of qualitative research?",
        options: ["Large sample size", "Statistical analysis", "In-depth interviews", "Hypothesis testing"],
        answer: "In-depth interviews",
        explanation:
          "Qualitative research typically involves in-depth interviews to gather detailed information about the subject being studied.",
        subject: "Research Methodology",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which of the following is NOT a measure of central tendency?",
        options: ["Mean", "Median", "Mode", "Standard Deviation"],
        answer: "Standard Deviation",
        explanation:
          "Standard deviation is a measure of dispersion or variability, not central tendency. Mean, median, and mode are measures of central tendency.",
        subject: "Statistics",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "In the context of teaching, what does the term 'pedagogy' refer to?",
        options: [
          "The study of children's behavior",
          "The method and practice of teaching",
          "The assessment of learning outcomes",
          "The design of classroom seating",
        ],
        answer: "The method and practice of teaching",
        explanation:
          "Pedagogy refers to the method and practice of teaching, especially as an academic subject or theoretical concept.",
        subject: "Education",
        difficulty: "Medium",
      },
    ],
    2022: [
      {
        id: 1,
        question: "Which of the following is NOT a type of validity in research?",
        options: ["Construct validity", "Content validity", "Concurrent validity", "Consequential validity"],
        answer: "Consequential validity",
        explanation:
          "Consequential validity is not a standard type of validity in research. The main types include construct, content, criterion (which includes concurrent and predictive), and face validity.",
        subject: "Research Methodology",
        difficulty: "Hard",
      },
      {
        id: 2,
        question: "Which of the following sampling methods is most likely to result in a representative sample?",
        options: ["Convenience sampling", "Quota sampling", "Simple random sampling", "Snowball sampling"],
        answer: "Simple random sampling",
        explanation:
          "Simple random sampling gives each member of the population an equal chance of being selected, which typically results in a more representative sample compared to non-probability methods like convenience, quota, or snowball sampling.",
        subject: "Research Methodology",
        difficulty: "Medium",
      },
    ],
  },

  // NIMCET Exam Questions
  nimcet: {
    2023: [
      {
        id: 1,
        question: "Which of the following is NOT a feature of DBMS?",
        options: ["Data independence", "Data integrity", "Data security", "Data programming"],
        answer: "Data programming",
        explanation:
          "Data programming is not a standard feature of DBMS. The main features include data independence, data integrity, data security, data sharing, and data consistency.",
        subject: "Database Management Systems",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: 'What is the output of the following code snippet?\n\nint x = 5;\nprintf("%d %d", x++, ++x);',
        options: ["5 7", "5 6", "6 7", "Undefined behavior"],
        answer: "Undefined behavior",
        explanation:
          "The behavior is undefined because the order of evaluation of function arguments is not specified in C, and x is being modified multiple times between sequence points.",
        subject: "Programming",
        difficulty: "Medium",
      },
    ],
    2022: [
      {
        id: 1,
        question: "Which of the following is NOT a valid state of a process?",
        options: ["Ready", "Running", "Blocked", "Finished"],
        answer: "Finished",
        explanation:
          "The standard states of a process are Ready, Running, Blocked (or Waiting), and Terminated (not Finished). Once a process is terminated, it is removed from the process table.",
        subject: "Operating Systems",
        difficulty: "Medium",
      },
    ],
  },

  // JEE Exam Questions
  jee: {
    2023: [
      {
        id: 1,
        question: "The value of lim(x→0) (sin x)/x is:",
        options: ["0", "1", "∞", "Does not exist"],
        answer: "1",
        explanation: "This is a well-known limit in calculus. As x approaches 0, the ratio of sin x to x approaches 1.",
        subject: "Mathematics",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which of the following is NOT a property of electromagnetic waves?",
        options: [
          "They can travel through vacuum",
          "They are transverse waves",
          "They require a medium for propagation",
          "Their speed in vacuum is constant",
        ],
        answer: "They require a medium for propagation",
        explanation:
          "Electromagnetic waves do not require a medium for propagation; they can travel through vacuum. This is unlike mechanical waves, which do require a medium.",
        subject: "Physics",
        difficulty: "Easy",
      },
    ],
    2022: [
      {
        id: 1,
        question: "The IUPAC name of CH₃-CH₂-CO-CH₃ is:",
        options: ["2-Butanone", "Butanal", "Butanoic acid", "Butanol"],
        answer: "2-Butanone",
        explanation:
          "The compound CH₃-CH₂-CO-CH₃ contains a ketone functional group (-CO-) at the second carbon, so its IUPAC name is 2-Butanone.",
        subject: "Chemistry",
        difficulty: "Medium",
      },
    ],
  },

  // CUET-UG Exam Questions
  "cuet-ug": {
    2023: [
      {
        id: 1,
        question: "Which of the following is NOT a work by Rabindranath Tagore?",
        options: ["Gitanjali", "The Guide", "The Home and the World", "Gora"],
        answer: "The Guide",
        explanation:
          "The Guide is a novel written by R.K. Narayan, not Rabindranath Tagore. Gitanjali, The Home and the World, and Gora are all works by Tagore.",
        subject: "English Literature",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which of the following is a renewable source of energy?",
        options: ["Coal", "Natural gas", "Solar energy", "Petroleum"],
        answer: "Solar energy",
        explanation:
          "Solar energy is a renewable source of energy as it is continuously replenished by the sun. Coal, natural gas, and petroleum are non-renewable fossil fuels.",
        subject: "Environmental Science",
        difficulty: "Easy",
      },
    ],
    2022: [
      {
        id: 1,
        question: "The Preamble to the Indian Constitution declares India as:",
        options: [
          "A sovereign democratic republic",
          "A sovereign socialist secular democratic republic",
          "A sovereign socialist republic",
          "A democratic republic",
        ],
        answer: "A sovereign socialist secular democratic republic",
        explanation:
          "The Preamble to the Indian Constitution, as amended by the 42nd Amendment in 1976, declares India as a sovereign socialist secular democratic republic.",
        subject: "Political Science",
        difficulty: "Medium",
      },
    ],
  },

  // CUET-PG Exam Questions
  "cuet-pg": {
    2023: [
      {
        id: 1,
        question: "Which of the following is NOT a characteristic of Big Data?",
        options: ["Volume", "Variety", "Velocity", "Visibility"],
        answer: "Visibility",
        explanation:
          "The three main characteristics of Big Data are often referred to as the 3Vs: Volume, Variety, and Velocity. Visibility is not one of the standard characteristics.",
        subject: "Computer Science",
        difficulty: "Medium",
      },
      {
        id: 2,
        question: "Which of the following is a supervised learning algorithm?",
        options: ["K-means clustering", "Principal Component Analysis", "Linear Regression", "Apriori algorithm"],
        answer: "Linear Regression",
        explanation:
          "Linear Regression is a supervised learning algorithm as it requires labeled data for training. K-means clustering, Principal Component Analysis, and Apriori algorithm are unsupervised learning algorithms.",
        subject: "Machine Learning",
        difficulty: "Medium",
      },
    ],
    2022: [
      {
        id: 1,
        question: "Which of the following is NOT a principle of management according to Henri Fayol?",
        options: ["Division of work", "Unity of command", "Scientific management", "Esprit de corps"],
        answer: "Scientific management",
        explanation:
          "Scientific management is a principle associated with Frederick Winslow Taylor, not Henri Fayol. Fayol's 14 principles include division of work, unity of command, and esprit de corps, among others.",
        subject: "Management",
        difficulty: "Hard",
      },
    ],
  },
}

/**
 * Information about each exam
 */
export const examInfo = {
  gate: {
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    color: "exam-questions-blue",
    years: [2023, 2022, 2021],
    description:
      "A national examination that tests the comprehensive understanding of undergraduate subjects in engineering and science for admission to postgraduate programs.",
    subjects: [
      "Algorithms",
      "Data Structures",
      "Operating Systems",
      "Computer Networks",
      "Programming",
      "Object-Oriented Programming",
    ],
  },
  net: {
    name: "NET",
    fullName: "National Eligibility Test",
    color: "exam-questions-purple",
    years: [2023, 2022],
    description:
      "Determines eligibility for assistant professor positions and Junior Research Fellowship in Indian universities and colleges.",
    subjects: ["Research Methodology", "Statistics", "Education"],
  },
  nimcet: {
    name: "NIMCET",
    fullName: "NIT MCA Common Entrance Test",
    color: "exam-questions-red",
    years: [2023, 2022],
    description: "Entrance Test for MCA in NITs.",
    subjects: ["Database Management Systems", "Programming", "Operating Systems"],
  },
  jee: {
    name: "JEE",
    fullName: "Joint Entrance Examination",
    color: "exam-questions-green",
    years: [2023, 2022],
    description: "Engineering entrance assessment conducted for admission to various engineering colleges in India.",
    subjects: ["Mathematics", "Physics", "Chemistry"],
  },
  "cuet-ug": {
    name: "CUET-UG",
    fullName: "Common University Entrance Test (UG)",
    color: "exam-questions-pink",
    years: [2023, 2022],
    description: "For: B.Sc. / B.Tech programs in central universities",
    subjects: ["English Literature", "Environmental Science", "Political Science"],
  },
  "cuet-pg": {
    name: "CUET-PG",
    fullName: "Common University Entrance Test (PG)",
    color: "exam-questions-yellow",
    years: [2023, 2022],
    description: "For: M.Sc.(in CS) / MCA programs in central universities",
    subjects: ["Computer Science", "Machine Learning", "Management"],
  },
}
