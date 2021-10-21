import { store } from "../store";
const URL = "http://localhost:8000/api/v1";
const { jwt } = localStorage;

export function sendData() {
  const data = store.getState().userFormData;
  const userData = Object.assign(
    {},
    data.countryAndTrip,
    data.form1,
    data.form2,
    data.form3,
    data.form4,
    data.form5,
    data.form6
  );

  if (data) {
    fetch(`${URL}/public-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: jwt,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d, "data sent...");
      });
  } else {
    console.log("no user-data available");
    return null;
  }
}
