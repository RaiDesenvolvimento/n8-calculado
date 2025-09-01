'use client';

import {
  ArrowLeft,
  Building,
  Calculator as CalculatorIcon,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import type { ProposalData } from '@/types/proposta-data';
import type { FinancingCalculation, Property } from '../../../types/calcular';

const properties: Property[] = [
  { id: 1, name: 'Apartamento Studio', type: 'Studio', area: 35, bedrooms: 0, bathrooms: 1, price: 180000, floor: '3º ao 15º' },
  { id: 2, name: 'Apartamento 1 Quarto', type: '1 Quarto', area: 45, bedrooms: 1, bathrooms: 1, price: 220000, floor: '2º ao 16º' },
  { id: 3, name: 'Apartamento 2 Quartos', type: '2 Quartos', area: 65, bedrooms: 2, bathrooms: 2, price: 320000, floor: '4º ao 18º' },
  { id: 4, name: 'Apartamento 3 Quartos', type: '3 Quartos', area: 85, bedrooms: 3, bathrooms: 3, price: 450000, floor: '5º ao 20º' },
  { id: 5, name: 'Cobertura Duplex', type: 'Cobertura', area: 120, bedrooms: 4, bathrooms: 4, price: 680000, floor: '21º e 22º' },
  { id: 6, name: 'Loft Executivo', type: 'Loft', area: 55, bedrooms: 1, bathrooms: 1, price: 280000, floor: '1º ao 8º' },
];

export default function Calculator() {
  const params = useParams();
  const router = useRouter();

  const propertyId = parseInt(params.id as string, 10);
  const property = properties.find((p) => p.id === propertyId);

  const [downPayment, setDownPayment] = useState(0);
  const [installments, setInstallments] = useState([360]);
  const [interestRate, setInterestRate] = useState(10.5);
  const [calculation, setCalculation] = useState<FinancingCalculation | null>(null);

  // Função de cálculo memorizada
  const calculateFinancing = useCallback(
    (prop: Property) => {
      const propertyPrice = prop.price;
      const downPaymentValue = Math.min(downPayment, propertyPrice);
      const financedAmount = propertyPrice - downPaymentValue;

      if (financedAmount <= 0) {
        setCalculation({
          downPayment: downPaymentValue,
          financedAmount: 0,
          monthlyPayment: 0,
          totalAmount: downPaymentValue,
          totalInterest: 0,
          iof: 0,
        });
        return;
      }

      const monthlyRate = interestRate / 100 / 12;
      const numPayments = installments[0];

      const monthlyPayment =
        financedAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalAmount = downPaymentValue + monthlyPayment * numPayments;
      const totalInterest = totalAmount - propertyPrice;
      const iof = Math.min(
        financedAmount * 0.03,
        financedAmount * 0.0082 * Math.min(365, numPayments * 30)
      );

      setCalculation({
        downPayment: downPaymentValue,
        financedAmount,
        monthlyPayment: monthlyPayment + iof / numPayments,
        totalAmount: totalAmount + iof,
        totalInterest: totalInterest + iof,
        iof,
      });
    },
    [downPayment, installments, interestRate]
  );

  // Recalcula quando os valores mudarem
  useEffect(() => {
    if (property) {
      calculateFinancing(property);
    }
  }, [property, calculateFinancing]);

  // Caso não encontre a propriedade
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Propriedade não encontrada
          </h1>
          <Link href="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleGenerateProposal = () => {
    if (!calculation) return;

    const proposalData: ProposalData = {
      property,
      calculation,
      installments: installments[0],
      interestRate,
    };

    localStorage.setItem('proposalData', JSON.stringify(proposalData));
    router.push('/proposal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Cabeçalho */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <CalculatorIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Calculadora de Financiamento
            </h1>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detalhes do imóvel */}
          <Card className="h-fit shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-blue-600" />
                <div>
                  <CardTitle className="text-xl">{property.name}</CardTitle>
                  <CardDescription>
                    Empreendimento N8 - {property.floor}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Área" value={`${property.area}m²`} />
                <Info label="Quartos" value={property.bedrooms > 0 ? property.bedrooms : 'Studio'} />
                <Info label="Banheiros" value={property.bathrooms} />
                <Info label="Andar" value={property.floor} />
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-gray-500">Valor do Imóvel</p>
                <p className="text-3xl font-bold text-blue-600">
                  R$ {property.price.toLocaleString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5" />
                Simulação de Financiamento
              </CardTitle>
              <CardDescription>
                Configure os parâmetros para simular seu financiamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Entrada */}
              <Field label="Valor de Entrada">
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  placeholder="0"
                  className="text-lg"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Mínimo: R$ 0</span>
                  <span>Máximo: R$ {property.price.toLocaleString('pt-BR')}</span>
                </div>
              </Field>

              {/* Parcelas */}
              <Field label={`Prazo: ${installments[0]} meses (${Math.round(installments[0] / 12)} anos)`}>
                <Slider
                  value={installments}
                  onValueChange={setInstallments}
                  min={60}
                  max={420}
                  step={12}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 anos</span>
                  <span>35 anos</span>
                </div>
              </Field>

              {/* Juros */}
              <Field label="Taxa de Juros Anual (%)">
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  Taxa de referência atual do mercado
                </p>
              </Field>

              {/* Resultados */}
              {calculation && (
                <>
                  <Separator />
                  <Results calculation={calculation} />
                  <Button
                    onClick={handleGenerateProposal}
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Gerar Proposta Comercial
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Informações adicionais */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>• A simulação é uma estimativa e pode variar conforme análise de crédito.</p>
              <p>• Taxa de juros sujeita à aprovação bancária e perfil do cliente.</p>
              <p>• IOF calculado conforme legislação vigente (0,0082% ao dia, até 3%).</p>
              <p>• Financiamento através dos melhores bancos parceiros.</p>
              <p>• Documentação e aprovação sujeitas às políticas da instituição financeira.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

// Componentes auxiliares
function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="space-y-1">
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Results({ calculation }: { calculation: FinancingCalculation }) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-900">Resultado da Simulação</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Info label="Valor Financiado" value={`R$ ${calculation.financedAmount.toLocaleString('pt-BR')}`} />
        <Info label="IOF" value={`R$ ${calculation.iof.toLocaleString('pt-BR')}`} />
        <Info label="Parcela Mensal" value={`R$ ${calculation.monthlyPayment.toLocaleString('pt-BR')}`} />
        <Info label="Total de Juros" value={`R$ ${calculation.totalInterest.toLocaleString('pt-BR')}`} />
      </div>
      <Separator />
      <div className="text-center">
        <p className="text-gray-500 text-sm">Valor Total do Investimento</p>
        <p className="font-bold text-2xl text-gray-900">
          R$ {calculation.totalAmount.toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
