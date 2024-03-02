import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import sliderService from "../service/SliderService.ts";
import React, {useState} from "react";

export const SwipeArea = () => {
    const [height, _] = useState(window.innerHeight);
    console.log('height : ',height)
    const [positon, setPositon] = useState(300)
    return <div style={{...styles.swipeArea,display : 'flex',flexDirection : 'column'}}>
    <div style={{...styles.upperArea,height: `${positon}px`}}>上部エリア</div>
    <div style={{...styles.lowerArea,height: `${height-200-positon}px`}}>下部エリア</div>
        <div
            style={{...styles.updownIcon,position:'absolute',top:`${200+positon-25}px`,left:'50%'}}
            onTouchStart={()=> sliderService.setStart()}
            onTouchMove={(e:React.TouchEvent<HTMLDivElement>)=> setPositon(sliderService.setMove(e)) }
            onTouchEnd={()=> sliderService.setEnd()}
        >
            <VerticalAlignCenterIcon style={{fontSize: '50px'}}/>
        </div>
    </div>
}

const styles = {
    swipeArea : {
      height : '100vh -200px',
    },
    upperArea : {
        backgroundColor : 'yellow',
        borderBottom : '10px solid black'
    },
    lowerArea : {
        backgroundColor: 'pink',
    },
    updownIcon : {
        backgroundColor : 'gray',
        // fontSize: '30px !important',
        // position: 'absolute',
    }
}