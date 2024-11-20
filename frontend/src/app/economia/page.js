"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

const EconomiaPage = () => {
  const router = useRouter();

  const opciones = [
    { nombre: "Pedido", ruta: "/economia/pedido" },
    { nombre: "Aprobación", ruta: "/economia/aprobacion" },
    { nombre: "Plan de Importación", ruta: "/economia/plan-importacion" },
    { nombre: "Cliente", ruta: "/economia/cliente" },
  ];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-blackRedTX text-white p-4 rounded-full mb-6"
        >
          <DollarSign size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Bienvenido a la sección Economía
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-gray-600 max-w-2xl"
        >
          Por favor, seleccione una opción en la barra de navegación para
          acceder a las diferentes funcionalidades:
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        >
          {opciones.map((opcion, index) => (
            <motion.div
              key={opcion.nombre}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
              onClick={() => router.push(opcion.ruta)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg 
                         transition-all duration-300 cursor-pointer
                         hover:bg-gray-50 hover:scale-105"
            >
              <h3 className="text-gray-700 font-semibold">{opcion.nombre}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default EconomiaPage;
