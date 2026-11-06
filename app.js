const BOOKSY='https://booksy.com/pl-pl/339535_the-house-barbershop_barber-shop_3_warszawa';
const menu=document.querySelector('.menu-toggle'),mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Otwórz menu');mobileNav.hidden=true;document.body.classList.remove('lock')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');mobileNav.hidden=!open;document.body.classList.toggle('lock',open)});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
let services=[],level='barber';
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function serviceRow(s,i){const name=s.name.replace(/\s*-\s*(Top Barber|Barber)/,'').replace(/\s+/g,' ').trim();const duration=s.time>=60?`${Math.floor(s.time/60)} godz.${s.time%60?' '+s.time%60+' min':''}`:`${s.time} min`;return `<article class="service-row"><span class="service-index">${String(i+1).padStart(2,'0')}</span><div><h3>${escapeHtml(name)}</h3>${s.level==='top'&&level==='barber'?'<p class="service-note">Top Barber</p>':''}</div><span class="service-duration">${duration}</span><span class="service-price">${s.price} <small>zł</small></span><a class="service-arrow" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="Zarezerwuj: ${escapeHtml(s.name)}">↗</a></article>`}
function render(){const main=services.filter(s=>s.cat==='main'&&s.level===level),extra=services.filter(s=>s.cat!=='main'&&(s.level===level||s.level==='all'||s.level==='top'&&!services.some(t=>t.name.replace('Top Barber','Barber')===s.name.replace('Top Barber','Barber')&&t.level===level)));document.querySelector('#price-list').innerHTML=main.map(serviceRow).join('');document.querySelector('#extra-list').innerHTML=extra.map(serviceRow).join('');document.querySelector('#price-list').setAttribute('aria-labelledby',level==='top'?'tab-top':'tab-barber')}
const tabs=[...document.querySelectorAll('[data-level]')];
function selectTab(tab){level=tab.dataset.level;tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1});render()}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?tabs[0]:e.key==='End'?tabs[tabs.length-1]:tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];selectTab(next);next.focus()}})});
services=JSON.parse(document.querySelector('#services-data').textContent);render();
document.querySelectorAll('.book').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
const lightbox=document.querySelector('#lightbox'),photos=[...document.querySelectorAll('[data-photo]')];let photoIndex=0;
function displayPhoto(i){photoIndex=(i+photos.length)%photos.length;const source=photos[photoIndex].querySelector('img');const img=document.querySelector('#lightbox-img');img.src=source.src;img.alt=source.alt;document.querySelector('#lightbox-caption').textContent=`${String(photoIndex+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')} — ${source.alt}`}
photos.forEach((p,i)=>p.addEventListener('click',()=>{displayPhoto(i);lightbox.showModal();document.body.classList.add('lock')}));
document.querySelector('#prev-photo').addEventListener('click',()=>displayPhoto(photoIndex-1));document.querySelector('#next-photo').addEventListener('click',()=>displayPhoto(photoIndex+1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displayPhoto(photoIndex-1)}if(e.key==='ArrowRight'){e.preventDefault();displayPhoto(photoIndex+1)}});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('lock'));dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})});
document.querySelector('#privacy-open').addEventListener('click',()=>{document.querySelector('#privacy').showModal();document.body.classList.add('lock')});
document.querySelector('#year').textContent=new Date().getFullYear();
