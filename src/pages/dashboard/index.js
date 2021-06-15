import NavBar from '../../components/navBar'
import PageContent from "../../components/pageContent";
import StatsWidget from "../../components/statsWidget";

import {toast} from "react-toastify";
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";
import statsUsers from "../../api/stats/users";
import statsAnnounces from "../../api/stats/announces";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const [statsUsersArray, setStatsUsersArray] = useState([]);
    const [statsAnnouncesArray, setStatsAnnouncesArray] = useState([]);

    const getMetrics = (event) => {
        statsUsers().then((response) => {
            if (response.success) {
                setStatsUsersArray(response.success);
            } else if (response.warning)
                toast.warning(response.warning);
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error));
        });
        statsAnnounces().then((response) => {
            if (response.success) {
                setStatsAnnouncesArray(response.success);
            } else if (response.warning)
                toast.warning(response.warning);
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error));
        });
    }

    useEffect(() => {
        getMetrics();
        console.log(statsAnnouncesArray)
    }, []);

    return (
        <div>
            <NavBar/>
            <PageContent content={
                <div><StatsWidget first="true" title="Utilisateurs" statsList={[
                    {name: 'Total Users', stat: statsUsersArray.users_total},
                    {name: 'Registered Users', stat: statsUsersArray.registered_users},
                    {name: 'Confirmed Users', stat: statsUsersArray.confirmed_users}
                ]}/>
                    <StatsWidget title="Announces" statsList={[
                        {name: 'Total Announces', stat: statsAnnouncesArray.announces_total},
                        {name: 'Available Announces', stat: statsAnnouncesArray.available_announces},
                        {name: 'WFR Announces', stat: statsAnnouncesArray.waiting_for_reservation_announces},
                        {name: 'Given Announces', stat: statsAnnouncesArray.given_announces},
                        {name: 'Noted Announces', stat: statsAnnouncesArray.noted_announces},
                        {name: 'Deleted Announces', stat: statsAnnouncesArray.deleted_announces}
                    ]}/>
                </div>

            }/>

        </div>
    )
}
