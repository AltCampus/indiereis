import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FormPage2 from "./FormPage2";
import { URL, suitedTrip, idealHoliday } from "../utils/static";
import NavBar from "./NavBar";
import UserDash from "./UserDash";
import Footer from "./Footer";

class FormPage1 extends React.Component {
  constructor() {
    super();
    this.state = {
      nextFormPage: false,
    };
  }

  componentDidMount() {
    fetch(`${URL}/questions`)
      .then((res) => res.json())
      .then((d) => {
        this.props.dispatch({
          type: "ADD_QUESTIONS",
          data: d.data[0],
        });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    if (this.state) {
      this.props.dispatch({
        type: "ADD_FORM1",
        data: this.state,
      });
      this.setState({
        nextFormPage: !this.state.nextFormPage,
      });
    } else {
      console.log("state is empty");
    }
  };

  render() {
    const { nextFormPage } = this.state;
    const questions = this.props.questions
      ? this.props.questions.Questions
      : null;
    const userFormData = this.props.questions
      ? this.props.questions.userFormData.countryAndTrip
      : null;

    return (
      <React.Fragment>
        <NavBar />
        <UserDash />
        {questions.data && userFormData ? (
          !nextFormPage ? (
            <div className="form-wrapper">
              <progress className="progress is-primary" value="10" max="100">
                10%
              </progress>
              {questions.data && userFormData ? (
                <div>
                  <div className="field">
                    <label className="label">
                      {questions.data.qset3.questions[0].includes("COUNTRYNAME")
                        ? questions.data.qset3.questions[0].replace(
                            "COUNTRYNAME",
                            userFormData.country
                          )
                        : questions.data.qset3.questions[0]}
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={questions.data.qset3.name[0]}
                        onChange={this.handleChange}
                        placeholder="No. of days"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">
                      {questions.data.qset3.questions[2].includes("COUNTRYNAME")
                        ? questions.data.qset3.questions[2].replace(
                            "COUNTRYNAME",
                            userFormData.country
                          )
                        : questions.data.qset3.questions[2]}
                    </label>
                    <div className="control">
                      <div className="select">
                        <select
                          name={questions.data.qset3.name[2]}
                          onChange={this.handleChange}
                          required
                        >
                          <option>Choice of Trip</option>
                          {suitedTrip.map((el, i) => (
                            <option key={i}>{el}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">
                      {questions.data.qset3.questions[1].includes("COUNTRYNAME")
                        ? questions.data.qset3.questions[1].replace(
                            "COUNTRYNAME",
                            userFormData.country
                          )
                        : questions.data.qset3.questions[1]}
                    </label>
                    <div className="control">
                      <div className="select">
                        <select
                          name={questions.data.qset3.name[1]}
                          onChange={this.handleChange}
                          required
                        >
                          <option>Ideal Holiday</option>
                          {idealHoliday.map((el, i) => (
                            <option key={i}>{el}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <h1>Loading...</h1>
                </div>
              )}
              <button className="button is-primary" onClick={this.handleSubmit}>
                Next
              </button>
            </div>
          ) : (
            <FormPage2 />
          )
        ) : null}
        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state,
  };
}

export default withRouter(connect(mapStateToProps)(FormPage1));
