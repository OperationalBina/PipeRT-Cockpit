import { NextResponse, NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import {
  JWT_EXPIRATION,
  JWT_KEY,
  PUBLIC_ROUTES,
  LOGIN_ROUTE,
  HOME_ROUTE,
} from "../config";

export default function middleware(req) {
  const token = req.cookies.token;

  if (!token) {
    if (PUBLIC_ROUTES.includes(req.page.name)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(LOGIN_ROUTE);
    }
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch {
    return NextResponse.redirect(LOGIN_ROUTE);
  }

  if (req.page.name == LOGIN_ROUTE) {
    return NextResponse.redirect(HOME_ROUTE);
  }

  return NextResponse.next();
}
