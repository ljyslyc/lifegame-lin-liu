import React,{Component} from 'react'
import 'LgEvolutionPanel.css'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class LgCell extends  Component{
    constructor(props){
        super(props);
        this.state={
            isAlive:0,  //0：死亡，1:活着
        }
    }
    /*当细胞被点击时，切换它的状态*/
    handleClick=()=>{
        if(this.state.isAlive===0){
            this.set_nextCellState(1);
        }else if(this.state.isAlive===1){
            this.set_nextCellState(0);
        }else{
            console.log("error - LgEvolutionPanel:changeCellState");
        }
    };
    /*根据参数，切换细胞的状态*/
    set_nextCellState=(nextCellState=0)=>{
        this.setState({isAlive:nextCellState});
    };
    render() {
        const {isAlive}=this.state;
        const { x, y } = this.props;
        return(
            <div
                onClick={this.handleClick}
                style={{
                    left: `${CELL_SIZE * x + 1}px`,
                    top: `${CELL_SIZE * y + 1}px`,
                    width: `${CELL_SIZE - 1}px`,
                    height: `${CELL_SIZE - 1}px`,
                }}
            >
                {
                    //根据细胞生死来render
                    isAlive===0?
                        <div className={"deadCell"}/>
                            :
                        <div className={"aliveCell"}/>
                }
            </div>
        );
    }
}
class LgEvolutionPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            cells:[],   //二维数组，保存细胞状态
        }
    }
    render() {
        return(
          <div>
              {"this is LgEvolutionPanel"}
          </div>
        );
    }
}

export default LgEvolutionPanel;