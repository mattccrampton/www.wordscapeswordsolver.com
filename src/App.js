import React, { Component } from 'react'

import { Formik } from 'formik'
// import yup from 'yup'
import * as yup from 'yup'

import './App.css'

const schema = yup.object().shape({
  // email: yup.string().required('Email required'),
  // pswrd: yup.string().required('Password required'),
})

class App extends Component {

    constructor (props) {

        super(props)

        this.state = {
            unknown_word_letter_count: 5,
            known_letters: ["","","","","","","",""]
        }
    }

    handleUnknownWordLetterCountChange = (e) => {

        // console.log("handleLetterCountChange", e.target.value)
        this.setState({ unknown_word_letter_count: e.target.value })

    }

    renderUnknownWordLetterCountFormElement = (values, onChange, onBlur) => {

        return (
            <div className="form-group unknown-word-letter-count-form">
                <h1>#1. How long is the word you&apos;re trying to solve?</h1>
                <div className="select-container">
                    <select
                        value={values["unknown_word_letter_count"]}
                        name="unknown_word_letter_count"
                        className="custom-select custom-select-sm"
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <option value="3">3 letters</option>
                        <option value="4">4 letters</option>
                        <option value="5">5 letters</option>
                        <option value="6">6 letters</option>
                        <option value="7">7 letters</option>
                        <option value="8">8 letters</option>
                    </select>
                </div>
            </div>
        )

    }

    renderUnknownWordLetterFormElements = (values, onChange, onBlur) => {

        const form_elements = []

        let letter_id = ""
        for (let i=0; i<values["unknown_word_letter_count"]; i++){

            letter_id = `unknown_word_letter_${i+1}`
            
            if(typeof values[letter_id] === "undefined"){
                continue
            }

            form_elements.push(
                <div className="unknown-word-letter-container" key={letter_id}>
                    <input
                        className="form-control form-control-sm unknown-word-letter-form-element"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name={letter_id}
                        value={values[letter_id]}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </div>
            )

        }

        return form_elements
    }

    renderAvailableLettersForm = (values, handleChange, handleBlur) => {

        return (
            <div className="available-letters-container mt-5">
                <h1>#3. Enter the letters to choose from</h1>
                <div className="available-letters-circle-container mt-4 mb-4">
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_1"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_1"
                        value={values["available_letter_1"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_2"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_2"
                        value={values["available_letter_2"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_3"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_3"
                        value={values["available_letter_3"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_4"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_4"
                        value={values["available_letter_4"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_5"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_5"
                        value={values["available_letter_5"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_6"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_6"
                        value={values["available_letter_6"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        className="form-control mb-2 available-letters-form-element available_letter_7"
                        placeholder="?"
                        maxLength="1"
                        type="text"
                        name="available_letter_7"
                        value={values["available_letter_7"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
        )

    }

    renderFoundWords = (status) => {

        if(!status || !status.found_words){
            return ""
        }

        if (status.found_words.length < 1){

            return (
                <h1>No matches found</h1>
            )

        }

        const found_words_markup = status.found_words.map((found_word) => {
            return (
                <dl key={found_word}><dt>{found_word}</dt></dl>
            )
        })

        return (
            <div className="found-words-container">
                <h1>Possible word matches...</h1>
                {found_words_markup}
            </div>
        )

    }

    renderFormBody = ({ handleSubmit, handleChange, handleBlur, values, errors, status }) => {

        // let errors_markup = ""

        // if (errors) {
            // console.log("errors", errors)
            // errors_markup = (
                // <pre>{JSON.stringify(errors, null, 2)}</pre>
            // )
        // }

        return (
            <div className="container">
                <div className="outer-form-container">

                    {this.renderUnknownWordLetterCountFormElement(values, handleChange, handleBlur)}

                    <form onSubmit={handleSubmit} className="unknown-word-letter-form mt-5">
                        <h1>#2. Enter any known letters</h1>
                        <div className="unknown-word-letter-form-letters">
                            {this.renderUnknownWordLetterFormElements(values, handleChange, handleBlur)}
                        </div>

                        {this.renderAvailableLettersForm(values, handleChange, handleBlur)}

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mb-2">Find Answer Words</button>
                        </div>

                        {this.renderFoundWords(status)}

                    </form>
                </div>
            </div>
        )

    }

    // Return the completely assembled component
    render () {
        return (
            <Formik
                validationSchema={schema}
                initialValues={{
                    unknown_word_letter_count: 5,
                    unknown_word_letter_1: '',
                    unknown_word_letter_2: '',
                    unknown_word_letter_3: '',
                    unknown_word_letter_4: '',
                    unknown_word_letter_5: '',
                    unknown_word_letter_6: '',
                    unknown_word_letter_7: '',
                    unknown_word_letter_8: '',
                    available_letter_1: '',
                    available_letter_2: '',
                    available_letter_3: '',
                    available_letter_4: '',
                    available_letter_5: '',
                    available_letter_6: '',
                    available_letter_7: ''
                }}
                onSubmit={(values, actions) => {

                    actions.setStatus(undefined)
                    console.dir("submitting", values)

                    fetch("http://birdfu.ddns.net/wordscapes_word_solver", {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        // mode: "cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        // credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        // redirect: "follow", // manual, *follow, error
                        // referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify(values), // body data type must match "Content-Type" header
                    })
                        .then(function(response) {
                            return response.json()
                        })
                        .then((response) => {

                            console.dir("response", response) // .json()
                            actions.setStatus({
                                found_words: response["data"]
                            })

                        }) // parses JSON response into native Javascript objects
                        .catch(error => console.error('Error:', error))

              }}

              render={this.renderFormBody}
            />
        )
    }
}

export default App
