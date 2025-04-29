export const stories = [
    // Newbie Level
    {
        id: 1,
        title: "My Weekend",
        description: "Weekend in my life.",
        level: "newbie",
        image: "/public/StoryCardGif/StoryCard1.gif",
        content: [
            { chinese: "今天是星期六。", english: "Today is Saturday." },
            { chinese: "我早上七点起床。", english: "I woke up at 7 in the morning." },
            { chinese: "我去公园跑步。", english: "I went running in the park." }
        ],
        lastRead: new Date()
    },
    {
        id: 2,
        title: "I like Cats",
        description: "A story about my cute kitten.",
        level: "newbie",
        image: "/public/StoryCardGif/StoryCard3.gif",
        content: [
            { chinese: "我有一只小猫。", english: "I have a kitten." },
            { chinese: "它的名字叫小白。", english: "Its name is Xiaobai." },
            { chinese: "它喜欢睡觉和吃鱼。", english: "It likes sleeping and eating fish." }
        ],
        lastRead: null
    },
    {
        id: 3,
        title: "A day at School",
        description: "A look at my school day.",
        level: "newbie",
        image: "/public/StoryCardGif/StoryCard4.gif",
        content: [
            { chinese: "我每天八点上学。", english: "I go to school at 8 every day." },
            { chinese: "我喜欢数学课。", english: "I like math class." },
            { chinese: "放学后我和朋友玩游戏。", english: "After school, I play games with my friends." }
        ],
        lastRead: null
    },

    // Explorer Level
    {
        id: 4,
        title: "China's Cuisine",
        description: "Exploring delicious Chinese food.",
        level: "explorer",
        image: "/public/StoryCardGif/StoryCard2.gif",
        content: [
            { chinese: "中国有很多美味的食物。", english: "China has many delicious foods." },
            { chinese: "我最喜欢的是火锅。", english: "My favorite is hot pot." },
            { chinese: "四川的火锅特别辣。", english: "Sichuan hot pot is especially spicy." }
        ],
        lastRead: null
    },
    {
        id: 5,
        title: "One trip",
        description: "My unforgettable Beijing trip.",
        level: "explorer",
        image: "/public/StoryCardGif/StoryCard5.gif",
        content: [
            { chinese: "去年我去了北京。", english: "Last year I went to Beijing." },
            { chinese: "我参观了长城和故宫。", english: "I visited the Great Wall and the Forbidden City." },
            { chinese: "这次旅行让我难忘。", english: "This trip was unforgettable." }
        ],
        lastRead: null
    },
    {
        id: 6,
        title: "I'm learning Chinese.",
        description: "My journey learning Chinese.",
        level: "explorer",
        image: "/public/StoryCardGif/StoryCard6.gif",
        content: [
            { chinese: "我从去年开始学中文。", english: "I started learning Chinese last year." },
            { chinese: "我每天学习一个小时。", english: "I study for one hour every day." },
            { chinese: "现在我可以说一些简单的话。", english: "Now I can say some simple sentences." }
        ],
        lastRead: null
    },

    // Sage Level
    {
        id: 7,
        title: "Chinese Festivals",
        description: "How Chinese people celebrate festivals.",
        level: "sage",
        image: "/public/StoryCardGif/StoryCard7.gif",
        content: [
            { chinese: "春节是中国最重要的节日。", english: "Spring Festival is the most important holiday in China." },
            { chinese: "人们会吃饺子，放鞭炮。", english: "People eat dumplings and set off firecrackers." },
            { chinese: "家人们团聚在一起过节。", english: "Families gather together to celebrate." }
        ],
        lastRead: null
    },
    {
        id: 8,
        title: "Environmental importance",
        description: "Why protecting the environment matters.",
        level: "sage",
        image: "/public/StoryCardGif/StoryCard8.gif",
        content: [
            { chinese: "环境保护对我们很重要。", english: "Environmental protection is important for us." },
            { chinese: "我们应该减少使用塑料。", english: "We should reduce the use of plastic." },
            { chinese: "多种树可以改善空气质量。", english: "Planting more trees can improve air quality." }
        ],
        lastRead: null
    },
    {
        id: 9,
        title: "Internet's impact",
        description: "How the internet affects our lives.",
        level: "sage",
        image: "/public/StoryCardGif/StoryCard9.gif",
        content: [
            { chinese: "互联网让我们的生活更方便。", english: "The internet makes our lives more convenient." },
            { chinese: "我们可以用手机购物、学习和工作。", english: "We can shop, study, and work with our phones." },
            { chinese: "但也要注意保护个人信息。", english: "But we should also protect our personal information." }
        ],
        lastRead: null
    },

    // Grand Master Level
    {
        id: 10,
        title: "Confucian Thought",
        description: "Confucius and his lasting philosophy.",
        level: "grand master",
        image: "/public/StoryCardGif/StoryCard10.gif",
        content: [
            { chinese: "孔子是中国古代伟大的思想家。", english: "Confucius was a great ancient Chinese thinker." },
            { chinese: "他的思想影响了中国几千年。", english: "His ideas have influenced China for thousands of years." },
            { chinese: "他提倡“仁”和“礼”的道德观念。", english: "He advocated moral concepts like 'benevolence' and 'ritual'." }
        ],
        lastRead: null
    },
    {
        id: 11,
        title: "Chinese Medicine vs. Western Medicine",
        description: "Chinese medicine is better than Western medicine?",
        level: "grand master",
        image: "/public/StoryCardGif/StoryCard11.gif",
        content: [
            { chinese: "中医注重整体调理和预防。", english: "Chinese medicine emphasizes holistic regulation and prevention." },
            { chinese: "西医则侧重于病症的快速治疗。", english: "Western medicine focuses on quick treatment of symptoms." },
            { chinese: "两者结合能带来更好的治疗效果。", english: "Combining both can bring better treatment results." }
        ],
        lastRead: null
    },
    {
        id: 12,
        title: "The Future of AI",
        description: "AI's role in shaping our future.",
        level: "grand master",
        image: "/public/StoryCardGif/StoryCard12.gif",
        content: [
            { chinese: "人工智能正在改变世界。", english: "Artificial intelligence is changing the world." },
            { chinese: "它在医疗、教育、交通等领域广泛应用。", english: "It is widely used in healthcare, education, and transportation." },
            { chinese: "我们也需要思考它带来的伦理问题。", english: "We also need to consider the ethical issues it brings." }
        ],
        lastRead: null
    }
];
