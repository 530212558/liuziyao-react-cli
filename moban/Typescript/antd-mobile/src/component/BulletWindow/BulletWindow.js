import  React from 'react';  // 必须引入React
import {connect} from 'react-redux'
import {USERNEWS,userNews} from '@/redux/actions'
import css from './css.less'
import { getAxios } from "@/api";
import { imgUrl } from "@/global";


class BulletWindow extends React.Component {
    state = {
        showResult:false,
        text:'请传入需要显示的内容',
        showBuuton:false
    }

    constructor(props) {
        super(props);
    }
    async componentDidMount(){
        /*  给window下的全局对象导出一个对象  */
        window.ShowResult = (props) => {
            props.text&&this.setState({ text:props.text })
            this.setShowResult()
            props.commit?this.commit = props.commit:this.commit=null;
        }
        // window.ResultCommit = () => new this.ResultCommit()
    }
    setShowResult =()=>{
        this.setState({
            showResult:!this.state.showResult
        })
    }
    ResultCommit = ()=>{
        this.setShowResult();
        this.commit&&this.commit();
    }
    stopPropagation = (e)=>{
        e.stopPropagation();
    }
    render() {
        const { showResult,text,showBuuton } = this.state
        const { Language } = this.props
        return (
            <div>
                {
                    showResult&&<div className={css.showResult} onClick={ this.setShowResult }>
                        <div className={css.main} onClick={ this.stopPropagation } >
                            <img className={css.close} onClick={this.setShowResult} src={require('@/public/img/icon-close.png')} alt=""/>
                            { text }

                            {
                                showBuuton&&<div className={css.button}>
                                    <button className={css.cancel} onClick={ this.setShowResult }> {Language.cart_lang19} </button>
                                    <button className={css.commit} onClick={ ()=>this.ResultCommit() } > {Language.cart_lang20} </button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}
// export default ts;
export default connect(
    state => ({Language: state.Language}),
    {userNews,USERNEWS}
)(BulletWindow)