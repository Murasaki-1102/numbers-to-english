import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const singleDigitNumbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teenNumbers = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const twoDigitNumbers = [
    "",
    "ten",
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const numbersToEnglish = () => {
    const targetNumber = [...value].map(Number);

    const digits = targetNumber.length;
    let currentDigit = digits;

    const englishWords: string[] = [];
    for (let i = 0; i < digits; i++) {
      const singleWord = singleDigitNumbers[targetNumber[i]];
      const twoDigitWord = twoDigitNumbers[targetNumber[i]];

      if (currentDigit === 5) {
        if (targetNumber[i + 1] === 0) {
          englishWords.push(twoDigitWord);
          currentDigit -= 1;
          continue;
        }

        if (targetNumber[i] === 1) {
          englishWords.push(teenNumbers[targetNumber[i + 1]]);
          currentDigit -= 1;
          continue;
        } else {
          englishWords.push(twoDigitWord);
          currentDigit -= 1;
          continue;
        }
      }

      if (currentDigit === 4) {
        if (targetNumber[i] !== 0 && targetNumber[i - 1] !== 1)
          englishWords.push(singleWord);

        englishWords.push("thousand");
        currentDigit -= 1;
        continue;
      }

      if (currentDigit === 3) {
        englishWords.push(singleWord);
        englishWords.push("hundred");
        currentDigit -= 1;
        continue;
      }

      if (currentDigit === 2) {
        if (targetNumber[i + 1] === 0) {
          englishWords.push(twoDigitWord);
          break;
        }

        if (targetNumber[i] === 1) {
          console.log(targetNumber[i], i, "hoge");
          englishWords.push(teenNumbers[targetNumber[i + 1]]);
          break;
        }

        englishWords.push(twoDigitWord);

        currentDigit -= 1;
        continue;
      }

      englishWords.push(singleWord);
      currentDigit -= 1;
    }

    setResult([...englishWords]);
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => setValue("")}>delete</button>
      <button onClick={numbersToEnglish}>toEnglish</button>
      <p>
        {result.join(" ").charAt(0).toUpperCase() + result.join(" ").slice(1)}
      </p>
    </div>
  );
}

export default App;
