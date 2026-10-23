import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Brain, 
  Check, 
  X
} from 'lucide-react';
import { Lesson, QuizResult, UserProgress } from '../../types';
import { saveQuizResult, markLessonComplete } from '../../services/storage';

interface QuizViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onClose: () => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  lesson,
  progress,
  onClose,
  onUpdateProgress,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = lesson.quiz;
  const currentQ = questions[currentQuestionIdx];
  const hasSelected = selectedAnswers[currentQuestionIdx] !== undefined;
  const isLastQuestion = currentQuestionIdx === questions.length - 1;

  const handleSelectOption = (optIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIdx(prev => prev + 1);
      setShowExplanation(false);
    } else {
      // Calculate final score
      let score = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          score++;
        }
      });

      const passed = score >= Math.ceil(questions.length * 0.6);

      const result: QuizResult = {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        score,
        total: questions.length,
        passed,
        date: new Date().toISOString()
      };

      let updated = saveQuizResult(result, progress);
      if (passed) {
        updated = markLessonComplete(lesson.id, updated, 120);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      onUpdateProgress(updated);
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score if finished
  const calculateFinalScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#091024] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {!quizFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-sky-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  Quiz Challenge: {lesson.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>QUESTION {currentQuestionIdx + 1} OF {questions.length}</span>
                <span>{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-400 transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-xl font-bold text-white font-heading mb-6 leading-snug">
              {currentQ.question}
            </h4>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, oidx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === oidx;
                const isCorrect = oidx === currentQ.correctAnswer;
                
                let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60';

                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 shadow-sm shadow-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200 shadow-sm shadow-rose-500/20';
                  } else {
                    btnStyle = 'border-slate-800/50 bg-slate-900/20 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-sky-500 bg-sky-950/40 text-white';
                }

                return (
                  <button
                    key={oidx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(oidx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg border flex-shrink-0 flex items-center justify-center text-xs font-mono font-medium ${
                      showExplanation && isCorrect 
                        ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                        : showExplanation && isSelected 
                        ? 'border-rose-400 bg-rose-500 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + oidx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-slate-300 mb-6 animate-fadeIn">
                <span className="text-sky-300 font-semibold font-mono uppercase tracking-wide block mb-1">
                  Scientific Explanation:
                </span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer action */}
            <div className="flex justify-end pt-2">
              <button
                disabled={!showExplanation}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isLastQuestion ? 'Complete Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Score Summary */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-sky-500/25">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
              {calculateFinalScore() >= Math.ceil(questions.length * 0.6) 
                ? 'Mission Accomplished!' 
                : 'Knowledge Review Needed'}
            </h3>

            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              You scored <span className="font-mono font-bold text-sky-400 text-base">{calculateFinalScore()}</span> out of <span className="font-mono text-white">{questions.length}</span> questions correct.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 max-w-sm mx-auto mb-8 flex items-center justify-around">
              <div>
                <div className="text-xs font-mono text-slate-500">Status</div>
                <div className={`text-sm font-bold font-mono ${
                  calculateFinalScore() >= Math.ceil(questions.length * 0.6) ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {calculateFinalScore() >= Math.ceil(questions.length * 0.6) ? 'Passed' : 'Needs Practice'}
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div>
                <div className="text-xs font-mono text-slate-500">XP Earned</div>
                <div className="text-sm font-bold font-mono text-sky-400 flex items-center gap-1 justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{calculateFinalScore() >= Math.ceil(questions.length * 0.6) ? '120 XP' : '25 XP'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all shadow-md shadow-sky-500/20 cursor-pointer"
              >
                Back to Lesson
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
