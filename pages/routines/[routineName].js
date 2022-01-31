import { apiFetch } from "../../utils/http-calls"
import RoutinePageView from "../../components/routine-page-view"
import { RecoilRoot } from 'recoil';


export async function getStaticProps({ params }) {
  return {
    props: {
      routineName: params.routineName,
    }
  }
}

export async function getStaticPaths() {
  try {
    const paths = await apiFetch('routines')
    paths = paths.map(routine => ({ params: { routineName: `${routine.routine_name}` } }))

    return {
      paths,
      fallback: true
    }
  } catch {
    return {
      paths: [],
      fallback: true
    }
  }
}


export default ( {routineName} ) => {
  return (
    <RecoilRoot><RoutinePageView routineName={routineName} /></RecoilRoot>
  )
}