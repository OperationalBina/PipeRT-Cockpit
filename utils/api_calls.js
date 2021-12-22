export async function getRoutines() {
    let response = await fetch('http://localhost:3000/api/routines');

    if (response.status >= 400 && response.status < 600) {
        console.log(`An error when asking routines - ${response.text}`)
        return []
    } else 
        return response.json()
    
}


export async function getLogsSummary(routineName) {

    let response = await fetch(`http://localhost:3000/api/routine_logs/${routineName}/summary`);

    if (response.status >= 400 && response.status < 600) {
        console.log(`An error when asking routines - ${response.text}`)
        return {
            exceptions: -1,
            warnings: -1,
            info: -1,
            avg_fps: -1
          }
    } else
        return response.json()
}