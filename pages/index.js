import MainPageView from "./main-page-view";
import * as React from "react";
import { ROUTINE_LEVELS_ENUM } from "../constants"
class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      routines: [],
      logs: [],
      logs_summary: {
        exceptions: 0,
        warnings: 0,
        info: 0,
        avg_fps: 0
      },
      health: {
        crashes: 0,
        stable_routines_number: 0,
        health_score: 0,
        problems: 0,
        routines_number: 0
      },
      selected_routine: null
    }

    this.fetchData = this.fetchData.bind(this);
    this.updateSelectedRoutine = this.updateSelectedRoutine.bind(this);
  }

  updateSelectedRoutine(routine_name) {
    this.setState({
      selected_routine: routine_name
    })
    this.fetchData();
  }

  fetchData() {
    fetch('/api/routines')
      .then(res => res.json())
      .then(data => {
        let crashed_routine_number = data.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.CRASH).length

        const updated_health = {
          crashes: crashed_routine_number,
          stable_routines_number: data.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.STABLE).length,
          health_score: Math.floor(((data.length - crashed_routine_number) / data.length) * 100),
          problems: data.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.PROBLEM).length,
          routines_number: data.length
        }
        
        this.setState({ routines: data, health: updated_health })
      })

    if (this.state.selected_routine !== null) {
      fetch(`/api/routine_logs/${this.state.selected_routine}`)
        .then(res => res.json())
        .then(data => {
          this.setState(data)
        })
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.fetchData, 3000)
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <MainPageView
      routines={this.state.routines}
      logs={this.state.logs}
      logs_summary={this.state.logs_summary}
      health={this.state.health}
      selected_routine={this.state.selected_routine}
      updateSelectedRoutine={this.updateSelectedRoutine} />
  }
}

export default Home