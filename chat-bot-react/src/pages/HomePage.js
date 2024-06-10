import { useParams } from "react-router-dom";
import DeveloperHomePage from "./DeveloperHomePage";
import ManagerViewProjects from "./ManagerViewProjects";
import { useEffect, useState } from "react";
import userServices from "../services/userServices";

export default function HomePage() {
    const { email } = useParams();
    const [ user, setUser ] = useState('')

    useEffect(() => {
        const userService = new userServices();
        userService.getByEmail(email).then( data => {
            setUser(data.rol)
        })
    },[]);

    return(
        <>
            {user === "Developer" ?
                <DeveloperHomePage/>
                :
                <ManagerViewProjects/>
            }
        </>
    );
};