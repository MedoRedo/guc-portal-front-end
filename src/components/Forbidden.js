import React, { useEffect } from 'react';
import batWing from '../static/images/403/bat-wing.png';
import batBody from '../static/images/403/bat-body.png';
import hauntedHouse from '../static/images/403/HauntedHouseForeground.png';
import ForbiddenStyles from '../static/styles/ForbiddenStyles.module.css'; 
const Forbidden = (props)=>{
     useEffect(() => {
          console.log('here');
          props.showNavBar(false);
     }, [])
return(
<div className={ForbiddenStyles.div}>
<div className={ForbiddenStyles.maincontainer}>
  <div className={ForbiddenStyles.bat}>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.leftwing]}
         src={batWing}/>
    <img className={ForbiddenStyles.body}
         src={batBody} alt="bat"/>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.rightwing]}
         src={batWing}/>
  </div>
  <div className={ForbiddenStyles.bat}>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.leftwing]}
         src={batWing}/>
    <img className={ForbiddenStyles.body}
         src={batBody} alt="bat"/>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.rightwing]}
         src={batWing}/>
  </div>
  <div className={ForbiddenStyles.bat}>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.leftwing]}
         src={batWing}/>
    <img className={ForbiddenStyles.body}
         src={batBody} alt="bat"/>
    <img className={[ForbiddenStyles.wing,ForbiddenStyles.rightwing]}
         src={batWing}/>
  </div>
  <img className={ForbiddenStyles.foregroundimg} src={hauntedHouse} alt="haunted house"/>
  
</div>
<h1 style={{position: 'relative',
    top: '-200px',
    fontFamily: 'Creepster',
    color: 'white',
    textAlign: 'center',
    fontSize: '6em',
    letterSpacing:'0.1em'}}>ERROR 403</h1>
<div className={ForbiddenStyles.errortext}>This area is forbidden. Turn back now!</div>
</div>);

}
export default Forbidden;