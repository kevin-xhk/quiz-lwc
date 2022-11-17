/**
 * Created by mshkrepa on 11/16/2022.
 */

public with sharing class GetQuestionSelectedAnswerMapValues {
    @InvocableMethod(label='Get all Map values')
    public static GetValuesOutputs[] getValues(GetValuesInputs[] input){
        String[] records = new String[]{};
        for(QuestionSelectedAnswerMap obj : input[0].flowMap){
            records.add(obj.selectedAnswerId);
        }
        GetValuesOutputs obj = new GetValuesOutputs();
        obj.selectedAnswerIds = records;
        GetValuesOutputs[] result = new GetValuesOutputs[]{};
        result.add(obj);
        return result;
    }

    /* Input(s) for Invocable method */
    public class GetValuesInputs{
        @InvocableVariable(label='Map' required=true)
        public QuestionSelectedAnswerMap[] flowMap;
    }

    /* Output(s) for Invocable method */
    public class GetValuesOutputs{
        @InvocableVariable(label='Map Values' required=true)
        public String[] selectedAnswerIds;
    }
}