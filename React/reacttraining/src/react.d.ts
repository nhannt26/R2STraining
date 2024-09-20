import { BoxProps } from "@mui/material";

declare module "react-dom" {
  function useFormStatus<State>(): { pending: boolean };
  function useFormStatus<State, Payload>(
    action: (state: State, payload: Payload) => Promise<State>,
    initialState: State,
    permalink?: string
  ): [state: State, dispatch: (payload: Payload) => void];
}