

export function combineReducers(reducersMap:object = {}): (state: object | undefined, action: {type: string, payload?: any}) => object{
   const entries = Object.entries(reducersMap);
   return (state, action) => {
      const result = {};
      entries.forEach(item =>{
         const [key, func] = item;
            result[key] = func(state && state[key], action);
      })
      return result;
   }
}