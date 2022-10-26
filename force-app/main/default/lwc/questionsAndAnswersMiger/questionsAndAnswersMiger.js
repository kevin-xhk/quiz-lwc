/**
 * Created by mshkrepa on 10/26/2022.
 */

import {LightningElement} from 'lwc';

export default class QuestionsAndAnswersMiger extends LightningElement {

    quiz = {
        'id': 1,
        'description' : "Who's the tallest us president?",
        'answers' : [
            {
                'id': 1,
                'description':"Abraham Lincoln",
                'isCorrect': true
            },
            {
                'id': 2,
                'description':"Barack Obama",
                'isCorrect': false
            },
            {
                'id': 3,
                'description':"Theodore Roosevelt",
                'isCorrect': false
            },
            {
                'id': 4,
                'description':"Thomas Jefferson",
                'isCorrect': false
            },
        ]
    }

    question=this.quiz.description;
    first_answer=this.quiz.answers[0].description;
    second_answer=this.quiz.answers[1].description;
    third_answer=this.quiz.answers[2].description;
    fourth_answer=this.quiz.answers[3].description;



}