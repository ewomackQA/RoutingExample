import React, { Component } from 'react';

export default class FormExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    }

    //This accepts the data from the forms input (In this case a text box)
    //It then creates an object with that data and an id and puts it into the components state array
    //This is handed down as a prop to the form child component.
    this.handleSubmitInParent = (dataFromForm) => {
      let array = this.state.array;
      array.push({
        id: array.length,
        myData: dataFromForm.myData
      });
      this.setState({ array });
    }

  }

  render() {
    return (
      <div>
        <FormComponent onSubmit={this.handleSubmitInParent} />
        <OutputArrayComponent data={this.state.array} />
      </div>
    );
  }
}

class FormComponent extends Component {

  constructor(props) {
    super(props);

    //Each form component will call this method to update the state
    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

    //Submit on the child form component will push all data in the state of the child
    //component up to the parent component
    this.handleSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({
        myData: ""
      });
    }
    //Initialize state
    this.state = {
      myData: ""
    };
  }
  render() {
    return (
      <form id="addmyData" onSubmit={this.handleSubmit} >
        <input type="text" name="myData" value={this.state.myData} onChange={this.handleChange("myData")} />
      </form>
    );
  }
}

class OutputArrayComponent extends Component {

  render() {
    //Loop through the array of data, convert it into an array of div elements.
    let outputData = this.props.data.map((element) => {
      return (
        <div key={element.id}>
          <p><strong>{element.id}</strong> - {element.myData}</p>
        </div>
      );
    });

    return (
      <div>
        {outputData}
      </div>
    );
    
  }
}

