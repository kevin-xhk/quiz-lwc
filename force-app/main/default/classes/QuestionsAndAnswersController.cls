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

    // flow method for calculating quiz points
    @InvocableMethod(label='Get Quiz Points' description='get amount of points scored based on questions answered.')
    public static Integer getQuizPoints(List<Id> ids) {
        List<Quiz_Answer__c> answers = [SELECT isCorrect__c FROM Quiz_Answer__c WHERE id IN :ids];

        Integer points;
        for(Quiz_Answer__c a : answers) {
            if(a.isCorrect__c){
                points++;
            }
        }

        return points;
    }
}