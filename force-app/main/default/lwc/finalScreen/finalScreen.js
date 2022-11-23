/**
 * Created by piorodak on 18.11.2022.
 */

import {LightningElement, wire, track, api} from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationBackEvent  } from 'lightning/flowSupport';

export default class FinalScreen extends LightningElement {
    @api filledQuestionValues;
    @api quizQuestions;
    @track quizQuestionsToDisplay = [];
    @api chosenQuestionCurrentValues;
    @api availableActions = [];
    @api quizSubmitted; //@ToDo handle how to delete quizSubmittedToDelete because after comment there is still connection in flow
    @track questionSelected = false;
    @track selectedQuestionId;
    timeIntervalInstance;
    @track changeAnswerBtnDisabled = true;
    @track showOnlyMarkedForReview = false;
    @track noQuestionsMarkedForReview = false;

    connectedCallback(){
        this.updateQuizQuestionsToDisplay();
    }

    updateQuizQuestionsToDisplay() {
        this.quizQuestionsToDisplay = this.quizQuestions.map((item, index)=> {
            const pointer = this.filledQuestionValues.findIndex(question => {
                return question.questionId === item.Id;
            });

            return {
              ...item,
              iterator: ++index,
              isMarkedForReview: this.filledQuestionValues[pointer].isMarkedForReview
            }
        })
        if (this.showOnlyMarkedForReview) {
            this.quizQuestionsToDisplay = this.quizQuestionsToDisplay.filter(question => {
                return question.isMarkedForReview === true;
            });
        }
        this.noQuestionsMarkedForReview = this.quizQuestionsToDisplay.length == 0
    }

    handleShowOnlyMarkedForReview(e) {
        e.preventDefault();
        this.showOnlyMarkedForReview = !this.showOnlyMarkedForReview;
        this.updateQuizQuestionsToDisplay();
    }

    handleSelectedQuestion(e) {
        e.preventDefault();
        this.questionSelected = true;
        this.selectedQuestionId = e.target.value;
        this.filledQuestionValues.forEach(question => {
            if (this.selectedQuestionId == question.questionId) {
                this.chosenQuestionCurrentValues = question;
            }
        });
    }

    handleChangeAnswer() {
        this.questionSelected = false;
        const chooseAnswerComp = this.template.querySelector('c-choose-answer');
        chooseAnswerComp.updateDataForParent();
        this.changeAnswerBtnDisabled = true;
        this.updateQuizQuestionsToDisplay();
    }

    handleDataUpdated(e) {
        this.changeAnswerBtnDisabled = false;
    }

    handleUpdatedValues(e) {
        const filledQuestionValuesParsed = JSON.parse(JSON.stringify(this.filledQuestionValues));
        const index = filledQuestionValuesParsed.findIndex(obj => {
            return obj.questionId === e.detail.questionId;
        });

        if (index !== -1) {
            filledQuestionValuesParsed[index].selectedAnswersId = e.detail.selectedAnswersId;
            filledQuestionValuesParsed[index].isMarkedForReview = e.detail.isMarkedForReview;
        }

        //@ToDo handle how to pass these data to the flow
        this.filledQuestionValues = filledQuestionValuesParsed;
    }

    handleSubmit() {
        if (this.availableActions.find((action) => action === "NEXT")) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            clearInterval(this.timeIntervalInstance);
            this.dispatchEvent(navigateNextEvent);
        }
    }

    handleBack() {
        this.questionSelected = false;
    }
}