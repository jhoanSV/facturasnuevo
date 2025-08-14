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
                                                        ElectronicPos = ?
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
            const [NewEData] = await connection.query(`DELETE FROM
                                                            clientes
                                                        WHERE
                                                            Cod = ?`,[req.body.Cod])
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
                                                pPos.Clase,
                                                p.ImgName,
                                                IFNULL(CoorPages.Pag, '') AS Pagina,
                                                IFNULL(CoorPages.xPosition, '') AS CoordenadaX,
                                                IFNULL(CoorPages.yPosition, '') AS CoordenadaY,
                                                p.Nota,
                                                p.Detalle,
                                                p.Grupo
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
                                                programaembd.categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria`)
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
                                        SVenta = ?
                                    WHERE
                                        Consecutivo = ?`;
        const productValues1 = [
            req.body.Descripcion,
            req.body.Clase,
            req.body.SubCategoria,
            req.body.Detalle,
            req.body.Iva,
            req.body.SVenta,
            req.body.Consecutivo
        ];
        await connection.execute(updateProductSql1, productValues1);

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
        res.status(500).json({sucess: false, error: error})
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
        console.log('Error-postOtherSupplier: ', error)
    }
};

export const postNewProduct = async (req, res) => {
    const connection = await connect()
    try {
        await connection.beginTransaction();
        //! Nuevo producto en la base de datos POS
        const NewProductSqlPos = `
        INSERT INTO
            BD_Pos.productos
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
        await connection.execute(updateProductSql1, productValues1);
        
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
        await connection.execute(updateProductSql, productValues);
        
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

        //! Para incertar en a tabla otrosProveedores
        if (req.body.otrosProveedores.leng() > 0) {
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
                    CoordinatesPages
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
                //await connection.execute(NewEntradasSql, EntradasValues);
            } else {
                const NewSalidasSql = `
                INSERT INTO
                    CoordinatesPages
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
                    req.body.Responsable
                ];
                //await connection.execute(NewSalidasSql, SalidasValues);
            }
        }

        //await connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
        // Confirmar la transacción
        await connection.commit();
        res.status(200).json({ message: 'Transacción completada con éxito' });
    } catch (error) {
        console.log(error);
        await connection.rollback();
        res.status(500).json(error);
    } finally {
        await connection.end();
    }
};

export const quiantityProductList = async(req,res)=>{
    try {
        const connection = await connect()
        const [rows] = await connection.query(`SELECT
                                                    p.Cod,
                                                    p.Descripcion,
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
                                                    p.ImgName,
                                                    p.Nota,
                                                    p.Detalle,
                                                    IFNULL(e.TotalEntrada, 0) - IFNULL(s.TotalSalida, 0) AS Cantidad
                                                FROM
                                                    productos AS p
                                                LEFT JOIN proovedores AS prov ON p.CodProovedor = prov.Cod
                                                LEFT JOIN subcategorias AS SubCat ON p.SubCategoria = SubCat.IDSubCategoria
                                                LEFT JOIN categoria AS Cat ON SubCat.IDCategoria = Cat.IDCategoria

                                                -- Subconsulta para entradas
                                                LEFT JOIN (
                                                    SELECT Codigo, SUM(Cantidad) AS TotalEntrada
                                                    FROM entradas
                                                    GROUP BY Codigo
                                                ) AS e ON e.Codigo = p.Cod

                                                -- Subconsulta para salidas
                                                LEFT JOIN (
                                                    SELECT Codigo, SUM(Cantidad) AS TotalSalida
                                                    FROM salidas
                                                    GROUP BY Codigo
                                                ) AS s ON s.Codigo = p.Cod`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-postOtherSupplier: ', error)
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
            await connection.execute(NewNewPurchasePass, NewNewPurchasePassValues);
        }
        res.status(200).json({sucess: true, error: '', Consecutivo: consecutivo[0].Con})
    } catch (error) {
        console.log('Error-postNewPurchase: ', error)
        res.status(500).json({sucess: false, error: error});
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
                                ac.RC,
                                ac.Fecha,
                                ac.Abono
                            FROM
                                abonoscompras AS ac
                            WHERE
                                ac.Consecutivo = ?`
        if (req.body.type === 'Ventas') {
            PurchasePP = `SELECT
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
        const consecutivo = await connection.query(`INSERT INTO
                                                        abonoscompras
                                                        (
                                                        Consecutivo,
                                                        RC,
                                                        Fecha,
                                                        CodProveedor,
                                                        Abono
                                                        )
                                                    VALUES
                                                        (?,?,?,?,?)`,
                                                        [
                                                        req.body.Consecutivo,
                                                        req.body.RC,
                                                        req.body.Fecha,
                                                        req.body.CodProveedor,
                                                        req.body.Abono
                                                        ])
        
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
                                                    SUM(ti.Cantidad*ti.VrUnitario) AS Total
                                                FROM
                                                    tabladeestados AS te
                                                LEFT JOIN
                                                    tabladeingresados AS ti ON ti.NDePedido = te.NDePedido
                                                LEFT JOIN
                                                    clientes AS cli ON cli.Cod = te.CodCliente
                                                WHERE
                                                    te.Estado = 'Ingresado'
                                                GROUP BY
                                                    te.NDePedido, ti.NDePedido`)
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
                                                (clientes.Ferreteria ) AS Cliente,
                                                ES.FechaFactura,
                                                (IFNULL(SUM(tabladeingresados.Cantidad*tabladeingresados.VrUnitario),0)) AS Valor,
                                                ES.TipoDePago,
                                                ES.Estado,
                                                (Con.ValorFinal) AS ValorFinal,
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
                                                IFNULL(fElect.FacturaElectronica, '') AS FacturaElectronica
                                            FROM
                                                tabladeestados AS ES
                                            CROSS JOIN
                                                clientes ON clientes.Cod = ES.CodCliente
                                            CROSS JOIN
                                                tabladeingresados ON tabladeingresados.NDePedido = ES.NDePedido
                                            CROSS JOIN
                                                (SELECT ES.NDePedido,
                                                (IFNULL(SUM(salidas.Cantidad*salidas.VrUnitario),0)) AS ValorFinal
                                                FROM
                                                tabladeestados AS ES
                                                LEFT JOIN
                                                salidas ON salidas.NDePedido = ES.NDePedido
                                                GROUP BY
                                                ES.NDePedido
                                                ORDER BY ES.NDePedido DESC) AS Con ON Con.NDePedido = ES.NDePedido
                                        LEFT JOIN 
                                                felectronica AS fElect ON ES.NDePedido = fElect.NFactura
                                        LEFT JOIN
                                            colaboradores AS col ON col.Cod = ES.Repartidor
                                            GROUP BY
                                                ES.NDePedido,
                                                tabladeingresados.NDePedido
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
                                                    te.TipoDePago,
                                                    te.FechaVencimiento,
                                                    SUM(sa.Cantidad * sa.VrUnitario) AS Total
                                                FROM
                                                    tabladeestados AS te
                                                LEFT JOIN
                                                    clientes AS cli ON cli.Cod = te.CodCliente
                                                LEFT JOIN
                                                    salidas AS sa ON sa.NDePedido = te.NDePedido
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
                                                    IFNULL(SUM(ab.Abono),0) AS Saldo
                                                FROM
                                                    abonosventas AS ab
                                                GROUP BY 
                                                    ab.Consecutivo
                                                ORDER BY
                                                    ab.Consecutivo DESC`)
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPPPurchase: ', error)
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
        console.log('Error-getPPPurchase: ', error)
    }
};

export const getPreparationList = async(req,res)=>{
    
    try {
        const connection = await connect()
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
                                                    movs.Cantidad,
                                                    movs.Disponible
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
                                                WHERE ti.NDePedido IN (?)`,[req.body.NPedidoList])
        res.json(rows)
        connection.end()
    } catch (error) {
        console.log('Error-getPreparationList: ', error)
    }
};

export const postStateFlow = async(req,res)=>{
    const connection = await connect()
    try {
        const placeholders = req.body.FlowData.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
        const NewFlujoDeEstados = `INSERT INTO flujodeestados (
                                                            NDePedido,
                                                            Cantidad,
                                                            Codigo,
                                                            VrUnitario,
                                                            Costo,
                                                            Hora,
                                                            Incompleto
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
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
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
                                                flu.cantidad,
                                                flu.Codigo,
                                                p.Descripcion,
                                                p.PCosto,
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
                                                CEIL((en.IVA/ (en.Costo - en.Iva)) * 100) AS Iva,
                                                en.Costo AS UIva,
                                                en.Cantidad *(en.Costo) AS Total,
                                                en.CostoLP
                                            FROM
                                                entradas AS en
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