/*CRUD*/
CREATE TABLE bodegas(
	id SERIAL, 
	nombre VARCHAR(100)
);
CREATE TABLE sucursales(
	id SERIAL,
	nombre VARCHAR(100),
	bodega_id INT
);
CREATE TABLE monedas (
    id SERIAL,
    nombre VARCHAR(50)
);
CREATE TABLE materiales (
    id SERIAL,
    nombre VARCHAR(50)
);
CREATE TABLE productos (
    id SERIAL,
    codigo VARCHAR(15),
    nombre VARCHAR(50),
    bodega_id INT,
    sucursal_id INT,
    moneda_id INT,
    precio NUMERIC(10,2),
    descripcion TEXT
);
CREATE TABLE producto_material (
    producto_id INT,
    material_id INT
);

/*PRIMARY KEYS*/
ALTER TABLE bodegas ADD CONSTRAINT pk_bodegas PRIMARY KEY (id);
ALTER TABLE sucursales ADD CONSTRAINT pk_sucursales PRIMARY KEY (id);
ALTER TABLE monedas ADD CONSTRAINT pk_monedas PRIMARY KEY (id);
ALTER TABLE materiales ADD CONSTRAINT pk_materiales PRIMARY KEY (id);
ALTER TABLE productos ADD CONSTRAINT pk_productos PRIMARY KEY (id);
ALTER TABLE producto_material ADD CONSTRAINT pk_producto_material PRIMARY KEY (producto_id, material_id);
/*FOREIGN KEYS*/
ALTER TABLE sucursales ADD CONSTRAINT fk_sucursal_bodega FOREIGN KEY (bodega_id) REFERENCES bodegas(id);
ALTER TABLE productos ADD CONSTRAINT fk_producto_bodega FOREIGN KEY (bodega_id) REFERENCES bodegas(id);
ALTER TABLE productos ADD CONSTRAINT fk_producto_sucursal FOREIGN KEY (sucursal_id) REFERENCES sucursales(id);
ALTER TABLE productos ADD CONSTRAINT fk_producto_moneda FOREIGN KEY (moneda_id) REFERENCES monedas(id);
ALTER TABLE producto_material ADD CONSTRAINT fk_pm_producto FOREIGN KEY (producto_id) REFERENCES productos(id);
ALTER TABLE producto_material ADD CONSTRAINT fk_pm_material FOREIGN KEY (material_id) REFERENCES materiales(id);
ALTER TABLE productos ADD CONSTRAINT uq_codigo_producto UNIQUE (codigo);