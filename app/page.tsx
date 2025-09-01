'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bath, Bed, Building, MapPin, Square } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const properties = [
  {
    id: 1,
    name: 'Apartamento Studio',
    type: 'Studio',
    area: 35,
    bedrooms: 0,
    bathrooms: 1,
    price: 180000,
    floor: '3º ao 15º',
    status: 'Disponível',
    features: ['Sacada', 'Ar condicionado', 'Móveis planejados'],
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    name: 'Apartamento 1 Quarto',
    type: '1 Quarto',
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    price: 220000,
    floor: '2º ao 16º',
    status: 'Disponível',
    features: ['Sacada', 'Área de serviço', 'Vaga de garagem'],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    name: 'Apartamento 2 Quartos',
    type: '2 Quartos',
    area: 65,
    bedrooms: 2,
    bathrooms: 2,
    price: 320000,
    floor: '4º ao 18º',
    status: 'Disponível',
    features: ['Sacada gourmet', 'Suíte master', 'Vaga de garagem', 'Depósito'],
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    name: 'Apartamento 3 Quartos',
    type: '3 Quartos',
    area: 85,
    bedrooms: 3,
    bathrooms: 3,
    price: 450000,
    floor: '5º ao 20º',
    status: 'Disponível',
    features: ['Varanda gourmet', '2 Suítes', '2 Vagas de garagem', 'Lavabo', 'Closet'],
    image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    name: 'Cobertura Duplex',
    type: 'Cobertura',
    area: 120,
    bedrooms: 4,
    bathrooms: 4,
    price: 680000,
    floor: '21º e 22º',
    status: 'Últimas unidades',
    features: ['Terraço privativo', 'Churrasqueira', '3 Suítes', '3 Vagas', 'Piscina privativa'],
    image: 'https://images.pexels.com/photos/1571473/pexels-photo-1571473.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    name: 'Loft Executivo',
    type: 'Loft',
    area: 55,
    bedrooms: 1,
    bathrooms: 1,
    price: 280000,
    floor: '1º ao 8º',
    status: 'Pré-lançamento',
    features: ['Pé-direito duplo', 'Mezanino', 'Varanda', 'Vaga de garagem'],
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Empreendimento N8</h1>
              <p className="text-sm text-gray-600">Residencial de Alto Padrão</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha Sua Nova <span className="text-blue-600">Residência</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra o apartamento perfeito no N8 e simule seu financiamento com as melhores condições do mercado
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Centro da Cidade</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>22 Andares</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              <span>120 Unidades</span>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  width={800}
                  height={600}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized={true}
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={property.status === 'Disponível' ? 'default' :
                      property.status === 'Últimas unidades' ? 'destructive' : 'secondary'}
                    className="font-medium"
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-gray-900">{property.floor}</span>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{property.name}</CardTitle>
                    <CardDescription className="text-gray-600">{property.type}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Property Details */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}m²</span>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} quarto{property.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} banheiro{property.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.features.length - 3} mais
                    </Badge>
                  )}
                </div>

                {/* CTA Button */}
                <Link href={`/calculator/${property.id}`} className="block">
                  <Button className="w-full group bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                    Simular Financiamento
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Building Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sobre o Empreendimento N8</h3>
            <p className="text-gray-600">Localização privilegiada com toda infraestrutura que você precisa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Arquitetura Moderna</h4>
              <p className="text-sm text-gray-600">Design contemporâneo com acabamentos de primeira linha</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Localização Premium</h4>
              <p className="text-sm text-gray-600">Centro da cidade com fácil acesso a tudo</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Square className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Área de Lazer</h4>
              <p className="text-sm text-gray-600">Piscina, academia, salão de festas e muito mais</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}