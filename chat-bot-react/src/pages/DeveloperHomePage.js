import '../HomePage.css'
import React from "react";
import '../util/TaskModel'
export default function DeveloperHomePage()
{
    return(
        <div className="home-page-container">
            <h1>Developer Home Page</h1>
            <div className="options-container">
                <button type="submit">Add New Task</button>

            </div>
        </div>
    );
};