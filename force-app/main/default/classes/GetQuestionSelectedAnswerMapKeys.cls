/**
 * Created by mshkrepa on 11/16/2022.
 */

public with sharing class GetQuestionSelectedAnswerMapKeys {
    @InvocableMethod(label='Get all Map keys')
    public static GetKeysOutputs[] getKeys(GetKeysInputs[] input){
        string[] keySet = new string[]{};
        for(QuestionSelectedAnswerMap obj : input[0].flowMap){
            keySet.add(obj.questionId);
        }
        GetKeysOutputs obj = new GetKeysOutputs();
        obj.questionIdSet = keySet;
        GetKeysOutputs[] result = new GetKeysOutputs[]{};
        result.add(obj);
        return result;
    }
    /* Input(s) for Invocable method */
    public class GetKeysInputs{
        @InvocableVariable(label='Map' required=true)
        public QuestionSelectedAnswerMap[] flowMap;
    }

    /* Output(s) for Invocable method */
    public class GetKeysOutputs{
        @InvocableVariable(label='Map Keyset' required=true)
        public String[] questionIdSet;
    }
}