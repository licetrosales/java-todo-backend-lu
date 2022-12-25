import {ChangeEvent} from "react";

type SearchProps = {
    handleSearchQueryChange(searchQuery: string): void
}

export default function Search(props: SearchProps) {
// Diese Funktion übergiibt Suchanfragen an die Elternklasse
    // und zwar SOFORT!
    //(Deshalb kein State)

    function handleSearchQueryChange(event: ChangeEvent<HTMLInputElement>) {
        console.log("Unser Event bei Filterfunktion: " )
        console.log(event)
        props.handleSearchQueryChange(event.target.value)
    }

    return (
        <section>
            <input onChange={handleSearchQueryChange}/>
        </section>

    )
}