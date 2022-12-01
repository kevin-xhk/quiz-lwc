@isTest
public with sharing class QuizDataFactory {

    // TODO: make it create a dynamic nr of qna's, right now creates
    // 3 quizzes with 1 question each, of which have 3 answers (2C, 1W)
    public static QuestionSelectedAnswerArrayBuilder.CreateArrayInputs[] createInputsforArray(){
        // create qna objs
        QuizDataFactory.Qna qna0 = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong
        QuizDataFactory.Qna qna1 = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong        
        QuizDataFactory.Qna qna2 = QuizDataFactory.getQnaOfSampleQuiz(3, 2); // 0,1 are right, 2 is wrong

        // add question Ids in generic list
        List<String> questionIds = new List<String>();
        questionIds.add(qna0.questionId);
        questionIds.add(qna1.questionId);
        questionIds.add(qna2.questionId);

        // add answer ids in generic list
        List<String> answerIds = new List<String>();
        for(String a : qna0.answerIds) {
            answerIds.add(a);
        }
        for(String a : qna1.answerIds) {
            answerIds.add(a);
        }
        for(String a : qna2.answerIds) {
            answerIds.add(a);
        }

        // add review marks in generic list
        List<Boolean> reviewMarks = new List<Boolean>();
        reviewMarks.add(qna0.markedForReview);
        reviewMarks.add(qna1.markedForReview);
        reviewMarks.add(qna2.markedForReview);

        // wrap input
        QuestionSelectedAnswerArrayBuilder.CreateArrayInputs[] input = new List<QuestionSelectedAnswerArrayBuilder.CreateArrayInputs> {
            new QuestionSelectedAnswerArrayBuilder.CreateArrayInputs()
        };
        input[0].questionIds = questionIds;
        input[0].selectedAnswersIds = answerIds;
        input[0].isMarkedForReviewValues = reviewMarks;

        return input;
    }

    // create 1 quiz, with 1 question and 'ansNum' answers,
    // the latter of which the first 'ansCorrect' are right.
    public static Qna getQnaOfSampleQuiz(Integer ansNum, Integer ansCorrect){
        Qna qna = new Qna();
        qna.quizId = QuizDataFactory.createQuiz();
        qna.questionId = QuizDataFactory.createQuestionByQuizId(qna.quizId);
        qna.answerIds = QuizDataFactory.createAnswersByQuestionId(qna.questionId, ansNum, ansCorrect);
        qna.markedForReview = false;

        return qna;
    }
    
    public static String createQuiz(){
        String quizName = 'Test Quiz';
        Quiz__c quiz = new Quiz__c(Name = quizName, Threshold__c = 0);
        insert quiz;
        return [SELECT Id FROM Quiz__c WHERE Name = :quizName LIMIT 1].Id;
    }

    public static String createQuestionByQuizId(String quizId){
        String qDescr = 'Test Question ' + String.valueOf(System.now().getTime());
        Quiz_Question__c question = new Quiz_Question__c(Description__c = qDescr, Quiz__c = quizId);
        insert question;
        return [SELECT Id, Description__c FROM Quiz_Question__c WHERE Description__c = :qDescr LIMIT 1].Id;
    }

    public static List<String> createAnswersByQuestionId(String qId, Integer ansNum, Integer ansCorrect){
        // input safety
        if(ansCorrect > ansNum){
            ansNum = ansCorrect;
        }
        
        List<Quiz_Answer__c> answers = new List<Quiz_Answer__c>();
        for(Integer i = 0; i < ansNum; i++){
            Boolean correct = (i < ansCorrect);
            answers.add(new Quiz_Answer__c(Quiz_Question__c = qId, Description__c = 'Test Answer ' + String.valueOf(System.now().getTime()) + i, isCorrect__c = correct));
        }
        insert answers;

        List<String> aIds = new List<String>();
        for(Quiz_Answer__c ans : [SELECT Id FROM Quiz_Answer__c WHERE Quiz_Question__c = :qId]){
            aIds.add(Id.valueOf(ans.Id));
        }

        return aIds;
    }

    // wrapping class
    public class Qna {
        public String quizId;
        public String questionId;
        public List<String> answerIds;
        public Boolean markedForReview;
    }
}
