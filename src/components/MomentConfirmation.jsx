import {useId,useLayoutEffect,useRef} from 'react'

export default function MomentConfirmation({
 title, description, cancelLabel, confirmLabel, onCancel, onConfirm, pending, error
}){
 const dialog=useRef(null), cancel=useRef(null)
 const titleId=useId(), descriptionId=useId()

 useLayoutEffect(()=>{
  const element=dialog.current
  element.showModal()
  cancel.current.focus()
  return ()=>element.close()
 },[])

 function cancelDialog(event){
  event.preventDefault()
  if(!pending)onCancel()
 }

 return <dialog ref={dialog} className="moment-confirmation" role="alertdialog" aria-modal="true"
  aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={cancelDialog}>
  <h2 id={titleId}>{title}</h2>
  <p id={descriptionId}>{description}</p>
  {error&&<p className="moment-error" role="alert">{error}</p>}
  <div className="moment-actions">
   <button ref={cancel} type="button" aria-disabled={pending||undefined} onClick={cancelDialog}>{cancelLabel}</button>
   <button type="button" className="moment-confirm-action" aria-disabled={pending||undefined}
    onClick={()=>{if(!pending)onConfirm()}}>{confirmLabel}</button>
  </div>
  {pending&&<p className="moment-confirm-progress" role="status">正在删除动态…</p>}
 </dialog>
}
