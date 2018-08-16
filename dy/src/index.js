
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';
import router from "./Router"; //引入路由模块

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
