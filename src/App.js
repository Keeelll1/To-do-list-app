import React from "react"
import Header from './components/Header'
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

class App extends React.Component {

    constructor(props){
        super(props)

        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        this.state = {
            info: savedTasks, // Используем сохраненные данные
        };

        this.addTask = this.addTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.editTask = this.editTask.bind(this)
    }

    saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTask(task) {
    const id = this.state.info.length + 1;
    const newTasks = [...this.state.info, { id, ...task }];
    
    this.setState({ info: newTasks }, () => {
        this.saveTasksToLocalStorage(this.state.info); // Сохранение в localStorage
    });
    }
      
    deleteTask(id) {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить эту задачу?");
    
    if (isConfirmed) {
        const newTasks = this.state.info.filter((el) => el.id !== id);
        
        this.setState({ info: newTasks }, () => {
        this.saveTasksToLocalStorage(this.state.info); // Сохранение в localStorage
        });
    }
    }

    editTask(task) {
    const allTasks = this.state.info.map((el) => (el.id === task.id ? task : el));

    this.setState({ info: allTasks }, () => {
        this.saveTasksToLocalStorage(this.state.info); // Сохранение в localStorage
    });
    }

    
    render() {
        return (
            <div>
                <Header />
                <main>
                    <Tasks info = {this.state.info} onDelete = {this.deleteTask} onEdit = {this.editTask}/>
                </main>
                <aside>
                    <AddTask onAdd = {this.addTask} task={this.state.editingTask} onSave={this.saveTask}/>  
                </aside>
            </div>
        )
    }

}

export default App