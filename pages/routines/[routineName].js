import { apiFetch } from "../../utils/http-calls"
import RoutinePageView from "../../components/routine-page-view"
import { RecoilRoot } from 'recoil';


export async function getStaticProps({ params }) {
  console.log(params.routineName);
  return {
    props: {
      routineName: params.routineName,
    }
  }
}

export async function getStaticPaths() {
  let paths = await apiFetch('routines')

  paths = paths.map(routine => ({ params: { routineName: `${routine.routine_name}` } }))

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