import React, {
    useEffect,
    useState
} from "react";

const h = React.createElement;

const STUDENT_API =
    "http://localhost:5000/api/students";

const BOOK_API =
    "http://localhost:5000/api/books";

const LIBRARY_API =
    "http://localhost:5000/api/library";


function Library() {

    const [students, setStudents] =
        useState([]);

    const [books, setBooks] =
        useState([]);

    const [records, setRecords] =
        useState([]);


    const [studentId, setStudentId] =
        useState("");

    const [bookId, setBookId] =
        useState("");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");


    const [editId, setEditId] =
        useState(null);

    const [search, setSearch] =
        useState("");


    // LOAD STUDENTS
    function loadStudents() {

        fetch(STUDENT_API)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setStudents(data);
            });
    }


    // LOAD BOOKS
    function loadBooks() {

        fetch(BOOK_API)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setBooks(data);
            });
    }


    // LOAD LIBRARY
    function loadRecords() {

        fetch(LIBRARY_API)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setRecords(data);
            });
    }


    useEffect(function() {

        loadStudents();

        loadBooks();

        loadRecords();

    }, []);


    // CLEAR
    function clearForm() {

        setStudentId("");

        setBookId("");

        setStartDate("");

        setEndDate("");

        setEditId(null);
    }


    // SAVE / UPDATE
    function saveRecord() {

        if (
            !studentId ||
            !bookId ||
            !startDate ||
            !endDate
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }


        const data = {

            student_id:
                studentId,

            book_id:
                bookId,

            start_date:
                startDate,

            end_date:
                endDate
        };


        if (editId === null) {

            fetch(
                LIBRARY_API,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {

                    alert(result.message);

                    clearForm();

                    loadRecords();
                });

        } else {

            fetch(
                LIBRARY_API +
                    "/" +
                    editId,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {

                    alert(result.message);

                    clearForm();

                    loadRecords();
                });
        }
    }


    // EDIT
    function editRecord(record) {

        setEditId(record.id);

        setStudentId(
            String(record.student_id)
        );

        setBookId(
            String(record.book_id)
        );

        setStartDate(
            record.start_date
        );

        setEndDate(
            record.end_date
        );
    }


    // DELETE
    function deleteRecord(id) {

        if (
            !window.confirm(
                "Delete this library record?"
            )
        ) {
            return;
        }


        fetch(
            LIBRARY_API +
                "/" +
                id,
            {
                method: "DELETE"
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {

                alert(result.message);

                loadRecords();
            });
    }


    const filteredRecords =
        records.filter(
            function(record) {

                return (

                    record.student_name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    record.book_name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
                );
            }
        );


    return h(
        "section",
        {
            className:
                "section-card"
        },


        h(
            "h2",
            null,
            "3. Library"
        ),


        h(
            "div",
            {
                className:
                    "library-form"
        },


            h(
                "div",
                {
                    className:
                        "form-group"
                },

                h(
                    "label",
                    null,
                    "Student Name"
                ),

                h(
                    "select",
                    {
                        value:
                            studentId,

                        onChange:
                            function(e) {
                                setStudentId(
                                    e.target.value
                                );
                            }
                    },

                    h(
                        "option",
                        {
                            value: ""
                        },

                        "Select Student"
                    ),

                    students.map(
                        function(student) {

                            return h(
                                "option",
                                {
                                    key:
                                        student.id,

                                    value:
                                        student.id
                                },

                                student.name
                            );
                        }
                    )
                )
            ),


            h(
                "div",
                {
                    className:
                        "form-group"
                },

                h(
                    "label",
                    null,
                    "Book Name"
                ),

                h(
                    "select",
                    {
                        value:
                            bookId,

                        onChange:
                            function(e) {
                                setBookId(
                                    e.target.value
                                );
                            }
                    },

                    h(
                        "option",
                        {
                            value: ""
                        },

                        "Select Book"
                    ),

                    books.map(
                        function(book) {

                            return h(
                                "option",
                                {
                                    key:
                                        book.id,

                                    value:
                                        book.id
                                },

                                book.name
                            );
                        }
                    )
                )
            ),


            h(
                "div",
                {
                    className:
                        "form-group"
                },

                h(
                    "label",
                    null,
                    "Start Date"
                ),

                h(
                    "input",
                    {
                        type:
                            "date",

                        value:
                            startDate,

                        onChange:
                            function(e) {
                                setStartDate(
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
                        "form-group"
                },

                h(
                    "label",
                    null,
                    "End Date"
                ),

                h(
                    "input",
                    {
                        type:
                            "date",

                        value:
                            endDate,

                        onChange:
                            function(e) {
                                setEndDate(
                                    e.target.value
                                );
                            }
                    }
                )
            )
        ),


        h(
            "div",
            {
                className:
                    "form-buttons"
            },

            h(
                "button",
                {
                    className:
                        "save-button",

                    onClick:
                        saveRecord
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

                    onClick:
                        clearForm
                },

                "Cancel"
            )
        ),


        h(
            "div",
            {
                className:
                    "table-header"
            },

            h(
                "h3",
                null,
                "Library Table"
            ),

            h(
                "input",
                {
                    className:
                        "search-input",

                    placeholder:
                        "Search...",

                    value:
                        search,

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
                            "Student Name"
                        ),

                        h(
                            "th",
                            null,
                            "Book Name"
                        ),

                        h(
                            "th",
                            null,
                            "Start Date"
                        ),

                        h(
                            "th",
                            null,
                            "End Date"
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

                    filteredRecords.length === 0

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

                                "No library records found"
                            )
                        )

                        :

                        filteredRecords.map(
                            function(record) {

                                return h(
                                    "tr",
                                    {
                                        key:
                                            record.id
                                    },

                                    h(
                                        "td",
                                        null,
                                        record.student_name
                                    ),

                                    h(
                                        "td",
                                        null,
                                        record.book_name
                                    ),

                                    h(
                                        "td",
                                        null,
                                        record.start_date
                                    ),

                                    h(
                                        "td",
                                        null,
                                        record.end_date
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
                                                        editRecord(
                                                            record
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
                                                        deleteRecord(
                                                            record.id
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

export default Library;