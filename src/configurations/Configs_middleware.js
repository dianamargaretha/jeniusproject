//ApplyMidleWare
import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './Configs_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  });
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
)