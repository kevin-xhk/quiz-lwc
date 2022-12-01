@isTest
private with sharing class QuestionSelectedAnswerArrayBuilder_TEST {
    
    @isTest
    static void testCreateMap(){
        // GIVEN
        QuestionSelectedAnswerArrayBuilder.CreateArrayInputs[] input = QuizDataFactory.createInputsForArray();

        // WHEN
        QuestionSelectedAnswerArrayBuilder.CreateArrayOutputs[] result = QuestionSelectedAnswerArrayBuilder.createMap(input);

        // THEN
        System.assertEquals(input[0].questionIds.size(), result[0].questionAnswersArray.size(), 'number of qna do not match.');
    }

    @isTest
    static void testCreateMapEmpty(){
        // GIVEN
        QuestionSelectedAnswerArrayBuilder.CreateArrayInputs[] input = new List<QuestionSelectedAnswerArrayBuilder.CreateArrayInputs>{};

        // WHEN
        Exception error;
        try {
            QuestionSelectedAnswerArrayBuilder.CreateArrayOutputs[] result = QuestionSelectedAnswerArrayBuilder.createMap(input);
        } catch (Exception e) {
            error = e;
        }

        // THEN
        System.assertEquals('System.ListException', error.getTypeName(), 'exception type names do not match.');
        System.assertEquals('List index out of bounds: 0', error.getMessage(), 'exception messages do not match.');
        
    }
}
