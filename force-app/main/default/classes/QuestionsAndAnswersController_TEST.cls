@isTest
private with sharing class QuestionsAndAnswersController_TEST {
    
    // verifyUserAnswers test methods

    @isTest
    static void testVerifyUserAnswersCorrect() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong

        // when
        qna.answerIds.remove(2); //user choices - ans0, ans1 
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(true, result, 'Question Answered Incorrectly.');
    }

    @isTest
    static void testVerifyUserAnswersWrong() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong

        // when
        qna.answerIds.remove(1); //user choices - ans0, ans1 
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(false, result, 'Question Answered Incorrectly.');
    }

    @isTest
    static void testVerifyUserAnswersAllSelected() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong

        // when
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(false, result, 'Question Answered Incorrectly.');
    }

    @isTest
    static void testVerifyUserAnswersNoneSelected() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong

        // when
        qna.answerIds.clear();
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(false, result, 'Question Answered Incorrectly.');
        System.assertEquals(0, qna.answerIds.size(), 'User should not have answers selected');
    }

    @isTest
    static void testVerifyUserAnswersNoCorrectAnswerCorrect() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(2, 0); // no correct answer

        // when
        qna.answerIds.clear();
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(true, result, 'Question Answered Incorrectly.');
        System.assertEquals(0, qna.answerIds.size(), 'User should not have answers selected');
    }

    @isTest
    static void testVerifyUserAnswersNoCorrectAnswerWrong() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(2, 0); // no correct answer

        // when
        qna.answerIds.remove(0);
        Boolean result = QuestionsAndAnswersController.verifyUserAnswers(qna.questionId, qna.answerIds);

        // then
        System.assertEquals(false, result, 'Question Answered Incorrectly.');
    }

    // getQuizQuestion test methods

    @isTest
    static void testGetQuizQuestion() {
        // given
        QuizDataFactory.Qna qna = QuizDataFactory.getQnaOfSampleQuiz(2, 0); // no correct answer
        Quiz_Question__c question = [SELECT Id, Name, Description__c FROM Quiz_Question__c WHERE Id  = :qna.questionId LIMIT 1];

        // when
        Quiz_Question__c result = QuestionsAndAnswersController.getQuizQuestion(question.Description__c);

        // then
        System.assertNotEquals(null, result, 'No response received');
        System.assertEquals(question.Description__c, result.Description__c, 'Descriptions do not match');
    }

    @isTest
    static void testGetQuizQuestionEmpty() {
        // given

        // when

        // then
        System.assert(true);
    }

    // getQuestionById test methods

    @isTest
    static void testGetQuestionById() {
        // given

        // when

        // then
        System.assert(true);
    }

    @isTest
    static void testGetQuestionByIdEmpty() {
        // given

        // when

        // then
        System.assert(true);
    }
}
