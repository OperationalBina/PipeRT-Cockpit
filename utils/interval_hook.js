import { useState, useEffect } from 'react';

export function useUpdatingState(stateDefaultValue, stateFetcher, updateTime) {  
  const [myState, setState] = useState(stateDefaultValue)

  useEffect(() => {
    const updateStateInterval = setInterval(() => {
      (async function updateState() {
        let stateValue = await stateFetcher()
        setState(stateValue)
      })();
    }, updateTime);

    return () => {
      clearInterval(updateStateInterval);
    };

  }, []);

  return myState
}