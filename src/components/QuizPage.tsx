import { useEffect, useState } from "react";
import Option from "./Option";
import { getQuestions } from "../services";

interface Question {
  id: number;
  question: string;
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e: string | null;
    answer_f: string | null;
  };
  multiple_correct_answers: string;
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
    answer_e_correct: string;
    answer_f_correct: string;
  };
}

export default function QuizPage({
  category,
  callback,
}: {
  category: string;
  callback: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  useEffect(() => {
    getQuestions(category).then((data) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, [category]);

  if (isLoading) {
    return <h2>Loading questions please wait...</h2>;
  }

  return (
    <div className="mt-10 text-start flex flex-col gap-4 max-w-3xl mx-auto px-5">
      <button type="button" className="mx-auto" onClick={callback}>
        back to home
      </button>
      <h2 className="font-bold text-lg ">Question {questionIndex + 1}</h2>
      <p>{questions[questionIndex].question}</p>
      <ul className="flex flex-col gap-2">
        {Object.entries(questions[questionIndex].answers).map(
          ([key, value], index) => {
            if (value) {
              if (showAnswers) {
                return (
                  <Option
                    key={index}
                    content={value}
                    isCorrect={
                      questions[questionIndex].correct_answers[
                      `${key}_correct` as keyof Question["correct_answers"]
                      ] === "true"
                    }
                  />
                );
              } else {
                return <Option key={index} content={value} />;
              }
            } else return null;
          },
        )}
      </ul>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="border rounded p-2"
          onClick={() => {
            setShowAnswers(false);
            setQuestionIndex((value) => {
              return (value - 1 + questions.length) % questions.length;
            });
          }}
        >
          previous
        </button>
        <button
          className="border rounded p-2"
          onClick={() => setShowAnswers((value) => !value)}
        >
          show answer
        </button>
        <button
          className="border rounded p-2"
          onClick={() => {
            setShowAnswers(false);
            setQuestionIndex((value) => {
              return (value + 1) % questions.length;
            });
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}
