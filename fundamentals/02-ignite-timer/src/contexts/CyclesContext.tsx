import { createContext, ReactNode, useState, useReducer, useEffect } from 'react';

import { cyclesReducer, ICycle } from '../reducers/cycles/reducer';
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContextType {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface ICyclesContextProvidersProps {
  // qualquer HTML/jsx/tsx válido
  children: ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContextType);

export function CyclesContextProvider({ children }: ICyclesContextProvidersProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }

    // retornar o que foi configurado no segundo parametro / estado inicial
    return initialState;
  });

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle?.startDate)
      );
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}