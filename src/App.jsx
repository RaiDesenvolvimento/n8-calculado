import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import ColorCalibrator from "./ColorCalibrator";

const CONDITIONS = {
  modalidade: {
    label: "1. Modalidade de Pagamento",
    options: [
      { id: "avista", label: "À Vista — Quitação integral no ato", discount: 25, tag: "Teto Autônomo" },
      { id: "caixa_50", label: "Financiamento Caixa ≥ 50% do valor do imóvel", discount: 8, tag: "Cenário Ideal" },
      { id: "caixa_30", label: "Financiamento Caixa entre 30% e 49%", discount: 5 },
      { id: "caixa_abaixo", label: "Financiamento Caixa abaixo de 30%", discount: 3 },
      { id: "parcela_ok", label: "Parcelamento c/ incorporadora — INCC + sinal ≥ 10%", discount: 4, tag: "Condições Ideais" },
      { id: "parcela_nok", label: "Parcelamento c/ incorporadora — fora das condições ideais", discount: 0, tag: "Limitado", warning: true },
    ],
  },
  sinal: {
    label: "2. Sinal de Negócio (% do valor do imóvel)",
    options: [
      { id: "sinal_20", label: "Sinal ≥ 20%", discount: 4, tag: "Melhor Cenário" },
      { id: "sinal_10", label: "Sinal entre 10% e 19%", discount: 2, tag: "Cenário Ideal" },
      { id: "sinal_baixo", label: "Sinal abaixo de 10%", discount: 0, warning: true },
    ],
  },
  permuta: {
    label: "3. Permuta (imóvel ou veículo)",
    subtitle: "Bens avaliados com 10% de deságio sobre o valor de mercado.",
    options: [
      { id: "sem_permuta", label: "Sem permuta", discount: 5, tag: "Cenário Ideal" },
      { id: "permuta_ok", label: "Permuta até 30% do valor do imóvel", discount: 3 },
      { id: "permuta_medio", label: "Permuta entre 31% e 50% do valor do imóvel", discount: 0, warning: true },
      { id: "permuta_nok", label: "Permuta acima de 50%", discount: null, tag: "Não Aceito", blocked: true },
    ],
  },
};

const APPROVAL = [
  { max: 5, label: "Aprovação do Vendedor", color: "#4ade80" },
  { max: 10, label: "Aprovação do Gerente Comercial", color: "#fbbf24" },
  { max: 99, label: "Aprovação da Diretoria", color: "#f87171" },
];

const tagColors = {
  "Teto Autônomo": { bg: "#1e3a5f", text: "#60a5fa" },
  "Cenário Ideal": { bg: "#1a3828", text: "#4ade80" },
  "Condições Ideais": { bg: "#1a3828", text: "#4ade80" },
  "Melhor Cenário": { bg: "#1a3828", text: "#4ade80" },
  Limitado: { bg: "#3b1f1f", text: "#f87171" },
  "Não Aceito": { bg: "#3b1f1f", text: "#f87171" },
};

export default function DescontoCalculator() {
  const [selected, setSelected] = useState({ modalidade: null, sinal: null, permuta: null });
  const [dirApproval, setDirApproval] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [showCalibrator, setShowCalibrator] = useState(false);

  const sel = (block) => CONDITIONS[block].options.find((o) => o.id === selected[block]);

  const isAvista = selected.modalidade === "avista";
  const isParcelaNotOk = selected.modalidade === "parcela_nok";
  const isBlocked = selected.permuta === "permuta_nok";

  const getBlockDiscount = (block) => {
    if (!selected[block]) return null;
    const opt = sel(block);
    if (!opt || opt.blocked) return null;
    return opt.discount;
  };

  const modalidadeDisc = getBlockDiscount("modalidade") ?? 0;
  const sinalDisc = isAvista ? 0 : (getBlockDiscount("sinal") ?? 0);
  const permutaDisc = isAvista ? 0 : (getBlockDiscount("permuta") ?? 0);

  let total = 0;
  if (isBlocked) {
    total = 0;
  } else if (isAvista) {
    total = dirApproval ? 30 : 25;
  } else if (isParcelaNotOk) {
    total = Math.min(modalidadeDisc + sinalDisc + permutaDisc, 2);
  } else {
    total = modalidadeDisc + sinalDisc + permutaDisc;
  }

  const approvalLevel = APPROVAL.find((a) => total <= a.max) || APPROVAL[APPROVAL.length - 1];

  const allSelected = selected.modalidade && selected.sinal && selected.permuta;

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [total]);

  const handleSelect = (block, id) => {
    const opt = CONDITIONS[block].options.find((o) => o.id === id);
    if (opt?.blocked) return;
    setSelected((prev) => ({ ...prev, [block]: id }));
  };

  const reset = () => {
    setSelected({ modalidade: null, sinal: null, permuta: null });
    setDirApproval(false);
  };

  const gerarPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 20;
    const margin = 20;
    const lineH = 7;

    const addTitle = (text, size = 14, bold = true) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(text, margin, y);
      y += lineH + 2;
    };

    const addLine = (text, indent = 0) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(text, margin + indent, y);
      y += lineH;
    };

    const addSub = (text) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setDrawColor(230, 230, 230);
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 2, pageW - 2 * margin, lineH + 4, "FD");
      doc.text(text, margin + 4, y + 4);
      y += lineH + 6;
    };

    // Cabeçalho
    doc.setFillColor(30, 58, 95);
    doc.rect(0, 0, pageW, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Programa de Descontos", margin, 12);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Calculadora de Condições de Venda — Relatório", margin, 20);
    doc.setTextColor(0, 0, 0);
    y = 36;

    addTitle("Resumo da Proposta", 12);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")}`, margin, y);
    y += lineH + 4;
    doc.setTextColor(0, 0, 0);

    // Condições selecionadas
    addTitle("Condições selecionadas", 11);

    const modalidadeOpt = sel("modalidade");
    if (modalidadeOpt) {
      addSub(`1. Modalidade: ${modalidadeOpt.label}`);
      addLine(`Desconto: ${modalidadeOpt.blocked ? "—" : modalidadeOpt.discount != null ? modalidadeOpt.discount + "%" : "—"}`, 4);
    }

    const sinalOpt = sel("sinal");
    if (sinalOpt && !isAvista) {
      addSub(`2. Sinal de Negócio: ${sinalOpt.label}`);
      addLine(`Desconto: ${sinalOpt.discount != null ? sinalOpt.discount + "%" : "—"}`, 4);
    } else if (isAvista) {
      addSub("2. Sinal de Negócio: Não aplicável (pagamento à vista)");
    }

    const permutaOpt = sel("permuta");
    if (permutaOpt && !isAvista) {
      addSub(`3. Permuta: ${permutaOpt.label}`);
      addLine(`Desconto: ${permutaOpt.blocked ? "Não aceito" : permutaOpt.discount != null ? permutaOpt.discount + "%" : "—"}`, 4);
    } else if (isAvista) {
      addSub("3. Permuta: Não aplicável (pagamento à vista)");
    }

    if (isAvista && dirApproval) {
      addSub("Aprovação da Diretoria: Sim — desconto pode chegar a 30%");
    }

    y += 4;
    addTitle("Composição do desconto", 11);

    const rows = [
      { label: "Modalidade de Pagamento", disc: isAvista ? total : modalidadeDisc },
      ...(isAvista ? [] : [{ label: "Sinal de Negócio", disc: sinalDisc }, { label: "Permuta", disc: permutaDisc }]),
    ];
    rows.forEach((r) => {
      addLine(`${r.label}: ${r.disc}%`, 4);
    });

    y += 6;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text("Desconto total aplicável:", margin, y);
    doc.text(isBlocked ? "—" : allSelected ? `${total}%` : "—", pageW - margin - 20, y, { align: "right" });
    y += lineH + 2;
    doc.setTextColor(0, 0, 0);

    if (allSelected && !isBlocked) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(approvalLevel.label, margin, y);
      y += lineH;
      doc.setTextColor(0, 0, 0);
    }

    if (isParcelaNotOk && allSelected) {
      y += 4;
      doc.setFontSize(9);
      doc.setTextColor(180, 28, 28);
      doc.text("Parcelamento fora das condições ideais — desconto total limitado a 2%.", margin, y);
      y += lineH;
      doc.setTextColor(0, 0, 0);
    }
    if (isBlocked) {
      y += 4;
      doc.setFontSize(9);
      doc.setTextColor(180, 28, 28);
      doc.text("Permuta acima de 50% não é aceita. Revise as condições.", margin, y);
      doc.setTextColor(0, 0, 0);
    }

    doc.save("condicoes-venda-desconto.pdf");
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "#f5f5f5",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#333",
      padding: "24px 2%",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    }}>
      {/* Card centralizado e ocupando quase toda a tela */}
      <div style={{
        width: "100%",
        maxWidth: 1400,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid #e5e5e5",
        padding: "32px 28px",
        boxSizing: "border-box",
      }}>
        <div style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 8 }}>
            Programa de Descontos
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#222", letterSpacing: 0 }}>
              Calculadora de Condições de Venda
            </h1>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={gerarPDF}
                style={{
                  background: "#2563eb",
                  border: "none",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Gerar PDF
              </button>
              <button
                onClick={() => setShowCalibrator(true)}
                style={{
                  background: "#f8f8f8",
                  border: "1px solid #ddd",
                  color: "#555",
                  padding: "8px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Calibrar Cores
              </button>
            </div>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "#666" }}>
            Selecione as condições da proposta para calcular o desconto total aplicável.
          </p>
        </div>

        {showCalibrator && (
          <ColorCalibrator onClose={() => setShowCalibrator(false)} />
        )}

        {/* Condition Blocks */}
        {Object.entries(CONDITIONS).map(([blockKey, block]) => {
          const isDisabled = isAvista && blockKey !== "modalidade";
          return (
            <div key={blockKey} style={{ marginBottom: 32, opacity: isDisabled ? 0.35 : 1, transition: "opacity 0.3s" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: block.subtitle ? 4 : 14 }}>
                <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: "#555" }}>
                  {block.label}
                </h2>
              </div>
              {block.subtitle && (
                <p style={{ margin: "0 0 14px", fontSize: 13, color: "#666" }}>
                  {block.subtitle}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {block.options.map((opt) => {
                  const isSelected = selected[blockKey] === opt.id;
                  const isBlockedOpt = opt.blocked;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => !isDisabled && !isBlockedOpt && handleSelect(blockKey, opt.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: 8,
                        border: isSelected
                          ? "1px solid #2563eb"
                          : isBlockedOpt
                          ? "1px solid #e5e5e5"
                          : "1px solid #e5e5e5",
                        background: isSelected
                          ? "#eff6ff"
                          : isBlockedOpt
                          ? "#fafafa"
                          : "#fafafa",
                        cursor: isDisabled || isBlockedOpt ? "default" : "pointer",
                        transition: "all 0.15s ease",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                        {/* Radio */}
                        <div style={{
                          width: 16, height: 16, borderRadius: "50%",
                          border: isSelected ? "5px solid #2563eb" : "2px solid #ccc",
                          flexShrink: 0, transition: "all 0.15s",
                          background: isBlockedOpt ? "#eee" : "transparent",
                        }} />
                        <span style={{
                          fontSize: 14,
                          color: isBlockedOpt ? "#999" : isSelected ? "#111" : "#444",
                          lineHeight: 1.4,
                        }}>
                          {opt.label}
                        </span>
                        {opt.tag && (
                          <span style={{
                            fontSize: 10, letterSpacing: 1, textTransform: "uppercase",
                            padding: "2px 8px", borderRadius: 4,
                            background: tagColors[opt.tag]?.bg || "#e5e5e5",
                            color: tagColors[opt.tag]?.text || "#666",
                            flexShrink: 0,
                          }}>
                            {opt.tag}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: isBlockedOpt ? "#999" : isSelected ? "#2563eb" : "#888",
                        minWidth: 56,
                        textAlign: "right",
                      }}>
                        {isBlockedOpt ? "—" : opt.discount === null ? "—" : `+${opt.discount}%`}
                      </div>
                    </div>
                  );
                })}
              </div>
              {isAvista && blockKey !== "modalidade" && (
                <p style={{ margin: "8px 0 0 4px", fontSize: 12, color: "#888", fontStyle: "italic" }}>
                  Não aplicável no pagamento à vista.
                </p>
              )}
            </div>
          );
        })}

        {/* Aprovação Diretoria para À Vista */}
        {isAvista && (
          <div
            onClick={() => setDirApproval(!dirApproval)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 8,
              border: dirApproval ? "1px solid #2563eb" : "1px solid #e5e5e5",
              background: dirApproval ? "#eff6ff" : "#fafafa",
              cursor: "pointer", marginBottom: 28,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 4,
              border: dirApproval ? "none" : "2px solid #ccc",
              background: dirApproval ? "#2563eb" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {dirApproval && <span style={{ fontSize: 11, color: "#fff" }}>✓</span>}
            </div>
            <span style={{ fontSize: 14, color: dirApproval ? "#111" : "#666" }}>
              Com aprovação da Diretoria — pode chegar a <strong style={{ color: "#2563eb" }}>30%</strong>
            </span>
            <span style={{ marginLeft: "auto", fontSize: 16, fontWeight: 600, color: dirApproval ? "#2563eb" : "#999" }}>
              +5%
            </span>
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: "1px solid #eee", marginBottom: 24 }} />

        {/* Totalizador */}
        <div style={{
          background: "#fafafa",
          border: "1px solid #e5e5e5",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          {/* Linhas de detalhe */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #eee" }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#666", marginBottom: 16 }}>
              Composição do Desconto
            </div>

            {[
              { label: "1. Modalidade de Pagamento", block: "modalidade", disc: isAvista ? total : modalidadeDisc, always: true },
              { label: "2. Sinal de Negócio", block: "sinal", disc: sinalDisc, hidden: isAvista },
              { label: "3. Permuta", block: "permuta", disc: permutaDisc, hidden: isAvista },
            ].map((row) => {
              if (row.hidden) return null;
              const hasValue = selected[row.block] !== null;
              const opt = sel(row.block);
              return (
                <div key={row.block} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}>
                  <span style={{ fontSize: 14, color: hasValue ? "#333" : "#999" }}>
                    {row.label}
                    {opt && !opt.blocked && (
                      <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>
                        ({opt.label.split("—")[0].trim().split(" ").slice(-3).join(" ")})
                      </span>
                    )}
                  </span>
                  <span style={{
                    fontSize: 15, fontWeight: 600,
                    color: hasValue ? (row.disc > 0 ? "#2563eb" : "#666") : "#ccc",
                  }}>
                    {hasValue ? `${row.disc}%` : "—"}
                  </span>
                </div>
              );
            })}

            {isParcelaNotOk && allSelected && (
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef2f2", borderRadius: 6, fontSize: 13, color: "#b91c1c", border: "1px solid #fecaca" }}>
                ⚠ Parcelamento fora das condições ideais — desconto total limitado a <strong>2%</strong>.
              </div>
            )}
            {isBlocked && (
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef2f2", borderRadius: 6, fontSize: 13, color: "#b91c1c", border: "1px solid #fecaca" }}>
                ✕ Permuta acima de 50% não é aceita. Revise as condições.
              </div>
            )}
          </div>

          {/* Total */}
          <div style={{
            padding: "24px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: allSelected && !isBlocked ? "#eff6ff" : "transparent",
          }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#666" }}>
                Desconto Total Aplicável
              </div>
              {allSelected && !isBlocked && (
                <div style={{
                  marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "4px 12px", borderRadius: 20,
                  background: approvalLevel.color + "20",
                  border: `1px solid ${approvalLevel.color}50`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: approvalLevel.color }} />
                  <span style={{ fontSize: 12, color: approvalLevel.color, letterSpacing: 0 }}>
                    {approvalLevel.label}
                  </span>
                </div>
              )}
            </div>
            <div style={{
              fontSize: animated && allSelected ? 40 : 34,
              fontWeight: 700,
              color: isBlocked ? "#999" : allSelected ? "#2563eb" : "#ccc",
              transition: "all 0.3s ease",
              letterSpacing: -1,
            }}>
              {isBlocked ? "—" : allSelected ? `${total}%` : "—"}
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {APPROVAL.map((a) => (
            <div key={a.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, color: "#666",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
              {a.label}
            </div>
          ))}
        </div>

        {/* Reset */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button
            onClick={reset}
            style={{
              background: "#f5f5f5", border: "1px solid #ddd",
              color: "#555", padding: "10px 24px", borderRadius: 8,
              cursor: "pointer", fontSize: 13,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#eee";
              e.target.style.borderColor = "#ccc";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f5f5f5";
              e.target.style.borderColor = "#ddd";
            }}
          >
            Limpar Proposta
          </button>
        </div>
      </div>
    </div>
  );
}