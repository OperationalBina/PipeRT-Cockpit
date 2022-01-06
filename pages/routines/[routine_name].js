import { apiFetch } from "../../utils/http-calls"
import RoutinePageView from "../../components/routine-page-view"
import { RecoilRoot } from 'recoil';


export async function getStaticProps({ params }) {
  return {
    props: {
      routineName: params.routine_name,
    }
  }
}

export async function getStaticPaths() {
  let paths = await apiFetch('routines')

  paths = paths.map(routine => ({ params: { routine_name: routine.name } }))

  return {
    paths,
    fallback: false
  }
}


export default function RoutineView( {routineName} ) {
  return (
    <RecoilRoot><RoutinePageView routineName={routineName} /></RecoilRoot>
  )
}