/**
 * Created by mshkrepa on 10/27/2022.
 */

public with sharing class QuestionsAndAnswersController {

    @AuraEnabled (Cacheable = true)
    public static Quiz_Question__c getQuizQuestion(String question_name){
        return [SELECT Description__c,(SELECT Id,Description__c FROM Quiz_Answers__r) from Quiz_Question__c WHERE Description__c=:question_name ];
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

    // checks for answer correctness
    @AuraEnabled (Cacheable = true)
    public static Boolean verifyAnswer(Id ansId) {
        return [SELECT isCorrect__c FROM Quiz_Answer__c WHERE Id = :ansId].isCorrect__c;
    }

    public static List<String> mapAnswersIdListToQuestions(String questionId,String[] selectedAnswersId){
        List<Quiz_Answer__c> answersBasedOnParameterIds=[SELECT (SELECT Id FROM Quiz_Answers__r WHERE Id IN :selectedAnswersId) FROM Quiz_Question__c WHERE Id=:questionId].Quiz_Answers__r;
        List<String> answersIdsToBeReturned=new List<String>();
        for(Quiz_Answer__c quizAnswer : answersBasedOnParameterIds){
            answersIdsToBeReturned.add(quizAnswer.Id);
        }
        return answersIdsToBeReturned;
    }

}