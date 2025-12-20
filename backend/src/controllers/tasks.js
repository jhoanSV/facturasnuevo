import { connect, connectDBSivarPos } from "../database";
//import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

//Todo: Function for checking if the data of connection is correct.
export const checkLogInData = async (req, res) => {
    /*Check if the data of connection is correct, and if it's then return the data of the user.*/
    try {
      const connection = await connect();  // Assuming you have a connect function
      const [rows] = await connection.query(`SELECT
                                                Col.Cod,
                                                Col.Nombre,
                                                Col.Apellido,
                                                Col.Cargo,
                                                Col.Usuario,
                                                Col.Contraseña
                                            FROM
                                                colaboradores AS Col
                                            WHERE Col.Usuario = ? AND Col.Activo = '1'`, [req.body.User]);
      connection.end();
      // Check if the password matches with the password that the user gave
      if (rows.length > 0) {
        const dbPassword = rows[0].Contraseña;  // Use index 0 to access the first row
       
        bcrypt.compare(req.body.Password, dbPassword, function(err, result) {
          if (err) {
            // Handle error
            //console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (result) {
            // Passwords match
            delete rows[0].Contraseña
            res.json(rows[0]);
            
          } else {
            // Passwords do not match
            res.status(401).json({ error: 'Unauthorized' });
          }
          //connection.end();
        });
      } else {
        // No user found with the provided email
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('entro en este' & error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getRoutesList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    CodRuta,
                                                    nombreRuta
                                                FROM
                                                    rutas`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getClientList: ', error)
    }
}

export const getAdvisorsList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    co.Cod,
                                                    co.Nombre
                                                FROM
                                                    colaboradores AS co
                                                WHERE
                                                    co.Cargo = 'Asesor comercial' AND co.Activo = 1`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getClientList: ', error)
    }
}

function encriptSync(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

//!Cliente
export const getClientList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    cli.Cod,
                                                    cli.Nit,
                                                    cli.Ferreteria,
                                                    cli.Contacto,
                                                    cli.Telefono,
                                                    cli.Cel,
                                                    cli.Email,
                                                    cli.Direccion,
                                                    cli.Barrio,
                                                    cli.Ruta AS CodRuta,
                                                    ru.nombreRuta,
                                                    cli.CodVendedor,
                                                    col.Nombre AS Vendedor,
                                                    cli.Nota,
                                                    cli.VerificacionNit,
                                                    cli.Geolocalizacion,
                                                    cli.Estado,
                                                    cli.Iva,
                                                    cli.Pos,
                                                    cli.ElectronicPos,
                                                    cli.Tipo,
                                                    cli.ResFiscal,	
                                                    IFNULL(res.NumeroResolucion,'') AS NumeroResolucion,
                                                    IFNULL(res.FechaInicio,'') AS FechaInicio,
                                                    IFNULL(res.FechaFinal,'') AS FechaFinal,
                                                    IFNULL(res.Prefijo,'') AS Prefijo,
                                                    IFNULL(res.NumeroInicial,'') AS NumeroInicial,
                                                    IFNULL(res.NumeroFinal,'') AS NumeroFinal,
                                                    IFNULL(res.ClaveTecnica,'') AS ClaveTecnica,
                                                    IFNULL(res.Api,'') AS Api,
                                                    IFNULL(res.Usuario,'') AS Usuario,
                                                    IFNULL(res.Clave,'') AS Clave,
                                                    cli.Nota
                                                FROM
                                                    clientes AS cli
                                                LEFT JOIN
                                                    resoluciones AS res ON res.IdFerreteria = cli.Cod
                                                LEFT JOIN
                                                    rutas AS ru ON cli.Ruta = ru.codRuta
                                                LEFT JOIN
                                                    colaboradores AS col ON cli.CodVendedor = col.Cod`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getClientList: ', error)
    }
};

export const postNewClient = async(req,res)=>{
    const connection = await connect()
    try {
        const contraseña = encriptSync('123456')
        const [NewClient] = await connection.query(`INSERT INTO clientes (
                                                                    Nit,
                                                                    Ferreteria,
                                                                    Contacto,
                                                                    Telefono,
                                                                    Cel,
                                                                    Email,
                                                                    Direccion,
                                                                    Barrio,
                                                                    Ruta,
                                                                    CodVendedor,
                                                                    Nota,
                                                                    verificacionNit,
                                                                    Geolocalizacion,
                                                                    Contraseña,
                                                                    Estado,
                                                                    Iva,
                                                                    Pos,
                                                                    Tipo,
                                                                    ResFiscal,
                                                                    ElectronicPos)
                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                                                        [req.body.NitCC,
                                                        req.body.Ferreteria,
                                                        req.body.Contacto,
                                                        req.body.Telefono,
                                                        req.body.Celular,
                                                        req.body.Email,
                                                        req.body.Direccion,
                                                        req.body.Barrio,
                                                        req.body.CodRuta,
                                                        req.body.CodVendedor,
                                                        req.body.Nota,
                                                        req.body.CV,
                                                        req.body.Geolocalizacion,
                                                        contraseña,
                                                        'OPERANDO',
                                                        req.body.Iva,
                                                        req.body.Pos,
                                                        req.body.TDocumento,
                                                        req.body.ResFiscal,
                                                        req.body.ElectronicPos])
        const [ConsecutivoRow] = await connection.query(`SELECT 
                                                            MAX(Cod) AS Cod
                                                        FROM
                                                            clientes`)
        const Consecutivo = ConsecutivoRow[0].Cod
        if (req.body.Pos && req.body.ElectronicPos ){
             const [NewEData] = await connection.query(`INSERT INTO resoluciones (
                                                                                    IdFerreteria,
                                                                                    NumeroResolucion,
                                                                                    FechaInicio,
                                                                                    FechaFinal,
                                                                                    Prefijo,
                                                                                    NumeroInicial,
                                                                                    NumeroFinal,
                                                                                    Clavetecnica,
                                                                                    Api,
                                                                                    Usuario,
                                                                                    Clave
                                                                                    )
                                                                    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                                        [Consecutivo,
                                                        req.body.ResFiscalName,
                                                        req.body.ResFiscal,
                                                        req.body.NResolucion,
                                                        req.body.FInicio,
                                                        req.body.FFinal,
                                                        req.body.Prefijo,
                                                        req.body.NInicial,
                                                        req.body.NFinal,
                                                        req.body.ClaveTecnica,
                                                        req.body.Api,
                                                        req.body.Usuario,
                                                        req.body.Clave])
        }
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-getClientList: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const postUpdateClient = async(req,res)=>{
    console.log(req.body)
    const connection = await connect()
    try {
        const [NewClient] = await connection.query(`UPDATE
                                                        clientes
                                                    SET
                                                        Nit = ?,
                                                        VerificacionNit = ?, 
                                                        Ferreteria = ?,
                                                        Contacto = ?,
                                                        Telefono = ?,
                                                        Cel = ?,
                                                        Email = ?,
                                                        Direccion = ?,
                                                        Barrio = ?,
                                                        Ruta = ?,
                                                        CodVendedor = ?,
                                                        Geolocalizacion = ?,
                                                        Nota = ?,
                                                        Estado = ?,
                                                        Iva = ?,
                                                        Pos = ?,
                                                        Tipo = ?,
                                                        ResFiscal = ?,
                                                        ElectronicPos = ?,
                                                        Tipo = ?
                                                    Where
                                                        Cod = ?`,
                                                    [
                                                        req.body.NitCC,
                                                        req.body.CV,
                                                        req.body.Ferreteria,
                                                        req.body.Contacto,
                                                        req.body.Telefono,
                                                        req.body.Celular,
                                                        req.body.Email,
                                                        req.body.Direccion,
                                                        req.body.Barrio,
                                                        req.body.CodRuta,
                                                        req.body.CodVendedor,
                                                        req.body.Geolocalizacion,
                                                        req.body.Nota,
                                                        req.body.Estado,
                                                        req.body.Iva,
                                                        req.body.Pos,
                                                        req.body.TDocumento,
                                                        req.body.ResFiscal,
                                                        req.body.ElectronicPos,
                                                        req.body.Tipo === 'Cedula'? 0: 1,
                                                        req.body.Cod])
        if (req.body.Pos && req.body.ElectronicPos) {
            const [NewEData] = await connection.query(`INSERT INTO resoluciones 
                                                            (
                                                                IdFerreteria,
                                                                NumeroResolucion,
                                                                FechaInicio,
                                                                FechaFinal,
                                                                Prefijo,
                                                                NumeroInicial,
                                                                NumeroFinal,
                                                                ClaveTecnica,
                                                                Api,
                                                                Usuario,
                                                                Clave
                                                            )
                                                        VALUES (?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?,
                                                                ?)
                                                        ON DUPLICATE KEY UPDATE
                                                            NumeroResolucion = ?,
                                                            FechaInicio = ?,
                                                            FechaFinal = ?,
                                                            Prefijo = ?,
                                                            NumeroInicial = ?,
                                                            NumeroFinal = ?,
                                                            ClaveTecnica = ?,
                                                            Api = ?,
                                                            Usuario = ?,
                                                            Clave = ?`,
                                                    [
                                                        req.body.Cod,
                                                        req.body.NResolucion,
                                                        req.body.FInicio,
                                                        req.body.FFinal,
                                                        req.body.Prefijo,
                                                        req.body.NInicial,
                                                        req.body.NFinal,
                                                        req.body.ClaveTecnica,
                                                        req.body.Api,
                                                        req.body.Usuario,
                                                        req.body.Clave,
                                                        req.body.NResolucion,   //Update
                                                        req.body.FInicio,
                                                        req.body.NFinal,
                                                        req.body.Prefijo,
                                                        req.body.NInicial,
                                                        req.body.NFinal,
                                                        req.body.ClaveTecnica,
                                                        req.body.Api,
                                                        req.body.Usuario,
                                                        req.body.Clave])

        } else {
            const [NewEData] = await connection.query(`DELETE FROM resoluciones
                                                        WHERE IdFerreteria = ?`,[req.body.Cod])
        }

        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postUpdateClient: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const getWorkerList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                Col.Cod,
                                                Col.Nombre,
                                                Col.Apellido,
                                                Col.Cargo,
                                                Col.Telefono,
                                                Col.Cel,
                                                Col.Email,
                                                Col.Direccion,
                                                Col.Nota,
                                                Col.Contraseña,
                                                Col.Usuario,
                                                Col.Activo
                                            FROM
                                                colaboradores AS Col`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getWorkerList: ', error)
    }
};

//!Categry
export const getCategoryList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    ca.IDCategoria,
                                                    ca.Categoria
                                                FROM
                                                    categoria AS ca`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getCategoryList: ', error)
    }
};

export const postNewCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`INSERT INTO
                                                    categoria (categoria, Pag)
                                                VALUES
                                                    (?,?)`,[req.body.Categoria,''])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postNewCategory: ', error)
    } finally {
        connection.end();
    }
};

export const postUpdateCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`UPDATE
                                                    categoria
                                                SET
                                                    Categoria = ?
                                                WHERE
                                                    IDCategoria = ?`,[req.body.Categoria, req.body.Cod])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postNewCategory: ', error)
    } finally {
        connection.end();
    }
};

export const postDeteleCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`DELETE FROM
                                                    categoria as cat
                                                WHERE
                                                    cat.IDCategoria = ?`,[req.body.Cod])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postDeteleCategory: ', error)
    } finally {
        connection.end();
    }
};

//!Subcategory
export const getSubCategoryList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    subca.IDSubCategoria,
                                                    subca.SubCategoria,
                                                    subca.IDCategoria,
                                                    ca.Categoria
                                                FROM
                                                    subcategorias AS subca
                                                LEFT JOIN
                                                    categoria AS ca ON ca.IDCategoria = subca.IDCategoria`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getSubCategoryList: ', error)
    }
}

export const postNewSubCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`INSERT INTO
                                                    subcategorias (SubCategoria, IDCategoria)
                                                VALUES
                                                    (?,?)`,[req.body.SubCategoria, req.body.IdCategoria])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postNewSubCategory: ', error)
    } finally {
        connection.end();
    }
}

export const postUpdateSubCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`UPDATE
                                                    subcategorias
                                                SET
                                                    SubCategoria = ?,
                                                    IDCategoria = ?
                                                WHERE
                                                    IDSubCategoria = ?`,[req.body.SubCategoria, req.body.IdCategoria, req.body.Cod])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postUpdateSubCategory: ', error)
    } finally {
        connection.end();
    }
}

export const postDeteleSubCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`DELETE FROM
                                                    subcategorias as subcat
                                                WHERE
                                                    subcat.IDSubCategoria = ?`,[req.body.Cod])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: error})
        console.log('Error-postDeteleSubCategory: ', error)
    } finally {
        connection.end();
    }
}

//!Products
export const getProductList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                pPos.Consecutivo,
                                                pPos.Cod,
                                                pPos.descripcion,
                                                p.EsUnidadOpaquete,
                                                Cat.Categoria,
                                                SubCat.IDCategoria,
                                                SubCat.SubCategoria,
                                                p.SubCategoria AS IdSubCategoria,
                                                p.CodProovedor,
                                                prov.Proovedor AS proveedor,
                                                p.PCosto,
                                                p.PVenta AS PventaContado,
                                                p.Pventa1 AS PVentaCredito,
                                                p.Pventa2 AS PVentaDistribuidor,
                                                p.Ubicación,
                                                p.Minimo,
                                                p.Maximo,
                                                p.Iva,
                                                p.Agotado,
                                                pPos.SVenta,
                                                pPos.Clase AS IdClase,
                                                clases.Nombre AS Clase,
                                                p.ImgName,
                                                IFNULL(CoorPages.Pag, '') AS Pagina,
                                                IFNULL(CoorPages.xPosition, '') AS CoordenadaX,
                                                IFNULL(CoorPages.yPosition, '') AS CoordenadaY,
                                                p.Nota,
                                                p.Detalle,
                                                p.Grupo,
                                                IFNULL(des.Porcentaje, '') AS DesPorcentaje,
                                                IFNULL(des.APartirDe, '') AS DesApartirDe
                                            FROM
                                                BD_Pos.productos AS pPos
                                            LEFT JOIN
                                                programaembd.productos AS p ON pPos.Cod = p.Cod
                                            LEFT JOIN
                                                programaembd.CoordinatesPages AS CoorPages ON pPos.Consecutivo = CoorPages.Consecutive
                                            LEFT JOIN
                                                programaembd.proovedores AS prov ON p.CodProovedor = prov.Cod
                                            LEFT JOIN 
                                                programaembd.subcategorias AS SubCat ON p.SubCategoria = SubCat.IDSubCategoria
                                            LEFT JOIN
                                                programaembd.categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria
                                            LEFT JOIN
                                                BD_Pos.clases AS clases ON clases.Id = pPos.Clase
                                            LEFT JOIN
						                        programaembd.descuentos AS des ON des.Cod = p.Cod`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getProductList: ', error)
    }
}

export const getClasesList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    cla.Id,
                                                    cla.Nombre
                                                FROM
                                                    BD_Pos.clases AS cla`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getProductList: ', error)
    }
};

export const postUpdateProduct = async (req, res) => {
    const connection = await connect()
    try {
        console.log(req.body)
        await connection.beginTransaction();
        // Actualizar el producto en la base de datos principal
        const updateProductSql = `
        UPDATE
            productos
        SET
            Descripcion = ?, 
            EsUnidadOpaquete = ?, 
            Agotado = ?,
            SubCategoria = ?,
            CodProovedor = ?,
            PCosto =  ?,
            PVenta =  ?,
            PVenta1 = ?,
            PVenta2 = ?,
            Ubicación = ?,
            Iva = ?,
            Minimo = ?,
            Maximo = ?,
            Nota = ?,
            Detalle = ?,
            ImgName = ?,
            Grupo = ?
        WHERE
            Cod = ?`;
        const productValues = [
            req.body.Descripcion,
            req.body.EsunidadOpaquete,
            req.body.Agotado,
            req.body.IdSubCategoria,
            req.body.CodProveedor,
            req.body.PCosto,
            req.body.PventaContado,
            req.body.PVentaCredito,
            req.body.PVentaDistribuidor,
            req.body.Ubicacion,
            req.body.Iva,
            req.body.Minimo,
            req.body.Maximo,
            req.body.Nota,
            req.body.Detalle,
            req.body.ImgNombre,
            req.body.Grupo,
            req.body.Cod
        ];
        await connection.execute(updateProductSql, productValues);

        //! Actualizar el producto  en la base de datos POS
        //Primero obtengo el consecutivo del pro
        const updateProductSql1 = `UPDATE
                                        BD_Pos.productos
                                    SET
                                        Descripcion = ?,
                                        Clase = ?,
                                        SubCategoria = ?,
                                        Detalle = ?,
                                        Iva = ?,
                                        SVenta = ?,
                                        Clase = ?
                                    WHERE
                                        Consecutivo = ?`;
        const productValues1 = [
            req.body.Descripcion,
            req.body.Clase,
            req.body.SubCategoria,
            req.body.Detalle,
            req.body.Iva,
            req.body.SVenta,
            req.body.IdClase,
            req.body.Consecutivo
        ];
        await connection.execute(updateProductSql1, productValues1);
        
        //! Actualiza las coordenadas en el catálogo del producto
        if (req.body.Pagina !== '' &&
            req.body.CoordenadaX !== '' &&
            req.body.CoordenadaY !== '') {
            const updateCoordinatesPages = `INSERT INTO CoordinatesPages (
                                                                        Consecutive,
                                                                        Cod,
                                                                        Pag,
                                                                        xPosition,
                                                                        yPosition)
                                                        VALUES (?,?,?,?,?)
                                                        ON DUPLICATE KEY UPDATE
                                                            Pag = ?,
                                                            xPosition = ?,
                                                            yPosition = ?`
            const coordinatesValues = [
                req.body.Consecutivo,
                req.body.Cod,
                req.body.Pagina,
                req.body.CoordenadaX,
                req.body.CoordenadaY,
                req.body.Pagina,         // para UPDATE
                req.body.CoordenadaX,
                req.body.CoordenadaY
            ];
            await connection.execute(updateCoordinatesPages, coordinatesValues);
        }
        //!Modifica el descuento sobre el producto.
        if (req.body.Pdiscount !== 0 && req.body.Pdiscount !== ''){
            const updateDiscounts = `INSERT INTO descuentos (
                                                                Cod,
                                                                Porcentaje,
                                                                APartirDe
                                                            )
                                                            VALUES (?, ?, ?)
                                                            ON DUPLICATE KEY UPDATE
                                                                Porcentaje = VALUES(Porcentaje),
                                                                APartirDe = VALUES(APartirDe)`
            const discountsValues = [
                req.body.Cod,
                req.body.Pdiscount,
                req.body.Ndiscount
            ];
            await connection.execute(updateDiscounts, discountsValues);
        } else {
            const [rows] = await connection.query(`DELETE FROM descuentos WHERE Cod = ?`,[req.body.Cod])
        }

        //!Modifica la cantidad del producto
        //Primero consulto la cantidad del producto.
        const [rows] = await connection.query(`SELECT
                                                    COALESCE(SUM(
                                                        CASE 
                                                            WHEN tipo = 'entrada' THEN Cantidad
                                                            WHEN tipo = 'salida' THEN -Cantidad
                                                            ELSE 0
                                                        END
                                                    ), 0) AS Cantidad
                                                FROM (
                                                    SELECT 'entrada' AS tipo, Cantidad FROM entradas WHERE Codigo = ?
                                                    UNION ALL
                                                    SELECT 'salida' AS tipo, Cantidad FROM salidas WHERE Codigo = ?
                                                ) AS movimientos`,[req.body.Cod,req.body.Cod])
        const NCantidad = Math.abs(rows[0].Cantidad - req.body.Cantidad)
        console.log(req.body.Fecha)
        if (Number(rows[0].Cantidad) > Number(req.body.Cantidad)) {
            const [restar] = await connection.query(`INSERT INTO salidas (NDePedido,
                                                                          Cantidad,
                                                                          Codigo,
                                                                          Descipción,
                                                                          VrUnitario,
                                                                          Costo,
                                                                          IDSubCategoria,
                                                                          SubCategoria,
                                                                          CodProveedor,
                                                                          Proveedor,
                                                                          CodCliente,
                                                                          Cliente,
                                                                          CodColaborador,
                                                                          Colaborador,
                                                                          FechaDeIngreso,
                                                                          TieneIVA,
                                                                          CodResponsable,
                                                                          Responsable,
                                                                          Porcentaje,
                                                                          APartirDe)
                                                                    VALUES (?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?,
                                                                            ?)`,
                                                                    [0,
                                                                     NCantidad,
                                                                     req.body.Cod,
                                                                     req.body.Descripcion,
                                                                     0,
                                                                     req.body.PCosto,
                                                                     req.body.IdSubCategoria,
                                                                     req.body.SubCategoria,
                                                                     2,
                                                                     'Arreglo de inventario',
                                                                     0,
                                                                     0,
                                                                     req.body.CodResponsable,
                                                                     req.body.Responsable,
                                                                     req.body.Fecha,
                                                                     req.body.Iva,
                                                                     req.body.CodResponsable,
                                                                     req.body.Responsable,
                                                                     '0',
                                                                     '0'])
        } else if (Number(rows[0].Cantidad) < Number(req.body.Cantidad)){
            const [sumar] = await connection.query(`INSERT INTO entradas (Consecutivo,
                                                                        CodProveedor,
                                                                        Proveedor,
                                                                        Cantidad,
                                                                        Codigo,
                                                                        Descripción,
                                                                        Costo,
                                                                        CostoLP,
                                                                        Fecha,
                                                                        Iva,
                                                                        CodResponsable,
                                                                        Responsable)
                                                            VALUES (?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?,
                                                                    ?)`,
                                                                   [0,
                                                                    2,
                                                                    'Arreglo de inventario',
                                                                    NCantidad,
                                                                    req.body.Cod,
                                                                    req.body.Descripcion,
                                                                    0,
                                                                    req.body.PCosto,
                                                                    req.body.Fecha,
                                                                    req.body.Iva,
                                                                    req.body.CodResponsable,
                                                                    req.body.Responsable])
        }

        //!Modifica otros proveedores
        //Crea la lista de otros proveedores
        //primero elimina los datos previos
        const deteleotherSuppliers = `DELETE FROM
                                        otrosproveedores
                                    WHERE
                                        Cod = ?`
        const deteleotherSuppliersValues = [req.body.Cod]
        await connection.execute(deteleotherSuppliers, deteleotherSuppliersValues);
        //Ahora si se crea la tabla
        if (req.body.otrosProveedores.length > 0) {
            const NewOtherSuppliers = `
                INSERT INTO otrosproveedores (Cod, CodP, PCosto, Cantidad)
                VALUES ${req.body.otrosProveedores.map(() => '(?, ?, ?, ?)').join(', ')}
            `;
    
            const NewOtherSuppliersValues = req.body.otrosProveedores.flatMap(supplier => [
                req.body.Cod,         // mismo Cod para todas las filas
                supplier.CodP,
                supplier.PCosto,
                supplier.Cantidad
            ]);
            await connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        }
        // Confirmar la transacción
        await connection.commit();
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log(error);
        await connection.rollback();
        res.status(500).json({sucess: false, error: String(error)})
    } finally {
        await connection.end();
    }
};

export const postOtherSupplier = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT 
                                                    oP.Cod,
                                                    oP.CodP,
                                                    p.Proovedor AS Proveedor,
                                                    oP.PCosto,
                                                    oP.Cantidad
                                                FROM
                                                    otrosproveedores AS oP
                                                LEFT JOIN
                                                    proovedores AS p ON p.Cod = oP.CodP
                                                WHERE
                                                    oP.Cod = ?`,[req.body.Cod])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-postOtherSupplier: ', error)
    }
}

export const quiantityAndDisponible = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    SUM(CASE 
                                                        WHEN tipo = 'entrada' THEN Cantidad
                                                        WHEN tipo = 'salida' THEN -Cantidad
                                                        ELSE 0 END
                                                    ) AS Cantidad,
                                                    SUM(CASE 
                                                        WHEN tipo = 'entrada' THEN Cantidad
                                                        WHEN tipo = 'salida' THEN -Cantidad
                                                        WHEN tipo = 'reservado' THEN -Cantidad
                                                        ELSE 0 END
                                                    ) AS Disponible
                                                FROM (
                                                    SELECT 'entrada' AS tipo, Cantidad FROM entradas WHERE Codigo = ?
                                                    UNION ALL
                                                    SELECT 'salida' AS tipo, Cantidad FROM salidas WHERE Codigo = ?
                                                    UNION ALL
                                                    SELECT 'reservado' AS tipo, f.Cantidad
                                                    FROM flujodeestados f
                                                    WHERE f.Codigo = ?
                                                    AND f.Incompleto = '0'
                                                    AND f.NDePedido IN (
                                                        SELECT NDePedido
                                                        FROM tabladeestados
                                                        WHERE Estado <> 'Anulado'
                                                    )
                                                ) AS movimientos`,[req.body.Cod,req.body.Cod,req.body.Cod])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-quiantityAndDisponible: ', error)
    }
};

export const postNewProduct = async (req, res) => {
    const connection = await connect()
    try {
        console.log(req.body)
        await connection.beginTransaction();
        //! Nuevo producto en la base de datos POS
        const NewProductSqlPos = `
        INSERT INTO
            BD_Pos.productos
            (IdFerreteria,
            Cod,
            Descripcion,
            Clase,
            SubCategoria,
            Detalle,
            Iva,
            SVenta,
            ImgName)
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`;
        const productValuesPos = [
            0,
            req.body.Cod,
            req.body.Descripcion,
            req.body.IdClase,
            req.body.IdSubCategoria,
            req.body.Detalle,
            req.body.Iva,
            req.body.SVenta,
            req.body.ImgNombre
        ];
        await connection.execute(NewProductSqlPos, productValuesPos);
        
        const [rows] = await connection.query(`SELECT
                                                    MAX(Consecutivo) AS Consecutivo
                                                FROM
                                                    BD_Pos.productos`)
        
        const Consecutive = [rows][0].Consecutivo

        //! Nuevo producto en la base de datos principal
        const NewProductSql = `
        INSERT INTO
            programaembd.productos
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`;
        const productValues = [
            req.body.Cod,
            req.body.Descripcion,
            req.body.EsunidadOpaquete,
            req.body.Agotado,
            req.body.IdSubCategoria,
            req.body.CodProveedor,
            req.body.PCosto,
            req.body.PventaContado,
            req.body.PVentaCredito,
            req.body.PVentaDistribuidor,
            req.body.Ubicacion,
            req.body.Iva,
            req.body.Minimo,
            req.body.Maximo,
            req.body.Nota,
            req.body.Detalle,
            req.body.ImgNombre,
            req.body.Grupo
        ];
        await connection.execute(NewProductSql, productValues);
        
        //! Nuevas coordenadas en la base de datos Principal
        if (req.body.Pagina !== '' || 
            req.body.CoordenadaX !== '' ||
            req.body.CoordenadaY !== '')
        {
            const NewCoordinatesSql = `
            INSERT INTO
                CoordinatesPages
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?
            )`;

            const CoordinatesValues = [
                Consecutive,
                req.body.Cod,
                req.body.Pagina,
                req.body.CoordenadaX,
                req.body.CoordenadaY
            ];
            await connection.execute(NewCoordinatesSql, CoordinatesValues);
        }

        if (req.body.Pdiscount !== 0 && req.body.Pdiscount !== ''){
            console.log('Entro en descuentos')
            const updateDiscounts = `INSERT INTO descuentos (
                                                            Cod,
                                                            Porcentaje,
                                                            APartirDe
                                                            ) VALUES (?,?,?)`
            const discountsValues = [
                req.body.Cod,
                req.body.Pdiscount,
                req.body.Ndiscount
            ];
            await connection.execute(updateDiscounts, discountsValues);
        }

        //! Para incertar en a tabla otrosProveedores
        if (req.body.otrosProveedores.length > 0) {
            const NewOtherSuppliers = `
                INSERT INTO otrosproveedores (Cod, CodP, PCosto, Cantidad)
                VALUES ${req.body.otrosProveedores.map(() => '(?, ?, ?, ?)').join(', ')}
            `;
    
            const NewOtherSuppliersValues = req.body.otrosProveedores.flatMap(supplier => [
                req.body.Cod,         // mismo Cod para todas las filas
                supplier.CodP,
                supplier.PCosto,
                supplier.Cantidad
            ]);
            await connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        }

        //! Para insertar una cantidad
        if (req.body.Cantidad !== '' || req.body.Cantidad !== 0) {
            if (req.body.Cantidad > 0) {
                const NewEntradasSql = `
                INSERT INTO
                    entradas
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )`;

                const EntradasValues = [
                    '000',
                    '2',
                    'Arreglo de inventario',
                    req.body.Cantidad,
                    req.body.Cod,
                    req.body.Descripcion,
                    '0',
                    req.body.PCosto,
                    req.body.Fecha,
                    req.body.Iva,
                    req.body.CodResponsable,
                    req.body.Responsable
                ];
                await connection.execute(NewEntradasSql, EntradasValues);
            } else {
                const NewSalidasSql = `
                INSERT INTO
                    salidas
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )`;

                const SalidasValues = [
                    '000',
                    '2',
                    'Arreglo de inventario',
                    req.body.Cantidad,
                    req.body.Cod,
                    req.body.Descripcion,
                    '0',
                    req.body.PCosto,
                    req.body.Fecha,
                    req.body.Iva,
                    req.body.CodResponsable,
                    req.body.Responsable,
                    '0',
                    '0'
                ];
                await connection.execute(NewSalidasSql, SalidasValues);
            }
        }

        //await connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        // Confirmar la transacción
        await connection.commit();
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log(error)
        await connection.rollback();
        res.status(500).json({sucess: false, error: String(error)})
    } finally {
        await connection.end();
    }
};

export const quiantityProductList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                pPos.Consecutivo,
                                                pPos.Cod,
                                                pPos.Descripcion,
                                                p.EsUnidadOpaquete,
                                                Cat.Categoria,
                                                SubCat.IDCategoria,
                                                SubCat.SubCategoria,
                                                p.SubCategoria AS IdSubCategoria,
                                                p.CodProovedor,
                                                prov.Proovedor AS proveedor,
                                                p.PCosto,
                                                p.PVenta AS PventaContado,
                                                p.Pventa1 AS PVentaCredito,
                                                p.Pventa2 AS PVentaDistribuidor,
                                                p.Ubicación,
                                                p.Minimo,
                                                p.Maximo,
                                                p.Iva,
                                                p.Agotado,
                                                pPos.SVenta,
                                                pPos.Clase AS IdClase,
                                                clases.Nombre AS Clase,
                                                p.ImgName,
                                                IFNULL(CoorPages.Pag, '') AS Pagina,
                                                IFNULL(CoorPages.xPosition, '') AS CoordenadaX,
                                                IFNULL(CoorPages.yPosition, '') AS CoordenadaY,
                                                p.Nota,
                                                p.Detalle,
                                                p.Grupo,
                                                IFNULL(des.Porcentaje, '') AS DesPorcentaje,
                                                IFNULL(des.APartirDe, '') AS DesApartirDe,
                                                IFNULL(e.TotalEntrada, 0) - IFNULL(s.TotalSalida, 0) AS Cantidad
                                            FROM
                                                BD_Pos.productos AS pPos
                                            LEFT JOIN
                                                programaembd.productos AS p ON pPos.Cod = p.Cod
                                            LEFT JOIN
                                                programaembd.CoordinatesPages AS CoorPages ON pPos.Consecutivo = CoorPages.Consecutive
                                            LEFT JOIN
                                                programaembd.proovedores AS prov ON p.CodProovedor = prov.Cod
                                            LEFT JOIN 
                                                programaembd.subcategorias AS SubCat ON p.SubCategoria = SubCat.IDSubCategoria
                                            LEFT JOIN
                                                programaembd.categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria
                                            LEFT JOIN
                                                BD_Pos.clases AS clases ON clases.Id = pPos.Clase
                                            LEFT JOIN
                                            programaembd.descuentos AS des ON des.Cod = p.Cod
                                            -- Subconsulta para entradas
                                                                LEFT JOIN (
                                                                    SELECT
                                                Codigo,
                                                SUM(Cantidad) AS TotalEntrada
                                                                    FROM
                                                programaembd.entradas
                                                                    GROUP BY
                                                Codigo
                                                                ) AS e ON e.Codigo = p.Cod

                                                                -- Subconsulta para salidas
                                                                LEFT JOIN (
                                                                    SELECT 
                                                Codigo,
                                                SUM(Cantidad) AS TotalSalida
                                                                    FROM
                                                programaembd.salidas
                                                                    GROUP BY Codigo
                                                                ) AS s ON s.Codigo = p.Cod
                                            WHERE
                                            pPos.SVenta = '1'`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-postOtherSupplier: ', error)
    }
};

export const CoordinatesPagesList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    Consecutive,
                                                    Cod,
                                                    Pag,
                                                    xPosition,
                                                    yPosition
                                                FROM
                                                    CoordinatesPages`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-CoordinatesPagesList: ', error)
    }
};

//!Supplier
export const postNewSupplier = async(req,res)=>{
    const connection = await connect()
    try {
        const [NewClient] = await connection.query(`INSERT INTO proovedores (
                                                                    NIt,
                                                                    Proovedor,
                                                                    Contacto,
                                                                    Telefono,
                                                                    Cel,
                                                                    Email,
                                                                    Web,
                                                                    Direccion,
                                                                    Ruta,
                                                                    Nota,
                                                                    VerificacionNit,
                                                                    Geolocalizacion
                                                                    )
                                                VALUES (
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?,
                                                        ?)`,
                                            [
                                                req.body.NitCc,
                                                req.body.Proveedor,
                                                req.body.Contacto,
                                                req.body.Telefono,
                                                req.body.Cel,
                                                req.body.Email,
                                                req.body.Web,
                                                req.body.Direccion,
                                                req.body.Ruta,
                                                req.body.Nota,
                                                req.body.CV,
                                                req.body.Geolocalizacion
                                            ])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postNewSupplier: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const postUpdateSupplier = async(req,res)=>{
    const connection = await connect()
    try {
        const [NewClient] = await connection.query(`UPDATE
                                                        proovedores
                                                    SET
                                                        NIt = ?,
                                                        Proovedor = ?,
                                                        Contacto = ?,
                                                        Telefono = ?,
                                                        Cel = ?,
                                                        Email = ?,
                                                        Web = ?,
                                                        Direccion = ?,
                                                        Ruta = ?,
                                                        Nota = ?,
                                                        VerificacionNit = ?,
                                                        Geolocalizacion = ?
                                                    WHERE
                                                        Cod = ?`
                                                        ,
                                            [
                                                req.body.NitCc,
                                                req.body.Proveedor,
                                                req.body.Contacto,
                                                req.body.Telefono,
                                                req.body.Cel,
                                                req.body.Email,
                                                req.body.Web,
                                                req.body.Direccion,
                                                req.body.Ruta,
                                                req.body.Nota,
                                                req.body.CV,
                                                req.body.Geolocalizacion,
                                                req.body.Cod
                                            ])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postUpdateSupplier: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const getSupplierList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    pro.Cod,
                                                    pro.Nit,
                                                    pro.VerificacionNit,
                                                    pro.Proovedor,
                                                    pro.Contacto,
                                                    pro.Telefono,
                                                    pro.Cel,
                                                    pro.Email,
                                                    pro.Web,
                                                    pro.Direccion,
                                                    pro.Ruta,
                                                    pro.Geolocalizacion,
                                                    pro.Nota
                                                FROM
                                                    proovedores AS pro
                                                WHERE
	                                                pro.Cod <> 1 AND pro.Cod <> 2`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getSupplierList: ', error)
    }
};
//!Purchase

export const postNewPurchase = async(req,res)=>{
    const connection = await connect()
    try {
        await connection.beginTransaction(); //INICIA LA TRANSACCIÓN
        const [consecutivo] = await connection.query(`SELECT
                                                            MAX(Consecutivo)+1 As Con
                                                        FROM
                                                            entradas`)
        const PurchasingHeader = `INSERT INTO
                                    cabeceracompras
                                    (
                                        Consecutivo,    
                                        NFactura,
                                        CodProveedor,
                                        Fecha,
                                        FechaFactura,
                                        FechaVencimiento,
                                        Dias,
                                        Iva,
                                        RTF,
                                        CodResponsable,
                                        ContadoCredito
                                    )
                                VALUES (
                                    ?,    
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?
                                )`
        const PurchasingHeaderValue = [
                                    consecutivo[0].Con,
                                    req.body.Nfactura,
                                    req.body.CodSupplier,
                                    req.body.Date,
                                    req.body.InvoiceDate,
                                    req.body.ExpirationDate,
                                    req.body.CreditDays,
                                    req.body.Iva? 1: 0,
                                    req.body.Retefuente,
                                    req.body.ResponsibleCode,
                                    req.body.ContadoOCredito
                                    ]
        await connection.execute(PurchasingHeader, PurchasingHeaderValue);
        
        if (req.body.PurchaseEntranseL.length > 0) {
            const EntranseList = `
            INSERT INTO
                    entradas (
                                Consecutivo,
                                CodProveedor,
                                Proveedor,
                                Cantidad,
                                Codigo,
                                Descripción,
                                Costo,
                                CostoLP,
                                Fecha,
                                IVA,
                                CodResponsable,
                                Responsable
                            )
                VALUES ${req.body.PurchaseEntranseL.map(() => '(?,?,?,?,?,?,?,?,?,?,?,?)').join(', ')}
            `;
    
            const EntranseListValues = req.body.PurchaseEntranseL.flatMap(product => [
                consecutivo[0].Con,
                req.body.CodSupplier,
                req.body.Supplier,
                product.Cantidad,
                product.Codigo,
                product.Descripcion,
                product.UIva,
                product.CostoLP,
                req.body.Date,
                product.TotalIva,
                req.body.ResponsibleCode,
                req.body.ContadoOCredito
            ]);
            await connection.execute(EntranseList, EntranseListValues);
        }

        if (req.body.ContadoOCredito === 'Contado'){
            const NewNewPurchasePass = `INSERT INTO
                                            abonoscompras
                                            (
                                                Consecutivo,
                                                RC,
                                                Fecha,
                                                CodProveedor,
                                                Abono
                                            )
                                        VALUES (
                                            ?,
                                            ?,
                                            ?,
                                            ?,
                                            ?
                                        )`

            const NewNewPurchasePassValues = [
                                                consecutivo[0].Con,
                                                0,
                                                req.body.Date,
                                                req.body.CodSupplier,
                                                req.body.Total
                                            ]
            console.log('req.body.Total', req.body.Total)
            await connection.execute(NewNewPurchasePass, NewNewPurchasePassValues);
        }
        await connection.commit(); //GUARDA TODO SI NADA FALLÓ
        res.status(200).json({sucess: true, error: '', Consecutivo: consecutivo[0].Con})
    } catch (error) {
        await connection.rollback(); //DESHACE TODO LO QUE SE INSERTÓ
        console.log('Error-postNewPurchase: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const postUpdatePurchase = async(req,res)=>{
    const connection = await connect()
    try {
        const PurchasingHeader = `UPDATE
                                    cabeceracompras SET
                                        NFactura = ?,
                                        CodProveedor = ?,
                                        Fecha = ?,
                                        FechaFactura = ?,
                                        FechaVencimiento = ?,
                                        Dias = ?,
                                        Iva = ?,
                                        RTF = ?,
                                        CodResponsable = ?,
                                        ContadoCredito = ?
                                    WHERE
                                        Consecutivo = ?`
        const PurchasingHeaderValue = [
                                    req.body.Nfactura,
                                    req.body.CodSupplier,
                                    req.body.Date,
                                    req.body.InvoiceDate,
                                    req.body.ExpirationDate,
                                    req.body.CreditDays,
                                    req.body.Iva? 1: 0,
                                    req.body.Retefuente,
                                    req.body.ResponsibleCode,
                                    req.body.ContadoOCredito,
                                    req.body.Consecutive
                                    ]
        await connection.execute(PurchasingHeader, PurchasingHeaderValue);
        //Delete the data from entradas
        const DeleteEntranse = `DELETE FROM entradas WHERE Consecutivo = ?`
        const DeleteEntranseValues = [req.body.Consecutive]
        await connection.execute(DeleteEntranse, DeleteEntranseValues);

        if (req.body.PurchaseEntranseL.length > 0) {
            const EntranseList = `INSERT INTO
                    entradas (
                                Consecutivo,
                                CodProveedor,
                                Proveedor,
                                Cantidad,
                                Codigo,
                                Descripción,
                                Costo,
                                CostoLP,
                                Fecha,
                                IVA,
                                CodResponsable,
                                Responsable
                            )
                VALUES ${req.body.PurchaseEntranseL.map(() => '(?,?,?,?,?,?,?,?,?,?,?,?)').join(', ')}
            `;
    
            const EntranseListValues = req.body.PurchaseEntranseL.flatMap(product => [
                req.body.Consecutive,
                req.body.CodSupplier,
                req.body.Supplier,
                product.Cantidad,
                product.Codigo,
                product.Descripcion,
                product.UIva,
                product.CostoLP,
                req.body.Date,
                product.TotalIva,
                req.body.ResponsibleCode,
                req.body.ContadoOCredito
            ]);
            await connection.execute(EntranseList, EntranseListValues);
        }
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postNewPurchase: ', error)
        res.status(500).json({sucess: false, error: error.message});
    } finally {
        connection.end();
    }
};

export const getEntrantsList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT E.Consecutivo,
                                                    E.Cantidad,
                                                    E.Codigo AS Cod,
                                                    E.Descripción AS Descripcion,
                                                    E.costo AS VrUnitario,
                                                    E.CodProveedor,
                                                    E.Proveedor,
                                                    E.Fecha,
                                                    cc.FechaFactura,
                                                    cc.NFactura
                                                FROM
                                                    entradas AS E
                                                LEFT JOIN
                                                    cabeceracompras AS cc ON cc.Consecutivo = E.Consecutivo
                                                WHERE
                                                    E.Proveedor <> 'Nuevo Producto al inventario' AND E.Proveedor <> 'Arreglo de inventario'
                                                GROUP BY
                                                    E.Consecutivo, E.Cantidad, E.Codigo, E.Descripción, E.costo, E.CodProveedor, E.Proveedor, E.Fecha
                                                ORDER BY
                                                    E.Fecha DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getEntrantsList: ', error)
    }
};

export const getPurchaseList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    cab.Consecutivo,
                                                    cab.NFactura,
                                                    cab.CodProveedor,
                                                    prov.Proovedor,
                                                    prov.Telefono,
                                                    prov.Direccion,
                                                    cab.Fecha,
                                                    cab.FechaFactura,
                                                    cab.FechaVencimiento,
                                                    cab.Dias,
                                                    cab.Iva,
                                                    cab.RTF,
                                                    cab.CodResponsable,
                                                    cab.ContadoCredito,
                                                    CONCAT(col.Nombre, ' ' ,col.Apellido) AS Responsable,
                                                    SUM(ent.Cantidad * ent.Costo) AS Total
                                                FROM 
                                                    cabeceracompras AS cab
                                                JOIN 
                                                    proovedores AS prov ON cab.CodProveedor = prov.Cod
                                                LEFT JOIN 
                                                    entradas AS ent ON cab.Consecutivo = ent.Consecutivo
                                                LEFT JOIN
                                                    colaboradores AS col ON col.Cod = cab.CodResponsable
                                                GROUP BY 
                                                    cab.Consecutivo
                                                ORDER BY
                                                    cab.Consecutivo DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPurchaseList: ', error)
    }
};

export const getPartialPaymentPurchase = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    ac.Consecutivo,
                                                    IFNULL(SUM(ac.abono), 0) AS Saldo
                                                FROM
                                                    abonoscompras AS ac
                                                GROUP BY 
                                                    ac.Consecutivo`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPartialPaymentPurchase: ', error)
    }
};

export const getPPPurchase = async(req,res)=>{
    try {
        const connection = await connect()
        let PurchasePP = `SELECT
                                ac.Consecutivo,
                                ac.RC,
                                ac.Fecha,
                                ac.Abono
                            FROM
                                abonoscompras AS ac
                            WHERE
                                ac.Consecutivo = ?`
        if (req.body.type === 'Ventas') {
            PurchasePP = `SELECT
                            av.Consecutivo,
                            av.RC,
                            av.Fecha,
                            av.Abono
                        FROM
                            abonosventas AS av
                        WHERE
                            av.Consecutivo = ?`
        }
        const [rows] = await connection.query(PurchasePP,[req.body.Consecutivo])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPPPurchase: ', error)
    }
};

export const postMakePP = async(req,res)=>{
    const connection = await connect()
    try {
        let MakePP = `INSERT INTO
                            abonoscompras
                            (
                            Consecutivo,
                            RC,
                            Fecha,
                            CodProveedor,
                            Abono
                            )
                        VALUES
                            (?,?,?,?,?)`
        let Values = [
                        req.body.Consecutivo,
                        req.body.RC,
                        req.body.Fecha,
                        req.body.CodProveedor,
                        req.body.Abono
                        ]
        if (req.body.type === 'Ventas') {
            MakePP = `INSERT INTO
                                    abonosventas
                                    (
                                    Consecutivo,
                                    RC,
                                    Fecha,
                                    Abono
                                    )
                                VALUES
                                    (?,?,?,?)`
            Values = [
                        req.body.NDePedido,
                        req.body.RC,
                        req.body.Fecha,
                        req.body.Abono
                    ]
        }
        await connection.execute(MakePP, Values)
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postMakePP: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const postDeletePP = async(req,res)=>{
    const connection = await connect()
    try {
        let deletePP = `DELETE FROM
                            abonoscompras
                        WHERE
                            RC = ? and Consecutivo = ?`

        let Values = [req.body.RC,
                      req.body.Consecutivo
                     ]
        if (req.body.type === 'Ventas') {
            deletePP = `DELETE FROM
                            abonosventas
                        WHERE
                            RC = ? and Consecutivo = ?`
            Values = [req.body.RC,
                      req.body.Consecutivo
                     ]
        }
        await connection.execute(deletePP, Values)
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postMakePP: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

//!Entered
export const getEnteredList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    te.NDePedido,
                                                    (cli.Ferreteria) AS Cliente,
                                                    te.FechaFactura AS FechaOdePedido,
                                                    te.FechaDeEntrega,
                                                    ROUND(SUM(
                                                    CASE
                                                    WHEN
                                                        ti.Cantidad > ti.APartirDe 
                                                    THEN
                                                        ti.Cantidad*ti.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100) * (1 - (ti.Porcentaje/100))
                                                    ELSE
                                                        ti.Cantidad*ti.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100)
                                                    END),2) AS Total
                                                FROM
                                                    tabladeestados AS te
                                                LEFT JOIN
                                                    tabladeingresados AS ti ON ti.NDePedido = te.NDePedido
                                                LEFT JOIN
                                                    clientes AS cli ON cli.Cod = te.CodCliente
                                                LEFT JOIN
                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido
                                                LEFT JOIN
                                                    Cupones AS cu ON cu.Cupon = cr.Cupon
                                                WHERE
                                                    te.Estado = 'Ingresado'
                                                GROUP BY
                                                    te.NDePedido`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getEnteredList: ', error)
    }
};
//!Entered
export const getStatusList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT 
                                                    ES.NDePedido,
                                                    ES.CodCliente,
                                                    cli.Ferreteria AS Cliente,
                                                    ES.FechaFactura,

                                                    IFNULL(ROUND(TI.Valor,2),0) AS Valor,

                                                    ES.TipoDePago,
                                                    ES.Estado,

                                                    IFNULL(ROUND(SA.ValorFinal,2),0) AS ValorFinal,

                                                    ES.FechaDeEstado,
                                                    ES.FechaDeEntrega,
                                                    ES.ProcesoDelPedido,
                                                    ES.CodColaborador,
                                                    ES.TieneIva,
                                                    ES.FechaVencimiento,
                                                    ES.Repartidor,
                                                    IFNULL(col.Nombre,'') AS NombreRepartidor,
                                                    ES.NotaVenta,
                                                    ES.NotaEntrega,
                                                    ES.VECommerce,
                                                    IFNULL(fElect.Prefijo,'') AS Prefijo,
                                                    IFNULL(fElect.FacturaElectronica,'') AS FacturaElectronica
                                                FROM tabladeestados ES

                                                LEFT JOIN clientes cli 
                                                    ON cli.Cod = ES.CodCliente

                                                LEFT JOIN colaboradores col 
                                                    ON col.Cod = ES.Repartidor

                                                LEFT JOIN felectronica fElect 
                                                    ON fElect.NFactura = ES.NDePedido

                                                /* ===== SUBCONSULTA: VALOR (INGRESADOS) ===== */
                                                LEFT JOIN (
                                                    SELECT
                                                        ti.NDePedido,
                                                        IFNULL(SUM(
                                                            CASE 
                                                                WHEN ti.Cantidad > ti.APartirDe THEN
                                                                    ti.Cantidad * ti.VrUnitario
                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)
                                                                    * (1 - IFNULL(ti.Porcentaje,0)/100)
                                                                ELSE
                                                                    ti.Cantidad * ti.VrUnitario
                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)
                                                            END
                                                        ),0) AS Valor
                                                    FROM tabladeingresados ti
                                                    LEFT JOIN CRedimidos cr 
                                                        ON cr.NPedido = ti.NDePedido
                                                    LEFT JOIN Cupones cu 
                                                        ON cu.Cupon = cr.Cupon
                                                    GROUP BY ti.NDePedido
                                                ) TI 
                                                    ON TI.NDePedido = ES.NDePedido

                                                /* ===== SUBCONSULTA: VALOR FINAL (SALIDAS) ===== */
                                                LEFT JOIN (
                                                    SELECT
                                                        sa.NDePedido,
                                                        IFNULL(SUM(
                                                            CASE 
                                                                WHEN sa.Cantidad > sa.APartirDe THEN
                                                                    sa.Cantidad * sa.VrUnitario
                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)
                                                                    * (1 - IFNULL(sa.Porcentaje,0)/100)
                                                                ELSE
                                                                    sa.Cantidad * sa.VrUnitario
                                                                    * (1 - IFNULL(cu.Porcentaje,0)/100)
                                                            END
                                                        ),0) AS ValorFinal
                                                    FROM salidas sa
                                                    LEFT JOIN CRedimidos cr 
                                                        ON cr.NPedido = sa.NDePedido
                                                    LEFT JOIN Cupones cu 
                                                        ON cu.Cupon = cr.Cupon
                                                    GROUP BY sa.NDePedido
                                                ) SA 
                                                    ON SA.NDePedido = ES.NDePedido

                                                ORDER BY ES.NDePedido DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getStatusList: ', error)
    }
};

export const getPPSales = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    te.NDePedido,
                                                    te.FechaFactura,
                                                    te.CodCliente,
                                                    cli.Ferreteria,
                                                    cli.Contacto,
                                                    cli.Telefono,
                                                    cli.Cel,
                                                    te.TipoDePago,
                                                    te.FechaVencimiento,
                                                    IFNULL(ROUND(SUM(
                                                    CASE WHEN
                                                        sa.Cantidad > sa.APartirDe
                                                    THEN
                                                        sa.Cantidad * sa.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100) * (1 - IFNULL(sa.Porcentaje,0)/100)
                                                    ELSE
                                                        sa.Cantidad * sa.VrUnitario * (1- IFNULL(cu.Porcentaje,0)/100)
                                                    END),2),0) AS Total
                                                FROM
                                                    tabladeestados AS te
                                                LEFT JOIN
                                                    clientes AS cli ON cli.Cod = te.CodCliente
                                                LEFT JOIN
                                                    salidas AS sa ON sa.NDePedido = te.NDePedido
                                                LEFT JOIN
                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido
                                                LEFT JOIN
                                                    Cupones AS cu ON cu.Cupon = cr.Cupon
                                                WHERE
                                                    te.Estado = 'Cerrado'
                                                GROUP BY
                                                    te.NDePedido
                                                ORDER BY
                                                    te.NDePedido DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPPSales: ', error)
    }
};

export const getPPSalesBalances = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    ab.Consecutivo AS NDePedido,
                                                    IFNULL(ROUND(SUM(ab.Abono),2),0) AS Saldo
                                                FROM
                                                    abonosventas AS ab
                                                GROUP BY 
                                                    ab.Consecutivo
                                                ORDER BY
                                                    ab.Consecutivo DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPPSalesBalances: ', error)
    }
};

export const getCreditNotes = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                dev.Consecutivo,
                                                dev.N_Pedido,
                                                cli.Ferreteria,
                                                DATE(dev.FechaInterna) AS FechaInterna,
                                                dev.Total,
                                                dev.Motivo,
                                                dev.ConDian,
                                                DATE(dev.FechaDian) AS FechaDian,
                                                dev.FElectronica,
                                                dev.ConsecutivoEn,
                                                dev.PrefDian
                                            FROM
                                                Devoluciones AS dev
                                                LEFT JOIN
                                                    tabladeestados AS tde ON tde.NDePedido = dev.N_Pedido
                                                LEFT JOIN
                                                    clientes AS cli ON cli.Cod =  tde.CodCliente
                                            ORDER BY
                                                dev.Consecutivo DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getCreditNotes: ', error)
    }
};

export const getPreparationList = async(req,res)=>{
    try {
        const connection = await connect()
        const orderList = req.body.NPedidoList.join(',');
        const [rows] = await connection.query(`SELECT
                                                    ti.NDePedido,
                                                    te.CodCliente,
                                                    cli.Ferreteria,
                                                    ti.Codigo,
                                                    pro.Descripcion,
                                                    ti.VrUnitario,
                                                    ti.Costo,
                                                    pro.Ubicación,
                                                    te.FechaDeEntrega,
                                                    prov.Proovedor AS Proveedor,
                                                    ti.Cantidad,
                                                    movs.Disponible,
                                                    ti.Porcentaje,
                                                    ti.APartirDe
                                                FROM tabladeingresados AS ti
                                                LEFT JOIN productos AS pro ON ti.Codigo = pro.Cod
                                                LEFT JOIN proovedores as prov On prov.Cod = pro.CodProovedor
                                                LEFT JOIN tabladeestados AS te ON te.NDePedido = ti.NDePedido
                                                LEFT JOIN clientes AS cli ON cli.Cod = te.CodCliente
                                                LEFT JOIN (
                                                    SELECT
                                                        Codigo,
                                                        SUM(CASE 
                                                            WHEN tipo = 'entrada' THEN Cantidad
                                                            WHEN tipo = 'salida' THEN -Cantidad
                                                            ELSE 0 END) AS Cantidad,
                                                        SUM(CASE 
                                                            WHEN tipo = 'entrada' THEN Cantidad
                                                            WHEN tipo = 'salida' THEN -Cantidad
                                                            WHEN tipo = 'reservado' THEN -Cantidad
                                                            ELSE 0 END) AS Disponible
                                                    FROM (
                                                        SELECT Codigo, 'entrada' AS tipo, Cantidad FROM entradas
                                                        UNION ALL
                                                        SELECT Codigo, 'salida' AS tipo, Cantidad FROM salidas
                                                        UNION ALL
                                                        SELECT f.Codigo, 'reservado' AS tipo, f.Cantidad
                                                        FROM flujodeestados f
                                                        WHERE f.Incompleto = '0'
                                                        AND f.NDePedido IN (
                                                            SELECT NDePedido FROM tabladeestados WHERE Estado <> 'Anulado'
                                                        )
                                                    ) AS movimientos
                                                    GROUP BY Codigo
                                                ) AS movs ON movs.Codigo = ti.Codigo
                                                WHERE ti.NDePedido IN (?) ORDER BY FIELD(ti.NDePedido, ${orderList})`,[req.body.NPedidoList])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPreparationList: ', error)
    }
};

export const postStateFlow = async(req,res)=>{
    const connection = await connect()
    try {
        await connection.beginTransaction(); //INICIA LA TRANSACCIÓN
        const placeholders = req.body.FlowData.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
        const NewFlujoDeEstados = `INSERT INTO flujodeestados (
                                                            NDePedido,
                                                            Cantidad,
                                                            Codigo,
                                                            VrUnitario,
                                                            Costo,
                                                            Hora,
                                                            Incompleto,
                                                            Porcentaje,
                                                            APartirDe
                                                            )
                                                VALUES ${placeholders}`
        const NewFlujoDeEstadosValues = req.body.FlowData.flat();
        
        await connection.execute(NewFlujoDeEstados, NewFlujoDeEstadosValues);

        const UpdateStates = `UPDATE tabladeestados
                                SET Estado = 'Alistado',
                                    FechaDeEstado = ?
                                WHERE NDePedido IN (${req.body.NpedidoList.map(() => '?').join(', ')});
                                `;
        const UpdateStatesValues = [req.body.Date + ' ' + req.body.Hour, ...req.body.NpedidoList]
        await connection.execute(UpdateStates, UpdateStatesValues);
        await connection.commit(); // GUARDA TODO SI NADA FALLÓ
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        await connection.rollback(); //DESHACE TODO LO QUE SE INSERTÓ
        console.log('Error-postStateFlow: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const getPendingList = async(req,res)=>{
    
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                ROW_NUMBER() OVER (ORDER BY flu.Codigo)-1 AS indice,
                                                flu.cantidad,
                                                flu.Codigo,
                                                p.Descripcion,
                                                p.PCosto,
                                                p.Iva,
                                                cli.Ferreteria,
                                                pro.cod AS CodPro,
                                                pro.Proovedor,
                                                pro.Telefono,
                                                pro.Direccion,
                                                te.FechaDeEntrega
                                            FROM
                                                flujodeestados AS flu 
                                            JOIN
                                                tabladeestados AS te ON te.NDePedido = flu.NDePedido
                                            JOIN
                                                productos AS p ON flu.Codigo = p.Cod
                                            LEFT JOIN
                                                proovedores AS pro ON pro.cod = p.CodProovedor
                                            LEFT JOIN
                                                clientes AS cli ON cli.Cod = te.CodCliente
                                            WHERE
                                                (te.Estado = 'Alistado' OR te.Estado = 'Verificado') AND flu.Incompleto = 1`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPendingList: ', error)
    }
};

export const postOntheRoute = async(req,res)=>{
    const connection = await connect()
    try {
        const updateDelivery = `UPDATE 
                                        tabladeestados
                                    SET 
                                        ProcesoDelPedido = 'En ruta',
                                        Repartidor = ?
                                    WHERE
                                        NDePedido = ?`
        const updateDeliveryValues = [req.body.CodDelivery, req.body.NDePedido];
        
        await connection.execute(updateDelivery, updateDeliveryValues);
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postStateFlow: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const getSpecificPurchase = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                en.Cantidad,
                                                en.Codigo,
                                                en.Descripción AS Descripcion,
                                                en.Costo - en.Iva AS Costo,
                                                pro.Iva AS Iva,
                                                en.Costo AS UIva,
                                                en.Cantidad *(en.Costo) AS Total,
                                                en.CostoLP
                                            FROM
                                                entradas AS en
                                                LEFT JOIN productos AS pro ON pro.Cod = en.Codigo
                                            WHERE
                                                en.Consecutivo = ?`,[req.body.Consecutivo])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getSpecificPurchase: ', error)
    }
};

//!Alias
export const getAliasList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    Alias
                                                FROM
                                                    alias
                                                WHERE
                                                    Cod = ?`,[req.body.Cod])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getAliasList: ', error)
    }
};

export const postNewAlias = async(req,res)=>{
    const connection = await connect()
    try {
        const newAlias = `INSERT INTO
                                    alias
                                VALUES (?,?)`
        const newAliasValues = [req.body.Cod, req.body.Alias];
        
        await connection.execute(newAlias, newAliasValues);
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postNewAlias: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};

export const postDeleteAlias = async(req,res)=>{
    const connection = await connect()
    try {
        const newAlias = `DELETE FROM alias WHERE Cod = ? AND Alias = ?`
        const newAliasValues = [req.body.Cod, req.body.Alias];
        
        await connection.execute(newAlias, newAliasValues);
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postDeleteAlias: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
};
//!Verify
export const getOrderHeader = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    te.NDePedido,
                                                    cli.Cod,
                                                    cli.Ferreteria,
                                                    cli.Nit,
                                                    cli.Contacto,
                                                    cli.Direccion,
                                                    cli.Telefono,
                                                    cli.Cel,
                                                    cli.Email,
                                                    cli.Barrio,
                                                    cli.Pos,
                                                    te.CodColaborador,
                                                    CONCAT(col.Nombre, ' ', col.Apellido) AS colaborador,
                                                    te.Estado,
                                                    te.FechaDeEntrega,
                                                    te.FechaFactura,
                                                    te.ProcesoDelPedido,
                                                    te.FechaVencimiento,
                                                    te.TipoDePago,
                                                    te.TieneIva,
                                                    te.NotaVenta,
                                                    te.NotaEntrega,
                                                    te.VECommerce,
                                                    IFNULL(cu.Porcentaje,0) AS CuPorcentaje
                                                FROM
                                                    tabladeestados AS te
                                                LEFT JOIN
                                                    clientes AS cli ON te.CodCliente = cli.Cod
                                                LEFT JOIN
                                                    colaboradores AS col ON te.CodColaborador = col.Cod
                                                LEFT JOIN
                                                    CRedimidos AS cr ON cr.NPedido = te.NDePedido
                                                LEFT JOIN
                                                    Cupones AS cu ON cu.Cupon = cr.Cupon
                                                WHERE
                                                    te.NDePedido = ?`, [req.body.NDePedido])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getOrderHeader: ', error)
    }
};

export const getOrderDetail = async(req,res)=>{
    try {
        const connection = await connect()
        let query = ''
        if (req.body.status === 'Ingresado'){
            query = `SELECT
                        ti.Cantidad AS Cantidad,
                        ti.Codigo AS Codigo,
                        pro.Descripcion,
                        ti.VrUnitario,
                        ti.Costo,
                        pro.Iva,
                        ti.ApartirDe AS DesApartirDe,
                        ti.Porcentaje AS DesPorcentaje
                    FROM
                        tabladeingresados AS ti
                    LEFT JOIN
                        productos AS pro ON ti.Codigo = pro.Cod
                    WHERE
                        ti.NDePedido = ?`
        } else if (req.body.status === 'Cerrado') {
            query = `SELECT
                        sa.Cantidad,
                        sa.Codigo,
                        sa.Descipción AS Descripcion,
                        sa.VrUnitario,
                        sa.Costo,
                        sa.TieneIVA as Iva,
                        sa.ApartirDe AS DesApartirDe,
                        sa.Porcentaje AS DesPorcentaje
                    FROM
                        salidas AS sa
                    WHERE
                        sa.NDePedido = ?`
        } else {
            query = `SELECT
                        flu.Cantidad AS Cantidad,
                        flu.Codigo AS Codigo,
                        pro.Descripcion AS Descripcion,
                        flu.VrUnitario,
                        flu.Costo,
                        pro.Iva,
                        pro.SubCategoria AS IDSubCategoria,
                        subc.SubCategoria,
                        pro.CodProovedor AS CodProveedor,
                        prov.Proovedor AS Proveedor,
                        flu.ApartirDe AS DesApartirDe,
                        flu.Porcentaje AS DesPorcentaje,
                        flu.Incompleto AS Estado
                    FROM
                        flujodeestados AS flu
                    LEFT JOIN
                        productos AS pro ON pro.Cod = flu.Codigo
                    LEFT JOIN
                        proovedores AS prov ON prov.Cod = pro.CodProovedor
                    LEFT JOIN
                        subcategorias AS subc ON subc.IDSubCategoria = pro.SubCategoria
                    WHERE
                        flu.NDePedido = ?`
        }
        const data = [req.body.NDeFactura]
        const [rows] = await connection.query(query, data)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getOrderDetail: ', error)
    }
};

export const updateOrder = async(req,res)=>{
    const connection = await connect()
    try {
        await connection.beginTransaction(); //INICIA LA TRANSACCIÓN
        if (req.body.Estado === 'Ingresado'){
            const deleteData = await connection.query(`
                DELETE FROM
                    tabladeingresados
                WHERE
                    NDePedido = ?
                `,[req.body.NDePedido])
            const query = `INSERT INTO
                        tabladeingresados
                    VALUES
                        ${req.body.Order.map(() => '(?,?,?,?,?,?,?)').join(', ')}
                    `
            const data = req.body.Order.flatMap(product => [
                req.body.NDePedido,
                product.Cantidad,
                product.Codigo,
                product.VrUnitario,
                product.Costo,
                product.DesPorcentaje,
                product.DesApartirDe,
            ]);
            const ActualizarEstado = await connection.query(`UPDATE
                                                                    tabladeestados
                                                                SET 
                                                                    FechaDeEstado = ?,
                                                                    NotaVenta = ?,
                                                                    NotaEntrega = ?,
                                                                    TieneIva = ?
                                                                WHERE
                                                                    NDePedido = ?`, [req.body.Fecha,
                                                                                     req.body.NotaVenta,
                                                                                     req.body.NotaEntrega,
                                                                                     req.body.Iva,
                                                                                     req.body.NDePedido])
            const [rows] = await connection.query(query, data)
            res.status(200).json({sucess: true, error: ''})
        } else {
            const [deleteData] = await connection.query(`
                DELETE FROM
                    flujodeestados
                WHERE
                    NDePedido = ?
                `,[req.body.NDePedido])
            const query = `INSERT INTO
                            flujodeestados
                        VALUES
                            ${req.body.Order.map(() => '(?,?,?,?,?,?,?,?,?)').join(', ')}
                        `
            const data = req.body.Order.flatMap(product => [
                req.body.NDePedido,
                product.Cantidad,
                product.Codigo,
                product.VrUnitario,
                product.Costo,
                req.body.Hora,
                product.Estado,
                product.DesPorcentaje,
                product.DesApartirDe
            ]);
            const [ActualizarEstado] = await connection.query(`UPDATE
                                                                    tabladeestados
                                                                SET 
                                                                    Estado = 'Verificado',
                                                                    FechaDeEstado = ?,
                                                                    NotaVenta = ?,
                                                                    NotaEntrega = ?,
                                                                    TieneIva = ?,
                                                                    ProcesoDelPedido = ?
                                                                WHERE
                                                                    NDePedido = ?`, [req.body.Fecha,
                                                                                    req.body.NotaVenta,
                                                                                    req.body.NotaEntrega,
                                                                                    req.body.Iva,
                                                                                    req.body.Impreso,
                                                                                    req.body.NDePedido])
            const [rows] = await connection.query(query, data)
            res.status(200).json({sucess: true, error: ''})
        }
        await connection.commit(); // GUARDA TODO SI NADA FALLÓ
        connection.end()
    } catch (error) {
        await connection.rollback(); //DESHACE TODO LO QUE SE INSERTÓ
        console.log('Error-updateOrder: ', error)
        res.status(500).json({sucess: false, error: error.message})
    } finally {
        connection.end();
    }
};

export const postCloseOrder = async(req,res)=>{
    const connection = await connect()
    try {
        await connection.beginTransaction(); //INICIA LA TRANSACCIÓN
        //Introduce the data into the table salidas
        const EnvioASalidas = `INSERT INTO
                                    salidas
                                VALUES ${req.body.Order.map(() => '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').join(', ')}
                                `
        const EnvioASalidasData = req.body.Order.flatMap(product => [
                                                        req.body.NDePedido,
                                                        product.Cantidad,
                                                        product.Codigo,
                                                        product.Descripcion,
                                                        product.VrUnitario,
                                                        product.Costo,
                                                        product.IDSubCategoria,
                                                        product.SubCategoria,
                                                        product.CodProveedor,
                                                        product.Proveedor,
                                                        req.body.CodCliente,
                                                        req.body.Cliente,
                                                        req.body.CodColaborador,
                                                        req.body.Colaborador,
                                                        req.body.FechaDeIngreso,
                                                        product.Iva,
                                                        req.body.CodResponsable,
                                                        req.body.Responsable,
                                                        product.DesPorcentaje,
                                                        product.DesApartirDe
                                                    ]);
        const [rows] = await connection.query(EnvioASalidas, EnvioASalidasData)
        //updte the table tabladeestados
        const [States] = await connection.query(`UPDATE
                                                    tabladeestados AS te
                                                SET
                                                    te.Estado = 'Cerrado',
                                                    te.ProcesoDelPedido = '',
                                                    te.FechaDeEstado = ?
                                                WHERE
                                                    te.NDePedido = ?`, [req.body.Fecha, req.body.NDePedido])
        //Insert the order to the pos if the client has it
        if (req.body.ClientPos === 1) {
            //To the header purchase POS
            const [toPurchasestable] = await connection.query(`
                                                            INSERT INTO BD_Pos.cabeceracompras (
                                                                    IdFerreteria,
                                                                    ConInterno,
                                                                    NPreFactura,
                                                                    FacturaElectronica,
                                                                    Estado,
                                                                    Fecha
                                                                )
                                                                SELECT 
                                                                    ? AS CodCliente,
                                                                    COALESCE(MAX(ConInterno), 0) + 1 AS ConInterno,
                                                                    ? AS NDePedido,
                                                                    ? AS FacturaElectronica,
                                                                    ? AS Estado,
                                                                    ? AS Fecha
                                                                FROM
                                                                    BD_Pos.cabeceracompras
                                                                WHERE
                                                                    IdFerreteria = ?
                                                                                                                    `, [
                                                            req.body.CodCliente,
                                                            req.body.NDePedido,
                                                            '',
                                                            'Por ingresar',
                                                            req.body.FechaDeIngreso,
                                                            req.body.CodCliente // <- este es para el WHERE IdFerreteria = ?
                                                        ]);
            const toComprasPorIngresar =  `INSERT INTO
                                                BD_Pos.comprasporingresar
                                            VALUES ${req.body.Order.map(() => '(?,?,?,?,?,?)').join(', ')}
                                            `
            const toComprasPorIngresarData = req.body.Order.flatMap(product => [
                                                req.body.CodCliente,
                                                req.body.NDePedido,
                                                product.Cantidad,
                                                product.Codigo,
                                                product.VrUnitario,
                                                0
                                            ]);
            const [toComprasPI] = await connection.query(toComprasPorIngresar, toComprasPorIngresarData)
        }

        const [DeteleFDeEstados] = await connection.query(`DELETE FROM
                                                                flujodeestados
                                                            WHERE
                                                                NDePedido = ?`, [req.body.NDePedido])

        await connection.commit(); // GUARDA TODO SI NADA FALLÓ
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        await connection.rollback(); //DESHACE TODO LO QUE SE INSERTÓ
        console.log('Error-updateOrder: ', error)
        res.status(500).json({sucess: false, error: error})
    } finally {
        connection.end();
    }
};

export const postAnuul = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas
        const [States] = await connection.query(`UPDATE
                                                    tabladeestados AS te
                                                SET
                                                    te.Estado = 'Anulado',
                                                    te.ProcesoDelPedido = '',
                                                    te.FechaDeEstado = ?
                                                WHERE
                                                    te.NDePedido = ?`, [req.body.Fecha, req.body.NDePedido])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-updateOrder: ', error)
        res.status(500).json({sucess: false, error: error})
    } finally {
        connection.end();
    }
};

export const getWeekly = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas
        const [HeaderWeekly] = await connection.query(`SELECT
                                                            cli.Ferreteria,
                                                            cli.Barrio AS Barrio,
                                                            cli.Ruta,
                                                            ru.nombreRuta,
                                                            te.FechaDeEntrega AS Fecha,
                                                            DAYNAME(te.FechaDeEntrega) AS DiaSemana,
                                                            YEARWEEK(FechaFactura, 1) AS AnioSemana,
                                                            co.Nombre AS asesor,
                                                            SUM(fe.cantidad*fe.VrUnitario) AS valor,
                                                            te.NDePedido,
                                                            te.ProcesoDelPedido,
                                                            te.Estado,
                                                            COUNT(fe.NDePedido) AS Nproductos,
                                                            te.VECommerce
                                                        FROM
                                                            tabladeestados AS te
                                                        JOIN	
                                                            clientes AS cli ON cli.Cod = te.CodCliente
                                                        JOIN
                                                            colaboradores AS co ON co.Cod = cli.CodVendedor
                                                        JOIN
                                                            flujodeestados AS fe ON fe.NDePedido = te.NDePedido
                                                        LEFT JOIN
                                                            rutas AS ru ON ru.codRuta = cli.Ruta
                                                        WHERE
                                                            te.Estado <> 'Cerrado' AND te.Estado <> 'Anulado'
                                                        GROUP BY
                                                            te.NDePedido
                                                    `)
        const pedidos = HeaderWeekly.map(r => r.NDePedido);
        if (pedidos.length === 0) {
            return res.json([]); // nada que devolver si no hay pedidos
        }
        const [missingWeekly] = await connection.query(`SELECT 
                                                            flu.NDePedido,                        
                                                            flu.cantidad,
                                                            flu.Codigo,
                                                            p.Descripcion
                                                        FROM
                                                            flujodeestados AS flu 
                                                        JOIN
                                                            productos AS p ON flu.Codigo = p.Cod
                                                        WHERE
                                                            flu.NDePedido IN (?) AND flu.Incompleto = 1`,[pedidos])

        // 4. Agrupamos missing por pedido
        const missingMap = {};
        missingWeekly.forEach(item => {
            if (!missingMap[item.NDePedido]) {
                missingMap[item.NDePedido] = [];
            }
            missingMap[item.NDePedido].push({
                cantidad: item.cantidad,
                codigo: item.Codigo,
                descripcion: item.Descripcion
            });
        });

        // 5. Añadimos Missing a cada header
        const EnvioASalidasData = HeaderWeekly.map(order => ({
            ...order,
            Missing: missingMap[order.NDePedido] || [] // si no hay faltantes, array vacío
        }));

        res.json(EnvioASalidasData);
        
    } catch (error) {
        
        console.log('Error-updateOrder: ', error)
        res.status(500).json({sucess: false, error: error})
    } finally {
        connection.end();
    }
};

//! Sales
export const postNewSale = async(req,res)=>{
    const connection = await connect()
    try {
        await connection.beginTransaction(); //INICIA LA TRANSACCIÓN
        //Introduce the data into the table salidas
        const [consecutivo] = await connection.query(`SELECT
                                                            MAX(NDePedido)+1 As Con
                                                        FROM
                                                            tabladeestados`)
        const [HeaderSale] = await connection.query(`
            INSERT INTO tabladeestados VALUES (
                ?,
                ?,
                ?,
                ?,
                'Ingresado',
                ?,
                ?,
                '',
                ?,
                ?,
                ?,
                0,
                ?,
                '',
                '0')
            `, [consecutivo[0].Con,
                req.body.CodCliente,
                req.body.FechaFactura,
                req.body.TPago,
                req.body.FechaFactura,
                req.body.FEntrega,
                req.body.CodColaborador,
                req.body.Iva? 1: 0,
                req.body.FVencimiento,
                req.body.Nota])

        if (req.body.List.length > 0) {
            const EntranseList = `
            INSERT INTO
                    tabladeingresados (
                                NDePedido,
                                Cantidad,
                                Codigo,
                                VrUnitario,
                                Costo,
                                Porcentaje,
                                APartirDe
                            )
                VALUES ${req.body.List.map(() => '(?,?,?,?,?,?,?)').join(', ')}
            `;
    
            const EntranseListValues = req.body.List.flatMap(product => [
                consecutivo[0].Con,
                product.Cantidad,
                product.Codigo,
                product.VrUnitario,
                product.Costo,
                product.Porcentaje,
                product.ApartirDe
            ]);
            await connection.execute(EntranseList, EntranseListValues);
        }
        await connection.commit(); // GUARDA TODO SI NADA FALLÓ
        res.status(200).json({sucess: true, error: consecutivo[0].Con})
    } catch (error) {
        await connection.rollback(); //DESHACE TODO LO QUE SE INSERTÓ
        console.log('Error-postNewSale: ', error)
        res.status(500).json({sucess: false, error: error.message})
    } finally {
        connection.end();
    }
};

export const postAllowed = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas
        console.log(req.body)
        const [consecutivo] = await connection.query(`SELECT
                                                        CASE
                                                            WHEN EXISTS (
                                                                SELECT 1
                                                                FROM PermisosUsuarios AS p
                                                                WHERE p.IdUsuario = ? AND p.PermisoId = ?
                                                            ) THEN 1
                                                            ELSE 0
                                                        END AS TienePermiso;`,[req.body.UserId, req.body.PermisoId])
        res.status(200).json({sucess: true, error: consecutivo[0].TienePermiso})
    } catch (error) {
        console.log('Error-postAllowed: ', error)
        res.status(500).json({sucess: false, error: JSON.stringify(error)})
    } finally {
        connection.end();
    }
};

export const postAllowedList = async(req,res)=>{
    const connection = await connect()
    try {
        console.log(req.body)
        //Introduce the data into the table salidas
        const [consecutivo] = await connection.query(`SELECT 
                                                        p.Id AS Permiso_id,
                                                        p.NombrePermiso AS Nombre_del_permiso,
                                                        CASE WHEN up.PermisoId IS NULL THEN FALSE ELSE TRUE END AS TienePermiso
                                                    FROM
                                                        Permisos AS p
                                                    LEFT JOIN
                                                        PermisosUsuarios AS up 
                                                        ON p.Id = up.PermisoId AND up.IdUsuario = ?`,[req.body.UserID])
        res.status(200).json(consecutivo)
    } catch (error) {
        console.log('Error-postAllowedList: ', error)
        res.status(500).json({sucess: false, error: JSON.stringify(error)})
    } finally {
        connection.end();
    }
};

export const postChangePassword = async(req, res) =>{
    const connection = await connect()
    try {
        // To hash the new password
        const plainPassword = req.body.NewPassword;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(plainPassword, 10, function (err, hashedPassword) {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
            });
        });
        const [upRows] = await connection.query("UPDATE colaboradores SET Contraseña = ? WHERE Cod =  ?", [hashedPassword, req.body.CodUser]);
        //res.json(upRows);
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postChangePassword: ', error)
        res.status(500).json({sucess: false, error: JSON.stringify(error)})
    } finally {
        connection.end();
    }
}

export const postChangePermits = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas
        const [consecutivo] = await connection.query(`DELETE FROM PermisosUsuarios WHERE IdUsuario = ?;`,[req.body.IdUsuario])
        if (req.body.permList.length > 0) {
            const ingresoQuery = `
            INSERT INTO
                PermisosUsuarios (
                            IdUsuario,
                            PermisoId
                        )
            VALUES ${req.body.permList.map(() => '(?,?)').join(', ')}
            `;
            const PermitValues = req.body.permList.flatMap(product => [
                product.IdUsuario,
                product.PermisoId
            ]);
            await connection.execute(ingresoQuery, PermitValues);
        }
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postAllowedList: ', error)
        res.status(500).json({sucess: false, error: JSON.stringify(error)})
    } finally {
        connection.end();
    }
};

export const postNewWorker = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas

        const plainPassword = req.body.Contraseña;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(plainPassword, 10, function (err, hashedPassword) {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
            });
        });
        const [consecutivo] = await connection.query(`INSERT INTO
            colaboradores (
                        Nombre,
                        Apellido,
                        Cargo,
                        Telefono,
                        Cel,
                        Email,
                        Direccion,
                        Nota,
                        Contraseña,
                        Usuario,
                        Activo
                    )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[req.body.Nombre,
        req.body.Apellido,
        req.body.Cargo,
        req.body.Telefono,
        req.body.Cel,
        req.body.Email,
        req.body.Direccion,
        req.body.Nota,
        hashedPassword,
        req.body.Usuario,
        1
        ])

        const [NColaborador] = await connection.query(`SELECT
                                                            MAX(Cod) AS Con
                                                        FROM
                                                            colaboradores`)
        const permits =  `INSERT INTO
                            PermisosUsuarios (
                                        IdUsuario,
                                        PermisoId
                                    )
                        VALUES ${req.body.permit.map(() => '(?,?)').join(', ')}
                        `
        const values = req.body.permit.flatMap((item)=>[
            NColaborador[0].Con,
            item
        ])
        await connection.execute(permits, values);
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postNewWorker: ', error)
        res.status(500).json({sucess: false, error: error})
    } finally {
        connection.end();
    }
};

export const postUpdateWorker = async(req,res)=>{
    const connection = await connect()
    try {
        //Introduce the data into the table salidas
        const [consecutivo] = await connection.query(`UPDATE colaboradores
                                                        SET 
                                                            Nombre = ?,
                                                            Apellido = ?,
                                                            Cargo = ?,
                                                            Telefono = ?,
                                                            Cel = ?,
                                                            Email = ?,
                                                            Direccion = ?,
                                                            Nota = ?,
                                                            Usuario = ?
                                                    WHERE Cod = ?`,[req.body.Nombre,
                                                                      req.body.Apellido,
                                                                      req.body.Cargo,
                                                                      req.body.Telefono,
                                                                      req.body.Cel,
                                                                      req.body.Email,
                                                                      req.body.Direccion,
                                                                      req.body.Nota,
                                                                      req.body.Usuario,
                                                                      req.body.Cod
                                                                    ])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postUpdateWorker: ', error)
        res.status(500).json({sucess: false, error: error})
    } finally {
        connection.end();
    }
};
