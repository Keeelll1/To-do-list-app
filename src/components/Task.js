import React from "react";

class Task extends React.Component {
    handleComplete = () => {
        this.props.onComplete(this.props.info.id);
    }

    handleDelete = () => {
        this.props.onDelete(this.props.info.id);
    }

    render() {
        const { info, onEdit } = this.props;
        const isCompleted = info.isCompleted;

        return (
            <div
                className="task-wrapper"
                style={{ backgroundColor: isCompleted ? "green" : "aquamarine" }}
            >
                <p className="task-text">
                    {isCompleted ? `${info.task} (Выполнено)` : info.task}
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
                        disabled={isCompleted}
                        style={{ opacity: isCompleted ? 0.5 : 1 }}
                        onClick={() => onEdit(info)}
                    >
                        Редактировать
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={this.handleDelete}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        );
    }
}

export default Task;