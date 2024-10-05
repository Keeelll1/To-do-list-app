import React from "react";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: this.props.info.isCompleted || false,
            editForm: false,
            task: this.props.info.task
        };
    }

    saveToLocalStorage = (updatedTask) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = storedTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    handleComplete = () => {
        const updatedTask = { ...this.props.info, isCompleted: true };
        this.setState({
            isCompleted: true,
            editForm: false
        });

        this.saveToLocalStorage(updatedTask);
        this.props.onEdit(updatedTask);
    };

    handleChange = (e) => {
        this.setState({ task: e.target.value });
    };

    handleEdit = (e) => {
        e.preventDefault();
        const { task } = this.state;

        if (task.trim() === '') {
            alert("Поле не должно быть пустым!");
            return;
        }

        const updatedTask = { ...this.props.info, task };
        this.props.onEdit(updatedTask);

        this.saveToLocalStorage(updatedTask);

        this.setState({ editForm: false });
    };

    render() {
        const { isCompleted, editForm, task } = this.state;

        return (
            <div
                className="task-wrapper"
                disabled={isCompleted}
                style={{ backgroundColor: isCompleted ? "green" : "aquamarine" }}
            >
                <p className="task-text" style={{ backgroundColor: isCompleted ? "green" : "aquamarine" }}>
                    {isCompleted ? `${task} (Выполнено)` : task}
                </p>
                <div className="buttons-wrapper">
                    <button
                        type="button"
                        className="button"
                        disabled={isCompleted}
                        style={{ opacity: isCompleted ? 0.5 : 1 }}
                        onClick={this.handleComplete}
                    >
                        Выполнить
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            this.props.onDelete(this.props.info.id);
                        }}
                    >
                        Удалить
                    </button>
                    <button
                        type="button"
                        className="button"
                        disabled={isCompleted}
                        style={{ opacity: isCompleted ? 0.5 : 1 }}
                        onClick={() => {
                            this.setState({ editForm: !editForm });
                        }}
                    >
                        Редактировать
                    </button>
                </div>
                {editForm && (
                    <form>
                        <input
                            className="text-place"
                            type="text"
                            value={task}
                            onChange={this.handleChange}
                        />
                        <button className="button" onClick={this.handleEdit}>Сохранить</button>
                    </form>
                )}
            </div>
        );
    }
}

export default Task;