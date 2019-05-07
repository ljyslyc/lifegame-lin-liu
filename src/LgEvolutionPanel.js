import React,{Component,Fragment} from 'react'

import PropTypes from 'prop-types'

const CELL_SIZE = 20;
// const WIDTH = 800;
// const HEIGHT = 600;

class LgCell extends  Component{
    constructor(props){
        super(props);
        this.state={
            isAlive:0,      //0：死亡，1:活着
        }
    }
    /*当细胞被点击时，切换它的状态*/
    handleClick=()=>{
        if(this.state.isAlive===0){
            this.set_nextCellState(1);
        }else if(this.state.isAlive===1){
            this.set_nextCellState(0);
        }else{
            console.log("error - LgEvolutionPanel:changeCellState",this.state.isAlive);
        }
    };
    /*根据参数，切换细胞的状态*/
    set_nextCellState=(nextCellState=0)=>{
        this.setState({isAlive:nextCellState});
    };
    switch_cell=()=>{
        const {isAlive}=this.state;
        const { x, y } = this.props;                    //x - column, y - row
        let left=CELL_SIZE * x + 1;
        let top=CELL_SIZE * y + 1;
        return (
            //根据细胞生死来render细胞的颜色
            isAlive===0?
                <div
                    className={"deadCell"}
                    onClick={this.handleClick}
                    style={{
                        backgroundColor:"#E7E7E7",
                        left: left,     //定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移
                        top: top,       //定义了定位元素左外边距边界与其包含块左边界之间的偏移
                        width: 19,
                        height: 19,
                        position:"absolute",
                        display:"inline",
                    }}
                />
                :
                <div
                    className={"aliveCell"}
                    onClick={this.handleClick}
                    style={{
                        backgroundColor:"#1890FF",
                        left: `${left}px`,     //定义了一个定位元素的上外边距边界与其包含块上边界之间的偏移
                        top: `${top}px`,       //定义了定位元素左外边距边界与其包含块左边界之间的偏移
                        width: 19,
                        height: 19,
                        position:"absolute",
                        display:"inline",
                    }}
                />
        )
    };
    componentWillMount() {
        const isA=this.props.isA;
        this.setState({isAlive:isA});
    }

    render() {
        return(
            <Fragment>
                {this.switch_cell()}
            </Fragment>
        );
    }
}

class LgEvolutionPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            cells_onBoard:[],
        };
    }

    componentWillMount() {
        let temp_array=[];
        let isA=0;

        let rowNum=this.props.sideRow/CELL_SIZE;
        let columnNum=this.props.sideColumn/CELL_SIZE;
        for(let r=0;r<rowNum;r++){
            for(let c=0;c<columnNum;c++){
                //cells的值 类型为boolean
                if(!this.props.cells[r][c]){
                    isA=0;
                }else {
                    isA=1;
                }
                temp_array.push({c,r,isA});
            }
        }

        this.setState({cells_onBoard:temp_array},()=>{
            console.log("LgEvolutionPanel:cells initial - ",this.props.sideRow,"×",this.props.sideColumn);
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        //执行时，还未更新成nextProps
        if(this.props!==nextProps){
            let temp_array=[];
            let isA=0;

            let rowNum=nextProps.sideRow/CELL_SIZE;
            let columnNum=nextProps.sideColumn/CELL_SIZE;


            for(let r=0;r<rowNum;r++){
                for(let c=0;c<columnNum;c++){
                    //cells的值 类型为boolean
                    if(!nextProps.cells[r][c]){
                        isA=0;
                    }else {
                        isA=1;
                    }
                    temp_array.push({c,r,isA});
                }
            }

            this.setState({cells_onBoard:temp_array},()=>{
                console.log("LgEvolutionPanel:cells updated - ",this.props.sideRow,"×",this.props.sideColumn,"(now Props)");
                console.log("LgEvolutionPanel:cells updated - ",nextProps.sideRow,"×",nextProps.sideColumn,"(next Props)");
            })
        }
    }

    render() {
        const {sideRow,sideColumn}=this.props;
        const cells=this.state.cells_onBoard;
        return(
            <Fragment>
                <div
                    className={"gameBoard"}
                    style={{
                        position:"relative",
                        width: sideColumn,
                        height: sideRow,
                        margin:"auto",
                    }}
                >
                    {
                        /*根据cells一维数组渲染棋盘*/
                        cells.map(cell =>
                            <LgCell
                                x={cell.c}
                                y={cell.r}
                                isA={cell.isA}
                                key={`${cell.c},${cell.r}`}
                            />
                        )
                    }
                </div>
                <div
                    style={{textAlign:"center",}}
                >
                    <br/>
                    <span>sideRow:{sideRow}</span>
                    <br/>
                    <span>sideColumn:{sideColumn}</span>
                </div>
            </Fragment>
        );
    }
}

LgEvolutionPanel.propTyps={
    cells:PropTypes.array.isRequired,
};

export default LgEvolutionPanel;