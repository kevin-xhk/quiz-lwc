// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

QuestionSelectedAnswerArray qna = new QuestionSelectedAnswerArray();
qna.questionId = 'a017a000008mZyWAAU';
qna.selectedAnswersId = new List<String>{'a007a00000AV0TtAAL', 'a007a00000AV0ToAAL'};
qna.isMarkedForReview = false;

QuestionSelectedAnswerArray[] qnaList = new QuestionSelectedAnswerArray[]{};
qnaList.add(qna);

System.debug(qnaList);
System.debug(QuestionsAndAnswersController.evaluateUserScore(qnaList));
 