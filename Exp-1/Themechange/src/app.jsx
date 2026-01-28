import { useState, useEffect } from "react";
import "./index.css";

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <main className={`app ${theme}`}>
            <div className="container">
                <h1>{theme.toUpperCase()}</h1>
                <button onClick={toggle}>
                    Toggle Theme
                </button>
            </div>
        </main>
    );
}

export default App;