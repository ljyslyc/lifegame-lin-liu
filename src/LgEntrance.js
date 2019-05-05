 import React,{Component} from 'react'
 import LgOperatePanel from "./LgOperatePanel"
 import LgEvolutionPanel from "./LgEvolutionPanel";


 class LgEntrance extends Component{
     constructor(props){
         super(props);
         this.state={

         }
     }
     runGame=()=>{

     };
     stopGame=()=>{

     };
     render() {
         return(
             <div>
                 <div
                     className="operateP"
                     style={{textAlign:'center'}}
                 >
                     <LgOperatePanel
                         runGame={this.runGame}
                         stopGame={this.stopGame}
                     />
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