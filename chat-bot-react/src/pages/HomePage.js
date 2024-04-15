import DeveloperHomePage from "./DeveloperHomePage";
import ManagerHomePage from "./ManagerHomePage";

export default function HomePage() {
    const user="Developer"

    return(
        <>
            {user === "Developer" ?
                <DeveloperHomePage/>
                :
                <ManagerHomePage/>
            }
        </>
    );
};