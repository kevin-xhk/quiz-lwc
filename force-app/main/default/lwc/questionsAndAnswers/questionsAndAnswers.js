import { LightningElement } from 'lwc';

export default class QuestionsAndAnswers extends LightningElement {

    quiz = {
        'id': 1,
        'description' : "who's the tallest us president?",
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
                'id': 1,
                'description':"Theodore Roosevelt",
                'isCorrect': false
            },            
            {
                'id': 1,
                'description':"Thomas Jefferson",
                'isCorrect': false
            },
        ]
    }
}