/**
 * Created by mshkrepa on 10/25/2022.
 */

import {LightningElement, wire} from 'lwc';

// required imports for LMS subscribe
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';

export default class Verify extends LightningElement {

    visible = false;

    // LMS subscribe logic
    @wire(MessageContext)
    messageContext;

    subscription = null;

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
        visible = false;

        // i think it works this way ??
        this.isCorrectAnswer = message.isCorrectAnswer;
        
        visible = true;
    }
}