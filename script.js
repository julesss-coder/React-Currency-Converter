// Extracting the input component, for practice
function AmountInput(props) {
  let {handleInput, value, name} = props;

  return (
    // Display value of input field rounded to three decimal points, except when value is ''
    <input type="number" name={name} value={value !== '' ? parseFloat(value.toFixed(3)) : ''} onChange={handleInput}/>
  )
}


class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dollars: 1,
      euros: 0.89,
    };

    this.handleEuroInput = this.handleEuroInput.bind(this);
    this.handleDollarInput = this.handleDollarInput.bind(this);
    this.convertEurosToDollars = this.convertEurosToDollars.bind(this);
    this.convertDollarsToEuros = this.convertDollarsToEuros.bind(this);
  };


  handleEuroInput(event) {
    let euros = event.target.value;
    let dollars = this.convertEurosToDollars(euros);

    // if the euro input is a number >= 0:
    if (euros !== '' && isNaN(euros) === false && +euros >= 0) {
        this.setState({
          euros: +euros,
          dollars,
        });
      } else {
      this.setState({
        dollars: '',
        euros: '',
      });
    }
  }


  handleDollarInput(event) {
    let dollars = event.target.value;
    let euros = this.convertDollarsToEuros(dollars);

    // if the dollar input is a number >= 0:
    if (dollars !== '' && isNaN(dollars) === false && +dollars >= 0) {
      this.setState({
        dollars: +dollars,
        // euros // Why do I get an error if I add the euros key to the object?? // Because I had not assigned a value to euros before...
        euros
      });
    } else {
      this.setState({
        dollars: '',
        euros: '',
      });
    }
  }


  convertEurosToDollars(euros) {
    // if the input is not a number, or a number < 0
    if (euros === '' || isNaN(euros) === true || euros < 0) {
      return '';
    }

    return +euros / 0.89;
  }


  convertDollarsToEuros(dollars) {
    // if the input is not a number:=, or a number < 0:
    if (dollars === '' || isNaN(dollars) === true || dollars < 0) { // isNan('1') would be false
      return '';
    }

    return +dollars * 0.89;
  }


  render() {
    return (
      <div className="currency-converter">
        <h1>Currency Converter</h1>
        <h2>USD 1 : 0.89</h2>

        <form action="">
          <label htmlFor="USD">USD
            <AmountInput name={'dollars'} handleInput={this.handleDollarInput} value={this.state.dollars} />
          </label>
          =
          <label htmlFor="EUR">
            <AmountInput name={'euros'} handleInput={this.handleEuroInput} value={this.state.euros} />
            EUR
          </label>
        </form>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CurrencyConverter />);