@isTest
private with sharing class CreateQuestionSelectedAnswerArray_TEST {
    
    @isTest
    static void testCreateMap(){
        // GIVEN
        CreateQuestionSelectedAnswerArray.CreateArrayInputs[] input = QuizDataFactory.createInputsForArray();

        // WHEN
        CreateQuestionSelectedAnswerArray.CreateArrayOutputs[] result = CreateQuestionSelectedAnswerArray.createMap(input);

        // THEN
        System.assertEquals(input[0].questionIds.size(), result[0].questionAnswersArray.size(), 'number of qna do not match.');
    }

    @isTest
    static void testCreateMapEmpty(){
        // GIVEN
        CreateQuestionSelectedAnswerArray.CreateArrayInputs[] input = new List<CreateQuestionSelectedAnswerArray.CreateArrayInputs>{};

        // WHEN
        Exception error;
        try {
            CreateQuestionSelectedAnswerArray.CreateArrayOutputs[] result = CreateQuestionSelectedAnswerArray.createMap(input);
        } catch (Exception e) {
            error = e;
        }

        // THEN
        System.assertEquals('System.ListException', error.getTypeName(), 'exception type names do not match.');
        System.assertEquals('List index out of bounds: 0', error.getMessage(), 'exception messages do not match.');
        
    }
}
