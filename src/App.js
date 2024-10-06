import React from "react";
import Header from './components/Header';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

class App extends React.Component {
    constructor(props) {
        super(props);

        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.state = {
            tasks: savedTasks,
            taskToEdit: null
        };
    }

    saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addOrEditTask = (newTask) => {
        const tasks = [...this.state.tasks];

        if (newTask.id) {
            const existingTaskIndex = tasks.findIndex(task => task.id === newTask.id);
            tasks[existingTaskIndex] = newTask;
        } else {
            newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
            tasks.push(newTask);
        }

        this.setState({ tasks, taskToEdit: null }, () => this.saveTasksToLocalStorage(this.state.tasks));
    }

    deleteTask = (id) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить эту задачу?');
        if (confirmed) {
            const tasks = this.state.tasks.filter(task => task.id !== id);
            this.setState({ tasks }, () => this.saveTasksToLocalStorage(this.state.tasks));
        }
    }

    editTask = (task) => {
        this.setState({ taskToEdit: task });
    }

    completeTask = (id) => {
        const tasks = this.state.tasks.map(task =>
            task.id === id ? { ...task, isCompleted: true } : task
        );

        this.setState({ tasks, taskToEdit: null }, () => this.saveTasksToLocalStorage(this.state.tasks));
    }

    render() {
        return (
            <div>
                <Header />
                <main className = "main">
                    <Tasks
                        tasks={this.state.tasks}
                        onDelete={this.deleteTask}
                        onEdit={this.editTask}
                        onComplete={this.completeTask}
                    />
                
                <aside>
                    <AddTask onAdd={this.addOrEditTask} taskToEdit={this.state.taskToEdit} />
                </aside>
                </main>
            </div>
        );
    }
}

export default App;