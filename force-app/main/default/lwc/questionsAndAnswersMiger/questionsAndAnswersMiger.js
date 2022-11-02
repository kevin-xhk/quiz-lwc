/**
 * Created by mshkrepa on 10/26/2022.
 */

import { LightningElement, wire, track } from 'lwc';
import getQuizQuestion from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestion';
import { publish, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';


export default class QuestionsAndAnswers extends LightningElement {

    // question, answers and buttons data
    @track question;
    @track answers;
    @track selectedAnswer;

    // LMS publish vars
    @wire(MessageContext) messageContext;
    @track selectedAnswer;

    connectedCallback(){
        // populate vars for data display
        getQuizQuestion()
            .then(data=>{
                this.question=data.Name;
                this.answers=data.Quiz_Answers__r;
            }).catch(error => {
            console.log("ERROR / imperative apex call / getQuizQuestion: " + JSON.stringify(error))
        });
    }

    // get Id of selected answer
    selectedAnswerEvent(event){
        event.target.className='slds-button slds-button_brand slds-button_stretch slds-col slds-size_5-of-12';
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