// Portfolio Api

export const get = () => {

    return fetch("http://testing.v2x.foresightauto.com/stock-exchange-service/portfolio", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.json()
      })
}
