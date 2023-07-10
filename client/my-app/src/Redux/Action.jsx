import myStore from "./Store";
export const myAction = (data) => {

  myStore.dispatch({
    type: "ADD",
    payload:data,
  });

};
