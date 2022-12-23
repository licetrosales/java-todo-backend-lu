//export default = Standardexport
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";

export default function TodoApp() {
    const todoBaseUrl = "/api/todo";
    // Was ist ein State?
    // React Mechanismus, um Daten zu aktualizieren,
    // wenn diese sich ändern, wird neu gerendert

    // todos = Daten

    const [todos, setTodos] = useState<Todo []>([])
    function getTodos(){
        // get wiel HTTP GET
        // Eine Anfrage ist asynchron
        // Um auf die Antwort zu antworten SOBALD sie da ist,
        // arbeiten wir mit "Promises
        axios.get(todoBaseUrl)
            // Was passiert, wenn die Anfrage erfolgreich war

            .then(todoListResponse =>{
                const newTodoList: Todo[] = todoListResponse.data;
            setTodos(newTodoList);
            })
        // ... und wenn's schief läuft ...?
            .catch(errorMessageResponse => {
                console.log("ALAM! Es gab einen Fehler beim GET: " + errorMessageResponse)
            })

    }
    return (
        <section>
            <h1> Beste Todo App der Welt </h1>
            <TodoList todosToMap={todos}/>
        </section>
    )
}