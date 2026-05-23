import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAcademy } from "../lca/academy-context";
import { QUIZZES, resolveQuizId } from "../lca/data";
import { QuizRunner } from "../lca/quiz-games";
import { recordQuiz } from "../lib/store";

export const Route = createFileRoute("/_app/subject/$subjectId/$lessonId/quiz")(
	{ component: QuizRoute },
);

function QuizRoute() {
	const { subjectId, lessonId } = Route.useParams();
	const { refreshStats } = useAcademy();
	const navigate = useNavigate();
	const quiz = QUIZZES[resolveQuizId(lessonId)];

	// Returning to the lesson list replaces the quiz in history, so pressing
	// Back from there lands on the lesson intro rather than re-entering the quiz.
	const backToSubject = () =>
		navigate({
			to: "/subject/$subjectId",
			params: { subjectId },
			replace: true,
		});

	// Defensive: an unknown lesson has no quiz — bounce back to the list.
	useEffect(() => {
		if (!quiz)
			navigate({
				to: "/subject/$subjectId",
				params: { subjectId },
				replace: true,
			});
	}, [quiz, navigate, subjectId]);
	if (!quiz) return null;

	return (
		<QuizRunner
			quiz={quiz}
			onExit={backToSubject}
			onComplete={(result) => {
				recordQuiz({
					subjectId,
					lessonId,
					stars: result.stars,
					correct: result.correct,
					seconds: result.seconds,
				});
				refreshStats();
				backToSubject();
			}}
		/>
	);
}
