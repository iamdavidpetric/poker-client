import { all } from "redux-saga/effects";

import applicationSagas from "./application";

export default function* root() {
  yield all([...applicationSagas]);
}