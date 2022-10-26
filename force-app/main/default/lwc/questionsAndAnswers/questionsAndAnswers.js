import { LightningElement, wire, track } from 'lwc';

// required imports for LMS publish
import { publish, MessageContext } from 'lightning/messageService';
import questionMC from '@salesforce/messageChannel/QuestionMC__c';

const quiz = {
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

export default class QuestionsAndAnswers extends LightningElement {

    // LMS publish logic
    @wire(MessageContext)
    messageContext;

    @track
    selectedAnswer;

    handleVerifyClick(){
        // take selected answer's isCorrect val here
        const payload = {isAnswerCorrect: this.selectedAnswer.isCorrect};

        // publish it to QuestionMessageChannel
        publish(this.messageContext, questionMC, payload);
    }

}