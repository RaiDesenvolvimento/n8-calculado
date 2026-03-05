# Guia Rápido de Calibração de Cores

Se a sua intenção é garantir que as cores exibidas pelo app correspondam ao que você vê no seu monitor, siga estes passos:

1. Abra a aplicação localmente:

```bash
npm run dev
```

2. No app, clique no botão **Calibrar Cores** no cabeçalho para abrir a ferramenta integrada.

3. Ajuste brilho e contraste do monitor até distinguir todos os blocos no teste de contraste.

4. Execute o assistente de calibração do seu sistema operacional:
   - Windows: Pesquise por "Calibrar cor da tela" e siga o assistente.
   - macOS: Preferências do Sistema → Monitores → Cor → Calibrar...

5. Prefira perfis sRGB para desenvolvimento web. Verifique também se o navegador não aplica perfis ou correções automáticas.

6. Se você precisa que o app capture cores de forma programática (amostragem de pixels), confirme como deseja essa amostragem (captura de tela, input de imagem ou seleção via mouse) e eu implemento o código necessário.
