import { createContext, ReactNode, useState } from 'react';

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

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
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {...cycle, finishedDate: new Date() }
      }

      return cycle;
    }));
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

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles(state => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {...cycle, interruptedDate: new Date() }
      }

      return cycle;
    }));

    setActiveCycleId(null);
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