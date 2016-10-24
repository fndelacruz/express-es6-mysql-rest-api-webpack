// require('es6-promise').polyfill();
export default function defer() {
    return new Deferred()
}

class Deferred {
    constructor() {
        this.hasCanceled_ = false
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (val) => {
                this.hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
            }
            this.reject = reject
        })
    }

    cancel() {
        this.hasCanceled_ = true
    }
}
