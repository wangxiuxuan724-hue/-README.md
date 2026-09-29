const file=document.querySelector('#file'),drop=document.querySelector('#drop'),panel=document.querySelector('#panel'),preview=document.querySelector('#preview'),nameEl=document.querySelector('#name'),info=document.querySelector('#info'),change=document.querySelector('#change'),upload=document.querySelector('#upload'),status=document.querySelector('#status');
let current,url;
const size=n=>n<1048576?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(1)+' MB';
function pick(f){
  if(!f)return;
  if(!f.type.startsWith('video/')&&!/\.mov$/i.test(f.name)){alert('请选择视频文件');return}
  current=f;
  if(url)URL.revokeObjectURL(url);
  url=URL.createObjectURL(f);
  preview.src=url;
  nameEl.textContent=f.name;
  info.textContent=size(f.size);
  drop.classList.add('hidden');
  panel.classList.remove('hidden');
  upload.disabled=false;
  upload.textContent='生成分享链接';
  status.textContent='视频只在你的设备上预览，尚未上传。';
}
file.onchange=e=>pick(e.target.files[0]);
change.onclick=()=>file.click();
['dragenter','dragover'].forEach(x=>drop.addEventListener(x,e=>e.preventDefault()));
drop.addEventListener('drop',e=>{e.preventDefault();pick(e.dataTransfer.files[0])});
upload.onclick=()=>{
  status.innerHTML='第一版网页已正常工作。下一步接入云存储后，这里会真正上传视频并生成分享链接。';
  upload.textContent='等待接入视频存储';
  upload.disabled=true;
};
