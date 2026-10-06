import React, { useEffect, useState } from "react";

const h = React.createElement;

const API =
    "http://localhost:5000/api/books";

function Book() {

    const [books, setBooks] = useState([]);

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [publication, setPublication] =
        useState("");
    const [year, setYear] = useState("");

    const [search, setSearch] =
        useState("");

    const [editId, setEditId] =
        useState(null);


    function loadBooks() {

        fetch(API)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setBooks(data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }


    useEffect(function() {
        loadBooks();
    }, []);


    function clearForm() {

        setName("");
        setAuthor("");
        setPublication("");
        setYear("");

        setEditId(null);
    }


    function saveBook() {

        if (!name || !author) {

            alert(
                "Book name and author are required"
            );

            return;
        }


        const bookData = {

            name: name,

            author: author,

            publication: publication,

            year: year
        };


        if (editId === null) {

            fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(bookData)

            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    alert(data.message);

                    clearForm();

                    loadBooks();
                });

        } else {

            fetch(
                API + "/" + editId,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(bookData)
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    alert(data.message);

                    clearForm();

                    loadBooks();
                });
        }
    }


    function editBook(book) {

        setEditId(book.id);

        setName(book.name);

        setAuthor(book.author);

        setPublication(
            book.publication || ""
        );

        setYear(
            book.year || ""
        );
    }


    function deleteBook(id) {

        if (
            !window.confirm(
                "Delete this book?"
            )
        ) {
            return;
        }


        fetch(
            API + "/" + id,
            {
                method: "DELETE"
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                alert(data.message);

                loadBooks();
            });
    }


    const filteredBooks =
        books.filter(function(book) {

            return (

                book.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                book.author
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                (book.publication || "")
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        });


    return h(
        "section",
        { className: "section-card" },


        h(
            "h2",
            null,
            "2. Book"
        ),


        h(
            "div",
            { className: "form-grid" },

            h(
                "div",
                { className: "form-group" },

                h(
                    "label",
                    null,
                    "Name"
                ),

                h(
                    "input",
                    {
                        value: name,

                        placeholder:
                            "Enter book name",

                        onChange:
                            function(e) {
                                setName(
                                    e.target.value
                                );
                            }
                    }
                )
            ),


            h(
                "div",
                { className: "form-group" },

                h(
                    "label",
                    null,
                    "Author"
                ),

                h(
                    "input",
                    {
                        value: author,

                        placeholder:
                            "Enter author",

                        onChange:
                            function(e) {
                                setAuthor(
                                    e.target.value
                                );
                            }
                    }
                )
            ),


            h(
                "div",
                { className: "form-group" },

                h(
                    "label",
                    null,
                    "Publication"
                ),

                h(
                    "input",
                    {
                        value: publication,

                        placeholder:
                            "Enter publication",

                        onChange:
                            function(e) {
                                setPublication(
                                    e.target.value
                                );
                            }
                    }
                )
            ),


            h(
                "div",
                { className: "form-group" },

                h(
                    "label",
                    null,
                    "Year"
                ),

                h(
                    "input",
                    {
                        type: "number",

                        value: year,

                        placeholder:
                            "2026",

                        onChange:
                            function(e) {
                                setYear(
                                    e.target.value
                                );
                            }
                    }
                )
            )
        ),


        h(
            "div",
            { className: "form-buttons" },

            h(
                "button",
                {
                    className:
                        "save-button",

                    onClick: saveBook
                },

                editId === null
                    ? "Save"
                    : "Update"
            ),

            h(
                "button",
                {
                    className:
                        "cancel-button",

                    onClick: clearForm
                },

                "Cancel"
            )
        ),


        h(
            "div",
            { className: "table-header" },

            h(
                "h3",
                null,
                "Book Table"
            ),

            h(
                "input",
                {
                    className:
                        "search-input",

                    placeholder:
                        "Search...",

                    value: search,

                    onChange:
                        function(e) {
                            setSearch(
                                e.target.value
                            );
                        }
                }
            )
        ),


        h(
            "div",
            {
                className:
                    "table-container"
            },

            h(
                "table",
                null,

                h(
                    "thead",
                    null,

                    h(
                        "tr",
                        null,

                        h(
                            "th",
                            null,
                            "Name"
                        ),

                        h(
                            "th",
                            null,
                            "Author"
                        ),

                        h(
                            "th",
                            null,
                            "Publication"
                        ),

                        h(
                            "th",
                            null,
                            "Year"
                        ),

                        h(
                            "th",
                            null,
                            "Action"
                        )
                    )
                ),


                h(
                    "tbody",
                    null,

                    filteredBooks.length === 0

                        ? h(
                            "tr",
                            null,

                            h(
                                "td",
                                {
                                    colSpan: 5,
                                    className:
                                        "no-data"
                                },

                                "No books found"
                            )
                        )

                        :

                        filteredBooks.map(
                            function(book) {

                                return h(
                                    "tr",
                                    {
                                        key:
                                            book.id
                                    },

                                    h(
                                        "td",
                                        null,
                                        book.name
                                    ),

                                    h(
                                        "td",
                                        null,
                                        book.author
                                    ),

                                    h(
                                        "td",
                                        null,
                                        book.publication ||
                                            "-"
                                    ),

                                    h(
                                        "td",
                                        null,
                                        book.year ||
                                            "-"
                                    ),

                                    h(
                                        "td",
                                        {
                                            className:
                                                "action-buttons"
                                        },

                                        h(
                                            "button",
                                            {
                                                className:
                                                    "edit-button",

                                                onClick:
                                                    function() {
                                                        editBook(
                                                            book
                                                        );
                                                    }
                                            },

                                            "Edit"
                                        ),

                                        h(
                                            "button",
                                            {
                                                className:
                                                    "delete-button",

                                                onClick:
                                                    function() {
                                                        deleteBook(
                                                            book.id
                                                        );
                                                    }
                                            },

                                            "Delete"
                                        )
                                    )
                                );
                            }
                        )
                )
            )
        )
    );
}

export default Book;