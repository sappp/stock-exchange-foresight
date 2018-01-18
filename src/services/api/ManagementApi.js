// Management Api.

export const refresh = () => {
  fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/management/refresh", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
}

export const reset = () => {
  fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/management/", {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
}
