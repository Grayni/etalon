export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {uid: 'price_1', operations: 'Нулевая отчетность (операций нет)', usn_6: '2 000 в квартал', usn_7: '2 000 в квартал', osn: '3 000 в квартал'},
          {uid: 'price_2', operations: '1-15 операций', usn_6: 3000, usn_7: 3500, osn: 4000},
          {uid: 'price_3', operations: '16-30 операций', usn_6: 4500, usn_7: 5000, osn: 5500},
          {uid: 'price_4', operations: '31-50 операций', usn_6: 6500, usn_7: 7000, osn: 7500},
          {uid: 'price_5', operations: '51-75 операций', usn_6: 8500, usn_7: 9000, osn: 9500},
          {uid: 'price_6', operations: '76-100 операций', usn_6: 10500, usn_7: 11000, osn: 11500},
          {uid: 'price_7', operations: '101-125 операций', usn_6: 12500, usn_7: 13000, osn: 13500},
          {uid: 'price_8', operations: '126-150 операций', usn_6: 14500, usn_7: 15000, osn: 15500},
          {uid: 'price_9', operations: '151-175 операций', usn_6: 16500, usn_7: 17000, osn: 17500},
          {uid: 'price_10', operations: '176-200 операций', usn_6: 18500, usn_7: 19000, osn: 19500},
          {uid: 'price_11', operations: '201-225 операций', usn_6: 20500, usn_7: 21000, osn: 21500},
          {uid: 'price_12', operations: '226-250 операций', usn_6: 22500, usn_7: 23000, osn: 23500},
          {uid: 'price_13', operations: '251-300 операций', usn_6: 24500, usn_7: 25000, osn: 25500},
          {uid: 'price_14', operations: 'Более 300 операций', usn_6: 'По запросу', usn_7: 'По запросу', osn: 'По запросу'}
        ])
      }, 0)
    })
  }
}