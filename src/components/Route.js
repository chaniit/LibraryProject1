import React from "react";
import './home.css'
import { graphConfig } from './graphConfig'

export default function Route({ route }) {

    const canvasRef = React.useRef()
    const draw = ctx => {
        ctx.moveTo(22, 17);
        route?.slice(1, route.length).forEach((point) => {
            ctx.lineTo(graphConfig[point].x, graphConfig[point].y);
        })
       
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    React.useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    }, [draw])


    return <canvas ref={canvasRef} className='route' />
}