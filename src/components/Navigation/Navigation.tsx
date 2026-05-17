import { Link, Route, Routes } from "react-router";
import './Navigation.css';
import { App } from "../App/App";
import { About } from "../About/About";

export function Navigation() {
    return (
        <>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/about">About page</Link>
            </nav>

            <Routes>
                <Route path="home" element={<App />} />
                <Route path="about" element={<About />} />
            </Routes>
        </>
    );
}
