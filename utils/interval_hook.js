import { useState, useEffect } from 'react';

export function useUpdatingState(stateDefaultValue, stateFetcher, updateTime) {  
  const [myState, setState] = useState(stateDefaultValue)

  useEffect(() => {
    async function updateState() {
        let stateValue = await stateFetcher()
        setState(stateValue)
    }
    updateState()
    const updateStateInterval = setInterval(() => {
        updateState()
    }, updateTime);

    return () => {
      clearInterval(updateStateInterval);
    };

  }, []);

  return myState
}