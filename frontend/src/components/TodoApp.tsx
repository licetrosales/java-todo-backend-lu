//export default = Standardexport

import TodoList from "./TodoList";
import axios from "axios";
import {Todo} from "../models/Todo";
import {useEffect, useState} from "react";
import AddTodo from "./AddTodo";

export default function TodoApp() {
    const todoBaseUrl = "/api/todo";
    // Was ist ein State?
    // React Mechanismus, um Daten zu aktualizieren,
    // wenn diese sich ändern, wird neu gerendert

    // todos = Daten

    const [todos, setTodos] = useState<Todo []>([])

// Eine Funktion um "Seiteneffekte" zu verarbeiten
    // Wir nutzen useEffect um eine Endlosschleife zu vermeiden
    useEffect(() => {
        getTodos()
        //[] : useEffect wird beim ERSTEN laden der Komponente
    }, [])

    function getTodos() {
        // get wiel HTTP GET
        // Eine Anfrage ist asynchron
        // Um auf die Antwort zu antworten SOBALD sie da ist,
        // arbeiten wir mit "Promises
        axios.get(todoBaseUrl)
            // Was passiert, wenn die Anfrage erfolgreich war

            .then(todoListResponse => {
                const newTodoList: Todo[] = todoListResponse.data;
                setTodos(newTodoList);
            })
            // ... und wenn's schief läuft ...?
            .catch(errorMessageResponse => {
                console.log("ALAM! Es gab einen Fehler beim GET: " + errorMessageResponse)
            })

    }

    function addTodo(newTodoWithoutId: Todo) {

        axios.post(todoBaseUrl, newTodoWithoutId)
            // Statuscode = Erfolgreich 200 Ok
            // Auf Antwort reagieren
            .then(newTodoResponse => {
                console.log("Early Christmas! Neues TODO: " + newTodoResponse.data)

                // Aufgabe 3. Das neue Todo mit der ID zur Liste hinzufügen
// Wir aktualizieren den "todosList" State und nutzen dafür den vorherigen State mittels
                // "prev" (= previous) + <stateName>
                // prevTodoList = vorherige Todo-Liste
                setTodos(prevTodoList => {
                        // Hier nutzen wir den "Spread Operator" = ...
                        // https://stackoverflow.com/a/37002941

                        // Was pasiert: mit den crei Punkten kopieren wir alles aus dem "prevTodos" Array
                        // und fügen das neue Element zur Liste hinzu
                        // mit return geben wir die neu erstellte Liste (alte Liste + neues Element) zurück
                    // Was bei den Pünktchen unter der Haube passiert:
                    // const newTodoList: Todo[] = []
                    // for (const todo of prevTodoList) {
                    // new TodoList.push(todo)
                    //}
                    return [...prevTodoList, newTodoResponse.data]
                    }
                )
            })
            // Fehlercode
            .catch(errorMessageResponse => {

                console.log("ALARM! Es gab einen Fehler beim POST: " + errorMessageResponse)
            })
    }

    //TODO Hinzufügen:
    // 1. Das neue Todo übergeben
    // 2. Das neue Todo ans Backend verschicken
    // 3. Das neue Todo MIT der ID in der Liste speichern
    return (
        <section>
            <h1> Beste Todo App der Welt </h1>
            <TodoList todosToMap={todos}/>
            <AddTodo handleAddTodo={addTodo}/>
        </section>
    )
}