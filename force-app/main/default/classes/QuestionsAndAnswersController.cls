/**
 * Created by mshkrepa on 10/27/2022.
 */

public with sharing class QuestionsAndAnswersController {

    @AuraEnabled (Cacheable = true)
    public static Quiz_Question__c getQuizQuestion(String question_name){
        return [SELECT Name,(SELECT Id,Name FROM Quiz_Answers__r) from Quiz_Question__c WHERE Name=:question_name ];
    }

    // checks for answer correctness
    @AuraEnabled (Cacheable = true)
    public static Boolean verifyAnswer(Id ansId) {
        return [SELECT isCorrect__c FROM Quiz_Answer__c WHERE Id = :ansId].isCorrect__c;
    }

}