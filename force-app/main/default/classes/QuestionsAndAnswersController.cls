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

}