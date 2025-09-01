'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import jsPDF from 'jspdf';
import { ArrowLeft, Download, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ProposalData } from '../../types/proposta-data';

const clientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  profession: z.string().min(2, 'Profissão deve ter pelo menos 2 caracteres'),
  income: z.number().min(1, 'Renda deve ser maior que 0'),
  observations: z.string().optional()
});

type ClientData = z.infer<typeof clientSchema>;

export default function Proposal() {
  const router = useRouter();
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ClientData>({
    resolver: zodResolver(clientSchema)
  });

  useEffect(() => {
    const data = localStorage.getItem('proposalData');
    if (data) {
      setProposalData(JSON.parse(data) as ProposalData);
    } else {
      router.push('/');
    }
  }, [router]);


  const generatePDF = async (clientData: ClientData, data: ProposalData) => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = 50;

      // ===== HEADER =====
      doc.setFillColor(30, 64, 175); // Azul institucional
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('PROPOSTA COMERCIAL', pageWidth / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Empreendimento N8 - Residencial de Alto Padrão', pageWidth / 2, 32, { align: 'center' });

      // ===== SEÇÃO CLIENTE =====
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Dados do Cliente', margin, yPosition);
      yPosition += 6;
      doc.setDrawColor(200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const clientInfo = [
        `Nome: ${clientData.name}`,
        `Email: ${clientData.email}`,
        `Telefone: ${clientData.phone}`,
        `CPF: ${clientData.cpf}`,
        `Endereço: ${clientData.address}`,
        `Profissão: ${clientData.profession}`,
        `Renda Mensal: R$ ${clientData.income.toLocaleString('pt-BR')}`
      ];
      clientInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 7;
      });

      yPosition += 10;

      // ===== SEÇÃO IMÓVEL =====
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Imóvel Selecionado', margin, yPosition);
      yPosition += 6;
      doc.setDrawColor(200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const propertyInfo = [
        `Unidade: ${data.property.name}`,
        `Tipo: ${data.property.type}`,
        `Área: ${data.property.area}m²`,
        `Quartos: ${data.property.bedrooms > 0 ? data.property.bedrooms : 'Studio'}`,
        `Banheiros: ${data.property.bathrooms}`,
        `Andar: ${data.property.floor}`,
        `Valor: R$ ${data.property.price.toLocaleString('pt-BR')}`
      ];
      propertyInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 7;
      });

      yPosition += 10;

      // ===== SEÇÃO FINANCIAMENTO =====
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Condições de Financiamento', margin, yPosition);
      yPosition += 6;
      doc.setDrawColor(200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const financingInfo = [
        `Valor de Entrada: R$ ${data.calculation.downPayment.toLocaleString('pt-BR')}`,
        `Valor Financiado: R$ ${data.calculation.financedAmount.toLocaleString('pt-BR')}`,
        `Taxa de Juros: ${data.interestRate}% ao ano`,
        `Prazo: ${data.installments} meses (${Math.round(data.installments / 12)} anos)`,
        `IOF: R$ ${data.calculation.iof.toLocaleString('pt-BR')}`,
        `Parcela Mensal: R$ ${data.calculation.monthlyPayment.toLocaleString('pt-BR')}`,
        `Total de Juros: R$ ${data.calculation.totalInterest.toLocaleString('pt-BR')}`,
        `Valor Total: R$ ${data.calculation.totalAmount.toLocaleString('pt-BR')}`
      ];
      financingInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 7;
      });

      yPosition += 10;

      // ===== SEÇÃO OBSERVAÇÕES =====
      if (clientData.observations) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Observações', margin, yPosition);
        yPosition += 6;
        doc.setDrawColor(200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const wrappedText = doc.splitTextToSize(clientData.observations, pageWidth - margin * 2);
        doc.text(wrappedText, margin, yPosition);
        yPosition += wrappedText.length * 6 + 10;
      }

      // ===== FOOTER =====
      doc.setFillColor(245, 245, 245);
      doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.text('Empreendimento N8 | Excelência em Residenciais de Alto Padrão', pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(`Proposta gerada em ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, pageHeight - 8, { align: 'center' });

      // ===== SAVE =====
      doc.save(`Proposta_N8_${clientData.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }

    setIsGenerating(false);
  };

  if (!proposalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carregando dados...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/calculator/${proposalData.property.id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar à Calculadora
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">Proposta Comercial</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados do Cliente
              </CardTitle>
              <CardDescription>
                Preencha suas informações para gerar a proposta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((client) => generatePDF(client, proposalData))} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="João Silva"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="joao@email.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      {...register('cpf')}
                      placeholder="000.000.000-00"
                    />
                    {errors.cpf && (
                      <p className="text-sm text-red-600">{errors.cpf.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo *</Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Rua, Número, Bairro, Cidade - Estado"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profissão *</Label>
                    <Input
                      id="profession"
                      {...register('profession')}
                      placeholder="Engenheiro"
                    />
                    {errors.profession && (
                      <p className="text-sm text-red-600">{errors.profession.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income">Renda Mensal (R$) *</Label>
                    <Input
                      id="income"
                      type="number"
                      {...register('income', { valueAsNumber: true })}
                      placeholder="5000"
                    />
                    {errors.income && (
                      <p className="text-sm text-red-600">{errors.income.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    {...register('observations')}
                    placeholder="Informações adicionais (opcional)"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  disabled={isGenerating}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {isGenerating ? 'Gerando PDF...' : 'Baixar Proposta em PDF'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Simulação</CardTitle>
              <CardDescription>Confira os dados antes de gerar a proposta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Summary */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Imóvel Selecionado</h4>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-blue-900">{proposalData.property.name}</p>
                  <p className="text-sm text-blue-700">{proposalData.property.area}m² • {proposalData.property.floor}</p>
                  <p className="text-lg font-bold text-blue-600">
                    R$ {proposalData.property.price.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Financing Summary */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Resumo Financeiro</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrada:</span>
                    <span className="font-semibold">R$ {proposalData.calculation.downPayment.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Financiado:</span>
                    <span className="font-semibold">R$ {proposalData.calculation.financedAmount.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parcelas:</span>
                    <span className="font-semibold">{proposalData.installments}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de Juros:</span>
                    <span className="font-semibold">{proposalData.interestRate}% a.a.</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">Parcela Mensal:</span>
                    <span className="font-bold text-lg text-blue-600">
                      R$ {proposalData.calculation.monthlyPayment.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Total:</span>
                    <span className="font-bold text-lg">
                      R$ {proposalData.calculation.totalAmount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Contato N8</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📞 (11) 99999-9999</p>
                  <p>📧 vendas@n8.com.br</p>
                  <p>📍 Centro da Cidade</p>
                  <p>🕒 Seg-Sex: 8h às 18h | Sáb: 9h às 16h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}