import { Card, List, ListItem, Radio, Range } from "konsta/react";

interface Question {
  id: string;
  question: string;
  type: "radio" | "slider" | "toggle";
  options?: string[];
  min?: number;
  max?: number;
}

interface QuestionnaireSectionProps {
  questions: Question[];
  answers: Record<string, string | number>;
  onAnswerChange: (questionId: string, answer: string | number) => void;
}

const QuestionnaireSection = ({ questions, answers, onAnswerChange }: QuestionnaireSectionProps) => {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id}>
          <div className="p-4">
            <div className="space-y-3">
              <div className="text-base font-medium">{question.question}</div>
              
              {question.type === "radio" && question.options && (
                <List strongIos outlineIos>
                  {question.options.map((option) => (
                    <ListItem
                      key={option}
                      label
                      title={option}
                      media={
                        <Radio
                          component="div"
                          value={option}
                          checked={answers[question.id]?.toString() === option}
                          onChange={() => onAnswerChange(question.id, option)}
                        />
                      }
                    />
                  ))}
                </List>
              )}
              
              {question.type === "slider" && (
                <div className="space-y-2">
                  <Range
                    value={Number(answers[question.id]) || question.min || 0}
                    min={question.min || 0}
                    max={question.max || 10}
                    step={1}
                    onInput={(e) => onAnswerChange(question.id, Number(e.target.value))}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{question.min || 0}</span>
                    <span className="font-medium text-gray-900">
                      {answers[question.id] || question.min || 0}
                    </span>
                    <span>{question.max || 10}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuestionnaireSection;
