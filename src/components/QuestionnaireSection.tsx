import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

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
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">{question.question}</Label>
              
              {question.type === "radio" && question.options && (
                <RadioGroup
                  value={answers[question.id]?.toString()}
                  onValueChange={(value) => onAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label htmlFor={`${question.id}-${option}`} className="font-normal cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === "slider" && (
                <div className="space-y-2">
                  <Slider
                    value={[Number(answers[question.id]) || question.min || 0]}
                    onValueChange={(value) => onAnswerChange(question.id, value[0])}
                    min={question.min || 0}
                    max={question.max || 10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{question.min || 0}</span>
                    <span className="font-medium text-foreground">
                      {answers[question.id] || question.min || 0}
                    </span>
                    <span>{question.max || 10}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuestionnaireSection;
