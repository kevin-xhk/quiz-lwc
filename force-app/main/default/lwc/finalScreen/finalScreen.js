/**
 * Created by piorodak on 18.11.2022.
 */

import {LightningElement, track, api} from 'lwc';
import { FlowNavigationNextEvent  } from 'lightning/flowSupport';

export default class FinalScreen extends LightningElement {
    @api filledQuestionValues;
    @api quizQuestions;
    @track quizQuestionsToDisplay = [];
    @api chosenQuestionCurrentValues;
    @api availableActions = [];
    @api quizSubmitted;
    @track questionSelected = false;
    @track selectedQuestionId;
    timeIntervalInstance;
    @api totalMilliseconds = 0;
    @track changeAnswerBtnDisabled = true;
    @track showOnlyMarkedForReview = false;
    @track noQuestionsMarkedForReview = false;

    connectedCallback(){
        this.updateQuizQuestionsToDisplay();
    }

    /**
     * Method responsible for displaying the quiz questions on the final screen and handling
     * the "Show only marked for review" checkbox functionality that displays only the questions that
     * had been marked for review throughout the quiz
     */
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
        this.noQuestionsMarkedForReview = this.quizQuestionsToDisplay.length == 0;
        const parentThis = this;
        this.timeIntervalInstance = setInterval(function() {
            parentThis.totalMilliseconds += 100;
            console.log(parentThis.totalMilliseconds);
        }, 100);
    }

    /**
     * Method responsible for the starting the functionality behind "Show only marked for review"
     * checkbox and calling the method responsible for displaying the corresponding list of questions
     */
    handleShowOnlyMarkedForReview(e) {
        e.preventDefault();
        this.showOnlyMarkedForReview = !this.showOnlyMarkedForReview;
        this.updateQuizQuestionsToDisplay();
    }

    /**
     * Method responsible for data populating the child component
     */
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

    /**
     * Method responsible for handling the "Change Answer" button functionality
     * and throwing child component's methods
     */
    handleChangeAnswer() {
        this.questionSelected = false;
        const chooseAnswerComp = this.template.querySelector('c-choose-answer');
        chooseAnswerComp.updateDataForParent();
        this.changeAnswerBtnDisabled = true;
        this.updateQuizQuestionsToDisplay();
    }

    handleDataUpdated() {
        this.changeAnswerBtnDisabled = false;
    }

    /**
     * Method responsible for updating the flow's QuestionSelectedAnswersArray values
     */
    handleUpdatedValues(e) {
        const filledQuestionValuesParsed = JSON.parse(JSON.stringify(this.filledQuestionValues));
        const index = filledQuestionValuesParsed.findIndex(obj => {
            return obj.questionId === e.detail.questionId;
        });

        if (index !== -1) {
            filledQuestionValuesParsed[index].selectedAnswersId = e.detail.selectedAnswersId;
            filledQuestionValuesParsed[index].isMarkedForReview = e.detail.isMarkedForReview;
        }

        this.filledQuestionValues = filledQuestionValuesParsed;
    }

    /**
     * Method responsible for handling the "Submit" button and responsible for
     * interrupting the time calculating process
     */
    handleSubmit() {
        if (this.availableActions.find((action) => action === "NEXT")) {
            const navigateNextEvent = new FlowNavigationNextEvent();
            clearInterval(this.timeIntervalInstance);
            this.dispatchEvent(navigateNextEvent);
        }
    }

    /**
     * Method responsible for handling the "Back" button in the child component
     * which in turn displays the final screen and listed questions again
     */
    handleBack() {
        this.questionSelected = false;
    }
}