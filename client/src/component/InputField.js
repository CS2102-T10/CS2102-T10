import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: this.props.placeholder ? this.props.placeholder : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert("submit value " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default InputField;
