/**
 * Created by mshkrepa on 11/14/2022.
 */

public with sharing class QuestionSelectedAnswerMap {
    @AuraEnabled public String questionId;
    @AuraEnabled public String  selectedAnswerId;
    @AuraEnabled public Boolean isMarkedForReview;
}