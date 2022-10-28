import { LightningElement, wire, track } from 'lwc';
import getQuizQuestion from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestion';
import { publish, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';


export default class QuestionsAndAnswers extends LightningElement {

    // question, answers and buttons data
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

    // LMS publish vars
    @wire(MessageContext) messageContext;
    @track selectedAnswer;

    connectedCallback(){
        // populate vars for data display
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

    // get Id of selected answer
    selectedAnswerEvent(event){
        console.log('selectedAnswerEvent: ' + event.target.value)
        this.selectedAnswer=event.target.value;
    }


    // send selected answer's Id to verify-lwc
    handleVerifyClick(){
        console.log('qna.handleVerifyClick start')
        // take selected answer's id val here
        const payload = {selectedAnswerId: this.selectedAnswer} //testing purposes only
        console.log('payload: ' + JSON.stringify(payload))

        // publish it to QuestionMessageChannel
        publish(this.messageContext, questionMC, payload);
    }
}