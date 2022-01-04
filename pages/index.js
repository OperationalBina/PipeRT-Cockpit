import MainPageView from "./main-page-view";
import * as React from "react";
import { RecoilRoot } from 'recoil'
import RoutinePageView from "../components/routine-page-view";

export default function Home() {
    return (
      <RecoilRoot><MainPageView /></RecoilRoot>)
}