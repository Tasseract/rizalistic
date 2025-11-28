import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "What was Dr. José Rizal's profession?",
    options: ["Lawyer", "Ophthalmologist", "Engineer", "Priest"],
    correctAnswer: 1,
    explanation:
      "Rizal was an ophthalmologist (eye doctor). He studied medicine in Spain and specialized in ophthalmology in Germany, hoping to cure his mother's failing eyesight.",
  },
  {
    question: "Which novel by Rizal means 'Touch Me Not' in Latin?",
    options: [
      "El Filibusterismo",
      "Mi Último Adiós",
      "Noli Me Tangere",
      "Sa Aking Mga Kabata",
    ],
    correctAnswer: 2,
    explanation:
      "Noli Me Tangere (Touch Me Not) was Rizal's first novel, published in 1887. It exposed the abuses of Spanish colonial rule and sparked the Philippine reform movement.",
  },
  {
    question: "Where was Rizal executed on December 30, 1896?",
    options: ["Luneta (Bagumbayan)", "Fort Santiago", "Intramuros", "Calamba"],
    correctAnswer: 0,
    explanation:
      "Rizal was executed by firing squad at Bagumbayan (now Luneta/Rizal Park) in Manila. He was 35 years old. His execution galvanized the Philippine Revolution.",
  },
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    let message = "";
    if (percentage === 100) message = "Perfect! You're a Rizal expert!";
    else if (percentage >= 66) message = "Great job! You know your history!";
    else message = "Good effort! Learn more about Rizal's legacy.";

    return (
      <section id="quiz" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center bg-card border-border">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Quiz Complete!
            </h2>
            <div className="my-8">
              <div className="text-6xl font-bold text-accent mb-2">
                {score}/{questions.length}
              </div>
              <p className="font-lato text-xl text-muted-foreground">{message}</p>
            </div>
            <Button
              onClick={handleRestart}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-lato"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section id="quiz" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-4">
            Knowledge Check
          </h2>
          <p className="font-lato text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your understanding of Dr. José Rizal's life and legacy.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-8 bg-card border-border">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="secondary" className="font-lato">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <div className="font-lato text-sm text-muted-foreground">
              Score: {score}/{currentQuestion}
            </div>
          </div>

          <h3 className="font-playfair text-2xl font-semibold text-primary mb-6">
            {question.question}
          </h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all font-lato ${
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showIncorrect
                      ? "border-red-500 bg-red-50"
                      : isSelected
                      ? "border-accent bg-accent/10"
                      : "border-border bg-background hover:border-accent/50"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{option}</span>
                    {showCorrect && <CheckCircle2 className="text-green-500" />}
                    {showIncorrect && <XCircle className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-fade-in">
              <p className="font-lato text-sm text-foreground">
                <strong className="text-primary">Explanation:</strong>{" "}
                {question.explanation}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-lato"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-lato"
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default QuizSection;
