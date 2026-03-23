SELECT * FROM bodegas;
SELECT * FROM sucursales;
SELECT * FROM monedas;
SELECT * FROM materiales;

INSERT INTO bodegas (nombre) VALUES 
('Bodega 1'),
('Bodega 2');
INSERT INTO sucursales (nombre, bodega_id) VALUES
('Sucursal 1', 1),
('Sucursal 2', 1),
('Sucursal 3', 2);
INSERT INTO monedas (nombre) VALUES
('CLP'),
('DÓLAR'),
('EURO');
INSERT INTO materiales (nombre) VALUES
('Plástico'),
('Metal'),
('Madera'),
('Vidrio'),
('Cerámica');
