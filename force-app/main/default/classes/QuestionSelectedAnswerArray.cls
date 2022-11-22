/**
 * Created by mshkrepa on 11/14/2022.
 */

public with sharing class QuestionSelectedAnswerArray {
    @AuraEnabled public String questionId;
    @AuraEnabled public List<String> selectedAnswersId=new List<String>();
    @AuraEnabled public Boolean isMarkedForReview;
}