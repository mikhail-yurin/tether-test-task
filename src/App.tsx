import { Provider } from 'react-redux';
import { Widget } from './components/Widget';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <Widget />
        </Provider>
    );
}

export default App;
