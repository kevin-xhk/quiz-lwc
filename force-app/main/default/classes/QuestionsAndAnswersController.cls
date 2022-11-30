/**
 * Created by mshkrepa on 10/27/2022.
 */

public with sharing class QuestionsAndAnswersController {

    @AuraEnabled (Cacheable = true)
    public static Quiz_Question__c getQuizQuestion(String question_name){
        return [SELECT Description__c,(SELECT Id,Description__c FROM Quiz_Answers__r) FROM Quiz_Question__c WHERE Description__c=:question_name];
    }

    @AuraEnabled (Cacheable = true)
    public static Quiz_Question__c getQuizQuestionById(String id) {
        return [
                SELECT Description__c,
                (
                        SELECT Id, Description__c
                        FROM Quiz_Answers__r
                )
                FROM Quiz_Question__c
                WHERE Id = :id
        ];
    }
    

    public static List<String> mapAnswersIdListToQuestions(String questionId,String[] selectedAnswersId){
        List<Quiz_Answer__c> answersBasedOnParameterIds=[SELECT (SELECT Id FROM Quiz_Answers__r WHERE Id IN :selectedAnswersId) FROM Quiz_Question__c WHERE Id=:questionId].Quiz_Answers__r;
        List<String> answersIdsToBeReturned=new List<String>();
        for(Quiz_Answer__c quizAnswer : answersBasedOnParameterIds){
            answersIdsToBeReturned.add(quizAnswer.Id);
        }
        return answersIdsToBeReturned;
    }

    @AuraEnabled
    public static Boolean verifyUserAnswers(String questionId, List<String> answerIds){

        // wrap qId and aIds in QuestionSelectedAnswerArray obj
        QuestionSelectedAnswerArray qna = new QuestionSelectedAnswerArray();
        qna.questionId = questionId;
        qna.selectedAnswersId = answerIds;
        qna.isMarkedForReview = false;

        // wrap qna in UserSubmittedAnswers
        UserSubmittedAnswers usa = new UserSubmittedAnswers();
        usa.qnaList = new List<QuestionSelectedAnswerArray>();
        usa.qnaList.add(qna);

        // wrap single obj in List for InvocableMethod
        List<UserSubmittedAnswers> input = new List<UserSubmittedAnswers>();
        input.add(usa);

        return (QuestionsAndAnswersController.evaluateUserScore(input)[0].score == 1);

    }

    // flow apex action - evaluate points of user based on their answers
    @InvocableMethod(label='Evaluate user points for questionSelectedAnswers passed')
    public static List<UserScore> evaluateUserScore(List<UserSubmittedAnswers> input){

        List<UserScore> output = new List<UserScore>{};
        UserScore userScore = new userScore();
        userScore.score = 0;
        output.add(userScore);

        for(QuestionSelectedAnswerArray qna : input[0].qnaList){
            if(isQuestionUserAnswersCorrect(qna)){
                output[0].score++;
            }
        }

        return output;
    }

    // helper - evaluates if a single question is answered correctly
    private static Boolean isQuestionUserAnswersCorrect(QuestionSelectedAnswerArray qna){

        // get ids of correct answers
        Set<Id> correctAnswerIds = new Map<Id, Quiz_Answer__c> ([
            SELECT Description__c, (SELECT Id, Description__c, isCorrect__c FROM Quiz_Answers__r WHERE isCorrect__c = true)
            FROM Quiz_Question__c
            WHERE Id=:qna.questionId
        ].Quiz_Answers__r).keySet().clone();
        
        // if all selected answers match correct answers, sets should be of the same size
        // first set should be empty when removing matching entries
        Set<Id> userAnswerIds = new Set<Id>( (List<Id>)qna.selectedAnswersId );
        if(correctAnswerIds.size() != userAnswerIds.size()){
            return false;
        }
        correctAnswerIds.removeAll(userAnswerIds);

        return correctAnswerIds.isEmpty();
    }

    // internal class to wrap invocable method input
    public class UserSubmittedAnswers {
        @InvocableVariable(label='List of QuestionSelectedAnswerArray')
        public List<QuestionSelectedAnswerArray> qnaList;
    }

    // internal class to wrap invocable method output
    public class UserScore {
        @InvocableVariable(label='User Score')
        public Integer score;
    }
}