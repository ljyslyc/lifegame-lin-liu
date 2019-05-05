import React,{Component} from 'react'
import {Input,Button} from 'antd';

class LgOperatePanel extends Component{

    constructor(props){
        super(props);
        this.state={
            sideLength:0,       //棋盘的边长
            isGameRunning:false //游戏是否运行中
        };

    }
    handleClick_runButton=()=>{
        this.setState({isGameRunning:true});
        this.props.runGame();
    };
    handleClick_stopButton=()=>{
        this.setState({isGameRunning:false});
        this.props.stopGame();
    };
    render() {
        const {isGameRunning} =this.state;
        return(
            <div>
                <Input/>
                {
                    isGameRunning?
                        <Button
                            type={"primary"}
                            onClick={this.handleClick_runButton}
                        >
                            Run
                        </Button>
                            :
                        <Button
                            type={"dashed"}
                            onClick={this.handleClick_stopButton}
                        >
                            Stop
                        </Button>
                }
            </div>
        );
    }
}
export default LgOperatePanel;
