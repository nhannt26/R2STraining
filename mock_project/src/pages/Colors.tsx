import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store";
import { fetchColor } from "../store/reducer/colorReducers";

const Colors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: colors = {}, ids: colorIds = [], status } = useSelector((state: any) => state.color)
  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchColor())
      
    }
  }, [status, dispatch]);

  return (
    <div style={{width: "100%"}}>
      <h1>Color list</h1>
      {colorIds.map((id: string, index: number) => {
        <div key={id}>
          <div>{colors[id].name}</div>
        </div>
      })}
    </div>
  )
}

export default Colors