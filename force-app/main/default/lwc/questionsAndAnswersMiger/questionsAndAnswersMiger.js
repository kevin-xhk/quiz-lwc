/**
 * Created by mshkrepa on 10/26/2022.
 */

import {LightningElement, wire} from 'lwc';
import getQuizQuestion from '@salesforce/apex/QuestionsAndAnswersController.getQuizQuestion';
import getQuestionAnswers from '@salesforce/apex/QuestionsAndAnswersController.getQuestionAnswers';

import quizQuestionName from '@salesforce/schema/Quiz_Question__c.Name';
import quizAnswerName from '@salesforce/schema/Quiz_Answer__c.Name';

import { getSObjectValue } from '@salesforce/apex';

export default class QuestionsAndAnswersMiger extends LightningElement {

    quiz = {
        'id': 1,
        'description' : "Who's the tallest us president?",
        'answers' : [
            {
                'id': 0,
                'description':"Abraham Lincoln",
                'isCorrect': true
            },
            {
                'id': 1,
                'description':"Barack Obama",
                'isCorrect': false
            },
            {
                'id': 2,
                'description':"Theodore Roosevelt",
                'isCorrect': false
            },
            {
                'id': 3,
                'description':"Thomas Jefferson",
                'isCorrect': false
            },
        ]
    }

    @wire(getQuizQuestion)
    questionObject

    @wire(getQuestionAnswers, {questionName: '$question'})
    questionAnswers

    get question() {
        return this.questionObject.data ? getSObjectValue(this.questionObject.data, quizQuestionName) : '';
    }

    get first_answer(){
        return this.questionAnswers.data;
    }

    second_answer=this.quiz.answers[1].description;
    third_answer=this.quiz.answers[2].description;
    fourth_answer=this.quiz.answers[3].description;

}