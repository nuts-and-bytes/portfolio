import { useState } from 'react'

export default function CopyEmail({email}) {
  const [status,setStatus]=useState('')
  const [busy,setBusy]=useState(false)
  async function copy(){
    setBusy(true)
    try {
      if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(email)
      else {
        const previous=document.activeElement
        const field=document.createElement('textarea')
        field.value=email
        field.readOnly=true
        field.style.cssText='position:fixed;left:0;top:0;opacity:0;font-size:16px;pointer-events:none'
        document.body.appendChild(field)
        try {
          field.focus();field.select();field.setSelectionRange(0,email.length)
          if(!document.execCommand('copy'))throw new Error('Copy unavailable')
        } finally {field.remove();previous?.focus({preventScroll:true})}
      }
      setStatus('邮箱已复制')
    } catch {setStatus('未能自动复制，请长按邮箱地址复制。')}
    finally {setBusy(false)}
  }
  return <div className="contact-copy"><button type="button" onClick={copy} disabled={busy} aria-label={`复制邮箱 ${email}`}>{busy?'正在复制…':status==='邮箱已复制'?'已复制':'复制邮箱'}</button><span role="status" aria-live="polite">{status}</span></div>
}
