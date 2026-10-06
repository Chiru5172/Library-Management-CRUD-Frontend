import React, { useState } from "react";

import Student from "./components/Student";
import Book from "./components/Book";
import Library from "./components/Library";

const h = React.createElement;

function App() {

    const [page, setPage] = useState("student");

    return h(
        "div",
        { className: "app" },

        h(
            "header",
            { className: "header" },

            h(
                "h1",
                null,
                "Library Management System"
            ),

            h(
                "p",
                null,
                "Student • Book • Library CRUD"
            )
        ),

        h(
            "nav",
            { className: "navigation" },

            h(
                "button",
                {
                    className:
                        page === "student"
                            ? "nav-button active"
                            : "nav-button",

                    onClick: function() {
                        setPage("student");
                    }
                },
                "Student"
            ),

            h(
                "button",
                {
                    className:
                        page === "book"
                            ? "nav-button active"
                            : "nav-button",

                    onClick: function() {
                        setPage("book");
                    }
                },
                "Book"
            ),

            h(
                "button",
                {
                    className:
                        page === "library"
                            ? "nav-button active"
                            : "nav-button",

                    onClick: function() {
                        setPage("library");
                    }
                },
                "Library"
            )
        ),

        h(
            "main",
            { className: "main-container" },

            page === "student"
                ? h(Student)
                : page === "book"
                ? h(Book)
                : h(Library)
        )
    );
}

export default App;