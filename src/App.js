
import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTotals } from './utils/cartSlice';


function App() {

  appStore.dispatch(getTotals())
  return (
    <div className="App">
      <Provider store={appStore}>
      <Body />
      <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
