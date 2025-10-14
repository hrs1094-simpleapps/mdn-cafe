import React from "react"; 
import "../../../css/bouncingball.css"
/**
 * Bouncing Ball Animation component
 *
 * @param style JSX styles
 * @param className CSS
 * @returns ```<BouncingBallAnim/>```
 */
const BouncingBallAnim = ({
    style,
    className
}: {
    style?: React.CSSProperties;
    className?: string;
}) => {
    return (
         <div className={"anim-container "+className} style={style}>
            <div />
            <div />
            <div />
        </div>
    );
};


export default BouncingBallAnim;