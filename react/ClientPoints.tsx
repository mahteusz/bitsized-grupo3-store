import React, {useState, useEffect} from "react";
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANLDES = ['container', 'points'];

interface UserData{
    userId:string,
    user:string,
    userType:string

};

const ClientPoints: StorefrontFunctionComponent = () => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const handles = useCssHandles(CSS_HANLDES)
    

    useEffect( () => {
        const fetchData = async () => {
            const res = await fetch('https://vtexid.vtex.com.br/api/vtexid/pub/authenticated/user')
            const toJson = await res.json()
            setUserData(toJson)
            console.log(toJson) 
        }

        if(!userData){
            fetchData()
        }

   }) 

    return (
        <div className={`${handles.container}`}>
            <h1 className={`${handles.points}`}>{userData?.userId}</h1>
        </div>
    )
}

export default ClientPoints;      