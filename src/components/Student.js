import React, { useEffect, useState } from "react";

const h = React.createElement;

const API =
    "http://localhost:5000/api/students";

function Student() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [photo, setPhoto] = useState("");
    const [video, setVideo] = useState("");

    const [search, setSearch] = useState("");

    const [editId, setEditId] = useState(null);


    // LOAD STUDENTS
    function loadStudents() {

        fetch(API)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setStudents(data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }


    useEffect(function() {
        loadStudents();
    }, []);


    // CLEAR FORM
    function clearForm() {

        setName("");
        setStudentClass("");
        setPhoto("");
        setVideo("");

        setEditId(null);
    }


    // SAVE / UPDATE
    function saveStudent() {

        if (!name || !studentClass) {
            alert("Please enter name and class");
            return;
        }

        const studentData = {
            name: name,
            studentClass: studentClass,
            photo: photo,
            video: video
        };


        if (editId === null) {

            fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(studentData)

            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    alert(data.message);

                    clearForm();

                    loadStudents();
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
                        JSON.stringify(studentData)
                }
            )
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    alert(data.message);

                    clearForm();

                    loadStudents();
                });
        }
    }


    // EDIT
    function editStudent(student) {

        setEditId(student.id);

        setName(student.name);

        setStudentClass(
            student.class
        );

        setPhoto(student.photo || "");

        setVideo(student.video || "");
    }


    // DELETE
    function deleteStudent(id) {

        const confirmDelete =
            window.confirm(
                "Delete this student?"
            );

        if (!confirmDelete) {
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

                loadStudents();
            });
    }


    // SEARCH
    const filteredStudents =
        students.filter(function(student) {

            return (
                student.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                student.class
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
            "1. Student"
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
                            "Enter student name",

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
                    "Class"
                ),

                h(
                    "input",
                    {
                        value: studentClass,

                        placeholder:
                            "Example: CSE-A",

                        onChange:
                            function(e) {
                                setStudentClass(
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
                    "Photo"
                ),

                h(
                    "input",
                    {
                        value: photo,

                        placeholder:
                            "Photo URL",

                        onChange:
                            function(e) {
                                setPhoto(
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
                    "Video"
                ),

                h(
                    "input",
                    {
                        value: video,

                        placeholder:
                            "Video URL",

                        onChange:
                            function(e) {
                                setVideo(
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
                    className: "save-button",

                    onClick: saveStudent
                },

                editId === null
                    ? "Save"
                    : "Update"
            ),

            h(
                "button",
                {
                    className: "cancel-button",

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
                "Student Table"
            ),

            h(
                "input",
                {
                    className: "search-input",

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
            { className: "table-container" },

            h(
                "table",
                null,

                h(
                    "thead",
                    null,

                    h(
                        "tr",
                        null,

                        h("th", null, "Name"),

                        h(
                            "th",
                            null,
                            "Class"
                        ),

                        h(
                            "th",
                            null,
                            "Photo"
                        ),

                        h(
                            "th",
                            null,
                            "Video"
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

                    filteredStudents.length === 0

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

                                "No students found"
                            )
                        )

                        :

                        filteredStudents.map(
                            function(student) {

                                return h(
                                    "tr",
                                    {
                                        key:
                                            student.id
                                    },

                                    h(
                                        "td",
                                        null,
                                        student.name
                                    ),

                                    h(
                                        "td",
                                        null,
                                        student.class
                                    ),

                                    h(
                                        "td",
                                        null,
                                        student.photo ||
                                            "-"
                                    ),

                                    h(
                                        "td",
                                        null,
                                        student.video ||
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
                                                        editStudent(
                                                            student
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
                                                        deleteStudent(
                                                            student.id
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

export default Student;