import {combineReducers} from './combineReducer';

describe('combineReducers',  () => {
    it("is a function", () =>{
        expect(combineReducers).toBeInstanceOf(Function);
    })

    it('return a function', () =>{
        expect(combineReducers()).toBeInstanceOf(Function);
    })
    it('return a reducers based on the config (initial state)', () =>{
        const reducer = combineReducers({
            a:(state = 2, action: any) => state,
            b:(state = 'hop', action: any) => state,
        })
        expect(reducer(undefined, {type: 'unknow'})).toEqual({
            a: 2,
            b: 'hop',
        })
    })
    it('calls subreducers with proper value', () =>{
        type State = {a: number, b: number};
        const config = {
            a: jest.fn((state: number = 5, action) => state + action.payload),
            b: jest.fn((state: number = 5, action) => state - action.payload),
        }
        const reducer = combineReducers(config);
        const state:State = {
            a: 55,
            b: 66,
        };
        const action1 = {payload: 1};
        const newState1 = reducer(state,{type: 'aaa', payload: 1});

        expect(newState1).toEqual({
            a: 56,
            b: 65,
        })
    })
});