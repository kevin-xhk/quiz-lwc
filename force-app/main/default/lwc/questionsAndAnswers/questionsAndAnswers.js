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
    @api selectedAnswersForFlow=[];
    @track answers;
    @track disabled=false;
    @track nextButtonDisabled=true;
    @api recordId;
    @api isSkippable;
    @api isPracticeMode;
    @api isMarkedForReview = false;
    timeIntervalInstance;
    @api totalMilliseconds = 0;

    @wire(MessageContext) messageContext;
    @track questionId;

    /**
     * Method responsible for handling the "Next" button functionality and interrupting
     * the millisecond calculating process
     */
    handleNext() {
        if (this.availableActions.find((action) => action === "NEXT")) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            clearInterval(this.timeIntervalInstance);
            this.dispatchEvent(navigateNextEvent);
        }
    }

    /**
     * Method responsible for handling the "Skip" button
     */
    handleSkip() {
        this.handleNext();
    }

    /**
     * Method responsible for handling the "Mark For Review" checkbox functionality
     */
    handleMarkForReview(e) {
        e.preventDefault();
        this.isMarkedForReview = !this.isMarkedForReview;
    }

    /**
     * Method executed when the component is loaded for the first time;
     * Functions from the controller are called to populate the lwc with the corresponding data
     * and the process for counting the time (in milliseconds) is started
     */
    connectedCallback(){
        getQuizQuestion({question_name : this.question_name})
            .then(data=>{
                this.answers=data.Quiz_Answers__r;
                this.questionId = data.Id;
            }).catch(error => {
            console.log("ERROR / imperative apex call / getQuizQuestion: " + JSON.stringify(error))
        });
        var parentThis = this;
        this.timeIntervalInstance = setInterval(function() {
            parentThis.totalMilliseconds += 100;
        }, 100);
    }

    /**
     * Method thrown whenever one of the answers is selected or unselected;
     * The styling of the button changes and the value of the button is added or
     * removed to the selected answers array (selectedAnswersForFlow[]) based on selection and deselection
     */
    selectedAnswerEvent(event){
        if(event.target.className.includes(' slds-button_brand')){
            event.target.className = event.target.className.replace(' slds-button_brand', '')
            let tempIndex=this.selectedAnswersForFlow.indexOf(event.target.value)
            this.selectedAnswersForFlow.splice(tempIndex,1);
        }else{
            event.target.className += " slds-button_brand";
            this.selectedAnswersForFlow.push(event.target.value);
        }
        if(this.selectedAnswersForFlow.length>0){
            this.nextButtonDisabled=false;
        }else{
            this.nextButtonDisabled=true;
        }
    }

    handleVerifyClick(){
        clearInterval(this.timeIntervalInstance);
        this.disabled=true;
        const payload = {questionId: this.questionId, selectedAnswerIds: this.selectedAnswersForFlow}
        console.log("payload: " + JSON.stringify(payload));
        publish(this.messageContext, questionMC, payload);
    }
}