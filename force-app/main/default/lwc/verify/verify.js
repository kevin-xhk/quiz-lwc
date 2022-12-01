/**
 * Created by mshkrepa on 10/25/2022.
 */

import {LightningElement, track, wire} from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';
import verifyUserAnswers from '@salesforce/apex/QuestionsAndAnswersController.verifyUserAnswers';

export default class Verify extends LightningElement {

    @track isVisible = false;
    @track isCorrectAnswer = null;

    // LMS subscribe logic
    @wire(MessageContext) messageContext;
    subscription = null;

    // subscribe to message channel on connected
    connectedCallback(){
        if(!this.subscription){
            this.subscription = subscribe(
                this.messageContext,
                questionMC,
                (message) => this.handleAnswerSubmission(message)
            )
        }
    }

    // unsubscribe on disconnected
    disconnectedCallback(){
        unsubscribe(this.subscription);
    }
    
    // shape conditional rendering based on received message
    handleAnswerSubmission(message) {
        console.log("handleAnswerSubmission IN");
        this.isVisible = false;

        verifyUserAnswers({questionId: message.questionId, answerIds : message.selectedAnswerIds})
            .then(result => {
                console.log('verify / apex / verifyUserAnswer: ' + result);
                this.isCorrectAnswer = result;
                this.isVisible = true;
            })
            .catch(error => {
                console.log('verify / apex / verifyUserAnswer / error: ' + error);
            })
            
        console.log("handleAnswerSubmission OUT");
    }
}