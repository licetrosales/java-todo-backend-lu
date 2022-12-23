// Komponentename+ Props
import {Todo} from "../models/Todo";

type TodoItemProps = {
    todoToDisplay: Todo
}
// Zeigt eine einzige TodoItem (Aufgabe) an
export default function TodoItem(props: TodoItemProps) {
    return (
        <div>
            <p> STATUS: {props.todoToDisplay.status} </p>
            <p>Bescreibung: {props.todoToDisplay.description}</p>
        </div>
    )
}