import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeveloperHomePage from './DeveloperHomePage';
import ManagerViewProjects from './ManagerViewProjects';
import userServices from '../services/userServices';
import LoadingSpinner from '../components/loadingSpinner';

const HomePage = () => {
    const { email } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userService = new userServices();
        userService.getByEmail(email).then(data => {
            setUser({ role: data.role, id: data.id });
        });
    }, [email]);

    if (!user) {
        return <LoadingSpinner />
    }

    return (
        <>
            {user.role === 'DEVELOPER' ? (
                <DeveloperHomePage userId={user.id} />
            ) : (
                <ManagerViewProjects userId={user.id} />
            )}
        </>
    );
};

export default HomePage;
