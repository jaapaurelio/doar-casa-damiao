import React, { useReducer } from 'react';
import Title from '../components/Title';
import { Login, Donations, Stats } from '../components/admin';


const status = {
    default: 1,
    loading: 2,
    success: 3,
    failure: 4,
}

// Actions
const LOGIN = 'ADMIN/LOGIN';
const LOAD_LIST = 'ADMIN/LOAD_LIST';
const LOAD_LIST_FAILURE = 'ADMIN/LOAD_LIST_FAILURE';
const LOAD_STATS = 'ADMIN/LOAD_STATS';


// Action creators
const loginAction = user => ({ type: LOGIN, payload: { user } })
const loadListAction = list => ({ type: LOAD_LIST, payload: list })
const loadListFailrueAction = () => ({ type: LOAD_LIST_FAILURE })
const loadStatsAction = stats => ({ type: LOAD_STATS, payload: stats })

const initialState = {
    status: status.default,
    user: '',
    donations: [],
    stats: {}
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...state, status: status.loading, ...action.payload};
        case LOAD_LIST:
            return {...state, status: status.success, donations: action.payload};
        case LOAD_LIST_FAILURE:
            return {...state, status: status.failure};
        case LOAD_STATS:
            return {...state, stats: action.payload};
        default:
            return state;
    }
}
// Selectors
const isLoaded = state => state.status === status.success;
const selectDonations = state => state.donations || [];
const selectStats = state => state.stats || {};

export default function Admin() {
    const [store, dispatch] = useReducer(reducer, initialState);

    const loginHandler = (user) => {
        dispatch(loginAction(user));
        loadList(user);
        loadStats();
    }

    const loadList = async(user) => {
        try {
            let response = await fetch(`/api/admin?password=${user}&operation=list`);
            response = await response.json();
            if(response.status === 'success') {
                dispatch(loadListAction(response.data));
            } else {
                dispatch(loadListFailrueAction())
            }
        } catch(e) {
            dispatch(loadListFailrueAction())
        }
    }

    const loadStats = async () => {
        try {
            let response = await fetch(`/api/stats`);
            response = await response.json();
            dispatch(loadStatsAction(response.data));
        } catch(e) {
            console.log(e)
        }
    }

    const onDelete = async (id) => {
        const confirmed = confirm('Tem a certeza que deseja apagar a doação');
        if(confirmed) {
            let response = await fetch(`/api/admin?password=${store.user}&operation=delete_donation&id=${id}`);
            response = await response.json();
            if(response.status === 'success') {
                loadList(store.user);
                loadStats();
            } else {
                alert('Não foi possível apagar a doação');
           }
        }
    }

    return <div className="pageWidthAlign">
        <Title mainText="Admin"></Title>
        <Login onSubmit={loginHandler} />
        {isLoaded(store) && <>
            <Stats stats={selectStats(store)} list={selectDonations(store)}/>
            <Donations onDelete={onDelete} list={selectDonations(store)} />
        </>}
    </div>

};