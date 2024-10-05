import React from "react"
import Task from "./Task"

class Tasks extends React.Component {

    render() {
        if(this.props.info.length > 0)
            return(
                <div>
                    {this.props.info.map((el) => (
                        <Task onEdit = {this.props.onEdit} onDelete = {this.props.onDelete} key = {el.id} info = {el}/>
                    ))}
                </div>
            )
        else
            return(
                <div className = "task-wrapper">
                    <p className = "task-text">Добавьте задачу!</p>
                </div>
            )
    }
}

export default Tasks