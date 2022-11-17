/**
 * Created by mshkrepa on 11/16/2022.
 */

public with sharing class CreateQuestionSelectedAnswerMap {
    @InvocableMethod(label='Create Standard Id-Record Map')
    public static CreateMapOutputs[] createMap(CreateMapInputs[] input){

        QuestionSelectedAnswerMap[] flowMap = new QuestionSelectedAnswerMap[]{};
        for(String questionIdInInput : input[0].questionIds){
            QuestionSelectedAnswerMap obj = new QuestionSelectedAnswerMap();
            obj.questionId = questionIdInInput;
            flowMap.add(obj);
        }
        Integer loopIndex=0;
        for(String selectedAnswerIdInInput : input[0].selectedAnswerIds){
            flowMap.get(loopIndex).selectedAnswerId = selectedAnswerIdInInput;
            loopIndex++;
        }
        loopIndex=0;
        for(Boolean markedForReviewValue : input[0].isMarkedForReviewValues){
            flowMap.get(loopIndex).isMarkedForReview=markedForReviewValue;
            loopIndex++;
        }
        CreateMapOutputs obj = new CreateMapOutputs();
        obj.flowMap = flowMap;

        CreateMapOutputs[] result = new CreateMapOutputs[]{};
        result.add(obj);
        return result;
    }

    /* Input(s) for Invocable method */
    public class CreateMapInputs{
        @InvocableVariable(label='List of Question Ids')
        public String[] questionIds;
        @InvocableVariable(label='List of Selected Answer Ids')
        public String[] selectedAnswerIds;
        @InvocableVariable(label='List of Review Boolean Values')
        public Boolean[] isMarkedForReviewValues;
    }

    /* Output(s) for Invocable method */
    public class CreateMapOutputs{
        @InvocableVariable(label='Map')
        public QuestionSelectedAnswerMap[] flowMap;
    }
}