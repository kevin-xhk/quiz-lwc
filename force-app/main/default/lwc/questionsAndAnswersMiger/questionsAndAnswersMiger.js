/**
 * Created by mshkrepa on 10/26/2022.
 */

import {LightningElement, track} from 'lwc';
import getQuizQuestion from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestion';

export default class QuestionsAndAnswersMiger extends LightningElement {

    @track question;
    @track firstAnswer;
    @track secondAnswer;
    @track thirdAnswer;
    @track fourthAnswer;
    @track selectedAnswer;
    @track firstAnswerValue;
    @track secondAnswerValue;
    @track thirdAnswerValue;
    @track fourthAnswerValue;
    @track selectedAnswer;

    connectedCallback(){
        getQuizQuestion()
            .then(data=>{
                this.question=data.Name;
                this.firstAnswer=data.Quiz_Answers__r[0].Name;
                this.firstAnswerValue=data.Quiz_Answers__r[0].Id;
                this.secondAnswer=data.Quiz_Answers__r[1].Name;
                this.secondAnswerValue=data.Quiz_Answers__r[1].Id;
                this.thirdAnswer=data.Quiz_Answers__r[2].Name;
                this.thirdAnswerValue=data.Quiz_Answers__r[2].Id;
                this.fourthAnswer=data.Quiz_Answers__r[3].Name;
                this.fourthAnswerValue=data.Quiz_Answers__r[3].Id;
            }).catch(error => {
            console.log("ERROR / imperative apex call / getQuizQuestion: " + JSON.stringify(error))
        });
    }

    selectedAnswerEvent(event){
        this.selectedAnswer=event.target.value;
    }

}