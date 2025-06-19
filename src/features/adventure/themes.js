export const chapterThemes = {
    1: { header: "#285030", title: "#5CA877", description: "#A4D4AE", backButton: "#8fffb1", levelSquare: "#7FC590", headerBorder: "#7FC590" },
    2: { header: "#2b5b51", title: "#3ee1d1", description: "#B7DAD5", backButton: "#76f6da", levelSquare: "#6FC7B8", headerBorder: "#6FC7B8" },
    3: { header: "#4E6A8A", title: "#7cbdff", description: "#D0E4F1", backButton: "#8cbbff", levelSquare: "#88B8DD", headerBorder: "#88B8DD" },
    4: { header: "#864122", title: "#ffad80", description: "#FFD1AF", backButton: "#ffa086", levelSquare: "#F3A474", headerBorder: "#F3A474" },
    5: { header: "#853737", title: "#ff8d71", description: "#F7B7A1", backButton: "#ff6666", levelSquare: "#E68060", headerBorder: "#E68060" },
    6: { header: "#285030", title: "#5CA877", description: "#A4D4AE", backButton: "#8fffb1", levelSquare: "#7FC590", headerBorder: "#7FC590" },
    7: { header: "#a84a4a", title: "#ecae67", description: "#F0E3B6", backButton: "#ffeeb1", levelSquare: "#E1C878", headerBorder: "#E1C878" },
    8: { header: "#935076", title: "#ffb3b3", description: "#ffc8c8", backButton: "#ffffff", levelSquare: "#E3E3E3", headerBorder: "#E3E3E3" },
    9: { header: "#5e5e5e", title: "#913b3b", description: "#E2C6A6", backButton: "#E2C6A6", levelSquare: "#B8976F", headerBorder: "#913b3b" },
    10: { header: "#791f0b", title: "#F2542D", description: "#FFB89B", backButton: "#8a8a8a", levelSquare: "#FF865D", headerBorder: "#FF865D" },
    11: { header: "#495b73", title: "#e0a945", description: "#EFE1CA", backButton: "#e0a945", levelSquare: "#e0a945", headerBorder: "#e0a945" },
    12: { header: "#3f3f3f", title: "#BCCCDC", description: "#E2EFF5", backButton: "#BCCCDC", levelSquare: "#D0E1EA", headerBorder: "#D0E1EA" },
    13: { header: "#8099a4", title: "#ccc264", description: "rgba(247,212,255,0.84)", backButton: "#ccc264", levelSquare: "#5E85AC", headerBorder: "#ccc264" },
    14: { header: "#f5e6ce", title: "#e17f2e", description: "#9BB8D1", backButton: "#e17f2e", levelSquare: "#507A9C", headerBorder: "#e17f2e" },
};

Object.keys(chapterThemes).forEach(key => {
    const theme = chapterThemes[key];
    chapterThemes[key] = {
        ...theme,
        quizBorder: theme.levelSquare,
        quizSelected: theme.title,
        quizCorrect: theme.backButton,
        quizIncorrect: "#ff4646",
        progressText: theme.title,
        progressBarBackground: theme.header,
        progressBarBorder: theme.levelSquare,
        progressBarFill: theme.backButton
    };
});