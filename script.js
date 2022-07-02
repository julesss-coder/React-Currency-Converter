/* PROBLEMS
    If initially, a floating point number is displayed in EUR field, the up and down arrows change it by 1 - is this what we want?

    Sometimes, numbers keep increasing/reducing by themselves, but I cannot replicate the bug. Does it have to do with the fact that I passed in a arrow function to onChange handler? Or that negative numbers are acceptable?

    Rounding to three digit places does not work when 1) I delete input and 2) I use . instead of , in floating point numbers.

*/

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
            <input type="number" name="dollars" value={this.state.dollars} onChange={(event) => {this.handleDollarInput(event)}}/>
          </label>
          =
          <label htmlFor="EUR">
            <input type="number" name="euros" value={this.state.euros} onChange={(event) => {this.handleEuroInput(event)}}/>
            EUR
          </label>
        </form>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CurrencyConverter />);