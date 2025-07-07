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
}

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
}

export const postUpdateClient = async(req,res)=>{
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
                                                        ResFiscal = ?
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
                                                        req.body.Cod])
        
        const [NewEData] = await connection.query(`INSERT INTO resoluciones 
                                                        (
                                                            IdFerreteria = ?,
                                                            NumeroResolucion = ?,
                                                            FechaInicio = ?,
                                                            FechaFinal = ?,
                                                            Prefijo = ?,
                                                            NumeroInicial = ?,
                                                            NumeroFinal = ?,
                                                            ClaveTecnica = ?,
                                                            Api = ?,
                                                            Usuario = ?,
                                                            Clave = ?
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
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        console.log('Error-postUpdateClient: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
}

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
}

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
}

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
}

export const postNewCategory = async(req,res)=>{
    const connection = await connect()
    try {
        const [rows] = await connection.query(`INSERT INTO
                                                    categoria (categoria, Pag)
                                                VALUES
                                                    (?,?)`,[req.body.Categoria,''])
        res.status(200).json({sucess: true, error: ''})
    } catch (error) {
        res.status(500).json({sucess: false, error: ''})
        console.log('Error-postNewCategory: ', error)
    } finally {
        connection.end();
    }
}

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
        res.status(500).json({sucess: false, error: ''})
        console.log('Error-postNewCategory: ', error)
    } finally {
        connection.end();
    }
}

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
                                                p.Detalle
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
}

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
            ImgName = ?
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
            req.body.Cod
        ];
        //await connection.execute(updateProductSql, productValues);

        // Actualizar el producto  en la base de datos POS
        const updateProductSql1 = `
        UPDATE
            productos
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
        //await connection.execute(updateProductSql1, productValues1);

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
}

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
        //await connection.execute(updateProductSql1, productValues1);
        
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
            req.body.ImgNombre
        ];
        //await connection.execute(updateProductSql, productValues);
        
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
            //await connection.execute(NewCoordinatesSql, CoordinatesValues);
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
            //await connection.execute(NewOtherSuppliers, NewOtherSuppliersValues);
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
}

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
}

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
                                                        Geolocalizacion = ?`,
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
        console.log('Error-postUpdateSupplier: ', error)
        res.status(500).json({sucess: false, error: error});
    } finally {
        connection.end();
    }
}