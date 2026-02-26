const INITIAL_RESOURCES = [
    {
        id: 1,
        title: 'Introduction to Algorithms',
        subject: 'Computer Science',
        department: 'Engineering',
        type: 'Textbook',
        rating: 4.8,
        description: 'A comprehensive guide to fundamental algorithms and data structures. Includes examples in Python and Java. Covered topics: Sorting, Searching, Graphs, Dynamic Programming.',
        tags: ['Algorithms', 'CS', 'Data Structures', 'Python'],
        thumb: '📘',
        uploader: 'Dr. John Smith',
        uploadDate: '2023-08-15',
        downloads: 1245,
        size: '15 MB',
        pages: 420,
        contentPreview: 'Chapter 1: Getting Started with Algorithms. An algorithm is a step-by-step procedure for solving a problem...',
        pdfUrl: 'mock-algo.pdf'
    },
    {
        id: 2,
        title: 'Calculus Vol 1',
        subject: 'Mathematics',
        department: 'Science',
        type: 'Notes',
        rating: 4.5,
        description: 'First semester calculus lecture notes covering limits, derivatives, and introduction to integration.',
        tags: ['Math', 'Calculus', 'Derivatives'],
        thumb: '📐',
        uploader: 'Prof. Alan Turing',
        uploadDate: '2023-09-01',
        downloads: 850,
        size: '5 MB',
        pages: 120,
        contentPreview: 'Lecture 1: The concept of a limit. We say that the limit of f(x) as x approaches c is L...',
        pdfUrl: 'mock-calc.pdf'
    },
    {
        id: 3,
        title: 'Physics Fundamentals',
        subject: 'Physics',
        department: 'Science',
        type: 'Video',
        rating: 4.2,
        description: 'Video lectures on classical mechanics, Newton\'s laws, and basic thermodynamics.',
        tags: ['Physics', 'Mechanics', 'Thermodynamics'],
        thumb: '⚛️',
        uploader: 'Dr. Marie Curie',
        uploadDate: '2023-10-12',
        downloads: 640,
        size: '1.2 GB',
        pages: 0,
        contentPreview: 'Video Overview: In this series, we explore the fundamental laws that govern the physical universe...',
        videoUrl: 'mock-video-url'
    },
    {
        id: 4,
        title: 'React Advanced Patterns',
        subject: 'Web Dev',
        department: 'Engineering',
        type: 'Video',
        rating: 4.9,
        description: 'Advanced react architecture, custom hooks, context API, and performance optimization techniques.',
        tags: ['React', 'Frontend', 'JavaScript'],
        thumb: '💻',
        uploader: 'Sarah Developer',
        uploadDate: '2024-01-05',
        downloads: 2100,
        size: '850 MB',
        pages: 0,
        contentPreview: 'In this course, we dive deep into advanced React patterns such as Compound Components and Render Props.',
        videoUrl: 'mock-react-video'
    },
    {
        id: 5,
        title: 'Organic Chemistry',
        subject: 'Chemistry',
        department: 'Science',
        type: 'Textbook',
        rating: 4.1,
        description: 'Detailed organic chemistry mechanisms, stereochemistry, and spectroscopy.',
        tags: ['Chemistry', 'Organic'],
        thumb: '🧪',
        uploader: 'Dr. Walter White',
        uploadDate: '2023-11-20',
        downloads: 420,
        size: '22 MB',
        pages: 650,
        contentPreview: 'Chapter 1: Structure and Bonding. Organic chemistry is the study of carbon compounds...',
        pdfUrl: 'mock-chem.pdf'
    },
    {
        id: 6,
        title: 'World History Notes',
        subject: 'History',
        department: 'Arts',
        type: 'Notes',
        rating: 4.6,
        description: 'Summary notes for world history midterms. Covers WW1, WW2, and the Cold War eras.',
        tags: ['History', 'World War', 'Cold War'],
        thumb: '🌍',
        uploader: 'Mr. History Buff',
        uploadDate: '2024-02-10',
        downloads: 950,
        size: '3 MB',
        pages: 45,
        contentPreview: 'Topic 1: Causes of World War I. Militarism, Alliances, Imperialism, and Nationalism (MAIN)...',
        pdfUrl: 'mock-history.pdf'
    },
    { id: 7, title: 'Linear Algebra Concepts', subject: 'Mathematics', department: 'Science', type: 'Video', rating: 4.8, description: 'Visualizing vectors, matrices, and transformations.', tags: ['Math', 'Algebra', 'Vectors'], thumb: '🔢', uploader: 'Prof. Grant', uploadDate: '2023-05-10', downloads: 3400, size: '2 GB', pages: 0, contentPreview: 'Vectors are often introduced as arrows pointing in space...', videoUrl: 'mock-linear.mp4' },
    { id: 8, title: 'Introduction to Psychology', subject: 'Psychology', department: 'Arts', type: 'Textbook', rating: 4.3, description: 'Core psychological theories, cognitive processes, and human behavior.', tags: ['Psychology', 'Behavior', 'Mind'], thumb: '🧠', uploader: 'Dr. Freud', uploadDate: '2024-01-20', downloads: 1200, size: '18 MB', pages: 500, contentPreview: 'Chapter 1: The Study of the Mind. Psychology emerged from philosophy...', pdfUrl: 'mock-psych.pdf' },
    { id: 9, title: 'Advanced CSS Animations', subject: 'Web Dev', department: 'Engineering', type: 'Video', rating: 4.7, description: 'Mastering keyframes, transitions, and performance optimization in CSS.', tags: ['CSS', 'Frontend', 'Design'], thumb: '🎨', uploader: 'Design Lead', uploadDate: '2023-11-05', downloads: 890, size: '450 MB', pages: 0, contentPreview: 'Animations add life to the web. Let us look at the transition property...', videoUrl: 'mock-css.mp4' },
    { id: 10, title: 'Machine Learning Basics', subject: 'Computer Science', department: 'Engineering', type: 'Textbook', rating: 4.9, description: 'Supervised and unsupervised learning, neural networks, and deep learning intro.', tags: ['AI', 'ML', 'Python'], thumb: '🤖', uploader: 'Dr. Ng', uploadDate: '2024-03-01', downloads: 5500, size: '30 MB', pages: 620, contentPreview: 'Machine Learning is the study of computer algorithms that improve automatically...', pdfUrl: 'mock-ml.pdf' },
    { id: 11, title: 'Macroeconomics Principles', subject: 'Economics', department: 'Business', type: 'Notes', rating: 4.4, description: 'Study of national and global economies, GDP, inflation, and monetary policy.', tags: ['Economics', 'Finance'], thumb: '📈', uploader: 'Prof. Keynes', uploadDate: '2023-12-15', downloads: 670, size: '4 MB', pages: 80, contentPreview: 'Macroeconomics looks at the whole economy. Key indicators include GDP...', pdfUrl: 'mock-econ.pdf' },
    { id: 12, title: 'Data Engineering Pipelines', subject: 'Computer Science', department: 'Engineering', type: 'Video', rating: 4.6, description: 'Building scalable data pipelines with Apache Kafka, Spark, and Airflow.', tags: ['Data Engineering', 'Big Data'], thumb: '⚙️', uploader: 'Data Architect', uploadDate: '2024-02-28', downloads: 1100, size: '1.5 GB', pages: 0, contentPreview: 'A robust data pipeline ensures data flows reliably from source to destination...', videoUrl: 'mock-data.mp4' },
    { id: 13, title: 'Modern Art History', subject: 'History', department: 'Arts', type: 'Notes', rating: 4.1, description: 'From Impressionism to contemporary digital art movements.', tags: ['Art', 'History', 'Culture'], thumb: '🖼️', uploader: 'Curator Smith', uploadDate: '2023-09-30', downloads: 320, size: '12 MB', pages: 150, contentPreview: 'Impressionism challenged the rigid rules of academic painting...', pdfUrl: 'mock-art.pdf' },
    { id: 14, title: 'Database Design Fundamentals', subject: 'Computer Science', department: 'Engineering', type: 'Textbook', rating: 4.7, description: 'Relational databases, SQL, normalization, and NoSQL alternatives.', tags: ['SQL', 'Database', 'Backend'], thumb: '🗄️', uploader: 'DBA Expert', uploadDate: '2023-08-01', downloads: 2200, size: '14 MB', pages: 350, contentPreview: 'Normalization is the process of organizing data to minimize redundancy...', pdfUrl: 'mock-db.pdf' },
    { id: 15, title: 'Thermodynamics & Kinetics', subject: 'Chemistry', department: 'Science', type: 'Video', rating: 4.5, description: 'Laws of thermodynamics, entropy, and reaction rates.', tags: ['Chemistry', 'Energy'], thumb: '🔥', uploader: 'Dr. Chem', uploadDate: '2024-01-10', downloads: 780, size: '900 MB', pages: 0, contentPreview: 'The First Law states that energy cannot be created or destroyed...', videoUrl: 'mock-thermo.mp4' },
    { id: 16, title: 'Business Ethics', subject: 'Business', department: 'Business', type: 'Notes', rating: 4.2, description: 'Corporate social responsibility, ethical leadership, and case studies.', tags: ['Business', 'Ethics', 'Management'], thumb: '⚖️', uploader: 'Prof. Moral', uploadDate: '2023-10-25', downloads: 450, size: '2 MB', pages: 60, contentPreview: 'Ethics in business goes beyond legal compliance; it involves doing what is right...', pdfUrl: 'mock-ethics.pdf' },
    { id: 17, title: 'Astrophysics Intro', subject: 'Physics', department: 'Science', type: 'Textbook', rating: 4.8, description: 'Stellar evolution, galaxies, dark matter, and cosmology.', tags: ['Space', 'Astrophysics', 'Stars'], thumb: '🌌', uploader: 'Dr. Tyson', uploadDate: '2024-04-05', downloads: 3100, size: '45 MB', pages: 800, contentPreview: 'A star is born when a massive cloud of gas and dust collapses under its own gravity...', pdfUrl: 'mock-astro.pdf' },
    { id: 18, title: 'UI/UX Principles', subject: 'Design', department: 'Arts', type: 'Video', rating: 4.9, description: 'User-centered design, prototyping in Figma, and usability testing.', tags: ['Design', 'UI', 'UX', 'Figma'], thumb: '✨', uploader: 'Design Pro', uploadDate: '2024-02-14', downloads: 4100, size: '1.1 GB', pages: 0, contentPreview: 'Good design is invisible. It solves user problems seamlessly...', videoUrl: 'mock-uiux.mp4' },
    { id: 19, title: 'Discrete Mathematics', subject: 'Mathematics', department: 'Science', type: 'Notes', rating: 4.3, description: 'Logic, set theory, combinatorics, and graph theory basics.', tags: ['Math', 'Logic', 'Discrete'], thumb: '🧮', uploader: 'Prof. Logic', uploadDate: '2023-07-20', downloads: 1500, size: '5 MB', pages: 110, contentPreview: 'A set is an unordered collection of distinct objects...', pdfUrl: 'mock-discrete.pdf' },
    { id: 20, title: 'Network Security', subject: 'Computer Science', department: 'Engineering', type: 'Textbook', rating: 4.6, description: 'Cryptography, firewalls, VPNs, and protecting against common cyber attacks.', tags: ['Security', 'Networking', 'Cyber'], thumb: '🛡️', uploader: 'SecOps Team', uploadDate: '2023-11-30', downloads: 2800, size: '20 MB', pages: 480, contentPreview: 'Cryptography is the practice of securing communication from adversaries...', pdfUrl: 'mock-netsec.pdf' },
    { id: 21, title: 'Creative Writing Workshop', subject: 'Literature', department: 'Arts', type: 'Video', rating: 4.7, description: 'Developing characters, structuring plots, and finding your voice.', tags: ['Writing', 'Creative', 'Literature'], thumb: '✍️', uploader: 'Author Jane', uploadDate: '2024-03-12', downloads: 920, size: '600 MB', pages: 0, contentPreview: 'A compelling character needs a clear goal and a flaw to overcome...', videoUrl: 'mock-writing.mp4' },
    { id: 22, title: 'Financial Accounting', subject: 'Business', department: 'Business', type: 'Textbook', rating: 4.4, description: 'Balance sheets, income statements, and cash flow analysis.', tags: ['Finance', 'Accounting', 'Business'], thumb: '💵', uploader: 'Prof. Ledger', uploadDate: '2023-08-22', downloads: 1350, size: '16 MB', pages: 300, contentPreview: 'The fundamental accounting equation is Assets = Liabilities + Equity...', pdfUrl: 'mock-acct.pdf' },
    { id: 23, title: 'Cellular Biology', subject: 'Biology', department: 'Science', type: 'Notes', rating: 4.5, description: 'Cell structure, organelle functions, and cellular respiration.', tags: ['Biology', 'Cells', 'Science'], thumb: '🦠', uploader: 'Dr. Bio', uploadDate: '2024-01-05', downloads: 880, size: '8 MB', pages: 140, contentPreview: 'The mitochondrion is known as the powerhouse of the cell due to ATP production...', pdfUrl: 'mock-cell.pdf' },
    { id: 24, title: 'Fullstack Next.js Guide', subject: 'Web Dev', department: 'Engineering', type: 'Video', rating: 4.9, description: 'Building full-stack apps with Next.js, App Router, and Prisma.', tags: ['Next.js', 'React', 'Fullstack'], thumb: '🚀', uploader: 'Vercel Dev', uploadDate: '2024-04-20', downloads: 5200, size: '2.5 GB', pages: 0, contentPreview: 'Next.js allows you to build scalable, SEO-friendly React applications seamlessly...', videoUrl: 'mock-next.mp4' },
    { id: 25, title: 'Philosophy 101', subject: 'Philosophy', department: 'Arts', type: 'Textbook', rating: 4.2, description: 'Introduction to ethics, epistemology, and metaphysics.', tags: ['Philosophy', 'Ethics', 'Thoughts'], thumb: '🤔', uploader: 'Socrates Jr', uploadDate: '2023-06-15', downloads: 600, size: '10 MB', pages: 250, contentPreview: 'Epistemology questions the very nature of human knowledge and belief...', pdfUrl: 'mock-phil.pdf' },
    { id: 26, title: 'Quantum Computing Intro', subject: 'Physics', department: 'Science', type: 'Notes', rating: 4.6, description: 'Qubits, entanglement, superposition, and quantum algorithms overview.', tags: ['Quantum', 'Physics', 'Computing'], thumb: '⚛️', uploader: 'Q-Researcher', uploadDate: '2024-03-25', downloads: 2100, size: '6 MB', pages: 95, contentPreview: 'A qubit can exist in a state of 0, 1, or any quantum superposition of these...', pdfUrl: 'mock-quantum.pdf' },
    { id: 27, title: 'Digital Marketing Strategies', subject: 'Business', department: 'Business', type: 'Video', rating: 4.5, description: 'SEO, SEM, social media marketing, and conversion rate optimization.', tags: ['Marketing', 'SEO', 'Business'], thumb: '📱', uploader: 'Marketing Guru', uploadDate: '2023-10-18', downloads: 1750, size: '850 MB', pages: 0, contentPreview: 'Understanding your target audience is the first step in any organic campaign...', videoUrl: 'mock-marketing.mp4' },
    { id: 28, title: 'Human Anatomy', subject: 'Biology', department: 'Science', type: 'Textbook', rating: 4.8, description: 'Detailed diagrams and systemic overviews of the human body.', tags: ['Anatomy', 'Medicine', 'Biology'], thumb: '🦴', uploader: 'Dr. House', uploadDate: '2023-12-01', downloads: 3400, size: '85 MB', pages: 1200, contentPreview: 'The skeletal system provides the structural framework for the human body...', pdfUrl: 'mock-anatomy.pdf' },
    { id: 29, title: 'Mobile App Dev with Flutter', subject: 'Computer Science', department: 'Engineering', type: 'Video', rating: 4.7, description: 'Cross-platform mobile development using Dart and Flutter widgets.', tags: ['Flutter', 'Mobile', 'Dart'], thumb: '📱', uploader: 'App Dev Inc', uploadDate: '2024-02-05', downloads: 2500, size: '1.8 GB', pages: 0, contentPreview: 'Everything in Flutter is a widget. Let us build our first material app...', videoUrl: 'mock-flutter.mp4' },
    { id: 30, title: 'Environmental Science', subject: 'Science', department: 'Science', type: 'Notes', rating: 4.4, description: 'Climate change, sustainability, and ecological conservation.', tags: ['Environment', 'Climate', 'Ecology'], thumb: '🌱', uploader: 'Suresh Varma', uploadDate: '2023-09-12', downloads: 820, size: '7 MB', pages: 130, contentPreview: 'Sustainability requires meeting present needs without compromising future generations...', pdfUrl: 'mock-env.pdf', status: 'Active' }
];

const INITIAL_USERS = [
    { id: 'U001', name: 'Nikhil Reddy', email: 'nikhil@student.edu', role: 'Student', status: 'Active', joined: '2023-08-15' },
    { id: 'U002', name: 'Dr. Srinivas Rao', email: 'srinivas@faculty.edu', role: 'Faculty', status: 'Active', joined: '2023-09-01' },
    { id: 'U003', name: 'Nikita Chowdary', email: 'nikita@student.edu', role: 'Student', status: 'Suspended', joined: '2023-10-12' },
    { id: 'U004', name: 'Ooha Sharma', email: 'ooha@student.edu', role: 'Student', status: 'Active', joined: '2024-01-05' },
    { id: 'U005', name: 'Sai Teja', email: 'sai@admin.edu', role: 'Admin', status: 'Active', joined: '2023-11-20' },
    { id: 'U006', name: 'Pradeep Kumar', email: 'pradeep@faculty.edu', role: 'Faculty', status: 'Active', joined: '2024-02-10' },
];

const INITIAL_FEEDBACK = [
    { id: 'FB001', user: 'Nikhil Reddy', role: 'Student', rating: 5, status: 'New', date: '2026-02-22', message: 'Excellent breakdown of React Hooks. Helped me immensely in my final project!' },
    { id: 'FB002', user: 'Dr. Srinivas Rao', role: 'Faculty', rating: 4, status: 'Reviewed', date: '2026-02-21', message: 'Solid notes on Calculus, but could use a few more examples for integration by parts.' },
    { id: 'FB003', user: 'Nikita Chowdary', role: 'Student', rating: 2, status: 'New', date: '2026-02-20', message: 'The Physics Lab PDF has some formatting issues on mobile devices.' },
    { id: 'FB004', user: 'Sai Teja', role: 'Admin', rating: 5, status: 'Resolved', date: '2026-02-19', message: 'The new resource upload limit is working perfectly.' },
    { id: 'FB005', user: 'Ooha Sharma', role: 'Student', rating: 1, status: 'New', date: '2026-02-18', message: 'I cannot find the semester code filters anymore. Help!' },
];

export const MOCK_COMMENTS = [
    { id: 101, resourceId: 1, user: 'Rakesh Verma', rating: 5, date: '2 days ago', text: 'This book saved my life for the midterms. Highly recommended!' },
    { id: 102, resourceId: 1, user: 'Bhavya Sri', rating: 4, date: '1 week ago', text: 'Great resource, but some of the graph examples are a bit hard to follow without prior knowledge.' },
    { id: 103, resourceId: 2, user: 'Karthik', rating: 5, date: '3 days ago', text: 'Limits finally make sense to me now.' },
    { id: 104, resourceId: 4, user: 'Divya', rating: 5, date: '1 day ago', text: 'The section on custom hooks is pure gold.' }
];

// Helper functions for Local Storage initialization and management
const initializeData = (key, data) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const getStoredResources = () => {
    initializeData('libraryItems', INITIAL_RESOURCES);
    return JSON.parse(localStorage.getItem('libraryItems'));
};

export const setStoredResources = (data) => {
    localStorage.setItem('libraryItems', JSON.stringify(data));
};

export const getStoredUsers = () => {
    initializeData('libraryUsers', INITIAL_USERS);
    return JSON.parse(localStorage.getItem('libraryUsers'));
};

export const setStoredUsers = (data) => {
    localStorage.setItem('libraryUsers', JSON.stringify(data));
};

export const getStoredFeedback = () => {
    initializeData('libraryFeedback', INITIAL_FEEDBACK);
    return JSON.parse(localStorage.getItem('libraryFeedback'));
};

export const setStoredFeedback = (data) => {
    localStorage.setItem('libraryFeedback', JSON.stringify(data));
};


export const getResourceById = (id) => {
    const resources = getStoredResources();
    return resources.find(r => r.id === parseInt(id));
};

export const getCommentsForResource = (id) => {
    return MOCK_COMMENTS.filter(c => c.resourceId === parseInt(id));
};
