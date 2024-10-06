import React, { useState, useEffect } from "react";

const AddTask = ({ onAdd, taskToEdit }) => {
    const [task, setTask] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit.task);
        } else {
            setTask('');
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.trim() === '') {
            alert('Поле обязательно для заполнения!');
            return;
        }

        const newTask = {
            task: task,
            isCompleted: taskToEdit ? taskToEdit.isCompleted : false,
            id: taskToEdit ? taskToEdit.id : undefined,
        };

        onAdd(newTask);
        setTask('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Введите задачу!"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <div className = "btn-wrapper">
            <button className = "button" type="submit">{taskToEdit ? 'Сохранить изменения' : 'Добавить'}</button>
            </div>
        </form>
    );
}

export default AddTask;