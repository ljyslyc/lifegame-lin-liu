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
            isGameRun:false,   //游戏是否运行中
        };
        this.id_intervel=null;
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.cells===nextState.cells)
    //         return false;
    //     console.log("LgEntrance:shouldComponentUpdate(thisState,nextState)",this.state,nextState);
    //     return true;
    // }

    /*开始游戏*/
    runGame=()=>{
        console.log("LgEntrance:runGame",this.state);
        this.setState({isGameRun:true},()=>{
            //游戏开始后
            this.id_intervel=window.setInterval(()=>this.updateCells(),2);
        })
    };
    /*停止游戏*/
    stopGame=()=>{
        console.log("LgEntrance:stopGame",this.state);
        this.setState({isGameRun:false},()=>{
            //游戏停止后
            if(this.id_intervel!==null)
                window.clearInterval(this.id_intervel);
        })
    };
    /*判断x是否在上下限内，左闭右开*/
    between=(x,lowerLimit,upperLimit)=>{
        return x >= lowerLimit && x <upperLimit;
    };
    /*更新当前棋盘*/
    updateCells=()=>{
        if(this.state.isGameRun){
            // console.log("LgEntrance:updateCells",this.state);

            /*nextCells为空*/
            let temp_rowNum=this.state.sideRow/CELL_SIZE;
            let temp_columnNum=this.state.sideColumn/CELL_SIZE;
            let emptyCells=[];
            for(let r=0;r<temp_rowNum;r++){
                emptyCells[r]=[];
                for(let c=0;c<temp_columnNum;c++){
                    emptyCells[r][c]=false;
                }
            }
            let nextCells=emptyCells;           //下一次的信息，用于保存修改数据
            let presentCells=this.state.cells;  //当前的数据信息，作为参考
            let rowNum=this.state.sideRow/CELL_SIZE;
            let columnNum=this.state.sideColumn/CELL_SIZE;

            let countCell=0;                    //计算周围8个格子，活细胞的数量

            for(let r=0;r<rowNum;r++){
                for(let c=0;c<columnNum;c++){
                    //数活细胞的个数
                    countCell=0;
                    if(this.between(r-1,0,rowNum)&&this.between(c-1,0,columnNum)){
                        /*(r-1,c-1)左上*/
                        if(presentCells[r-1][c-1])
                            countCell++;
                    }
                    if(this.between(r-1,0,rowNum)){
                        /*(r-1,c)上*/
                        if(presentCells[r-1][c])
                            countCell++;
                    }
                    if(this.between(r-1,0,rowNum)&&this.between(c+1,0,columnNum)) {
                        /*(r-1,c+1)右上*/
                        if (presentCells[r-1][c+1])
                            countCell++;
                    }
                    if(this.between(c-1,0,columnNum)){
                        /*(r,c-1)左*/
                        if(presentCells[r][c-1])
                            countCell++;
                    }
                    if(this.between(c+1,0,columnNum)){
                        /*(r,c+1)右*/
                        if(presentCells[r][c+1])
                            countCell++;
                    }
                    if(this.between(r+1,0,rowNum)&&this.between(c-1,0,columnNum)){
                        /*(r+1,c-1)左下*/
                        if(presentCells[r+1][c-1])
                            countCell++;
                    }
                    if(this.between(r+1,0,rowNum)) {
                        /*(r+1,c)下*/
                        if (presentCells[r + 1][c])
                            countCell++;
                    }
                    if(this.between(r+1,0,rowNum)&&this.between(c+1,0,columnNum)){
                        /*(r+1,c+1)右下*/
                        if(presentCells[r+1][c+1])
                            countCell++;
                    }
                    //更新
                    if(!presentCells[r][c]) {
                        //当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态
                        if (countCell === 3)
                            nextCells[r][c] = true;
                    }
                    else {
                        //当前细胞为存活状态时
                        //当周围低于2个（不包含2个）存活细胞时， 该细胞变成死亡状态
                        //当周围有2个或3个存活细胞时， 该细胞保持原样
                        //当周围有3个以上的存活细胞时，该细胞变成死亡状态
                        if(countCell<2||countCell>3)
                            nextCells[r][c]=false;
                        else
                            nextCells[r][c]=true;
                    }
                }
            }//end of traverse
            this.setState({cells:nextCells});
        }else {
            console.log("游戏停止");
        }
    };
    /*根据当前棋盘的宽和高，随机初始化Cells二维数组*/
    initCells_random=()=>{
        let rowNum=this.state.sideRow/CELL_SIZE;
        let columnNum=this.state.sideColumn/CELL_SIZE;
        let tempCells=[];

        for(let r=0;r<rowNum;r++){
            tempCells[r]=[];
            for(let c=0;c<columnNum;c++){
                if(Math.random()>=0.7)
                    tempCells[r][c]=true;
                else
                    tempCells[r][c]=false;
            }
        }
        this.setState({cells:tempCells});
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
        // console.log(nextSide_row,'×',nextSide_column);
        /**
         * 只setState一次，不要分两次setState，会过度触发子组件的render及其他生命周期函数
         * */
        this.setState({
            sideRow:nextSide_row,
            sideColumn:nextSide_column,
            cells:tempCells,
        });
    };
    /*由LgCell的onClick事件触发，修改LgEntrance里cells数组里的单个细胞状态*/
    set_cellState=(c,r)=>{
        // console.log("LgEntrance:set_cellState开始",this.state);
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
                 {console.log("LgEntrance:render",this.state)}
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