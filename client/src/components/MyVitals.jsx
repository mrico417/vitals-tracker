/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const MyVitals = ({login}) => {

    const [myVitals, setMyVitals] = useState([])

    // get vitals for login from api
    const getMyVitals = async () => {
        try {
            const response = await fetch(`/api/vitals/${login.id}/`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,     
                },
                
            });

            const result = await response.json();

            console.log(result);
            setMyVitals(result.data);
            } catch (error) {
                console.log(error);
        }
    };

    useEffect(()=>{
        getMyVitals();
    },[]);

    return(
        <>
            {
                myVitals.map((myVital)=>{
                    return (
                        <div key={myVital.id}>
                            {myVital.vital_name} {myVital.value} {myVital.created_cdt}
                        </div>
                    )
                })
            }
        </>
    )

};