export type Store<State = any, Action = {type: string }> = {
    getState(): State;
    dispatch(action:Action): any;
    subscribe(cb: () => void): () => void;
    replaceReducer(cb: () => void): Store<State, Action>
};

export type Reducer<State, Action> = (
    state: State | undefined,
    action: Action
) => State;

export type Middleware<State, Action> = (
    store: Store<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
    reducer: Reducer<State, Action>,
    initialState?: State | undefined,
    middleware?: Middleware<State, Action>[]
) => Store<State, Action>;

export const configureStore: ConfigureStore<S, A> = (reducer: Reducer<S, A>, state: S): Store<S, A> =>{
    let subscribers = new Set([]);
    const getState = (): S => state;

    const dispatch = (action:A): void => {
        state = reducer(state, action);
        subscribers.forEach(fn =>{
            fn();
        });
    };
    const subscribe = (sub: ()=> void): () => void => {
        subscribers.add(sub);
        return () => subscribers.delete(sub);
    };

    const replaceReducer = (newReducer: Reducer<S, A>) : Store<S, A>=>{
        subscribers = new Set([]);
        return configureStore(newReducer, state)
    };

    return{
        getState,
        dispatch,
        subscribe,
        replaceReducer,
    }
}