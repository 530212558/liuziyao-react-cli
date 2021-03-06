import * as React from 'react';  // 必须引入React
import {connect} from 'react-redux'
import {USERNEWS,userNews} from './redux/actions'
// import { NavBar, Icon } from 'antd-mobile';
import { Pagination } from 'antd';
// import * as less from './index.css';
const less = require('./index.less');
// import less from './index.less';
// import logo from '/logo.png'
const logo = require('@/public/logo.png')
interface IHomeProps {
    name: string;
    USERNEWS?:any;
}
interface IHomeState {
    title: string
}
class ts extends React.Component<IHomeProps,IHomeState> {
    static props: IHomeProps = {
        name: 'props name'
    }
    state: IHomeState = {
        title: 'home state title',
    }
    constructor(props: IHomeProps, state: IHomeState) {
        super(props, state);
        // console.log(props, state)
        // console.log(this.props)
        // this.props.userNews();
    }
    /* 在每次更新(props,state)渲染之前都会调用，不管初始挂载还是后面的更新都会调用,它的使用场景一般为依赖于props的变化去做一些状态的更新,
    让我们能够根据props的变化去更新内部的状态，以前我们经常在componentWillReceiveProps中完成该操作 */
    static getDerivedStateFromProps(prevProps:any, prevState:any){
        // console.log(prevProps,prevState)
        return false;
    }
    /* 用于组件性能优化 shouldComponentUpdate的生命钩子返回false来直接阻止后面的逻辑执行，通常是用于做条件渲染，优化渲染的性能。 */
    shouldComponentUpdate(prevProps:any,prevState:any){
        // console.log('shouldComponentUpdate',prevProps,prevState)
        return true
    }
    //  render更新后调用 他的返回值会被传递给c omponentDidUpdate 的第三个参数 使用 getSnapshotBeforeUpdate 替换 componentWillUpdate；
    getSnapshotBeforeUpdate(prevProps:any,prevState:any){
        console.log("getSnapshotBeforeUpdate:",prevProps,prevState)
        return 123
    }
    componentDidUpdate(prevProps:any,prevState:any,data:any){
        console.log("getSnapshotBeforeUpdate:",prevProps,prevState,data)
    }
    // 组件即将销毁
    componentWillUnmount() {}
    // 组件已销毁
    componentDidUnMount() {}
    render() {
        return (
            <div>
                {/*<NavBar*/}
                    {/*mode="light"*/}
                    {/*icon={<Icon type="left" />}*/}
                    {/*onLeftClick={() => console.log('onLeftClick')}*/}
                    {/*rightContent={[*/}
                        {/*<Icon key="0" type="search" style={{ marginRight: '16px' }} />,*/}
                        {/*<Icon key="1" type="ellipsis" />,*/}
                    {/*]}*/}
                {/*>NavBar2</NavBar>*/}

                <Pagination defaultCurrent={1} total={50} />

                <p onClick={this.props.USERNEWS} style={{border:'1px solid'}} >{this.state.title}</p>
                <p>{this.props.name}</p>
                <img src={logo} alt="123"/>
            </div>
        );
    }
}
// export default ts;
export default connect(
    (state:any) => ({chatMsgList: state.user}),
    {userNews,USERNEWS}
)(ts)