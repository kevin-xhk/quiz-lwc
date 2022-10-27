/**
 * Created by mshkrepa on 10/27/2022.
 */

public with sharing class QuestionsAndAnswersController {

    @AuraEnabled (Cacheable = true)
    public static Quiz__c getQuiz(){
        return [SELECT Id,Name from Quiz__c WHERE Name='The US President Quiz' ];
    }

    @AuraEnabled (Cacheable = true)
    public static Quiz_Question__c getQuizQuestion(){
        return [SELECT Name,(SELECT Name,IsCorrect__c FROM Quiz_Answers__r) from Quiz_Question__c WHERE Quiz__r.Name='The US President Quiz' ];
    }

    @AuraEnabled (Cacheable = true)
    public static List<Quiz_Answer__c> getQuestionAnswers(String questionName){
        return [SELECT Name,IsCorrect__c from Quiz_Answer__c WHERE Quiz_Question__r.Name=:questionName ];
    }

}