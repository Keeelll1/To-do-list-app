import React from "react";

class AddTask extends React.Component {

    taskAdd= {}

  constructor(props) {
    super(props);
    this.state = {
      task: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.task.trim() === '') {
      alert('Поле обязательно для заполнения!');
      return;
    }

    this.props.onAdd(
      this.taskAdd
    );

    this.setState({ task: '' });
  }

  render() {
    return (
      <form ref={(el) => { this.myForm = el }} onSubmit={this.handleSubmit}>
        <input
          placeholder="Введите задачу!"
          value={this.state.task}
          onChange={(e) => this.setState({task: e.target.value})}
          required
        />
        <button type="submit" className="button" onClick = {() => {
            this.taskAdd = {
                task: this.state.task
            }
            if(this.props.info){
                this.taskAdd.id = this.props.info.id
            }
        }}>Добавить</button>
      </form>
    );
  }
}

export default AddTask;