import React,{Component} from 'react'
import {Select,Button} from 'antd';

const Option = Select.Option;

class LgOperatePanel extends Component{

    constructor(props){
        super(props);
        this.state={
            isGameRunning:false //游戏是否运行中
        };
        this.setSide=this.props.setSide;        //useless
        this.initEmpty=this.props.initEmpty;    //useless
    }


    handleClick_runButton=()=>{
        this.setState({isGameRunning:true});
        this.props.runGame();
        console.log("Game is running");
    };
    handleClick_stopButton=()=>{
        this.setState({isGameRunning:false});
        this.props.stopGame();
        console.log("Game is stopped");
    };
    handleChange_select=(value)=>{
        let tempRow=0,tempColumn=0;
        switch (value) {
            case "800×600":
                tempRow=600;
                tempColumn=800;
                break;
            case "600×450":
                tempRow=450;
                tempColumn=600;
                break;
            case "400×300":
                tempRow=300;
                tempColumn=400;
                break;
            default:
                console.error("LgOperatePanel:handleChange_select");
                return;
        }
        this.props.setSide(tempRow,tempColumn);
    };
    render() {
        const {isGameRunning} =this.state;
        return(
            <div>
                <Select
                    defaultValue={"800×600"}
                    style={{marginRight:20}}
                    onChange={(v)=>this.handleChange_select(v)}
                >
                    <Option value={"800×600"}>800 × 600</Option>
                    <Option value={"600×450"}>600 × 450</Option>
                    <Option value={"400×300"}>400 × 300</Option>
                </Select>
                {
                    !isGameRunning?
                        <Button
                            type = "primary"
                            onClick={this.handleClick_runButton}
                            style={{width:60}}
                        >
                            Run
                        </Button>
                        :
                        <Button
                            type = "default"
                            onClick={this.handleClick_stopButton}
                            style={{width:60}}
                        >
                            Stop
                        </Button>
                }
                <Button
                    type="default"
                    onClick={this.props.initEmpty}
                    style={{marginLeft:20}}
                >
                    Clear
                </Button>
            </div>
        );
    }
}

export default LgOperatePanel;
