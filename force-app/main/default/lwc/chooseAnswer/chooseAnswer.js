/**
 * Created by piorodak on 21.11.2022.
 */

import {LightningElement, wire, track, api} from 'lwc';
import getQuizQuestionById from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestionById';
import { MessageContext } from 'lightning/messageService';

export default class ChooseAnswer extends LightningElement {
    @api availableActions = [];
    @api questionId;
    @api questionCurrentValues;
    @api totalMilliseconds = 0;
    @track isMarkedForReview;
    @track answers;
    @track selectedAnswers = [];
    @track questionDescription;

    timeIntervalInstance;

    @wire(MessageContext) messageContext;

    /**
     * Method responsible for handling the changing the value of the "Mark For Review" button
     */
    handleMarkForReview(e) {
        e.preventDefault();
        this.dataChanged();
        this.isMarkedForReview = !this.isMarkedForReview;
    }

    /**
     * Method executed when the component is loaded for the first time;
     * Functions from the controller are called to populate the lwc with the corresponding data
     * and the process for counting the time (in milliseconds) is started
     */
    connectedCallback(){
        getQuizQuestionById({id : this.questionId})
            .then(data => {
                this.answers = data.Quiz_Answers__r;
                this.questionDescription = data.Description__c;
            })
            .catch(error => {
                console.log("ERROR / imperative apex call / getQuizQuestionById: " + JSON.stringify(error));
            });
        this.isMarkedForReview = this.questionCurrentValues.isMarkedForReview;
        this.selectedAnswers = JSON.parse(JSON.stringify(this.questionCurrentValues.selectedAnswersId));
        const parentThis = this;
        this.timeIntervalInstance = setInterval(function() {
            parentThis.totalMilliseconds += 100;
        }, 100);
    }

    /**
     * Method responsible for changing the styling on the selected answers
     */
    renderedCallback() {
        this.selectedAnswers.forEach(answer => {
            const correctAnswerBtn = this.template.querySelector('button[value="' + answer + '"]');
            if (correctAnswerBtn) {
                correctAnswerBtn.className += " slds-button_brand";
            }
        });
    }
    /**
     * Method thrown whenever one of the answers is selected or unselected;
     * The styling of the button changes and the value of the button is added or
     * removed to the selected answers array (selectedAnswersForFlow[]) based on selection and deselection
     */
    handleAnswerClicked(e){
        this.dataChanged();
        if (e.target.className.includes(' slds-button_brand')) {
            e.target.className = e.target.className.replace(' slds-button_brand', '')
            const index = this.selectedAnswers.indexOf(e.target.value);
            this.selectedAnswers.splice(index, 1);
        } else {
            e.target.className += " slds-button_brand";
            this.selectedAnswers.push(e.target.value);
        }
    }

    dataChanged() {
        const changedData = new CustomEvent('changeddata');
        this.dispatchEvent(changedData);
    }

    /**
     * Method responsible for updating the changed answers values
     */
    @api
    updateDataForParent() {
        console.log('selected answers!!!', JSON.stringify(this.selectedAnswers));
        const updatedDataEvent = new CustomEvent('changedvalues',
            {
                 detail: {
                     selectedAnswersId : this.selectedAnswers,
                     questionId : this.questionId,
                     isMarkedForReview : this.isMarkedForReview
                 }
            });
        this.dispatchEvent(updatedDataEvent);
    }

}