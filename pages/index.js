import MainPageView from "./main-page-view";
import * as React from "react";
import { RecoilRoot } from 'recoil'

export default function Home() {
    return (
      <RecoilRoot><MainPageView /></RecoilRoot>)
}