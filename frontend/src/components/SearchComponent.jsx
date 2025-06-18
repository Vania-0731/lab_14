import { useState, useEffect } from "react";

function SearchComponent({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(inputValue.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue, onSearch]);

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    );
}

export default SearchComponent;
