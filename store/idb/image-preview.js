const DB_NAME = 'shopdb'
const STORAGE_NAME = 'imagePreview'
const DB_VERSION = 1
let DB
export default {
  async getDb () {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)
      request.onerror = e => {
        console.log('Error opening db', e)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Error')
      }
      request.onsuccess = e => {
        DB = e.target.result
        resolve(DB)
      }
      request.onupgradeneeded = e => {
        let db = e.target.result
        db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'id' })
      }
    })
  },
  async deleteImage (id) {
    const db = await this.getDb()
    return new Promise(resolve => {
      const trans = db.transaction([STORAGE_NAME], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }
      const store = trans.objectStore(STORAGE_NAME)
      store.delete(id)
    })
  },
  async getImage () {
    let db = await this.getDb()
    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readonly')
      trans.oncomplete = () => {
        resolve(imagePreview)
      }
      const store = trans.objectStore(STORAGE_NAME)
      const imagePreview = []
      store.openCursor().onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
          imagePreview.push(cursor.value)
          cursor.continue()
        }
      }
    })
  },
  async updateImage(data) {
    let db = await this.getDb()
    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }
      let store = trans.objectStore(STORAGE_NAME)
      store.put({
          id: data.id,
          file: data.data.file,
          previewImg: data.data.previewImg
      })
    })
  },
  async saveImage (image) {
    let db = await this.getDb()
    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readwrite')
      trans.oncomplete = () => {
        resolve()
      }
      let store = trans.objectStore(STORAGE_NAME)
      store.put(image)
    })
  }
}