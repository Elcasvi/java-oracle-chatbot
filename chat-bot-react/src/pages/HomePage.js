import { useParams } from "react-router-dom";
import DeveloperHomePage from "./DeveloperHomePage";
import ManagerViewProjects from "./ManagerViewProjects";
import { useEffect, useState } from "react";
import userServices from "../services/userServices";

export default function HomePage() {
    const { email } = useParams();
    const [ user, setUser ] = useState('');
    const [ userId, setUserId ] = useState();

    useEffect(() => {
        const userService = new userServices();
        userService.getByEmail(email).then( data => {
            setUser(data.rol);
            setUserId(data.id);
        })
    },[email]);

    return(
        <>
            {user === "Developer" ?
                <DeveloperHomePage/>
                :
                <ManagerViewProjects userId={userId}/>
            }
        </>
    );
};