 import React,{Component,Fragment} from 'react'
 import LgOperatePanel from "./LgOperatePanel"
 import LgEvolutionPanel from "./LgEvolutionPanel";

 import 'antd/dist/antd.css'    //导入AntDesign样式

 const CELL_SIZE = 20;

/**
 * 在父组件LgEntrance中：
 * cells二维数组保存细胞的状态，并用runGame，stopGame对cells进行更新
 * LgEvolutionPanel只用作接收cells数据(transfer_cellsOnBoard函数），并将其渲染
 */
 class LgEntrance extends Component{
     constructor(props){
         super(props);
         this.state={
             cells:[],          //二维数组，保存细胞状态，以true/false
             sideRow:600,       //棋盘的纵高
             sideColumn:800,    //棋盘的横宽
         };
     }

    /*开始游戏*/
     runGame=()=>{

     };
     /*停止游戏*/
     stopGame=()=>{

     };
     /*根据当前棋盘的宽和高，随机初始化Cells二维数组*/
     initCells_random=()=>{
         let rowNum=this.state.sideRow/CELL_SIZE;
         let columnNum=this.state.sideColumn/CELL_SIZE;
         let tempCells=[];
         console.log("LgEntrance:二维数组cells重新随机计算前",this.state);
         for(let r=0;r<rowNum;r++){
             tempCells[r]=[];
             for(let c=0;c<columnNum;c++){
                 if(Math.random()>=0.7)
                     tempCells[r][c]=true;
                 else
                     tempCells[r][c]=false;
             }
         }
         console.log("tempCells",tempCells);
         this.setState({cells:tempCells},()=>{
             console.log("LgEntrance:二维数组cells重新随机计算后",this.state);
         });
     };
    /*根据当前棋盘的宽和高，全空初始化Cells二维数组*/
    initCells_empty=()=>{
        let rowNum=this.state.sideRow/CELL_SIZE;
        let columnNum=this.state.sideColumn/CELL_SIZE;
        let tempCells=[];
        for(let r=0;r<rowNum;r++){
            tempCells[r]=[];
            for(let c=0;c<columnNum;c++){
                tempCells[r][c]=false;
            }
        }
        this.setState({cells:tempCells},()=>{
            console.log("LgEntrance:Cells has been set empty",this.state);
        });
    };
    /*设置棋盘边长，并更新二维数组cells*/
    set_sideLength=(nextSide_row,nextSide_column)=>{
        let rowNum=nextSide_row/CELL_SIZE;
        let columnNum=nextSide_column/CELL_SIZE;
        let tempCells=[];
        for(let r=0;r<rowNum;r++){
            tempCells[r]=[];
            for(let c=0;c<columnNum;c++){
                tempCells[r][c]=false;
            }
        }
        console.log(nextSide_row,'×',nextSide_column);
        //只setState一次，不要分两次setState，会过度触发子组件的render及其他生命周期函数
        this.setState({
            sideRow:nextSide_row,
            sideColumn:nextSide_column,
            cells:tempCells,
        });
    };
    /*由LgCell的onClick事件触发，修改LgEntrance里cells数组里的单个细胞状态*/
    set_cellState=(c,r)=>{
        console.log("LgEntrance:set_cellState开始",this.state);
        let tempCells=this.state.cells;
        let preState=tempCells[r][c];
        tempCells[r][c]=!preState;
        this.setState({cells:tempCells},
                ()=>{
                    console.log("LgEntrance:set_cellState",this.state);
                }
            );
    };
    componentWillMount() {
        this.initCells_empty();
    }

    render() {
         return(
             <Fragment>
                 {console.log("LgEntrance:render()")}
                 <div
                     className="operateP"
                     style={{textAlign:'center'}}
                 >
                     <LgOperatePanel
                         runGame={this.runGame}
                         stopGame={this.stopGame}
                         setSide={this.set_sideLength}
                         initEmpty={this.initCells_empty}
                         initRandom={this.initCells_random}
                     />
                 </div>
                 <br/>
                 <div
                     className="evolutionP"
                     style={{textAlign:'center'}}
                 >
                    <LgEvolutionPanel
                        // getCells={this.transfer_cellsOnBoard}
                        cells={this.state.cells}
                        sideRow={this.state.sideRow}
                        sideColumn={this.state.sideColumn}
                        flipCellState={this.set_cellState}
                    />
                 </div>
             </Fragment>
         );
     }
 }
 export default LgEntrance;