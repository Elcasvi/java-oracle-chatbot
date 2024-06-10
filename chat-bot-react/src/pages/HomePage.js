import { useParams } from "react-router-dom";
import DeveloperHomePage from "./DeveloperHomePage";
import ManagerViewProjects from "./ManagerViewProjects";

export default function HomePage() {
    const user="Manager"
    const { email } = useParams();

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