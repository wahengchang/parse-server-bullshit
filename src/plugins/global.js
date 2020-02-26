export default {
    install (Vue) {
        Vue.prototype.$sleep = (n=1) => new Promise((resolve)=> {
            return setTimeout(() => {
              return resolve()
            }, n*1000);
          })
    }
}
  