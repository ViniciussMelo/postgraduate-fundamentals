import { produce } from 'immer';

import { ActionTypes } from './actions';

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICyclesState, action: any) {
    switch(action.type) {
      case ActionTypes.ADD_NEW_CYCLE:  
        // return {
        //   ...state, 
        //   cycles: [...state.cycles, action.payload.newCycle],
        //   activeCycleId: action.payload.newCycle.id,
        // };
        return produce(state, draft => {
          draft.cycles.push(action.payload.newCycle);
          draft.activeCycleId = action.payload.newCycle.id;
        });
      case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
        // return {
        //   ...state,
        //   cycles: state.cycles.map((cycle) => {
        //     if (cycle.id === state.activeCycleId) {
        //       return {...cycle, interruptedDate: new Date() }
        //     } else {
        //       return cycle
        //     }
        //   }),
        //   activeCycleId: null
        // }
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);

        if (currentCycleIndex < 0) {
          return state;
        }

        return produce(state, draft => {
          draft.activeCycleId = null;
          draft.cycles[currentCycleIndex].interruptedDate = new Date();
        });
      }

      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId);

        if (currentCycleIndex < 0) {
          return state;
        }

        return produce(state, draft => {
          draft.activeCycleId = null;
          draft.cycles[currentCycleIndex].finishedDate = new Date();
        });
      }
      default:
        return state;
    }
  }