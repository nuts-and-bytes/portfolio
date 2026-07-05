// GitHub Pages 组织域名。所有子项目链接与内嵌 iframe 均由此拼接，
// 组织若再改名（此前 zhuxinyao99-jpg → nuts-and-bytes）只改这一处即可，避免链接集体失效。
export const GH_ORIGIN = 'https://nuts-and-bytes.github.io'

// 拼接子项目在 Pages 上的完整地址。path 不带前导斜杠，例如 ghUrl('Product-quest/')
export const ghUrl = (path) => `${GH_ORIGIN}/${path}`
