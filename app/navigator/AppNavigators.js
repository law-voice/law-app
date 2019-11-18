import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
// import {createSwitchNavigator} from 'react-navigation-switch-transitioner';
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';

import WelcomePage from '../page/WelcomePage';
import Tab from '../page/HomePage';
import NewsDetail from '../page/news/NewsDetail';
import VideoDetail from '../page/video/VideoDetail';
import DocumentDetail from '../page/document/DocumentDetail';
// import MineDetail from '../page/mine/MineDetail';

export const rootCom = 'Main';//设置根路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
});
const MainNavigator = createStackNavigator({
    Tab: {
        screen: Tab,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: ({ navigation }) => ({
            title: '新闻详情',
        }),
    },
    VideoDetail: {
        screen: VideoDetail,
        navigationOptions: ({ navigation }) => ({
            title: '视频',
        }),
    },
    DocumentDetail: {
        screen: DocumentDetail,
        navigationOptions: ({ navigation }) => ({
            title: '文献',
        }),
    }
}, {
    defaultNavigationOptions: {
        // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
});
const SwitchNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
})
// export default SwitchNavigator

export const RootNavigator = createAppContainer(SwitchNavigator);

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);