import React from "react";
import Autosuggest from "react-autosuggest";
import { withRouter } from "react-router-dom";
import { URL } from "../utils/static";
import { connect } from "react-redux";

const countries = [
  {
    name: "Thailand",
  },
  {
    name: "Japan",
  },
  {
    name: "Singapore",
  },
  {
    name: "Malaysia",
  },
  {
    name: "Indonesia",
  },
  {
    name: "Bhutan",
  },
  {
    name: "China",
  },
  {
    name: "Vietnam",
  },
  {
    name: "Nepal",
  },
  {
    name: "Australia",
  },
  {
    name: "Myanmar",
  },
  {
    name: "HongKong",
  },
  {
    name: "Cambodia",
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : countries.filter(
        (country) =>
          country.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => (
  <div className="render-country">{suggestion.name}</div>
);

class ListCountry extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  searchCountry = (name) => {
    fetch(`${URL}/country/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data.....");
        this.props.dispatch({
          type: "FILTERED_COUNTRIES",
          data: data.data[0].country[0],
        });
        this.props.history.push("/country/" + name);
      });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onClick = (e) => {
    if (e.key === "Enter") {
      this.searchCountry(e.target.value);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Where do you want to go today?",
      value,
      onChange: this.onChange,
      className: "country-input",
      onKeyDown: this.onClick,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default withRouter(connect()(ListCountry));
