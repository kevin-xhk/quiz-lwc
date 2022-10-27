/**
 * Created by mshkrepa on 10/25/2022.
 */

import {LightningElement, track, wire} from 'lwc';

// required imports for LMS subscribe
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';

export default class Verify extends LightningElement {

    @track
    isVisible = false;

    // LMS subscribe logic
    @wire(MessageContext)
    messageContext;

    subscription = null;

    @track
    isCorrectAnswer = null;

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
        console.log("verify.handleAnswerSubmission start")

        this.isVisible = false;
        this.isCorrectAnswer = message.isCorrectAnswer;
        this.isVisible = true;

        console.log("verify.handleAnswerSubmission end")
    }
}