/* eslint-disable react/prop-types */
import React, {useCallback, useReducer, useState} from "react";
import ReactDOM from "react-dom";

let element = document.getElementById("root");
if (!element) {
  element = document.createElement("DIV");
  element.setAttribute("id", "root");
  document.body.appendChild(element);
}

const collectionReducer = {
        "ADD": (state, action) => [...state, {...action}],
        "DOWN": (state, action) => {
          if (action.index + 1 >= state.length) {
            return state;
          }
          const nextState = [...state],
                temp = nextState[action.index + 1];
          nextState[action.index + 1] = nextState[action.index];
          nextState[action.index] = temp;
          return nextState;
        },
        "UP": (state, action) => {
          if (action.index - 1 <= -1) {
            return state;
          }
          const nextState = [...state],
                temp = nextState[action.index - 1];
          nextState[action.index - 1] = nextState[action.index];
          nextState[action.index] = temp;
          return nextState;
        }
      },

      // eslint-disable-next-line react/display-name
      Info = React.memo((props) => <div>
        {props.name} {props.gender} {props.address} <button onClick={() => props.dispatch({"index": props.index, "type": "UP"})}>UP</button> <button onClick={() => props.dispatch({"index": props.index, "type": "DOWN"})}>DOWN</button>
      </div>),

      Collection = () => {
        const [collection, dispatch] = useReducer((state, action) => collectionReducer[action.type] ? collectionReducer[action.type](state, action) : state, []),
              [name, setName] = useState(""),
              [gender, setGender] = useState(""),
              [address, setAddress] = useState(""),
              onChange = useCallback((setter) => (e) => {
                setter(e.target.value);
              }),
              onClick = useCallback(() => {
                if (name !== "" && gender !== "" && address !== "") {
                  dispatch({"type": "ADD", ...{address, gender, name}});
                  setName("");
                  setGender("");
                  setAddress("");
                }
              });

        return <>
          <div>
            <input type="text" onChange={onChange(setName)} value={name} placeholder="name"/>
            <input type="text" onChange={onChange(setGender)} value={gender} placeholder="gender"/>
            <input type="text" onChange={onChange(setAddress)} value={address} placeholder="address"/>
            <button onClick={onClick}>ADD</button>
          </div>
          {collection.map((people, index) => <Info key={index} {...people} dispatch={dispatch} index={index}/>)}
        </>;
      };

ReactDOM.render(<Collection />, document.getElementById("root"));
