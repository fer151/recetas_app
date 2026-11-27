-- Habilitar el soporte de llaves foráneas en SQLite
PRAGMA foreign_keys = ON;

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL
);

-- 2. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL UNIQUE
);

-- 3. Tabla de Recetas
CREATE TABLE IF NOT EXISTS recetas (
    id_receta INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_receta TEXT NOT NULL,
    descripcion TEXT,
    instrucciones TEXT NOT NULL,
    tiempo_preparacion INTEGER,
    imagen_url TEXT,
    id_categoria INTEGER,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);

-- 4. Tabla de Ingredientes
CREATE TABLE IF NOT EXISTS ingredientes (
    id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_ingrediente TEXT NOT NULL UNIQUE
);

-- 5. Tabla Intermedia: Receta_Ingredientes
CREATE TABLE IF NOT EXISTS receta_ingredientes (
    id_receta_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT,
    id_receta INTEGER NOT NULL,
    id_ingrediente INTEGER NOT NULL,
    cantidad TEXT NOT NULL,
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta) ON DELETE CASCADE,
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente) ON DELETE CASCADE
);

-- 6. Tabla de Favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id_favorito INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_receta INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta) ON DELETE CASCADE
);

-- ==========================================
-- DATOS INICIALES DE PRUEBA
-- ==========================================

-- Usuarios de prueba
INSERT INTO usuarios (nombre, correo, contrasena) VALUES 
('Luis Admin', 'luis@cocinafacil.com', '123456');

-- Categorías
INSERT INTO categorias (nombre_categoria) VALUES 
('Desayunos'),
('Comidas'),
('Cenas'),
('Postres'),
('Rápidas');

-- Ingredientes base
INSERT INTO ingredientes (nombre_ingrediente) VALUES 
('Huevo'),
('Tomate'),
('Cebolla'),
('Tortilla de maíz'),
('Queso Oaxaca'),
('Pechuga de pollo'),
('Arroz'),
('Ajo'),
('Sal'),
('Aceite');

-- Recetas de ejemplo
INSERT INTO recetas (nombre_receta, descripcion, instrucciones, tiempo_preparacion, imagen_url, id_categoria) VALUES 
('Huevos a la Mexicana', 'Desayuno tradicional mexicano rápido y nutritivo.', '1. Picar tomate y cebolla. 2. Sofreír en aceite. 3. Agregar los huevos batidos con sal y revolver hasta cocer.', 15, '/imagenes/huevos_mexicana.jpg', 1),
('Sincronizadas de Queso', 'Opción rápida y sencilla para cenar en pocos minutos.', '1. Colocar queso entre dos tortillas. 2. Calentar en el comal por ambos lados hasta que el queso se derrita.', 10, '/imagenes/sincronizadas.jpg', 5),
('Arroz con Pollo', 'Platillo completo ideal para la hora de la comida.', '1. Dorar el arroz con ajo y cebolla. 2. Agregar el pollo en trozos y agua con sal. 3. Cocinar a fuego lento por 25 minutos.', 35, '/imagenes/arroz_pollo.jpg', 2);

-- Relación Recetas <-> Ingredientes
-- Receta 1: Huevos a la Mexicana (Huevo, Tomate, Cebolla, Sal, Aceite)
INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad) VALUES 
(1, 1, '3 piezas'),
(1, 2, '1 pieza'),
(1, 3, '1/4 de pieza'),
(1, 9, '1 pizca'),
(1, 10, '1 cucharada');

-- Receta 2: Sincronizadas de Queso (Tortilla de maíz, Queso Oaxaca)
INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad) VALUES 
(2, 4, '2 piezas'),
(2, 5, '100 gramos');

-- Receta 3: Arroz con Pollo (Pechuga de pollo, Arroz, Cebolla, Ajo, Sal, Aceite)
INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad) VALUES 
(3, 6, '250 gramos'),
(3, 7, '1 taza'),
(3, 3, '1/4 de pieza'),
(3, 8, '1 diente'),
(3, 9, '1 cucharadita'),
(3, 10, '1 cucharada');

-- Favoritos de prueba
INSERT INTO favoritos (id_usuario, id_receta) VALUES 
(1, 1),
(1, 3);