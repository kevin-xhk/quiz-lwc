
    // @Todo to fix. Commented because it causes error during pushing metadata
    // flow method for calculating quiz points
//    @InvocableMethod(label='Get Quiz Points' description='get amount of points scored based on questions answered.')
//    public static Integer getQuizPoints(List<Id> ids) {
//        List<Quiz_Answer__c> answers = [SELECT isCorrect__c FROM Quiz_Answer__c WHERE id IN :ids];
//
//        Integer points;
//        for(Quiz_Answer__c a : answers) {
//            if(a.isCorrect__c){
//                points++;
//            }
//        }
//
//        return points;
//    }
}
}