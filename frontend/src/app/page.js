"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, MessageCircle } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Building2 size={24} />,
      title: "Gestión Empresarial",
      description:
        "Administre eficientemente todos los aspectos de su empresa desde una única plataforma.",
    },
    {
      icon: <Users size={24} />,
      title: "Recursos Humanos",
      description:
        "Control completo sobre la gestión de empleados, horarios y evaluaciones.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Control Económico",
      description:
        "Seguimiento detallado de operaciones económicas y comerciales.",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Comunicación Integrada",
      description:
        "Sistema de mensajería y notificaciones para una comunicación efectiva.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Bienvenido a TECNOTEX
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema integral de gestión empresarial diseñado para optimizar sus
            operaciones y maximizar la eficiencia.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-blackRedTX text-white p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="inline-block p-6 bg-white rounded-full shadow-md">
            <Image
              src="/images/logobg.png" // Asegúrate de tener el logo en la carpeta public
              alt="TECNOTEX Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-blackRedTX text-white py-6 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TECNOTEX. Todos los derechos
            reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
