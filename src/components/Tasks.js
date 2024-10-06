import React from "react";
import Task from "./Task";

class Tasks extends React.Component {
    render() {
        const { tasks, onDelete, onEdit, onComplete } = this.props;

        if (tasks && tasks.length > 0) {
            return (
                <div>
                    {tasks.map((el) => (
                        <Task 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                            onComplete={onComplete} 
                            key={el.id} 
                            info={el} 
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="task-wrapper">
                    <p className="task-text">Добавьте задачу!</p>
                </div>
            );
        }
    }
}

export default Tasks;