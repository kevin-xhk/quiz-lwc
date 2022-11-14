/**
 * Created by mshkrepa on 11/14/2022.
 */

public with sharing class QuestionSelectedAnswerMap {
    @AuraEnabled public List<String> questionId;
    @AuraEnabled public List<String>  selectedAnswerId;
}