/**
 * Created by mshkrepa on 11/16/2022.
 */

public with sharing class QuestionSelectedAnswerArrayBuilder {

    /**
    * Method responsible for creating the QuestionsSelectedAnswerArray that is to be used in the main flow
    * @param CreateArrayInputs[] :  Array of the inserted corresponding variables from the flow
    *
    * @return CreateArrayOutputs[]: Corresponding array of the mapped inputs classes
    */

    @InvocableMethod(label='Create Standard Question-Answers Array')
    public static CreateArrayOutputs[] createMap(CreateArrayInputs[] input){

        QuestionSelectedAnswerArray[] questionAnswersArray = new QuestionSelectedAnswerArray[]{};
        for(String questionIdInInput : input[0].questionIds){
            QuestionSelectedAnswerArray obj = new QuestionSelectedAnswerArray();
            obj.questionId = questionIdInInput;
            questionAnswersArray.add(obj);
        }
        Integer loopIndex=0;
        for(String questionIdInInput : input[0].questionIds) {
            questionAnswersArray.get(loopIndex).selectedAnswersId=QuestionsAndAnswersController.mapAnswersIdListToQuestions(questionIdInInput,input[0].selectedAnswersIds);
            loopIndex++;
        }
        loopIndex=0;
        for(Boolean markedForReviewValue : input[0].isMarkedForReviewValues){
            questionAnswersArray.get(loopIndex).isMarkedForReview=markedForReviewValue;
            loopIndex++;
        }
        CreateArrayOutputs obj = new CreateArrayOutputs();
        obj.questionAnswersArray = questionAnswersArray;

        CreateArrayOutputs[] result = new CreateArrayOutputs[]{};
        result.add(obj);
        return result;
    }

    /* Input(s) for Invocable method */
    public class CreateArrayInputs{
        @InvocableVariable(label='List of Question Ids')
        public String[] questionIds;
        @InvocableVariable(label='List of Selected Answers Ids')
        public String[] selectedAnswersIds;
        @InvocableVariable(label='List of Review Boolean Values')
        public Boolean[] isMarkedForReviewValues;
    }

    /* Output(s) for Invocable method */
    public class CreateArrayOutputs{
        @InvocableVariable(label='Question-Answers Array')
        public QuestionSelectedAnswerArray[] questionAnswersArray;
    }
}