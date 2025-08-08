import chokidar from 'chokidar'
import fs from 'fs'
const UNLINK = 'unlink'
const popupTypes = [
  {
    type: 'modal',
    ext: '.modal.tsx',
  },
  {
    type: 'popup',
    ext: '.popup.tsx',
  },
]
let popups = new Map()

let fullPath = './src'
let isReady = false
const isBuild = process.argv.slice(2).includes('build')

if (!fs.existsSync('compiled_routes')) {
  fs.mkdirSync('compiled_routes')
}
const handlePopups = () => {
  let res = [...popups].map((popup) => {
    const { name, type, path } = popup[1]
    return `{
            name: "${name}",
            type: "${type}",
            popup: require("${path}"),
            nodeRef: createRef()
        }`
  })
  let template = `
    import { createRef } from "react";
    const popupRoutes = [${res}];
    export default popupRoutes;
  `
  fs.writeFileSync('./compiled_routes/popup.ts', template)
}
let watcher = chokidar
  .watch(fullPath)
  .on('all', (event, path) => {
    //
    if (['change'].includes(event)) {
      return
    }
    // const popupExt = popupTypes.map((popup) => popup.ext);
    let popup = popupTypes.find((popup) => path.includes(popup.ext))
    if (popup) {
      const fileName = path.split('/').at(-1)
      const popupName = fileName.replace(popup.ext, '')
      if (event === UNLINK) {
        //on delete
        popups.delete(popupName)
      } else {
        popups.set(popupName, {
          type: popup.type,
          path: '../' + path,
          name: popupName,
          popup: path,
        })
      }
    }
    if (isReady) {
      handlePopups()
    }
  })
  .on('ready', () => {
    isReady = true
    handlePopups()
    if (isBuild) {
      watcher.close()
    }
    console.log('Initial scan complete. Ready for changes')
  })
