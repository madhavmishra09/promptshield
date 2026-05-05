id = "sec01"
function detectPromptInjection(input) {
  let score = 0;
  const lower = input.toLowerCase();

  const patterns = [
    { regex: /ignore.*instruction/i, weight: 3 },
    { regex: /system prompt/i, weight: 3 },
    { regex: /bypass/i, weight: 2 },
    { regex: /developer mode/i, weight: 2 },
    { regex: /reveal/i, weight: 2 },
    { regex: /forget.*rules/i, weight: 2 }
  ];

  patterns.forEach(p => {
    if (p.regex.test(lower)) {
      score += p.weight;
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