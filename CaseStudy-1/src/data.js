export const mockQuizzes = [
    {
        id: 1,
        title: "Javascript Fundamentals",
        description: "Test your knowledge of core Javascript concepts.",
        duration: 10, // minutes
        questions: [
            {
                id: 1,
                question: "What is the result of typeof null?",
                options: ["object", "null", "undefined", "number"],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which keyword is used to declare a block-scoped variable?",
                options: ["var", "let", "const", "Both let and const"],
                correctAnswer: 3
            },
            {
                id: 3,
                question: "What does NaN stand for?",
                options: ["Not a Number", "Node and Network", "New and Next", "None"],
                correctAnswer: 0
            }
        ]
    },
    {
        id: 2,
        title: "React Basics",
        description: "How well do you know React and JSX?",
        duration: 5,
        questions: [
            {
                id: 1,
                question: "What is the virtual DOM?",
                options: ["A direct copy of the DOM", "A lightweight representation of the DOM", "A database for components", "None of these"],
                correctAnswer: 1
            },
            {
                id: 2,
                question: "What is a React Hook?",
                options: ["A way to call CSS", "A function that lets you use state and other features", "A performance tool", "An event listener"],
                correctAnswer: 1
            }
        ]
    }
];

export const mockLeaderboard = [];
