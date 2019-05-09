import React,{Component,Fragment} from 'react'
import {Select,Button,Tooltip} from 'antd';

const Option = Select.Option;

class LgOperatePanel extends Component{

    constructor(props){
        super(props);
        this.state={
            isGameRunning:false //游戏是否运行中
        };
        this.setSide=this.props.setSide;        //useless
        this.initEmpty=this.props.initEmpty;    //useless
        this.initRandom=this.props.initRandom;  //useless
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
            case "600×400":
                tempRow=400;
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
            <Fragment>
                {console.log("LgOperatePanel:render()")}
                <Select
                    defaultValue={"800×600"}
                    style={{marginRight:20}}
                    onChange={(v)=>this.handleChange_select(v)}
                >
                    <Option value={"800×600"}>800 × 600</Option>
                    <Option value={"600×400"}>600 × 400</Option>
                    <Option value={"400×300"}>400 × 300</Option>
                </Select>
                {
                    !isGameRunning?
                        <Tooltip title="Run">
                            <Button
                                type = "primary"
                                onClick={this.handleClick_runButton}
                                // style={{width:60}}
                                shape="circle"
                                icon="caret-right"
                            />
                        </Tooltip>
                        :
                        <Tooltip title="Stop">
                            <Button
                                type = "default"
                                onClick={this.handleClick_stopButton}
                                // style={{width:60}}
                                shape="circle"
                                icon="pause"
                            />
                        </Tooltip>
                }
                <Tooltip title="清空">
                    <Button
                        type="default"
                        onClick={this.props.initEmpty}
                        style={{marginLeft:20}}
                        shape="circle"
                        icon="undo"
                    />
                </Tooltip>
                <Tooltip title="随机">
                    <Button
                        type="default"
                        onClick={this.props.initRandom}
                        style={{marginLeft:20}}
                        shape="circle"
                        icon="build"
                    />
                </Tooltip>
            </Fragment>
        );
    }
}

export default LgOperatePanel;
