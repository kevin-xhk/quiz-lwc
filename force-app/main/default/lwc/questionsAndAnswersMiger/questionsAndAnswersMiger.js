/**
 * Created by mshkrepa on 10/26/2022.
 */

import {LightningElement, wire, track, api} from 'lwc';
import getQuizQuestion from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestion';
import { publish, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class QuestionsAndAnswers extends LightningElement {

    @api availableActions = [];
    @api question_name;
    @api selectedAnswerForFlow;
    @track answers;
    @track disabled=false;
    @track nextButtonDisabled=true;

    @wire(MessageContext) messageContext;
    @track selectedAnswer;

    handleNext() {
        if (this.availableActions.find((action) => action === "NEXT")) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }

    connectedCallback(){
        getQuizQuestion({question_name : this.question_name})
            .then(data=>{
                this.answers=data.Quiz_Answers__r;
            }).catch(error => {
            console.log("ERROR / imperative apex call / getQuizQuestion: " + JSON.stringify(error))
        });
    }

    selectedAnswerEvent(event){
        this.nextButtonDisabled=false;
        if(event.target.className=='slds-button slds-button_brand slds-button_stretch slds-col slds-size_5-of-12'){
            event.target.className='slds-button slds-button_neutral slds-button_stretch slds-col slds-size_5-of-12';
            this.nextButtonDisabled=true;
            this.selectedAnswer=null;
            this.selectedAnswerForFlow=null;
        }else{
            if(this.selectedAnswer!=null){
                this.selectedAnswer.className='slds-button slds-button_neutral slds-button_stretch slds-col slds-size_5-of-12';
            }
            event.target.className='slds-button slds-button_brand slds-button_stretch slds-col slds-size_5-of-12';
            this.selectedAnswer=event.target;
            this.selectedAnswerForFlow=this.selectedAnswer.value;
        }
    }

    handleVerifyClick(){
        this.disabled=true;
        const payload = {selectedAnswerId: this.selectedAnswer.value}
        publish(this.messageContext, questionMC, payload);
    }
}