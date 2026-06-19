-- Script de Migración: Tabla usuario para API REST
-- Ejecutar en PostgreSQL con pgAdmin o psql

-- 1. Agregar columnas faltantes a la tabla usuario
ALTER TABLE public.usuario 
ADD COLUMN IF NOT EXISTS correo VARCHAR(100) NOT NULL DEFAULT 'sin-correo@ejemplo.com',
ADD COLUMN IF NOT EXISTS estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- 2. Agregar restricción de CHECK para estado (solo ACTIVO o INACTIVO)
ALTER TABLE public.usuario 
ADD CONSTRAINT check_estado CHECK (estado IN ('ACTIVO', 'INACTIVO'));

-- 3. Agregar restricción UNIQUE para correo (opcional, pero recomendado)
ALTER TABLE public.usuario 
ADD CONSTRAINT unique_correo UNIQUE (correo);

-- 4. Verificar que la tabla está correcta
-- SELECT * FROM public.usuario;
-- \d public.usuario;  -- En psql para ver la estructura

-- Fin del script
