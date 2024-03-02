import {Outlet} from "react-router-dom";

export const SwipeHeader = () => {
    return <>
        <h1 style={{height: '200px',textAlign:'center', backgroundColor:'aqua', margin: 0}}>Header</h1>
        <Outlet/>
    </>
}