import React from "react";

export default function ColorCalibrator({ onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(2,6,23,0.95)",
      color: "#e8e0d0",
      zIndex: 1200,
      padding: 24,
      overflow: "auto",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Ferramenta de Calibração de Cores</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer", background: "#c4a97d", border: "none" }}>Fechar</button>
          </div>
        </div>

        <p style={{ color: "#bfb6a0" }}>
          Esta ferramenta ajuda a verificar se seu monitor e navegador exibem cores próximas ao esperado. Ela não altera o monitor — siga as instruções abaixo para calibrar via sistema.
        </p>

        <section style={{ marginTop: 18 }}>
          <h3 style={{ margin: "6px 0" }}>1) Verifique contraste e brilho</h3>
          <p style={{ color: "#bfb6a0" }}>Ajuste o brilho/contraste do monitor até que consiga distinguir todos os blocos abaixo (preto profundo, sombras e branco puro).</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, marginTop: 12 }}>
            <div style={{ background: "#000000", height: 60, borderRadius: 6 }} />
            <div style={{ background: "#222222", height: 60, borderRadius: 6 }} />
            <div style={{ background: "#444444", height: 60, borderRadius: 6 }} />
            <div style={{ background: "#888888", height: 60, borderRadius: 6 }} />
            <div style={{ background: "#cccccc", height: 60, borderRadius: 6 }} />
            <div style={{ background: "#ffffff", height: 60, borderRadius: 6 }} />
          </div>
        </section>

        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "6px 0" }}>2) Teste de cores primárias e secundárias</h3>
          <p style={{ color: "#bfb6a0" }}>As cores abaixo devem aparecer vivas e sem dominância de outra cor (por exemplo, o vermelho não deve parecer alaranjado).</p>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <div style={{ background: "#ff0000", height: 80, flex: 1, borderRadius: 6 }} />
            <div style={{ background: "#00ff00", height: 80, flex: 1, borderRadius: 6 }} />
            <div style={{ background: "#0000ff", height: 80, flex: 1, borderRadius: 6 }} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <div style={{ background: "#ffff00", height: 60, flex: 1, borderRadius: 6 }} />
            <div style={{ background: "#00ffff", height: 60, flex: 1, borderRadius: 6 }} />
            <div style={{ background: "#ff00ff", height: 60, flex: 1, borderRadius: 6 }} />
          </div>
        </section>

        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "6px 0" }}>3) Gradiente e tons de pele</h3>
          <p style={{ color: "#bfb6a0" }}>Verifique se o gradiente é suave e se tons de pele parecem naturais.</p>
          <div style={{ height: 60, borderRadius: 6, background: "linear-gradient(90deg,#ff7f50,#ffd27f,#ffffff,#bfefff,#4fc3f7)", marginTop: 12 }} />
        </section>

        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "6px 0" }}>4) Instruções de calibração (rápido)</h3>
          <ol style={{ color: "#bfb6a0" }}>
            <li>Ajuste brilho/contraste pelo menu do monitor até distinguir todos os blocos do teste 1.</li>
            <li>No Windows: abra "Calibrar cor da tela" (Procure por "Calibrar cor") e siga o assistente.</li>
            <li>No macOS: Preferências do Sistema → Monitores → Cor → Calibrar...</li>
            <li>Use perfis sRGB quando estiver trabalhando para web. No navegador, certifique-se de que não há correção automática de cores ativa.</li>
          </ol>
        </section>

        <section style={{ marginTop: 22 }}>
          <h3 style={{ margin: "6px 0" }}>5) Como testar a captura de cores (opcional)</h3>
          <p style={{ color: "#bfb6a0" }}>Se você precisa que um app capture cores com fidelidade (por exemplo, amostragem de pixels), use imagens de referência em sRGB e garanta que o navegador não esteja aplicando perfis colorimétricos diferentes.</p>
        </section>
      </div>
    </div>
  );
}
