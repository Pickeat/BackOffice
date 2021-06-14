import NavBar from '../../components/navBar'
import PageContent from "../../components/pageContent";
import StatsWidget from "../../components/statsWidget";

export default function Dashboard() {
    return (
        <div>
            <NavBar/>
            <PageContent content={
                <StatsWidget statsList={[
                    { name: 'Total Subscribers', stat: '71,897' },
                    { name: 'Avg. Open Rate', stat: '58.16%' },
                    { name: 'Avg. Click Rate', stat: '24.57%' },
                    { name: 'Avg. Open Rate', stat: '58.16%' },
                ]}/>
            }/>
        </div>
    )
}
