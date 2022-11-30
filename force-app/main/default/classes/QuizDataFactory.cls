@isTest
public with sharing class QuizDataFactory {

    // create 1 quiz, with 1 question and 'ansNum' answers,
    // the latter of which the first 'ansCorrect' are right.
    public static Qna getQnaOfSampleQuiz(Integer ansNum, Integer ansCorrect){
        Qna qna = new Qna();
        qna.quizId = QuizDataFactory.createQuiz();
        qna.questionId = QuizDataFactory.createQuestionByQuizId(qna.quizId);
        qna.answerIds = QuizDataFactory.createAnswersByQuestionId(qna.questionId, ansNum, ansCorrect);

        return qna;
    }
    
    public static String createQuiz(){
        String quizName = 'Test Quiz';
        Quiz__c quiz = new Quiz__c(Name = quizName, Threshold__c = 0);
        insert quiz;
        return [SELECT Id FROM Quiz__c WHERE Name = :quizName LIMIT 1].Id;
    }

    public static String createQuestionByQuizId(String quizId){
        String qDescr = 'Test Question';
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
            answers.add(new Quiz_Answer__c(Quiz_Question__c = qId, Description__c = 'Answer ' + i, isCorrect__c = correct));
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
    }
}
