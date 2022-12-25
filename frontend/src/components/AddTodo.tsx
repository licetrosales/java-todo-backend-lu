import {ChangeEvent, useState} from "react";
import {Todo} from "../models/Todo";

type AddTodoProps = {
    // Die Komponente erhält eine FUNKTION als Prop
    handleAddTodo(newTodo: Todo): void
}
//TODO Hinzufügen:
// 1. Das neue Todo an TodoApp übergeben

export default function AddTodo(props: AddTodoProps) {

    const [todoDescription, setTodoDescription] = useState<string>("Hier Todo eintragen")

    //handleXyz = Verarbeitet Änderung Xyz
    function handleTodoDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;

        // Neue Eingabe ersetzt die alte Eingabe
        setTodoDescription(newDescription)
    }
    function handleAddTodo() {
        // Die Id kommt vom Backend, weshalb wir sie noch nicht haben
        const newTodo: Todo = {

            description: todoDescription,
            status: "OPEN"
        }
        props.handleAddTodo(newTodo)
    }
    return (
        <section>
            Neues Todo: <input value={todoDescription} onChange={handleTodoDescriptionChange}/>
            <button onClick={handleAddTodo}>Hinzufügen</button>
        </section>
    )
}