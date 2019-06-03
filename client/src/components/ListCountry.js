import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from "react-router-dom";

const countries = [
  {
    name: 'Thailand',
  },
  {
    name: 'Japan',
  },
	{
    name: 'Singapore',
  },
	{
    name: 'Malaysia',
  },
	{
    name: 'Indonesia',
  },
	{
    name: 'Bhutan',
  },
	{
    name: 'China',
  },
	{
    name: 'Vietnam',
  },
	{
    name: 'Nepal',
  },
	{
		name: 'Australia',
	},
	{
		name: 'Myanmar',
	},
	{
		name: 'HongKong',
	},
	{
		name: 'Cambodia',
	}
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : countries.filter(country =>
    country.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div className= "render-country">
    {suggestion.name}
  </div>
);

class ListCountry extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onClick = (e) => {
    if(e.key === 'Enter'){
      this.props.history.push('/discover')
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Where do you want to go today?',
      value,
      onChange: this.onChange,
			className: "country-input",
      onKeyDown: this.onClick
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

export default withRouter(ListCountry);
