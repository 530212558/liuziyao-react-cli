
import  React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';  //模板热替换 ScrollToTop
import { Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";

import ScrollToTop from './component/ScrollToTop';

const ts = lazy(() => import('./ts'));

class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
      // console.log( Language )
      /*  按需加载模块demo  */
      // import(`./public/language/${LanguageType}.json`).then((data) => {
      //     // console.log( data )
      //     this.props.setLanguage(data)
      // })
  }
  render() {
    return (
      <HashRouter>
        <ScrollToTop>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={ ts } />
                    {/*<Route exact path="/newsandreviews" component={NewsAndReviews} />*/}
                    {/*<Route exact path="/successfulpayment/:orderNo" component={SuccessfulPayment} />*/}
                    <Route  component={ ts } />
                </Switch>
            </Suspense>
        </ScrollToTop>
      </HashRouter>
    );
  }
}
// export default App;
export default hot(App);
