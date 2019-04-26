import React,{Component} from 'react'
import {Input} from 'antd';

class LgOperatePanel extends Component{
    constructor(props){
        super(props);
        this.state={
            sideLength:0,
        }
    }
    render() {
        return(
            <div>
                <Input/>
            </div>
        );
    }
}
export default LgOperatePanel;
