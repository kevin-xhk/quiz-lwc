/**
 * Created by piorodak on 21.11.2022.
 */

import {LightningElement, wire, track, api} from 'lwc';
import getQuizQuestionById from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestionById';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

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

    handleMarkForReview(e) {
        e.preventDefault();
        this.dataChanged();
        this.isMarkedForReview = !this.isMarkedForReview;
    }

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
        this.selectedAnswers.push(this.questionCurrentValues.selectedAnswerId);
        const parentThis = this;
        this.timeIntervalInstance = setInterval(function() {
            parentThis.totalMilliseconds += 100;
        }, 100);
    }

    renderedCallback() {
        this.selectedAnswers.forEach(answer => {
            const correctAnswerBtn = this.template.querySelector('button[value="' + answer + '"]');
            if (correctAnswerBtn) {
                correctAnswerBtn.className += " slds-button_brand";
            }
        });
    }

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

    @api
    updateDataForParent() {
        const updatedDataEvent = new CustomEvent('changedvalues',
            {
                 detail: {
                     selectedAnswerId : this.selectedAnswers,
                     questionId : this.questionId,
                     isMarkedForReview : this.isMarkedForReview
                 }
            });
        this.dispatchEvent(updatedDataEvent);
    }
}