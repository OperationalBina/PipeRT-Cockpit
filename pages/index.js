import MainPageView from "./main-page-view";


const routine = {
    error_level: 0,
    name: "Routine Name",
  };
  
const routine1 = {
    error_level: 1,
    name: "Routine Name",
  };
  
const routine2 = {
    error_level: 2,
    name: "Routine Name",
  };
  
const logs = [
    {
      id: 0,
      level: "Exception",
      data: "I really love using pipeRT, I really love using pipeRT, I really love using pipeRT, I really love using pipeRT, I really love using pipeRT",
    },
    {
      id: 1,
      level: "Exception",
      data: "I really love using pipeRT",
    },
    {
      id: 2,
      level: "Exception",
      data: "I really love using pipeRT",
    },
    {
      id: 3,
      level: "Warning",
      data: "I really love using pipeRT",
    },
    {
      id: 4,
      level: "Info",
      data: "I really love using pipeRT",
    },
    {
      id: 5,
      level: "Exception",
      data: 'Handled at stack lvl 0 \n \
      File "exc.py", line 17, in <module> \n \
        stack_lvl_1() \n \
      File "exc.py", line 13, in stack_lvl_1 \n \
        stack_lvl_2() \n \
      File "exc.py", line 9, in stack_lvl_2 \n \
        stack_lvl_3() \n \
      File "exc.py", line 5, in stack_lvl_3 \n\
        raise Exception("a1", "b2", "c3")',
    },
  ];
  
const routines = [
    routine,
    routine1,
    routine2,
    routine,
    routine1,
    routine2,
    routine,
    routine1,
    routine2,
    routine,
    routine,
    routine1,
    routine2,
    routine,
  ];

const logs_summary = {
    "exceptions": 20,
    "warnings": 15,
    "info": 420,
    "avg_fps": 40
}

const health = {
    "crashes": 66,
    "stable_routines_number": 5,
    "health_score": 60,
    "problems": 71,
    "routines_number": 15
}

export default function Home() {
    return <MainPageView routines={routines} logs={logs} logs_summary={logs_summary} health={health}/>
}