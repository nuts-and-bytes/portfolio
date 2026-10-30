import {build} from 'vite'
import {pathToFileURL} from 'node:url'
import path from 'node:path'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {readFile,writeFile,rm,mkdtemp} from 'node:fs/promises'
// Static home content is available to crawlers without running JavaScript.
// Keep the dynamic route's shell separate so it never presents home content.
const temp=await mkdtemp(path.resolve('.prerender-'))
try {
 await build({build:{ssr:'src/pages/Home.jsx',outDir:temp,emptyOutDir:true},logLevel:'warn'})
 const {default:Home}=await import(pathToFileURL(path.join(temp,'Home.js')))
 const html=await readFile('dist/index.html','utf8')
 await writeFile('dist/moments.html',html)
 const content=renderToString(React.createElement(Home))
 if(!content.includes('猎光')||!content.includes('游荡集'))throw Error('Missing homepage content')
 await writeFile('dist/index.html',html.replace('<div id="root"></div>',`<div id="root">${content}</div>`))
 console.log('Homepage prerendered; moments shell preserved')
} finally { await rm(temp,{recursive:true,force:true}) }
