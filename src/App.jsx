import { useState, useMemo, useEffect, useCallback } from "react";

const BRL = n =>
  typeof n === "number" && !isNaN(n)
    ? n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "—";

const ADMIN_PASSWORD = "n8admin2025";
const LS_KEY        = "n8_simulador_data";

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────

const DEFAULT_EMPS = {
  verus: {
    id:"verus", nome:"Edifício VERUS", tag:"Em construção",
    end:"Rua Veríssimo Marques, 1753 — Centro, São José dos Pinhais",
    entrega:"Dezembro / 2028", mesesObra:36, maxParcel:36, ind:"INCC-DI",
    uns:[
      {id:"201",  an:2,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:null,        st:"V"},
      {id:"202",  an:2,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:null,        st:"V"},
      {id:"203",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"204",  an:2,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:423206.40,   st:"D"},
      {id:"205",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"206",  an:2,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:423206.40,   st:"D"},
      {id:"207",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"208",  an:2,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:423206.40,   st:"D"},
      {id:"209",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"210",  an:2,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:288000.00,   st:"V"},
      {id:"211",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"212",  an:2,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:288000.00,   st:"V"},
      {id:"213",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"D"},
      {id:"214",  an:2,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:288000.00,   st:"V"},
      {id:"215",  an:2,  tp:"Studio Garden", ar:35.25,  q:1, vg:0, vl:366999.30,   st:"V"},
      {id:"216",  an:2,  tp:"Tipo A",        ar:25.00,  q:1, vg:0, vl:288000.00,   st:"V"},
      {id:"301",  an:3,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:752183.25,   st:"D"},
      {id:"302",  an:3,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:682500.00,   st:"V"},
      {id:"303",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:291000.00,   st:"V"},
      {id:"305",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:320404.80,   st:"D"},
      {id:"307",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:320404.80,   st:"V"},
      {id:"309",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:320404.80,   st:"D"},
      {id:"310",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:320404.80,   st:"D"},
      {id:"311",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:320404.80,   st:"D"},
      {id:"312",  an:3,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:299640.00,   st:"V"},
      {id:"313",  an:3,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:426206.40,   st:"D"},
      {id:"314",  an:3,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:426206.40,   st:"D"},
      {id:"401",  an:4,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:752183.25,   st:"D"},
      {id:"402",  an:4,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:752183.25,   st:"R"},
      {id:"403",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:288000.00,   st:"V"},
      {id:"404",  an:4,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:389000.00,   st:"V"},
      {id:"405",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:301640.00,   st:"V"},
      {id:"406",  an:4,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:428206.40,   st:"D"},
      {id:"407",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:322404.80,   st:"V"},
      {id:"408",  an:4,  tp:"Studio Loft",   ar:25.00,  q:1, vg:0, vl:400520.00,   st:"V"},
      {id:"409",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:301640.00,   st:"V"},
      {id:"410",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:322404.80,   st:"V"},
      {id:"411",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:301640.00,   st:"V"},
      {id:"412",  an:4,  tp:"Studio",        ar:25.00,  q:1, vg:0, vl:322404.80,   st:"D"},
      {id:"501",  an:5,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:682500.00,   st:"V"},
      {id:"502",  an:5,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:755183.25,   st:"D"},
      {id:"601",  an:6,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:757183.25,   st:"D"},
      {id:"602",  an:6,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:757183.25,   st:"D"},
      {id:"603",  an:6,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:851372.25,   st:"V"},
      {id:"604",  an:6,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:851372.25,   st:"D"},
      {id:"701",  an:7,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:692500.00,   st:"V"},
      {id:"702",  an:7,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:762183.25,   st:"D"},
      {id:"703",  an:7,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:861372.25,   st:"D"},
      {id:"704",  an:7,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:861372.25,   st:"D"},
      {id:"801",  an:8,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:767183.25,   st:"D"},
      {id:"802",  an:8,  tp:"Tipo D",        ar:65.00,  q:2, vg:1, vl:697500.00,   st:"V"},
      {id:"803",  an:8,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:866372.25,   st:"D"},
      {id:"804",  an:8,  tp:"Tipo E",        ar:75.00,  q:2, vg:1, vl:866372.25,   st:"D"},
      {id:"901",  an:9,  tp:"Tipo G",        ar:131.85, q:3, vg:2, vl:1146366.21,  st:"D"},
      {id:"902",  an:9,  tp:"Tipo I",        ar:76.79,  q:2, vg:1, vl:719607.93,   st:"D"},
      {id:"903",  an:9,  tp:"Tipo I",        ar:76.65,  q:2, vg:1, vl:672530.78,   st:"V"},
      {id:"1001", an:10, tp:"Tipo F",        ar:88.00,  q:3, vg:2, vl:983665.03,   st:"D"},
      {id:"1002", an:10, tp:"Tipo H",        ar:95.00,  q:3, vg:2, vl:1057464.95,  st:"D"},
      {id:"1101", an:11, tp:"Tipo F",        ar:88.00,  q:3, vg:2, vl:993665.03,   st:"D"},
      {id:"1102", an:11, tp:"Tipo H",        ar:95.00,  q:3, vg:2, vl:998285.00,   st:"V"},
      {id:"1201", an:12, tp:"Tipo F",        ar:88.00,  q:3, vg:2, vl:1013665.03,  st:"D"},
      {id:"1202", an:12, tp:"Tipo H",        ar:95.00,  q:3, vg:2, vl:1087464.95,  st:"D"},
      {id:"VG3",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG4",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG5",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG8",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG9",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG10", an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG11", an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"D"},
      {id:"VG1",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:50058.00,    st:"V"},
      {id:"VG2",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:50058.00,    st:"V"},
      {id:"VG6",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:48600.00,    st:"V"},
      {id:"VG7",  an:0,  tp:"Vaga Comum",    ar:10.80,  q:0, vg:1, vl:53562.06,    st:"V"},
    ],
  },
  liv: {
    id:"liv", nome:"Residencial LIV", tag:"Fase Final",
    end:"Rua Luiz Victorino Ordine, 1744 — São Pedro, São José dos Pinhais",
    entrega:"Abril / 2026", mesesObra:4, maxParcel:4, ind:"INCC-DI",
    uns:[
      {id:"201", an:2, tp:"Garden", ar:96.25,  q:2, vg:2, vl:787052.34, st:"V"},
      {id:"202", an:2, tp:"Garden", ar:108.01, q:2, vg:2, vl:956351.27, st:"D"},
      {id:"301", an:3, tp:"Padrão", ar:77.10,  q:2, vg:2, vl:null,      st:"V"},
      {id:"302", an:3, tp:"Padrão", ar:89.12,  q:2, vg:1, vl:null,      st:"V"},
      {id:"401", an:4, tp:"Padrão", ar:77.10,  q:2, vg:2, vl:null,      st:"V"},
      {id:"402", an:4, tp:"Padrão", ar:89.12,  q:2, vg:2, vl:862870.24, st:"D"},
      {id:"501", an:5, tp:"Padrão", ar:77.10,  q:2, vg:2, vl:null,      st:"V"},
      {id:"502", an:5, tp:"Padrão", ar:89.12,  q:2, vg:2, vl:null,      st:"V"},
      {id:"601", an:6, tp:"Duplex", ar:97.74,  q:2, vg:2, vl:null,      st:"V"},
      {id:"602", an:6, tp:"Duplex", ar:111.35, q:2, vg:2, vl:null,      st:"V"},
      {id:"603", an:6, tp:"Duplex", ar:104.27, q:2, vg:2, vl:970432.99, st:"D"},
    ],
  },
};

const APPROVAL = [
  { max:5,  label:"Aprovação do Vendedor",          color:"#4ade80" },
  { max:10, label:"Aprovação do Gerente Comercial", color:"#fbbf24" },
  { max:99, label:"Aprovação da Diretoria",         color:"#f87171" },
];

// ─── LOGIC ────────────────────────────────────────────────────────────────────

function calcDesconto(sinal, financ, parcel, baloes, permuta) {
  const isAvista  = financ === 0 && parcel === 0 && baloes === 0;
  const isBlocked = permuta > 50;
  let mD = 0, mLabel = "", mRule = "";
  if      (isAvista)    { mD=25; mLabel="À Vista — quitação integral no ato"; mRule="avista"; }
  else if (financ>=50)  { mD=8;  mLabel="Financiamento Caixa ≥ 50%";          mRule="caixa_50"; }
  else if (financ>=30)  { mD=5;  mLabel="Financiamento Caixa 30–49%";         mRule="caixa_30"; }
  else if (financ>0)    { mD=3;  mLabel="Financiamento Caixa < 30%";           mRule="caixa_abaixo"; }
  else if (parcel>0||baloes>0) {
    if (sinal>=10) { mD=4; mLabel="Parcelamento c/ sinal ≥ 10%"; mRule="parcela_ok"; }
    else           { mD=0; mLabel="Parcelamento — sinal < 10%";  mRule="parcela_nok"; }
  }
  let sD=0, sLabel="Sinal < 10% — sem desconto";
  if (!isAvista) {
    if      (sinal>=20) { sD=4; sLabel="Sinal ≥ 20%"; }
    else if (sinal>=10) { sD=2; sLabel="Sinal 10–19%"; }
  }
  let pD=0, pLabel="—";
  if (!isAvista) {
    if      (isBlocked)    { pD=0; pLabel="Permuta > 50% — não aceita"; }
    else if (permuta>30)   { pD=0; pLabel="Permuta 31–50%"; }
    else if (permuta>0)    { pD=3; pLabel="Permuta até 30%"; }
    else                   { pD=5; pLabel="Sem permuta"; }
  }
  let total = isAvista ? mD : mD+sD+pD;
  const isCapped = mRule==="parcela_nok";
  if (isCapped) total = Math.min(total, 2);
  const approvalLevel = APPROVAL.find(a => total<=a.max) || APPROVAL[APPROVAL.length-1];
  return { modalidade:{disc:mD,label:mLabel}, sinalRow:{disc:isAvista?null:sD,label:isAvista?"N/A no À Vista":sLabel}, permutaRow:{disc:isAvista?null:pD,label:isAvista?"N/A no À Vista":pLabel}, total, isBlocked, isCapped, isAvista, approvalLevel };
}

function gerarFluxo({ sinalP, financP, parcelP, baloesP, permutaP, numBaloes, mesesParcel, mesesObra, vlLiq }) {
  const sinalV=vlLiq*sinalP/100, financV=vlLiq*financP/100, parcelV=vlLiq*parcelP/100, baloesV=vlLiq*baloesP/100, permutaV=vlLiq*permutaP/100;
  const meses=Math.min(mesesParcel||mesesObra,mesesObra), pMensal=meses>0?parcelV/meses:0;
  const nb=Math.max(1,Math.min(numBaloes||1,mesesObra)), balaoV=nb>0?baloesV/nb:0;
  const bStep=Math.max(1,Math.floor(mesesObra/(nb+1)));
  const bSet=new Set(Array.from({length:nb},(_,i)=>Math.min(bStep*(i+1),mesesObra)));
  const rows=[];
  if (sinalV>0||permutaV>0) rows.push({mes:0,label:"Ato",sinalV,permutaV,parcelV:0,balaoV:0,financV:0});
  for (let m=1;m<=mesesObra;m++) {
    const p=m<=meses?pMensal:0, b=bSet.has(m)?balaoV:0;
    if (p>0||b>0) rows.push({mes:m,label:`Mês ${m}`,sinalV:0,permutaV:0,parcelV:p,balaoV:b,financV:0});
  }
  if (financV>0) rows.push({mes:mesesObra+1,label:"Entrega",sinalV:0,permutaV:0,parcelV:0,balaoV:0,financV});
  return rows.map(r=>({...r,total:r.sinalV+r.permutaV+r.parcelV+r.balaoV+r.financV}));
}

// ─── PDF GENERATOR ────────────────────────────────────────────────────────────

function gerarPDF({ emp, selUnits, comp, desc, descOn, fluxo, vlTabela, vlLiq, buyer }) {
  const hoje    = new Date().toLocaleDateString("pt-BR");
  const totalAr = selUnits.reduce((s,u)=>s+u.ar,0);
  const pv      = k => parseFloat(comp[k])||0;
  const brl     = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const num     = new Date().getTime().toString().slice(-6);
  const unidsStr = selUnits.map(u=>`Apt. ${u.id} (${u.tp})`).join(", ");
  const totalFluxo = fluxo.reduce((s,r)=>s+r.total,0);

  const flowRows = fluxo.map(r => `
    <tr class="${r.mes===0||r.mes===emp.mesesObra+1?'hl':r.balaoV>0?'bal':''}">
      <td>${r.label}${r.balaoV>0&&r.mes!==emp.mesesObra+1?' ★':''}</td>
      <td>${r.sinalV>0?brl(r.sinalV):'—'}</td>
      <td>${r.permutaV>0?brl(r.permutaV):'—'}</td>
      <td>${r.parcelV>0?brl(r.parcelV):'—'}</td>
      <td>${r.balaoV>0?brl(r.balaoV):'—'}</td>
      <td>${r.financV>0?brl(r.financV):'—'}</td>
      <td class="bold">${brl(r.total)}</td>
    </tr>`).join("");

  const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Termo de Proposta Comercial — ${buyer.nome} — ${emp.nome}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#1a1a1a;background:#fff;padding:22px 32px}
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2.5px solid #1a1a1a;padding-bottom:14px;margin-bottom:6px}
  .brand{font-size:8.5px;letter-spacing:3px;text-transform:uppercase;color:#888;margin-bottom:3px}
  .doc-title{font-size:19px;font-weight:300;color:#1a1a1a;line-height:1.15}
  .doc-sub{font-size:9px;color:#999;margin-top:3px}
  .num-block{text-align:right}
  .num-lbl{font-size:8px;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:2px}
  .num-val{font-size:11px;font-weight:700;color:#555;font-family:monospace}
  .disc-val{font-size:34px;font-weight:700;color:#b8944a;line-height:1;margin-top:4px}
  .disc-lbl{font-size:8.5px;color:#aaa;text-transform:uppercase;letter-spacing:1px}
  .badge{display:inline-flex;align-items:center;gap:4px;margin-top:5px;padding:2px 10px;border-radius:12px;font-size:9px;font-weight:600}
  .sec{margin-bottom:14px}
  .sec-title{font-size:7.5px;letter-spacing:3px;text-transform:uppercase;color:#b8944a;font-weight:700;padding-bottom:4px;border-bottom:1px solid #e8deca;margin-bottom:8px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px}
  .row{display:flex;justify-content:space-between;align-items:baseline;padding:3.5px 0;border-bottom:1px solid #f5f0e8;font-size:10.5px}
  .row .lbl{color:#888;flex-shrink:0}
  .row .val{font-weight:500;text-align:right;padding-left:8px}
  .row .val.gold{color:#b8944a;font-weight:700}
  .row .val.red{color:#b83232}
  .row .val.big{font-size:13px}
  .disc-comp .dr{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f5f0e8}
  .dr .dl{font-size:10.5px;color:#555}.dr .ds{font-size:9px;color:#aaa;margin-top:1px}.dr .dv{font-weight:700;color:#b8944a;font-size:11px}
  .comp-item{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f5f0e8}
  .comp-item .cl{font-size:10.5px}.comp-item .cs{font-size:9px;color:#aaa}
  .comp-item .cv{text-align:right;font-weight:700;color:#b8944a}.comp-item .cs2{font-size:9px;color:#aaa;text-align:right}
  table{width:100%;border-collapse:collapse;font-size:9.5px}
  thead tr{background:#f5f0e8}
  th{padding:5px 7px;text-align:right;font-weight:700;color:#666;text-transform:uppercase;font-size:7.5px;letter-spacing:0.5px;border-bottom:1.5px solid #ddd}
  th:first-child{text-align:left}
  td{padding:4.5px 7px;text-align:right;border-bottom:1px solid #f0ebe3;color:#444}
  td:first-child{text-align:left;font-weight:500}
  tr.hl td{background:#fdf6ec;color:#b8944a;font-weight:700}
  tr.bal td{background:#eef5ff;color:#2a5ba8}
  tr.foot-row td{background:#f5f0e8;font-weight:700;color:#b8944a;border-top:1.5px solid #ddd}
  .clause-block{margin-bottom:13px}
  .clause-title{font-size:10px;font-weight:700;color:#1a1a1a;margin-bottom:4px}
  .clause-text{font-size:9.5px;color:#444;line-height:1.65;text-align:justify}
  .clause-text strong{color:#1a1a1a}
  .sign-area{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:24px;padding-top:16px;border-top:1.5px solid #1a1a1a}
  .sign-box{display:flex;flex-direction:column;gap:6px}
  .sign-line{border-bottom:1px solid #555;height:32px;margin-bottom:2px}
  .sign-label{font-size:9px;color:#555;text-align:center}
  .sign-sub{font-size:8.5px;color:#aaa;text-align:center}
  .divider{border:none;border-top:1px dashed #e0d8cc;margin:8px 0}
  .page-break{page-break-before:always}
  @media print{body{padding:14px 22px}@page{margin:1.2cm;size:A4}section.clauses{page-break-before:always}}
</style></head><body>

<div class="hdr">
  <div>
    <div class="brand">N8 Incorporadora Ltda. · CNPJ 37.665.697/0001-20</div>
    <div class="doc-title">Termo de Proposta Comercial</div>
    <div class="doc-sub">${hoje} &nbsp;·&nbsp; ${emp.nome} &nbsp;·&nbsp; ${unidsStr}</div>
  </div>
  <div class="num-block">
    <div class="num-lbl">Nº do documento</div>
    <div class="num-val">N8-${num}</div>
    <div class="disc-lbl" style="margin-top:8px">${descOn?"Desconto aprovado":"Sem desconto aplicado"}</div>
    <div class="disc-val">${descOn?desc.total+"%":"—"}</div>
    ${descOn&&!desc.isBlocked?`<div class="badge" style="background:${desc.approvalLevel.color}20;color:${desc.approvalLevel.color};border:1px solid ${desc.approvalLevel.color}50">${desc.approvalLevel.label}</div>`:""}
  </div>
</div>

<div style="background:#faf8f5;border:1px solid #e8deca;border-radius:6px;padding:10px 14px;margin:10px 0 14px;font-size:10px;color:#555;line-height:1.6">
  Este documento constitui uma <strong>proposta comercial formal</strong> formulada pela <strong>N8 Incorporadora</strong> ao interessado identificado abaixo, nos termos da Lei nº 4.591/1964 (Lei de Condomínios e Incorporações Imobiliárias), Lei nº 6.766/1979 (Parcelamento do Solo Urbano) e demais normas aplicáveis ao mercado imobiliário brasileiro. A presente proposta tem validade de <strong>5 (cinco) dias úteis</strong> a contar da data de emissão.
</div>

<div class="grid2">
<div>

<div class="sec">
  <div class="sec-title">Proponente (Interessado)</div>
  <div class="row"><span class="lbl">Nome completo</span><span class="val" style="font-weight:700">${buyer.nome}</span></div>
  <div class="row"><span class="lbl">CPF</span><span class="val">${buyer.cpf}</span></div>
  <div class="row"><span class="lbl">RG</span><span class="val">${buyer.rg||"—"}</span></div>
  <div class="row"><span class="lbl">Estado civil</span><span class="val">${buyer.estadoCivil||"—"}</span></div>
  <div class="row"><span class="lbl">Nacionalidade</span><span class="val">${buyer.nacionalidade||"Brasileiro(a)"}</span></div>
  <div class="row"><span class="lbl">Profissão</span><span class="val">${buyer.profissao||"—"}</span></div>
  <div class="row"><span class="lbl">E-mail</span><span class="val">${buyer.email||"—"}</span></div>
  <div class="row" style="border:none"><span class="lbl">Telefone</span><span class="val">${buyer.telefone||"—"}</span></div>
</div>

<div class="sec">
  <div class="sec-title">Empreendimento</div>
  <div class="row"><span class="lbl">Empreendimento</span><span class="val">${emp.nome}</span></div>
  <div class="row"><span class="lbl">Endereço</span><span class="val" style="font-size:10px;max-width:58%">${emp.end}</span></div>
  <div class="row"><span class="lbl">Previsão de entrega</span><span class="val">${emp.entrega}</span></div>
  <div class="row"><span class="lbl">Prazo de obra</span><span class="val">${emp.mesesObra} meses</span></div>
  <div class="row" style="border:none"><span class="lbl">Índice de reajuste</span><span class="val">${emp.ind}</span></div>
</div>

<div class="sec">
  <div class="sec-title">Unidade(s) objeto da proposta</div>
  ${selUnits.map((u,i)=>`
  <div class="row"><span class="lbl">Unidade</span><span class="val gold">Apt. ${u.id}</span></div>
  <div class="row"><span class="lbl">Tipo / Área privativa</span><span class="val">${u.tp} · ${u.ar}m²</span></div>
  <div class="row"><span class="lbl">Dormitórios / Vagas</span><span class="val">${u.q>0?u.q+" dorm.":"—"}${u.vg>0?" · "+u.vg+" vaga(s)":""}</span></div>
  <div class="row${i<selUnits.length-1?"":" style=\"border:none\""}"><span class="lbl">Valor de tabela</span><span class="val">${brl(u.vl)}</span></div>
  ${i<selUnits.length-1?'<hr class="divider">':""}`).join("")}
  ${selUnits.length>1?`<div class="row"><span class="lbl" style="font-weight:700">Total tabela</span><span class="val gold">${brl(vlTabela)}</span></div>`:""}
</div>

</div>
<div>

<div class="sec">
  <div class="sec-title">Valores da proposta</div>
  <div class="row"><span class="lbl">Valor de tabela</span><span class="val">${brl(vlTabela)}</span></div>
  ${descOn?`<div class="row"><span class="lbl">Desconto concedido (${desc.total}%)</span><span class="val red">– ${brl(vlTabela*desc.total/100)}</span></div>`:""}
  <div class="row"><span class="lbl" style="font-weight:700">Valor negociado total</span><span class="val gold big">${brl(vlLiq)}</span></div>
  <div class="row" style="border:none"><span class="lbl">Valor por m²</span><span class="val">${brl(vlLiq/totalAr)}/m²</span></div>
</div>

${descOn?`<div class="sec">
  <div class="sec-title">Composição do desconto</div>
  <div class="disc-comp">
    <div class="dr"><div><div class="dl">Modalidade de pagamento</div><div class="ds">${desc.modalidade.label}</div></div><div class="dv">${desc.modalidade.disc>0?"+"+desc.modalidade.disc+"%":"0%"}</div></div>
    <div class="dr"><div><div class="dl">Sinal de negócio</div><div class="ds">${desc.sinalRow.label}</div></div><div class="dv">${desc.sinalRow.disc===null?"—":desc.sinalRow.disc>0?"+"+desc.sinalRow.disc+"%":"0%"}</div></div>
    <div class="dr" style="border:none"><div><div class="dl">Permuta</div><div class="ds">${desc.permutaRow.label}</div></div><div class="dv">${desc.permutaRow.disc===null?"—":desc.permutaRow.disc>0?"+"+desc.permutaRow.disc+"%":"0%"}</div></div>
  </div>
  <div style="display:flex;justify-content:space-between;padding-top:7px;border-top:1px solid #e8deca;margin-top:4px">
    <span style="font-weight:700;font-size:10.5px">Desconto total aplicado</span>
    <span style="font-weight:700;font-size:15px;color:#b8944a">${desc.total}%</span>
  </div>
</div>`:""}

<div class="sec">
  <div class="sec-title">Composição do pagamento</div>
  ${[
    {l:"Sinal de negócio",p:pv("sinal"),sub:"No ato da assinatura do contrato"},
    {l:"Financiamento CEF",p:pv("financ"),sub:"Apoio à Produção · liberação nas chaves"},
    {l:`Parcelamento — ${comp.mesesParcel||emp.mesesObra}x`,p:pv("parcel"),sub:`${comp.mesesParcel||emp.mesesObra} parcelas mensais durante a obra · ${emp.ind}`},
    {l:`Balões — ${comp.numBaloes}x`,p:pv("baloes"),sub:`${comp.numBaloes} parcelas fixas durante a obra · ${emp.ind}`},
    {l:"Permuta",p:pv("permuta"),sub:"Bem avaliado com 10% de deságio sobre valor de mercado"},
  ].filter(it=>it.p>0).map(it=>`
  <div class="comp-item">
    <div><div class="cl">${it.l}</div><div class="cs">${it.sub}</div></div>
    <div><div class="cv">${brl(vlLiq*it.p/100)}</div><div class="cs2">${it.p.toFixed(2)}%</div></div>
  </div>`).join("")}
  <div style="display:flex;justify-content:space-between;padding-top:7px;border-top:1px solid #e8deca;margin-top:2px">
    <span style="font-weight:700;font-size:10.5px">Total</span>
    <span style="font-weight:700;color:#b8944a">${brl(vlLiq)}</span>
  </div>
</div>

</div>
</div>

<div class="sec">
  <div class="sec-title">Fluxo de pagamento — período de obra · ${emp.mesesObra} meses · ${emp.ind}</div>
  <table>
    <thead><tr>
      <th style="text-align:left">Mês / Evento</th>
      <th>Sinal</th><th>Permuta</th><th>Parcela</th><th>Balão</th><th>Financ.</th><th>Total</th>
    </tr></thead>
    <tbody>
      ${flowRows}
      <tr class="foot-row"><td colspan="6">Total geral</td><td>${brl(totalFluxo)}</td></tr>
    </tbody>
  </table>
  <p style="margin-top:5px;font-size:8.5px;color:#aaa">★ Mês com balão incluso &nbsp;·&nbsp; Valores nominais sem incidência do ${emp.ind} &nbsp;·&nbsp; Parcela mensal base: ${pv("parcel")>0?brl((vlLiq*pv("parcel")/100)/(comp.mesesParcel||emp.mesesObra)):"N/A"}</p>
</div>

<section class="clauses">
<div style="border-top:2px solid #1a1a1a;padding-top:14px;margin-top:8px;margin-bottom:14px">
  <div style="font-size:8.5px;letter-spacing:3px;text-transform:uppercase;color:#b8944a;font-weight:700;margin-bottom:10px">Cláusulas e Condições Gerais</div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 1ª — Do Objeto</div>
    <div class="clause-text">A presente proposta tem por objeto a aquisição da(s) unidade(s) autônoma(s) identificada(s) no quadro acima, integrante(s) do empreendimento <strong>${emp.nome}</strong>, localizado à ${emp.end}, incorporado nos termos da Lei nº 4.591/1964, com previsão de conclusão para <strong>${emp.entrega}</strong>. A(s) unidade(s) será(ão) entregue(s) com os itens de série constantes do Memorial Descritivo registrado no Cartório de Registro de Imóveis competente.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 2ª — Do Preço e Forma de Pagamento</div>
    <div class="clause-text">O preço total da(s) unidade(s) objeto desta proposta é de <strong>${brl(vlLiq)}</strong>${descOn&&desc.total>0?`, correspondendo ao valor de tabela de ${brl(vlTabela)} com desconto de ${desc.total}% concedido conforme condições negociadas`:""}, a ser pago conforme plano de pagamento detalhado no quadro de composição e no fluxo acima. Os valores das parcelas mensais, parcelas fixas (balões) e demais obrigações intermediárias serão reajustados mensalmente pelo índice <strong>${emp.ind}</strong> (INCC — Índice Nacional de Custo da Construção, divulgado pela Fundação Getulio Vargas), desde a data de lançamento até a efetiva quitação de cada parcela, nos termos do art. 46 da Lei nº 10.931/2004.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 3ª — Da Validade da Proposta e Prazo de Resposta</div>
    <div class="clause-text">Esta proposta tem validade de <strong>5 (cinco) dias úteis</strong> contados da data de sua emissão (${hoje}), período durante o qual a N8 Incorporadora reservará a(s) unidade(s) indicada(s) em caráter de exclusividade para o proponente. Findo este prazo sem manifestação formal de aceite, acompanhada do sinal de negócio, a incorporadora poderá dispor livremente da(s) unidade(s), sem ônus ou responsabilidade de qualquer natureza.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 4ª — Das Condições para Formalização do Contrato</div>
    <div class="clause-text">A aceitação desta proposta pelo interessado obriga a imediata assinatura do Instrumento Particular de Compromisso de Compra e Venda, acompanhado do pagamento do sinal de negócio de <strong>${brl(vlLiq*pv("sinal")/100)} (${pv("sinal").toFixed(2)}% do valor negociado)</strong> a título de arras confirmatórias, nos termos dos arts. 417 a 420 do Código Civil Brasileiro (Lei nº 10.406/2002). O contrato de compra e venda será elaborado pela incorporadora, observada a legislação aplicável, e deverá ser assinado em até 10 (dez) dias úteis após o aceite.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 5ª — Do Financiamento Bancário</div>
    <div class="clause-text">${pv("financ")>0?`A parcela de financiamento bancário correspondente a <strong>${brl(vlLiq*pv("financ")/100)} (${pv("financ").toFixed(2)}%)</strong> deverá ser obtida pelo adquirente junto à Caixa Econômica Federal, na modalidade Apoio à Produção, com liberação prevista para a data de entrega das chaves. A aprovação do crédito é de responsabilidade exclusiva do adquirente, não constituindo condição resolutiva do presente instrumento. Caso o crédito não seja aprovado, as partes negociarão de boa-fé forma alternativa de pagamento do saldo devedor.`:"O presente negócio não contempla parcela de financiamento bancário, sendo o valor total pago diretamente à incorporadora conforme plano estabelecido."}</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 6ª — Da Permuta</div>
    <div class="clause-text">${pv("permuta")>0?`A permuta de bem imóvel ou bem móvel (veículo) prevista nesta proposta, no valor de <strong>${brl(vlLiq*pv("permuta")/100)}</strong>, está condicionada à avaliação e aceite formal pela N8 Incorporadora, aplicando-se deságio de 10% (dez por cento) sobre o valor de mercado apurado por laudo técnico. O bem permutado deverá estar livre e desembaraçado de quaisquer ônus, gravames ou restrições judiciais ou extrajudiciais, sob pena de nulidade desta condição, sem prejuízo das demais obrigações do adquirente.`:"Esta proposta não contempla permuta de bens."}</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 7ª — Da Entrega e Vistoria</div>
    <div class="clause-text">A entrega das chaves ocorrerá após a expedição do Habite-se e a quitação integral de todas as obrigações pecuniárias do adquirente, incluindo parcelas, balões, saldo devedor e eventuais encargos. O adquirente será convocado para vistoria da unidade com antecedência mínima de 5 (cinco) dias úteis, devendo comparecer pessoalmente ou mediante procurador com poderes específicos. A não comparência injustificada na data agendada não impedirá a efetivação da entrega.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 8ª — Da Desistência e Rescisão</div>
    <div class="clause-text">Em caso de desistência pelo adquirente após a assinatura do Compromisso de Compra e Venda, aplica-se o disposto na Lei nº 13.786/2018 (Lei do Distrato Imobiliário), sendo retida pela incorporadora a percentagem legalmente prevista sobre os valores pagos a título de ressarcimento de despesas administrativas e comerciais. Havendo rescisão por inadimplemento do adquirente, incidirá igualmente o regime da referida lei, sem prejuízo da cobrança de encargos moratórios.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 9ª — Do Foro e Legislação Aplicável</div>
    <div class="clause-text">As partes elegem o foro da Comarca de São José dos Pinhais — PR para dirimir quaisquer controvérsias oriundas deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja. Aplicam-se subsidiariamente as disposições do Código Civil Brasileiro, do Código de Defesa do Consumidor (Lei nº 8.078/1990) e da legislação imobiliária vigente.</div>
  </div>

  <div class="clause-block">
    <div class="clause-title">Cláusula 10ª — Das Disposições Gerais</div>
    <div class="clause-text">O adquirente declara ter lido e compreendido integralmente o teor deste Termo de Proposta Comercial, bem como ter tido acesso ao Memorial Descritivo, às plantas e demais documentos do empreendimento. A presente proposta é personalíssima e intransferível, não podendo ser cedida a terceiros sem anuência prévia e por escrito da N8 Incorporadora. A eventual nulidade de qualquer cláusula não afetará as demais, que permanecerão vigentes.</div>
  </div>
</div>

<div class="sign-area">
  <div class="sign-box">
    <div style="font-size:9px;color:#555;margin-bottom:18px"><strong>Interessado / Proponente</strong></div>
    <div class="sign-line"></div>
    <div class="sign-label">${buyer.nome}</div>
    <div class="sign-sub">CPF: ${buyer.cpf}</div>
    ${buyer.conjuge?`<div style="margin-top:18px"></div><div class="sign-line"></div><div class="sign-label">${buyer.conjuge}</div><div class="sign-sub">CPF: ${buyer.cpfConjuge||"___.___.___-__"} · Cônjuge / Coobrigado(a)</div>`:""}
  </div>
  <div class="sign-box">
    <div style="font-size:9px;color:#555;margin-bottom:18px"><strong>N8 Incorporadora Ltda.</strong></div>
    <div class="sign-line"></div>
    <div class="sign-label">Representante Legal</div>
    <div class="sign-sub">N8 Incorporadora Ltda. &nbsp;·&nbsp; CNPJ: 37.665.697/0001-20</div>
    <div class="sign-sub" style="margin-top:2px">R. Francisco Munõz Madrid, 625 — Bloco 02, Sala 02 — Roseira de São Sebastião, SJP/PR</div>
    <div style="margin-top:16px"></div>
    <div class="sign-line"></div>
    <div class="sign-label">Corretor / Gerente Comercial</div>
    <div class="sign-sub">CRECI: ____________ &nbsp;·&nbsp; (41) 9936-7433</div>
  </div>
</div>

<div style="margin-top:18px;padding-top:10px;border-top:1px solid #ddd;font-size:8.5px;color:#aaa;line-height:1.7;text-align:justify">
  Documento gerado eletronicamente em ${hoje} pelo Simulador Comercial N8 · Ref. ${num} · Valores nominais sujeitos a reajuste pelo ${emp.ind} · Proposta válida por 5 dias úteis · <strong style="color:#888">N8 Incorporadora Ltda. · CNPJ 37.665.697/0001-20 · Insc. Municipal 84402</strong> · R. Francisco Munõz Madrid, 625, Bloco 02, Sala 02 — Roseira de São Sebastião, São José dos Pinhais/PR — CEP 83.070-152 · maylon@n8inc.com.br · (41) 9936-7433
</div>
</section>

<script>window.onload=()=>window.print();</script>
</body></html>`;

  const w = window.open("", "_blank", "width=960,height=800");
  if (w) { w.document.write(html); w.document.close(); }
}

// ─── PALETTE & PRIMITIVES ─────────────────────────────────────────────────────

const C = {
  bg:"#0c0f18", card:"#0f1220", b:"#1e2130", b2:"#2a2d3e",
  gold:"#c4a97d", text:"#e8e0d0", muted:"#7c6f5e", dim:"#4a4d60",
  ff:"system-ui,sans-serif",
};
const inp = { background:"#080b14", color:C.text, border:`1px solid ${C.b}`, borderRadius:5, padding:"8px 10px", fontFamily:C.ff, fontSize:13, outline:"none", width:"100%", transition:"border-color 0.2s" };

const Lbl = ({children}) => <div style={{fontSize:11,letterSpacing:3,color:C.gold,textTransform:"uppercase",marginBottom:8,fontFamily:C.ff}}>{children}</div>;
const H2  = ({children}) => <h2 style={{fontSize:20,fontWeight:"normal",margin:"0 0 20px",color:C.text}}>{children}</h2>;
const Btn = ({children,onClick,disabled,style:s}) => (
  <button onClick={onClick} disabled={disabled} style={{background:"transparent",border:`1px solid ${disabled?"#2a2d3e":C.gold}`,color:disabled?"#3a3d50":C.gold,padding:"9px 26px",borderRadius:5,cursor:disabled?"default":"pointer",fontSize:12,letterSpacing:1.5,textTransform:"uppercase",fontFamily:C.ff,...s}}>{children}</button>
);
const Ghost = ({children,onClick,style:s}) => (
  <button onClick={onClick} style={{background:"transparent",border:`1px solid ${C.b2}`,color:C.muted,padding:"9px 22px",borderRadius:5,cursor:"pointer",fontSize:12,letterSpacing:1.5,textTransform:"uppercase",fontFamily:C.ff,...s}}>{children}</button>
);
const Card = ({title,subtitle,action,children}) => (
  <div style={{background:C.card,border:`1px solid ${C.b}`,borderRadius:10,overflow:"hidden",marginBottom:8}}>
    <div style={{padding:"13px 20px",borderBottom:`1px solid ${C.b}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"baseline",gap:10}}>
        <span style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:C.ff}}>{title}</span>
        {subtitle&&<span style={{fontSize:11,color:C.dim,fontFamily:C.ff}}>{subtitle}</span>}
      </div>
      {action}
    </div>
    <div style={{padding:"16px 20px"}}>{children}</div>
  </div>
);
function Toggle({on,onChange,label,labelOff}) {
  return (
    <div onClick={()=>onChange(!on)} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",userSelect:"none"}}>
      <div style={{width:42,height:23,borderRadius:12,position:"relative",transition:"background 0.25s",background:on?"rgba(196,169,125,0.5)":"#1e2130",border:`1px solid ${on?C.gold:C.b2}`,flexShrink:0}}>
        <div style={{position:"absolute",top:2,left:on?20:2,width:17,height:17,borderRadius:"50%",background:on?C.gold:"#3a3d50",transition:"left 0.22s, background 0.22s"}}/>
      </div>
      <span style={{fontFamily:C.ff,fontSize:13,color:on?C.text:C.muted}}>{on?label:(labelOff||label)}</span>
    </div>
  );
}
function StepNav({step,setStep,maxStep}) {
  return (
    <div style={{display:"flex",gap:6,marginBottom:28,flexWrap:"wrap"}}>
      {["Empreendimento","Unidades","Simulador"].map((s,i)=>{
        const active=step===i,done=i<step;
        return (
          <div key={i} onClick={()=>i<=maxStep&&setStep(i)} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 14px",borderRadius:20,border:`1px solid ${active?C.gold:done?C.b2:C.b}`,background:active?"rgba(196,169,125,0.08)":"transparent",cursor:i<=maxStep?"pointer":"default",fontFamily:C.ff,fontSize:12,color:active?C.gold:done?C.muted:C.dim}}>
            <span style={{width:17,height:17,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:active?C.gold:done?"#1e2130":"transparent",border:active?"none":done?`1px solid ${C.b2}`:`1px solid ${C.b}`,fontSize:9,color:active?"#0c0f18":C.muted,flexShrink:0}}>{done&&!active?"✓":i+1}</span>
            {s}
          </div>
        );
      })}
    </div>
  );
}

// ─── ADMIN MODAL ─────────────────────────────────────────────────────────────

function AdminModal({ emps, onSave, onClose }) {
  const [pw,      setPw]      = useState("");
  const [authed,  setAuthed]  = useState(false);
  const [pwErr,   setPwErr]   = useState(false);
  const [tab,     setTab]     = useState("verus");
  const [data,    setData]    = useState(() => JSON.parse(JSON.stringify(emps)));
  const [saved,   setSaved]   = useState(false);
  const [filtro,  setFiltro]  = useState("");

  const stOpts = [{v:"D",l:"Disponível",c:"#4ade80"},{v:"R",l:"Reservado",c:"#fbbf24"},{v:"V",l:"Vendido",c:"#f87171"}];

  const setUnSt = (empId, uid, st) => setData(d => ({ ...d, [empId]: { ...d[empId], uns: d[empId].uns.map(u => u.id===uid ? {...u,st} : u) }}));
  const setUnVl = (empId, uid, vl) => setData(d => ({ ...d, [empId]: { ...d[empId], uns: d[empId].uns.map(u => u.id===uid ? {...u,vl:parseFloat(vl)||null} : u) }}));
  const setMaxP = (empId, val)     => setData(d => ({ ...d, [empId]: { ...d[empId], maxParcel: parseInt(val)||1 }}));

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); }
    else { setPwErr(true); }
  };

  const handleSave = () => {
    onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const overlay = { position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20 };
  const modal   = { background:"#0c0f18",border:`1px solid #2a2d3e`,borderRadius:12,width:"100%",maxWidth:820,maxHeight:"90vh",overflow:"hidden",display:"flex",flexDirection:"column" };

  return (
    <div style={overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={modal}>
        {/* Modal header */}
        <div style={{padding:"16px 22px",borderBottom:`1px solid #1e2130`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:10,color:"#f87171",fontFamily:C.ff}}>⬤</span>
            <span style={{fontSize:12,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:C.ff}}>Painel Administrativo</span>
          </div>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:C.muted,fontSize:18,cursor:"pointer",lineHeight:1}}>✕</button>
        </div>

        {!authed ? (
          /* Login */
          <div style={{padding:40,display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
            <div style={{fontSize:13,color:C.muted,fontFamily:C.ff,marginBottom:4}}>Acesso restrito — insira a senha de administrador</div>
            <div style={{display:"flex",gap:8,width:"100%",maxWidth:340}}>
              <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                placeholder="Senha"
                style={{...inp,flex:1,borderColor:pwErr?"#f87171":C.b}}
                onFocus={e=>e.target.style.borderColor=C.gold}
                onBlur={e=>e.target.style.borderColor=pwErr?"#f87171":C.b}
              />
              <button onClick={handleLogin} style={{padding:"8px 18px",background:"transparent",border:`1px solid ${C.gold}`,color:C.gold,borderRadius:5,cursor:"pointer",fontFamily:C.ff,fontSize:12}}>Entrar</button>
            </div>
            {pwErr && <div style={{fontSize:12,color:"#f87171",fontFamily:C.ff}}>Senha incorreta.</div>}
          </div>
        ) : (
          /* Admin content */
          <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
            {/* Emp tabs */}
            <div style={{display:"flex",gap:0,padding:"12px 22px 0",borderBottom:`1px solid #1e2130`,flexShrink:0}}>
              {Object.values(data).map(e => (
                <button key={e.id} onClick={()=>setTab(e.id)} style={{padding:"8px 18px",background:"transparent",border:"none",borderBottom:tab===e.id?`2px solid ${C.gold}`:"2px solid transparent",color:tab===e.id?C.gold:C.muted,fontFamily:C.ff,fontSize:12,cursor:"pointer",marginBottom:-1}}>
                  {e.nome}
                </button>
              ))}
              <div style={{flex:1}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,paddingBottom:8}}>
                <span style={{fontSize:11,color:C.muted,fontFamily:C.ff}}>Prazo máx. parcelamento:</span>
                <input type="number" min="1" max={data[tab].mesesObra} value={data[tab].maxParcel}
                  onChange={e=>setMaxP(tab,e.target.value)}
                  style={{...inp,width:56,textAlign:"center",padding:"5px 8px"}}
                  onFocus={e=>e.target.style.borderColor=C.gold}
                  onBlur={e=>e.target.style.borderColor=C.b}
                />
                <span style={{fontSize:11,color:C.dim,fontFamily:C.ff}}>meses</span>
              </div>
            </div>

            {/* Filter */}
            <div style={{padding:"10px 22px",borderBottom:`1px solid #1e2130`,flexShrink:0}}>
              <input value={filtro} onChange={e=>setFiltro(e.target.value)} placeholder="Filtrar unidades…"
                style={{...inp,maxWidth:260,padding:"6px 10px",fontSize:12}}
                onFocus={e=>e.target.style.borderColor=C.gold}
                onBlur={e=>e.target.style.borderColor=C.b}
              />
            </div>

            {/* Units table */}
            <div style={{flex:1,overflowY:"auto",padding:"0 22px"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.ff,fontSize:12}}>
                <thead style={{position:"sticky",top:0,background:"#0a0c16",zIndex:1}}>
                  <tr style={{color:C.dim,textTransform:"uppercase",letterSpacing:1,fontSize:10}}>
                    {["Unidade","Andar","Tipo","Área","Valor (R$)","Situação"].map(h=>(
                      <th key={h} style={{padding:"9px 10px",textAlign:"left",borderBottom:`1px solid ${C.b}`}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data[tab].uns
                    .filter(u=>!filtro||u.id.toLowerCase().includes(filtro.toLowerCase())||u.tp.toLowerCase().includes(filtro.toLowerCase()))
                    .map(u => (
                    <tr key={u.id} style={{borderBottom:`1px solid #0e1018`}}>
                      <td style={{padding:"7px 10px",color:C.gold,fontWeight:"bold"}}>{u.id}</td>
                      <td style={{padding:"7px 10px",color:C.muted}}>{u.an>0?`${u.an}º`:"Sub."}</td>
                      <td style={{padding:"7px 10px",color:"#b0a898"}}>{u.tp}</td>
                      <td style={{padding:"7px 10px",color:C.muted}}>{u.ar}m²</td>
                      <td style={{padding:"7px 10px"}}>
                        <input type="number" value={u.vl||""} onChange={e=>setUnVl(tab,u.id,e.target.value)}
                          placeholder="—"
                          style={{...inp,width:140,padding:"5px 8px",fontSize:12,textAlign:"right"}}
                          onFocus={e=>e.target.style.borderColor=C.gold}
                          onBlur={e=>e.target.style.borderColor=C.b}
                        />
                      </td>
                      <td style={{padding:"7px 10px"}}>
                        <div style={{display:"flex",gap:4}}>
                          {stOpts.map(o=>(
                            <button key={o.v} onClick={()=>setUnSt(tab,u.id,o.v)} style={{
                              padding:"4px 10px",borderRadius:5,border:`1px solid ${u.st===o.v?o.c+"80":"#1e2130"}`,
                              background:u.st===o.v?o.c+"18":"transparent",color:u.st===o.v?o.c:C.dim,
                              fontFamily:C.ff,fontSize:10,cursor:"pointer",transition:"all 0.15s",
                            }}>{o.l}</button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{padding:"14px 22px",borderTop:`1px solid #1e2130`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
              <span style={{fontSize:11,color:C.muted,fontFamily:C.ff}}>Alterações salvas localmente no navegador</span>
              <div style={{display:"flex",gap:10}}>
                {saved && <span style={{fontSize:12,color:"#4ade80",fontFamily:C.ff,alignSelf:"center"}}>✓ Salvo</span>}
                <Ghost onClick={onClose}>Fechar</Ghost>
                <Btn onClick={handleSave}>Salvar alterações</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CIVIL = ["Solteiro(a)","Casado(a)","Divorciado(a)","Viúvo(a)","União Estável"];

function BuyerFormModal({ onConfirm, onClose }) {
  const [b, setB] = useState({
    nome:"", cpf:"", rg:"", estadoCivil:"Solteiro(a)", nacionalidade:"Brasileiro(a)",
    profissao:"", email:"", telefone:"", conjuge:"", cpfConjuge:"",
  });
  const [errors, setErrors] = useState({});

  const set = (k,v) => { setB(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:""})); };

  const fmtCPF = v => v.replace(/\D/g,"").slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})\.(\d{3})(\d)/,"$1.$2.$3").replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,"$1.$2.$3-$4");
  const fmtTel = v => { const d=v.replace(/\D/g,"").slice(0,11); if(d.length<=2)return d; if(d.length<=6)return`(${d.slice(0,2)}) ${d.slice(2)}`; if(d.length<=10)return`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`; return`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`; };

  const validate = () => {
    const e={};
    if (!b.nome.trim()) e.nome="Nome obrigatório";
    if (!b.cpf.trim()||b.cpf.replace(/\D/g,"").length!==11) e.cpf="CPF inválido";
    if (!b.email.trim()||!b.email.includes("@")) e.email="E-mail inválido";
    if (!b.telefone.trim()) e.telefone="Telefone obrigatório";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleOk = () => { if (validate()) onConfirm(b); };

  const overlay = {position:"fixed",inset:0,background:"rgba(0,0,0,0.78)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20};
  const modal   = {background:"#0c0f18",border:`1px solid #2a2d3e`,borderRadius:12,width:"100%",maxWidth:620,maxHeight:"92vh",overflow:"hidden",display:"flex",flexDirection:"column"};
  const field   = (label,key,opts={}) => (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:4}}>
        {label}{opts.req&&<span style={{color:"#f87171",marginLeft:3}}>*</span>}
      </div>
      {opts.select ? (
        <select value={b[key]} onChange={e=>set(key,e.target.value)}
          style={{...inp,appearance:"none",cursor:"pointer"}}>
          {CIVIL.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={opts.type||"text"} value={b[key]}
          placeholder={opts.placeholder||""}
          onChange={e=>{
            let v=e.target.value;
            if(key==="cpf"||key==="cpfConjuge") v=fmtCPF(v);
            if(key==="telefone") v=fmtTel(v);
            set(key,v);
          }}
          style={{...inp,borderColor:errors[key]?"#f87171":C.b}}
          onFocus={e=>e.target.style.borderColor=errors[key]?"#f87171":C.gold}
          onBlur={e=>e.target.style.borderColor=errors[key]?"#f87171":C.b}
        />
      )}
      {errors[key]&&<div style={{fontSize:11,color:"#f87171",fontFamily:C.ff,marginTop:3}}>{errors[key]}</div>}
    </div>
  );

  const isConjuge = b.estadoCivil==="Casado(a)" || b.estadoCivil==="União Estável";

  return (
    <div style={overlay} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={modal}>
        <div style={{padding:"16px 22px",borderBottom:`1px solid #1e2130`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <span style={{fontSize:12,letterSpacing:3,textTransform:"uppercase",color:C.gold,fontFamily:C.ff}}>Dados do Interessado</span>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:C.muted,fontSize:18,cursor:"pointer",lineHeight:1}}>✕</button>
        </div>
        <div style={{padding:"6px 22px 4px",background:"rgba(196,169,125,0.05)",borderBottom:`1px solid #1e2130`,flexShrink:0}}>
          <p style={{fontSize:12,color:C.muted,fontFamily:C.ff,padding:"8px 0"}}>Preencha os dados do proponente. Estas informações serão impressas no Termo de Proposta Comercial.</p>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>
          <div style={{fontSize:11,letterSpacing:2,color:C.gold,textTransform:"uppercase",fontFamily:C.ff,marginBottom:14}}>Identificação</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
            <div style={{gridColumn:"1/-1"}}>{field("Nome completo",          "nome",      {req:true})}</div>
            {field("CPF",                    "cpf",       {req:true,placeholder:"___.___.___-__"})}
            {field("RG",                     "rg",        {placeholder:"__.___.___-_"})}
            {field("Estado civil",           "estadoCivil",{select:true})}
            {field("Nacionalidade",          "nacionalidade",{placeholder:"Brasileiro(a)"})}
            {field("Profissão",              "profissao")}
          </div>

          <div style={{fontSize:11,letterSpacing:2,color:C.gold,textTransform:"uppercase",fontFamily:C.ff,margin:"6px 0 14px"}}>Contato</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
            {field("E-mail",   "email",    {req:true,type:"email",placeholder:"email@exemplo.com"})}
            {field("Telefone", "telefone", {req:true,placeholder:"(XX) XXXXX-XXXX"})}
          </div>

          {isConjuge && <>
            <div style={{fontSize:11,letterSpacing:2,color:C.gold,textTransform:"uppercase",fontFamily:C.ff,margin:"6px 0 14px"}}>Cônjuge / Coobrigado(a)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
              <div style={{gridColumn:"1/-1"}}>{field("Nome completo do cônjuge","conjuge",{placeholder:"Opcional"})}</div>
              {field("CPF do cônjuge","cpfConjuge",{placeholder:"___.___.___-__"})}
            </div>
          </>}
        </div>
        <div style={{padding:"14px 22px",borderTop:`1px solid #1e2130`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <span style={{fontSize:11,color:C.dim,fontFamily:C.ff}}>* Campos obrigatórios</span>
          <div style={{display:"flex",gap:10}}>
            <Ghost onClick={onClose}>Cancelar</Ghost>
            <Btn onClick={handleOk}>Gerar Documento ⬇</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}


function StepEmp({ emps, empId, setEmpId, onNext }) {
  return (
    <div>
      <Lbl>Passo 1</Lbl>
      <H2>Empreendimento</H2>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
        {Object.values(emps).map(e=>{
          const disp=e.uns.filter(u=>u.st==="D").length, sel=empId===e.id;
          return (
            <div key={e.id} onClick={()=>setEmpId(e.id)} style={{padding:"18px 20px",borderRadius:8,cursor:"pointer",border:`1px solid ${sel?C.gold:C.b}`,background:sel?"rgba(196,169,125,0.06)":C.card,transition:"all 0.18s"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:15,height:15,borderRadius:"50%",flexShrink:0,border:sel?"5px solid #c4a97d":"2px solid #3a3d50",transition:"all 0.15s"}}/>
                  <span style={{fontSize:15,color:sel?C.text:"#b0a898"}}>{e.nome}</span>
                </div>
                <span style={{fontSize:10,padding:"2px 9px",borderRadius:10,background:sel?"rgba(196,169,125,0.12)":"#111520",color:sel?C.gold:C.muted,fontFamily:C.ff}}>{e.tag}</span>
              </div>
              <div style={{paddingLeft:26,fontFamily:C.ff,fontSize:12,color:C.muted}}>{e.end}</div>
              <div style={{paddingLeft:26,marginTop:6,display:"flex",gap:18,flexWrap:"wrap"}}>
                {[["Entrega",e.entrega],["Obra",`${e.mesesObra} meses`],["Disponíveis",`${disp} / ${e.uns.length}`,"#4ade80"]].map(([l,v,c])=>(
                  <span key={l} style={{fontFamily:C.ff,fontSize:12}}>
                    <span style={{color:"#5a5060"}}>{l}: </span>
                    <span style={{color:c||"#c8c0b0"}}>{v}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Btn disabled={!empId} onClick={()=>empId&&onNext()}>Próximo →</Btn>
    </div>
  );
}


function StepUnidade({ emp, selectedIds, setSelectedIds, onNext, onBack }) {
  const [filtro,   setFiltro]   = useState("");
  const [showSold, setShowSold] = useState(true);
  const stL={D:"Disponível",V:"Vendido",R:"Reservado"}, stC={D:"#4ade80",V:"#f87171",R:"#fbbf24"}, stB={D:"#0e2018",V:"#200e0e",R:"#1e1800"};

  const uns = emp.uns.filter(u=>{
    if (!showSold&&u.st!=="D") return false;
    const s=filtro.toLowerCase();
    return u.id.toLowerCase().includes(s)||u.tp.toLowerCase().includes(s);
  });

  const toggle = id => {
    const u=emp.uns.find(x=>x.id===id);
    if (!u||u.st!=="D") return;
    setSelectedIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  };

  const selUnits=emp.uns.filter(u=>selectedIds.includes(u.id));
  const totalVl=selUnits.reduce((s,u)=>s+(u.vl||0),0);
  const totalAr=selUnits.reduce((s,u)=>s+u.ar,0);
  const hasValue=selUnits.length>0&&selUnits.every(u=>u.vl);

  return (
    <div>
      <Lbl>Passo 2</Lbl>
      <H2>Selecione as Unidades — {emp.nome}</H2>
      <p style={{fontSize:13,color:C.muted,fontFamily:C.ff,margin:"-12px 0 16px"}}>Selecione uma ou mais unidades (ex: apartamento + vaga).</p>

      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <input value={filtro} onChange={e=>setFiltro(e.target.value)} placeholder="Buscar por unidade ou tipo…"
          style={{...inp,flex:"1 1 180px",minWidth:0}}
          onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.b}/>
        <button onClick={()=>setShowSold(!showSold)} style={{background:showSold?"rgba(74,222,128,0.07)":C.card,border:`1px solid ${showSold?"#4ade8035":C.b}`,color:showSold?"#4ade80":C.muted,borderRadius:5,padding:"8px 14px",cursor:"pointer",fontFamily:C.ff,fontSize:12,whiteSpace:"nowrap"}}>
          {showSold?"Ocultar vendidas":"Mostrar vendidas"}
        </button>
        {selectedIds.length>0&&<button onClick={()=>setSelectedIds([])} style={{background:"rgba(248,113,113,0.07)",border:"1px solid #f8717130",color:"#f87171",borderRadius:5,padding:"8px 14px",cursor:"pointer",fontFamily:C.ff,fontSize:12}}>Limpar seleção</button>}
      </div>

      <div style={{border:`1px solid ${C.b}`,borderRadius:8,overflow:"hidden",marginBottom:14}}>
        <div style={{maxHeight:380,overflowY:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.ff,fontSize:12}}>
            <thead style={{position:"sticky",top:0,background:"#0a0c16",zIndex:1}}>
              <tr style={{color:C.dim,textTransform:"uppercase",letterSpacing:1,fontSize:10}}>
                <th style={{padding:"9px 12px",borderBottom:`1px solid ${C.b}`,width:32}}></th>
                {["Unid.","Andar","Tipo","Área","Q/V","Situação","Valor"].map((h,i)=>(
                  <th key={h} style={{padding:"9px 12px",textAlign:i>=4?"center":"left",borderBottom:`1px solid ${C.b}`,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uns.map(u=>{
                const isSel=selectedIds.includes(u.id), isDisp=u.st==="D";
                return (
                  <tr key={u.id} onClick={()=>toggle(u.id)} style={{cursor:isDisp?"pointer":"default",background:isSel?"rgba(196,169,125,0.09)":"transparent",borderLeft:isSel?`2px solid ${C.gold}`:"2px solid transparent",opacity:u.st==="V"?0.42:1,transition:"all 0.12s"}}>
                    <td style={{padding:"9px 12px",textAlign:"center"}}>
                      {isDisp&&<div style={{width:15,height:15,borderRadius:3,margin:"auto",border:isSel?"none":"2px solid #3a3d50",background:isSel?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {isSel&&<span style={{fontSize:10,color:"#0c0f18",lineHeight:1}}>✓</span>}
                      </div>}
                    </td>
                    <td style={{padding:"9px 12px",color:isSel?C.gold:"#c8c0b0",fontWeight:isSel?"bold":"normal"}}>{u.id}</td>
                    <td style={{padding:"9px 12px",color:C.muted}}>{u.an>0?`${u.an}º`:"Sub."}</td>
                    <td style={{padding:"9px 12px",color:"#b0a898"}}>{u.tp}</td>
                    <td style={{padding:"9px 12px",color:C.muted}}>{u.ar}m²</td>
                    <td style={{padding:"9px 12px",textAlign:"center",color:C.muted}}>{u.q>0?`${u.q}q`:"—"}{u.vg>0?` ${u.vg}v`:""}</td>
                    <td style={{padding:"9px 12px",textAlign:"center"}}><span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:stB[u.st],color:stC[u.st]}}>{stL[u.st]}</span></td>
                    <td style={{padding:"9px 12px",textAlign:"right",color:isSel?C.gold:C.text}}>{u.vl?BRL(u.vl):"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selUnits.length>0&&(
        <div style={{padding:"14px 18px",background:"rgba(196,169,125,0.06)",border:`1px solid ${C.gold}30`,borderRadius:8,marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:8,letterSpacing:1,textTransform:"uppercase"}}>{selUnits.length} {selUnits.length===1?"unidade":"unidades"} selecionada{selUnits.length>1?"s":""}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {selUnits.map(u=>(
                  <span key={u.id} onClick={()=>toggle(u.id)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",background:"rgba(196,169,125,0.1)",border:`1px solid ${C.gold}40`,borderRadius:20,fontFamily:C.ff,fontSize:12,color:C.gold,cursor:"pointer"}}>
                    {u.id} · {u.tp}{u.vl?<span style={{color:C.muted}}>· {BRL(u.vl)}</span>:null}
                    <span style={{color:"#f87171",fontSize:10,marginLeft:2}}>✕</span>
                  </span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:3}}>Área total: <span style={{color:"#c8c0b0"}}>{totalAr.toFixed(2)}m²</span></div>
              {hasValue&&<><div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:2}}>Valor total</div><div style={{fontSize:20,color:C.gold,fontFamily:"Georgia,serif"}}>{BRL(totalVl)}</div></>}
              {!hasValue&&selUnits.some(u=>!u.vl)&&<div style={{fontSize:11,color:"#fbbf24",fontFamily:C.ff}}>Unidade(s) sem valor cadastrado</div>}
            </div>
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:10}}>
        <Ghost onClick={onBack}>← Voltar</Ghost>
        <Btn disabled={selUnits.length===0||!hasValue} onClick={()=>selUnits.length>0&&hasValue&&onNext()}>Simular →</Btn>
      </div>
    </div>
  );
}


const FIELD_KEYS = ["sinal","financ","parcel","baloes","permuta"];
const FIELD_META = [
  {key:"sinal",  label:"Sinal de negócio", hint:"Pago no ato da assinatura"},
  {key:"financ", label:"Financiamento",    hint:"CEF / bancário — nas chaves"},
  {key:"parcel", label:"Parcelamento",     hint:"Parcelas mensais durante a obra", extra:"parcel"},
  {key:"baloes", label:"Balões",           hint:"Parcelas fixas agendadas",        extra:"baloes"},
  {key:"permuta",label:"Permuta",          hint:"Imóvel ou veículo (deságio 10%)"},
];

function StepSimulador({ emp, selUnits, onBack }) {
  const vlTabela = selUnits.reduce((s,u)=>s+(u.vl||0),0);
  const totalAr  = selUnits.reduce((s,u)=>s+u.ar,0);

  const [mode,   setMode]        = useState("pct");
  const [descOn, setDescOn]      = useState(false);
  const [comp,   setComp]        = useState({sinal:"10",financ:"70",parcel:"0",baloes:"0",permuta:"0",numBaloes:3,mesesParcel:null});
  const [buyerFormOpen, setBuyerFormOpen] = useState(false);

  const pv = k => parseFloat(comp[k])||0;
  const ps=pv("sinal"), pf=pv("financ"), pp=pv("parcel"), pb=pv("baloes"), pm=pv("permuta");
  const totalPct = ps+pf+pp+pb+pm;
  const isValid  = Math.abs(totalPct-100)<0.05;

  const desc  = useMemo(()=>calcDesconto(ps,pf,pp,pb,pm),[ps,pf,pp,pb,pm]);
  const vlLiq = descOn&&isValid ? vlTabela*(1-desc.total/100) : vlTabela;

  const maxP  = emp.maxParcel || emp.mesesObra;
  const mesesParcelEff = Math.min(comp.mesesParcel||emp.mesesObra, maxP);

  const fluxo = useMemo(()=>{
    if (!isValid||(descOn&&desc.isBlocked)) return [];
    return gerarFluxo({sinalP:ps,financP:pf,parcelP:pp,baloesP:pb,permutaP:pm,numBaloes:comp.numBaloes,mesesParcel:mesesParcelEff,mesesObra:emp.mesesObra,vlLiq});
  },[isValid,descOn,desc.isBlocked,ps,pf,pp,pb,pm,comp.numBaloes,mesesParcelEff,emp.mesesObra,vlLiq]);

  const setField = (k,v) => setComp(p=>({...p,[k]:v}));

  const redistribute = key => {
    const diff   = 100-totalPct;
    const newVal = Math.max(0, parseFloat((pv(key)+diff).toFixed(2)));
    setField(key, String(newVal));
  };

  const diff     = totalPct-100;
  const barColor = Math.abs(diff)<0.05?"#4ade80":diff>0?"#f87171":"#fbbf24";
  const brlVal   = pct => vlTabela*(parseFloat(pct||0)/100);

  const handlePDF = () => { if (!isValid) return; setBuyerFormOpen(true); };
  const handleBuyerConfirm = (buyer) => {
    setBuyerFormOpen(false);
    gerarPDF({emp, selUnits, comp:{...comp,mesesParcel:mesesParcelEff}, desc, descOn, fluxo, vlTabela, vlLiq, buyer});
  };

  return (
    <div>
      {/* Unit header */}
      <div style={{padding:"14px 20px",background:C.card,border:`1px solid ${C.b}`,borderRadius:8,marginBottom:20}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:3,letterSpacing:1}}>{emp.nome} · {emp.ind}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
              {selUnits.map(u=>(
                <span key={u.id} style={{fontSize:13,color:C.text}}>
                  Apt. <span style={{color:C.gold}}>{u.id}</span>
                  <span style={{color:C.muted,fontSize:12}}> · {u.tp} · {u.ar}m²</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:C.muted,fontFamily:C.ff,marginBottom:2}}>{selUnits.length>1?"Valor total":"Valor de tabela"}</div>
            <div style={{fontSize:18,color:C.gold,fontFamily:"Georgia,serif"}}>{BRL(vlTabela)}</div>
          </div>
        </div>
      </div>

      {/* Two-column */}
      <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start",marginBottom:18}}>

        {/* LEFT: Composition */}
        <div style={{flex:"1 1 320px",minWidth:0}}>
          <Card title="Composição do Pagamento" action={
            <div style={{display:"flex",gap:0,borderRadius:5,overflow:"hidden",border:`1px solid ${C.b}`}}>
              {["pct","brl"].map(m=>(
                <button key={m} onClick={()=>setMode(m)} style={{padding:"5px 12px",fontFamily:C.ff,fontSize:11,cursor:"pointer",background:mode===m?"rgba(196,169,125,0.15)":"transparent",color:mode===m?C.gold:C.muted,border:"none"}}>{m==="pct"?"%":"R$"}</button>
              ))}
            </div>
          }>
            {FIELD_META.map(f=>(
              <div key={f.key} style={{borderBottom:`1px solid #12141e`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0"}}>
                  <div style={{flex:"0 0 126px"}}>
                    <div style={{fontSize:13,color:"#c8c0b0",fontFamily:C.ff}}>{f.label}</div>
                    <div style={{fontSize:10,color:C.dim,fontFamily:C.ff,marginTop:1}}>{f.hint}</div>
                  </div>

                  {mode==="pct"?(
                    <div style={{display:"flex",alignItems:"center",gap:6,flex:1}}>
                      <div style={{position:"relative",flex:1}}>
                        <input type="number" min="0" max="100" step="0.5" value={comp[f.key]} onChange={e=>setField(f.key,e.target.value)}
                          style={{...inp,paddingRight:26,textAlign:"right"}}
                          onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.b}/>
                        <span style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",color:C.muted,fontFamily:C.ff,fontSize:12,pointerEvents:"none"}}>%</span>
                      </div>
                      <div style={{fontSize:11,color:C.dim,fontFamily:C.ff,minWidth:88,textAlign:"right"}}>{BRL(brlVal(comp[f.key]))}</div>
                    </div>
                  ):(
                    <div style={{display:"flex",alignItems:"center",gap:6,flex:1}}>
                      <input type="text"
                        value={brlVal(comp[f.key]).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}
                        onChange={e=>{const raw=e.target.value.replace(/[^\d,]/g,"").replace(",",".");const n=parseFloat(raw)||0;setField(f.key,String((n/vlTabela*100).toFixed(4)));}}
                        style={{...inp,textAlign:"right",flex:1}}
                        onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.b}/>
                      <div style={{fontSize:11,color:C.dim,fontFamily:C.ff,minWidth:38,textAlign:"right"}}>{parseFloat(comp[f.key]||0).toFixed(1)}%</div>
                    </div>
                  )}

                  {f.extra==="parcel"&&(
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <input type="number" min="1" max={maxP} value={mesesParcelEff}
                        onChange={e=>setField("mesesParcel",Math.min(parseInt(e.target.value)||1,maxP))}
                        style={{...inp,width:50,textAlign:"center",padding:"8px 5px"}}
                        onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.b}/>
                      <span style={{fontSize:10,color:C.dim,fontFamily:C.ff,whiteSpace:"nowrap"}}>x meses</span>
                    </div>
                  )}
                  {f.extra==="baloes"&&(
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      <input type="number" min="1" max="24" value={comp.numBaloes}
                        onChange={e=>setField("numBaloes",parseInt(e.target.value)||1)}
                        style={{...inp,width:50,textAlign:"center",padding:"8px 5px"}}
                        onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.b}/>
                      <span style={{fontSize:10,color:C.dim,fontFamily:C.ff,whiteSpace:"nowrap"}}>balões</span>
                    </div>
                  )}

                  {/* ⟳ Absorb diff into this field */}
                  <button onClick={()=>redistribute(f.key)}
                    title={`Receber diferença: ${(100-totalPct)>=0?"+":""}${(100-totalPct).toFixed(2)}% neste campo`}
                    style={{flexShrink:0,width:28,height:28,borderRadius:5,border:`1px solid ${Math.abs(diff)<0.05?C.b:"#fbbf2440"}`,background:Math.abs(diff)<0.05?"transparent":"rgba(251,191,36,0.07)",color:Math.abs(diff)<0.05?C.dim:"#fbbf24",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all 0.18s"}}>
                    ⟳
                  </button>
                </div>
              </div>
            ))}

            {/* Total bar */}
            <div style={{marginTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:12,color:C.muted,fontFamily:C.ff}}>Total</span>
                <span style={{fontSize:13,fontWeight:"bold",color:barColor,fontFamily:C.ff}}>
                  {totalPct.toFixed(2)}%{isValid?" ✓":diff>0?` (+${diff.toFixed(2)}%)`:`  (faltam ${Math.abs(diff).toFixed(2)}%)`}
                </span>
              </div>
              <div style={{height:5,background:"#1a1d2a",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min(totalPct,100)}%`,background:barColor,borderRadius:3,transition:"all 0.25s"}}/>
              </div>
              {!isValid&&<div style={{marginTop:7,fontSize:11,color:"#fbbf24",fontFamily:C.ff}}>
                Clique em ⟳ no campo desejado para receber os {Math.abs(diff).toFixed(2)}% {diff<0?"faltantes":"excedentes"}.
              </div>}
            </div>
          </Card>
        </div>

        {/* RIGHT: Discount */}
        <div style={{flex:"1 1 280px",minWidth:0}}>
          <Card title="Desconto" action={<Toggle on={descOn} onChange={setDescOn} label="Desconto ativo" labelOff="Desconto desativado"/>}>
            {[
              {label:"Modalidade",disc:desc.modalidade.disc,info:desc.modalidade.label},
              {label:"Sinal",     disc:desc.sinalRow.disc,  info:desc.sinalRow.label},
              {label:"Permuta",   disc:desc.permutaRow.disc,info:desc.permutaRow.label},
            ].map((row,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"9px 0",borderBottom:`1px solid #12141e`,opacity:descOn?1:0.4,transition:"opacity 0.25s"}}>
                <div>
                  <div style={{fontSize:12,color:C.muted,fontFamily:C.ff,marginBottom:1}}>{row.label}</div>
                  <div style={{fontSize:11,color:C.dim,fontFamily:C.ff}}>{row.info}</div>
                </div>
                <div style={{fontSize:14,fontWeight:"bold",color:row.disc>0?C.gold:C.dim,fontFamily:C.ff}}>{row.disc===null?"—":row.disc>0?`+${row.disc}%`:"0%"}</div>
              </div>
            ))}
            {desc.isCapped&&descOn&&<div style={{margin:"8px 0",padding:"8px 12px",background:"#200e0e",borderRadius:5,fontSize:11,color:"#f87171",fontFamily:C.ff}}>⚠ Parcelamento fora das condições — desconto limitado a 2%.</div>}
            {desc.isBlocked&&descOn&&<div style={{margin:"8px 0",padding:"8px 12px",background:"#200e0e",borderRadius:5,fontSize:11,color:"#f87171",fontFamily:C.ff}}>✕ Permuta acima de 50% não aceita.</div>}
            <div style={{margin:"12px 0 0",padding:"12px 0 0",borderTop:`1px solid ${C.b}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:C.muted,fontFamily:C.ff}}>Desconto total</span>
              <span style={{fontSize:30,fontWeight:"bold",color:descOn&&isValid?C.gold:C.dim,fontFamily:"Georgia,serif",letterSpacing:-1}}>{descOn?`${desc.total}%`:"—"}</span>
            </div>
            {descOn&&isValid&&!desc.isBlocked&&(
              <div style={{marginTop:4}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"3px 10px",borderRadius:12,background:`${desc.approvalLevel.color}14`,border:`1px solid ${desc.approvalLevel.color}30`,marginBottom:12}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:desc.approvalLevel.color}}/>
                  <span style={{fontSize:10,color:desc.approvalLevel.color,fontFamily:C.ff}}>{desc.approvalLevel.label}</span>
                </div>
                {[
                  {l:"Valor de tabela",         v:BRL(vlTabela),                          c:C.muted},
                  {l:`Desconto (${desc.total}%)`,v:`– ${BRL(vlTabela*desc.total/100)}`,   c:"#f87171"},
                  {l:"Valor negociado",          v:BRL(vlLiq),                            c:C.gold},
                  {l:"Valor por m²",             v:`${BRL(vlLiq/totalAr)}/m²`,            c:C.dim},
                ].map((it,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontFamily:C.ff,fontSize:12,borderBottom:i<3?`1px solid #12141e`:"none"}}>
                    <span style={{color:C.muted}}>{it.l}</span>
                    <span style={{color:it.c,fontWeight:i===2?"bold":"normal"}}>{it.v}</span>
                  </div>
                ))}
              </div>
            )}
            {!descOn&&isValid&&(
              <div style={{marginTop:10}}>
                {[
                  {l:"Valor total",  v:BRL(vlLiq),           c:C.gold},
                  {l:"Valor por m²", v:`${BRL(vlLiq/totalAr)}/m²`, c:C.dim},
                ].map((it,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontFamily:C.ff,fontSize:12,borderBottom:i===0?`1px solid #12141e`:"none"}}>
                    <span style={{color:C.muted}}>{it.l}</span>
                    <span style={{color:it.c,fontWeight:i===0?"bold":"normal"}}>{it.v}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Ghost onClick={onBack} style={{marginTop:8}}>← Voltar</Ghost>
        </div>
      </div>

      {/* FLOW TABLE */}
      {isValid&&(!descOn||!desc.isBlocked)&&fluxo.length>0?(
        <Card title="Fluxo de Pagamento" subtitle={`${emp.mesesObra} meses · ${emp.ind}${descOn&&desc.total>0?` · desconto ${desc.total}% aplicado`:" · sem desconto"}`}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.ff,fontSize:12,minWidth:520}}>
              <thead>
                <tr style={{color:C.dim,textTransform:"uppercase",letterSpacing:1,fontSize:10}}>
                  {["Mês / Evento","Sinal","Permuta","Parcela","Balão","Financ.","Total","Acumulado"].map((h,i)=>(
                    <th key={h} style={{padding:"9px 12px",textAlign:i===0?"left":"right",borderBottom:`1px solid ${C.b}`,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(()=>{
                  let acum=0;
                  return fluxo.map((r,i)=>{
                    acum+=r.total;
                    const isAto=r.mes===0, isBal=r.balaoV>0, isEnt=r.mes===emp.mesesObra+1, hl=isAto||isEnt;
                    const Cell=({v,c})=><td style={{padding:"8px 12px",textAlign:"right",color:v>0?(c||C.text):"#282c3c"}}>{v>0?BRL(v):"—"}</td>;
                    return (
                      <tr key={i} style={{background:hl?"rgba(196,169,125,0.07)":isBal?"rgba(96,165,250,0.04)":i%2===0?"#0b0d17":"transparent",borderLeft:hl?`2px solid ${C.gold}55`:isBal?"2px solid #60a5fa55":"2px solid transparent"}}>
                        <td style={{padding:"8px 12px",color:hl?C.gold:isBal?"#60a5fa":"#c8c0b0",fontWeight:hl?"bold":"normal"}}>{r.label}{isBal&&!isEnt?" ★":""}</td>
                        <Cell v={r.sinalV}   c="#4ade80"/>
                        <Cell v={r.permutaV} c="#a78bfa"/>
                        <Cell v={r.parcelV}  c={C.text}/>
                        <Cell v={r.balaoV}   c="#60a5fa"/>
                        <Cell v={r.financV}  c="#38bdf8"/>
                        <td style={{padding:"8px 12px",textAlign:"right",color:hl?C.gold:C.text,fontWeight:hl?"bold":"normal"}}>{BRL(r.total)}</td>
                        <td style={{padding:"8px 12px",textAlign:"right",color:C.dim}}>{BRL(acum)}</td>
                      </tr>
                    );
                  });
                })()}
                <tr style={{background:"rgba(196,169,125,0.07)",borderTop:`1px solid ${C.b}`}}>
                  <td colSpan={6} style={{padding:"10px 12px",color:C.muted,fontSize:11}}>Total geral</td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:C.gold,fontWeight:"bold"}}>{BRL(fluxo.reduce((s,r)=>s+r.total,0))}</td>
                  <td style={{padding:"10px 12px",textAlign:"right",color:C.gold}}>{BRL(vlLiq)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              {[["#4ade80","Sinal"],["#a78bfa","Permuta"],[C.text,"Parcela mensal"],["#60a5fa","★ Balão"],["#38bdf8","Financiamento"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontFamily:C.ff,fontSize:11,color:C.muted}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:c}}/>
                  {l}
                </div>
              ))}
            </div>
            {/* PDF Button */}
            <button onClick={handlePDF} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 20px",background:"rgba(196,169,125,0.08)",border:`1px solid ${C.gold}50`,borderRadius:6,cursor:"pointer",color:C.gold,fontFamily:C.ff,fontSize:12,letterSpacing:1,transition:"all 0.18s"}}>
              <span style={{fontSize:14}}>⬇</span> Gerar Proposta PDF
            </button>
          </div>
        </Card>
      ):!isValid?(
        <div style={{padding:"18px 20px",background:C.card,border:`1px solid ${C.b}`,borderRadius:8,textAlign:"center",fontFamily:C.ff,fontSize:13,color:C.dim}}>
          Preencha os campos totalizando 100% para ver o fluxo de pagamento.
        </div>
      ):null}

      {buyerFormOpen && <BuyerFormModal onConfirm={handleBuyerConfirm} onClose={()=>setBuyerFormOpen(false)}/>}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [step,        setStep]        = useState(0);
  const [empId,       setEmpId]       = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [adminOpen,   setAdminOpen]   = useState(false);

  // Load persisted data from localStorage, fallback to defaults
  const [emps, setEmps] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_EMPS;
  });

  const saveEmps = useCallback(newEmps => {
    setEmps(newEmps);
    try { localStorage.setItem(LS_KEY, JSON.stringify(newEmps)); } catch {}
  }, []);

  const emp      = empId ? emps[empId] : null;
  const selUnits = emp   ? emp.uns.filter(u=>selectedIds.includes(u.id)) : [];

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"Georgia,serif",color:C.text,padding:"36px 20px"}}>
      <div style={{maxWidth:920,margin:"0 auto"}}>

        {/* Header */}
        <div style={{borderBottom:`1px solid ${C.b2}`,paddingBottom:20,marginBottom:28,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,letterSpacing:4,color:C.muted,textTransform:"uppercase",marginBottom:6,fontFamily:C.ff}}>N8 Incorporadora</div>
            <h1 style={{margin:0,fontSize:24,fontWeight:"normal",color:C.text}}>Simulador de Propostas</h1>
            <p style={{margin:"7px 0 0",fontSize:13,color:C.muted,fontFamily:C.ff}}>Composição livre · desconto automático · fluxo de pagamento</p>
          </div>
          {/* Discreet admin button */}
          <button onClick={()=>setAdminOpen(true)} style={{background:"transparent",border:`1px solid ${C.b}`,color:C.dim,padding:"7px 14px",borderRadius:5,cursor:"pointer",fontFamily:C.ff,fontSize:11,letterSpacing:1,display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:12}}>⚙</span> Admin
          </button>
        </div>

        <StepNav step={step} setStep={setStep} maxStep={step}/>

        {step===0&&<StepEmp emps={emps} empId={empId} setEmpId={setEmpId} onNext={()=>{setSelectedIds([]);setStep(1);}}/>}
        {step===1&&emp&&<StepUnidade emp={emp} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onNext={()=>setStep(2)} onBack={()=>setStep(0)}/>}
        {step===2&&emp&&selUnits.length>0&&<StepSimulador emp={emp} selUnits={selUnits} onBack={()=>setStep(1)}/>}

        {adminOpen&&<AdminModal emps={emps} onSave={newEmps=>{saveEmps(newEmps);}} onClose={()=>setAdminOpen(false)}/>}
      </div>
    </div>
  );
}
