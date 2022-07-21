import React, {useState, useEffect} from "react";
//import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo';
import POINTS_BY_CLIENT_ID from './graphql/getPointsByClientId.graphql'

//const CSS_HANDLES = ['container', 'points'];

interface UserSessionData {
    id:string,
    email:string
}

const ClientPoints: StorefrontFunctionComponent = () => {
    const [userSessionData, setUserSessionData] = useState<UserSessionData | null>(null)
    const [userPoints, setUserPoints] = useState<number>(0)
    //const handles = useCssHandles(CSS_HANDLES)

    const pointsByClientId = useQuery(POINTS_BY_CLIENT_ID, {
        variables: {
            clientId: userSessionData?.id
        }
    })

    const fetchDataSession = async () => {
        fetch('/api/sessions?items=*')
        .then(res => res.json())
        .then(res => {
            const sessionUserData = {
                id: res.namespaces.profile.id?.value,
                email: res.namespaces.profile.email?.value
            }
            setUserSessionData(sessionUserData)
        })
    }

    useEffect( () => {
        if(!userSessionData){
            fetchDataSession()
            pointsByClientId.refetch()
        }
        
        if(!pointsByClientId.data){
            setUserPoints(pointsByClientId.data.pointsByClientId.points)
        }
   })

    return (
        // <div className={`${handles.container}`}>
        //     <h1 className={`${handles.points}`}>{userSessionData ? userPoints : "Faça login para visualizar sua pontuação"}</h1>
        // </div>
        <div>
            {userPoints}
        </div>
    )
}

export default ClientPoints;      