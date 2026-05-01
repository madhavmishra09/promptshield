id = "sec01"
function detectPromptInjection(input) {
    let score = 0;
    const patterns = [
        {
            keyword: "ignore previous instructions",
            weight: 3
        },
        {
            keyword: "system prompt",
            weight: 3
        },
        {
            keyword: "bypass",
            weight: 2
        },
        {
            keyword: "developer mode",
            weight: 2
        },
        {
            keyword: "reveal",
            weight: 2
        }
    ];
    patterns.forEach(pattern => {
        if (input.toLowerCase().includes(pattern.keyword)) {
            score += pattern.weight;
        }
    });
    return score;
}

function sanitizeInput(input) {
    return input
        .replace(/ignore previous instructions/gi, "")
        .replace(/system prompt/gi, "")
        .replace(/bypass/gi, "")
        .replace(/developer mode/gi, "")
        .replace(/reveal/gi, "");
}

module.exports = {
    detectPromptInjection,
    sanitizeInput
};  