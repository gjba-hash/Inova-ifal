const K={u:"ifal_usuarios",s:"ifal_sessao",i:"ifal_ideias"};
const ler=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const gravar=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const usuario=()=>ler(K.u,[]).find(x=>x.email===ler(K.s,null));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $=(s,r=document)=>r.querySelector(s);

const IC={
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M17.9 17.9A10.9 10.9 0 0 1 12 19C5 19 1 12 1 12a18 18 0 0 1 5.100-5.900M9.900 4.200A9.100 9.100 0 0 1 12 5c7 0 11 7 11 7a18 18 0 0 1-2.200 3.200M1 1l22 22"/>',
home:'<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>',
alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
wrench:'<path d="M14.700 6.300a4 4 0 0 0 5 5L10 21a2.100 2.100 0 0 1-3-3l9.700-9.700z"/><path d="M16 4a4 4 0 0 0-1 4"/>',
send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>',
ok:'<path d="M20 6 9 17l-5-5"/>',
chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.500c.8.8 1 1.500 1 2.500h6c0-1 .2-1.700 1-2.500A6 6 0 0 0 12 3z"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
text:'<path d="M4 6h16M4 12h16M4 18h10"/>',
tag:'<path d="M20 12 12 20 3 11V3h8z"/><circle cx="7.500" cy="7.500" r="1"/>'};
const LOGO='<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M32 8a18 18 0 0 0-10 33v6h20v-6A18 18 0 0 0 32 8z"/><path d="M25 54h14M28 60h8"/><path d="M10 12l-3-3M54 12l3-3M6 28H2M62 28h-4M32 3V1" stroke-width="3"/></g><g style="fill:var(--brand-2)"><circle cx="32" cy="22" r="4.500"/><path d="M27.500 29h9v12h-9z"/></g>';
const ic=n=>n==="logo"?`<svg class="logo" viewBox="0 0 64 64" aria-hidden="true">${LOGO}</svg>`:`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
const icones=r=>(r||document).querySelectorAll("[data-ic]").forEach(e=>{e.innerHTML=ic(e.dataset.ic)});

const TIPOS={
 ideia:{nome:"Nova ideia",ic:"bulb",plural:"Ideias",txt:"Compartilhe uma sugestão para melhorar o IFAL.",ph:"Ex.: Mais tomadas na biblioteca"},
 reclamacao:{nome:"Reclamação",ic:"alert",plural:"Reclamações",txt:"Conte o que não está funcionando bem no campus.",ph:"Ex.: Ar-condicionado quebrado na sala 5"},
 correcao:{nome:"Correção",ic:"wrench",plural:"Correções",txt:"Aponte um erro ou algo que precisa de ajuste.",ph:"Ex.: Horário errado no mural"}};
const CATS=["Ensino","Infraestrutura","Tecnologia","Segurança","Eventos","Outros"];
const STATUS=["Enviada","Visualizada","Acatada","Respondida"];
const NAV=[["painel.html","home","Início",""],["nova-ideia.html","bulb","Adicionar Nova Ideia","c-bulb"],["reclamacao.html","alert","Adicionar Reclamações","c-alert"],["correcao.html","wrench","Adicionar Correções",""],["enviadas.html","send","Ideias Enviadas",""]];

const B=document.body, U=usuario(), pag=location.pathname.split("/").pop()||"index.html";
if(B.hasAttribute("data-protegida")&&!U){location.replace("login.html")}
if(B.dataset.auth!==undefined&&U){location.replace("painel.html")}

function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),1800)}
function sair(){localStorage.removeItem(K.s);location.href="index.html"}
const minhas=()=>ler(K.i,[]).filter(x=>x.autor===(U&&U.email));
const fmt=d=>new Date(d).toLocaleDateString("pt-BR");
function linha(x,admin){
 const t=TIPOS[x.tipo];
 return `<div class="item">${ic(t.ic).replace('class="i"','class="i '+t.ic+'"')}
 <div class="t"><strong>${esc(x.titulo)}</strong><small>${t.nome} · ${esc(x.categoria)}</small>${admin?`<p>${esc(x.descricao)}</p>`:""}</div>
 <span class="d">${fmt(x.data)}</span>
 ${admin?`<select data-id="${x.id}" aria-label="Alterar status (teste)">${STATUS.map(s=>`<option${s===x.status?" selected":""}>${s}</option>`).join("")}</select>`:""}
 <span class="tag ${x.status}">${x.status}</span>
 ${admin?`<button class="del" data-del="${x.id}" aria-label="Excluir">${ic("trash")}</button>`:""}</div>`;
}

// sidebar
const side=$("#side");
if(side&&U){
 side.innerHTML=`<a class="brand" href="painel.html">${ic("logo")}<span class="lbl">Inova<br><b>IFAL</b></span></a>`+
 NAV.map(n=>`<a class="nav ${n[3]}${pag===n[0]?" act":""}" href="${n[0]}" title="${n[2]}">${ic(n[1])}<span class="lbl">${n[2]}</span></a>`).join("")+
 `<button class="nav exit" id="sair" title="Sair">${ic("out")}<span class="lbl">Sair</span></button>`;
 $("#sair").onclick=sair;
}

// cadastro de envio
const form=$("#form-envio");
if(form&&U){
 const t=TIPOS[B.dataset.tipo];
 $("#tit").textContent="Adicionar "+t.nome.toLowerCase().replace("nova ","nova ");
 $("#desc").textContent=t.txt;
 form.innerHTML=`<label class="field">${ic("tag")}<input name="titulo" placeholder="${t.ph}" maxlength="80" required></label>
 <label class="field">${ic("text")}<select name="categoria" required>${CATS.map(c=>`<option>${c}</option>`).join("")}</select></label>
 <label class="field top">${ic("chat")}<textarea name="descricao" placeholder="Descreva com detalhes" maxlength="800" required></textarea></label>
 <button class="btn" type="submit">Enviar ${t.nome.toLowerCase()} ${ic("send")}</button>`;
 form.onsubmit=e=>{e.preventDefault();const f=new FormData(form),l=ler(K.i,[]);
  l.unshift({id:Date.now(),tipo:B.dataset.tipo,titulo:f.get("titulo").trim(),categoria:f.get("categoria"),descricao:f.get("descricao").trim(),data:new Date().toISOString(),status:"Enviada",autor:U.email});
  gravar(K.i,l);toast(t.nome+" enviada!");setTimeout(()=>location.href="enviadas.html",900)};
}

// painel
const painel=$("#stats");
if(painel&&U){
 const l=minhas(),n=s=>l.filter(x=>x.status===s).length;
 $("#ola").textContent="Olá, "+U.nome.split(" ")[0]+"!";
 $("#avatar").textContent=U.nome[0].toUpperCase();
 const novas=n("Acatada")+n("Respondida");if(novas)$("#dot").textContent=novas;else $("#dot").remove();
 const vis=l.filter(x=>x.status!=="Enviada").length;
 painel.innerHTML=[["bulb","Total de Ideias",l.length,""],["eye","Visualizadas",vis,"g"],["ok","Acatadas",n("Acatada"),"g"],["chat","Respondidas",n("Respondida"),""]]
  .map(s=>`<div class="stat ${s[3]}"><div class="ic">${ic(s[0])}</div><div><small>${s[1]}</small><strong>${s[2]}</strong></div></div>`).join("");
 $("#recentes").innerHTML=l.length?l.slice(0,3).map(x=>linha(x)).join(""):`<div class="vazio">Você ainda não enviou nada. Use o menu ao lado para começar.</div>`;
}

// enviadas
const lista=$("#lista");
if(lista&&U){
 let filtro="todas";
 const chips=$("#chips");
 chips.innerHTML=[["todas","Todas"],...Object.entries(TIPOS).map(([k,v])=>[k,v.plural])].map(c=>`<button class="chip" data-f="${c[0]}">${c[1]}</button>`).join("");
 const desenha=()=>{
  chips.querySelectorAll(".chip").forEach(c=>c.classList.toggle("on",c.dataset.f===filtro));
  const l=minhas().filter(x=>filtro==="todas"||x.tipo===filtro);
  lista.innerHTML=l.length?l.map(x=>linha(x,true)).join(""):`<div class="vazio">Nada por aqui ainda.</div>`};
 chips.onclick=e=>{const c=e.target.closest("[data-f]");if(c){filtro=c.dataset.f;desenha()}};
 lista.onchange=e=>{const s=e.target.closest("select");if(!s)return;const l=ler(K.i,[]);const x=l.find(i=>i.id==s.dataset.id);if(x){x.status=s.value;gravar(K.i,l);desenha()}};
 lista.onclick=e=>{const b=e.target.closest("[data-del]");if(b&&confirm("Excluir este envio?")){gravar(K.i,ler(K.i,[]).filter(i=>i.id!=b.dataset.del));desenha()}};
 desenha();
}

// login e registro
document.querySelectorAll(".tgl").forEach(b=>b.onclick=()=>{const i=b.parentNode.querySelector("input"),v=i.type==="password";i.type=v?"text":"password";b.innerHTML=ic(v?"eyeoff":"eye")});
const erro=m=>{$("#erro").textContent=m};
const fl=$("#form-login");
if(fl)fl.onsubmit=e=>{e.preventDefault();const f=new FormData(fl),em=f.get("email").trim().toLowerCase();
 const u=ler(K.u,[]).find(x=>x.email===em&&x.senha===f.get("senha"));
 if(!u)return erro("E-mail ou senha incorretos.");gravar(K.s,em);location.href="painel.html"};
const fr=$("#form-registro");
if(fr)fr.onsubmit=e=>{e.preventDefault();const f=new FormData(fr),em=f.get("email").trim().toLowerCase(),us=ler(K.u,[]);
 if(f.get("senha")!==f.get("confirmar"))return erro("As senhas não são iguais.");
 if(us.some(x=>x.email===em))return erro("Este e-mail já tem cadastro. Faça login.");
 us.push({nome:f.get("nome").trim(),email:em,senha:f.get("senha")});gravar(K.u,us);gravar(K.s,em);location.href="painel.html"};

icones();
