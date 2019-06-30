import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { toast } from 'react-toastify';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

ReactDOM.render(<App />, document.getElementById('root'));
