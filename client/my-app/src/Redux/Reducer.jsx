let initialData ={
    users:[]
}

const myReducer = (state = initialData,action) => {
   
    if (action.type==="ADD"){
        return (state = {
            ...state,
            users:action.payload,
        })
    }

    return state
};

export default myReducer;
