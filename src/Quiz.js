import React, { Component } from 'react';
import yaml from 'js-yaml';
import hash from 'object-hash';

function Answer(props) {
    const question = props.question;
    const answer = props.answer.answer;
    return (
            <div className="custom-control custom-radio">
            <input className="custom-control-input" type="radio" name={hash(question)} id={hash(answer)} value={hash(answer)} />
                <label className="custom-control-label" for={hash(answer)}>{answer}</label>
            </div>
    )
}

function Question(props) {
    const question = props.question.question;
    const answers = props.question.answers.map((answer) =>
        <div className="question" key={hash(answer)}>
            <Answer question={question} answer={answer}/>
        </div>
    );
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <h3 className="Question">{question}</h3>
            {answers}
        </div>
    );
}

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: {
                title: "Super reliable quiz",
                questions: []
            }
        };
    }

    componentDidMount() {
        fetch('quiz.yml')
            .then(response => response.text())
            .then(data => {
                this.setState({quiz: yaml.safeLoad(data, 'utf8')})
            })
            .catch(err => console.error(this.props.url, err.toString()))
    }

    render() {
        const questions = this.state.quiz.questions.map((question, index) =>
            <Question key={index} question={question} />
        );
        return (
            <div className="Quiz container">
                <header className="Quiz-header shadow p-3 mb-5 mt-5 bg-info rounded">
                    <h1 className="Quiz-title font-weight-bold text-white">{this.state.quiz.title}</h1>
                </header>
                <form>
                    {questions}
                    <input type="submit" value="Submit" className="btn btn-lg btn-primary"/>
                </form>
            </div>
        );
    }
}

export default Quiz;
