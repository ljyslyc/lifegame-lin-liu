 import React,{Component} from 'react'
 import LgOperatePanel from "./LgOperatePanel"
 import LgEvolutionPanel from "./LgEvolutionPanel";


 class LgEntrance extends Component{
     render() {
         return(
             <div>
                 <div
                     className="operateP"
                     style={{textAlign:'center'}}
                 >
                     <LgOperatePanel/>
                 </div>
                 <div
                     className="evolutionP"
                     style={{textAlign:'center'}}
                 >
                    <LgEvolutionPanel/>
                 </div>
             </div>
         );
     }
 }
 export default LgEntrance;