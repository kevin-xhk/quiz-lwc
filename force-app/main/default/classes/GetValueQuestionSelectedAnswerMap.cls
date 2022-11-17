/**
 * Created by mshkrepa on 11/16/2022.
 */

public with sharing class GetValueQuestionSelectedAnswerMap {
    @InvocableMethod(label='Get Value from a Map key')
    public static GetValueOutputs[] getValue(getValueInputs[] input	){
        GetValueOutputs[] result = new GetValueOutputs[]{};

        for(QuestionSelectedAnswerMap loopObj : input[0].flowMap){
            if(loopObj.selectedAnswerId == input[0].questionId){
                GetValueOutputs obj = new GetValueOutputs();
                obj.selectedAnswerId = loopObj.selectedAnswerId;
                result.add(obj);
            }
        }

        return result;
    }

    public class GetValueInputs{
        @InvocableVariable(label='Key' required=true)
        public String questionId;
        @InvocableVariable(label='Map' required=true)
        public QuestionSelectedAnswerMap[] flowMap;
    }

    public class GetValueOutputs{
        @InvocableVariable(label='Value' required=true)
        public String selectedAnswerId;
    }
}