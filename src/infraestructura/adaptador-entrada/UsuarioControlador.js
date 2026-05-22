import { UsuarioDTO } from '../../aplicacion/dto/UsuarioDTO.js';
import UsuarioEntradaPort from "../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js"
import {Buffer} from 'buffer'
import zlib from 'zlib'

export class UsuarioControlador extends UsuarioEntradaPort {
    constructor(casoUsoCommand, CasoUsoQuery){
        super();
        this.casoUsoCommandUsuario = casoUsoCommand;
        this.casoUsoQueryUsuario = CasoUsoQuery;
    }

    crear = async (req,res)=>{
   
    const idRequest = req.traceId;
    const datos =  req.body;

    const dtoUsu= new UsuarioDTO(datos)
    
    console.log("Ingresamos al controlador con: " + idRequest + dtoUsu.getNombre());

    const resultado = await this.casoUsoCommandUsuario.crear(dtoUsu);
    const tJSON= Buffer.byteLength(JSON.stringify( resultado));

    const resultBinario = Buffer.from(JSON.stringify(resultado));
    const tBinario = Buffer.byteLength(resultBinario)

    const compresion = zlib.gzipSync(JSON.stringify(resultado));
    const tamanoCompresion = Buffer.byteLength(compresion)
    res.status(200).json({
        mensaje: 'Petición recibida correctamente',
        traceId: idRequest,
        resultadoJSON:  resultado,
        tamanoJSON: tJSON+ " bytes",
        resultadoBinario: resultBinario,
        tamanoBinario: tBinario+ " bytes",
        comprimir: compresion,
        tamanoCompresion: tamanoCompresion+ " bytes"
    })
   }
   
    lista = async(req,res)=>{
        
        const resultado  = await this.casoUsoQueryUsuario.lista();  
        res.status(200).json({
            estado: "ok",
            resultado : resultado    
        });
    }

    editar = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;
        
        const id = datos.id;
        
        if (!id) {
            return res.status(400).json({
                estado: "error",
                mensaje: "El ID es requerido en el body para actualizar",
                traceId: idRequest
            });
        }
        
        if (!datos.nombre) {
            return res.status(400).json({
                estado: "error",
                mensaje: "El nombre es requerido en el body para actualizar",
                traceId: idRequest
            });
        }
        
        const dtoUsu = new UsuarioDTO({
            id: id,
            nombre: datos.nombre
        });
        
        console.log(`Editando usuario ID ${id} con nombre: ${dtoUsu.getNombre()}`);
        
        const resultado = await this.casoUsoCommandUsuario.editar(dtoUsu);
        
        if (resultado.estado === "error") {
            return res.status(404).json({
                estado: "error",
                mensaje: resultado.resultado,
                traceId: idRequest
            });
        }
        
        res.status(200).json({
            estado: "ok",
            mensaje: resultado.resultado,
            traceId: idRequest
        });
    }
    
    eliminar = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;
        
        const id = datos.id;
        
        if (!id) {
            return res.status(400).json({
                estado: "error",
                mensaje: "El ID es requerido en el body para eliminar",
                traceId: idRequest
            });
        }
        
        console.log(`Eliminando usuario con ID: ${id}`);
        
        const dtoUsu = new UsuarioDTO({ id: id });
        const resultado = await this.casoUsoCommandUsuario.eliminar(dtoUsu);
        
        if (resultado.estado === "error") {
            return res.status(404).json({
                estado: "error",
                mensaje: resultado.resultado,
                traceId: idRequest
            });
        }
        
        res.status(200).json({
            estado: "ok",
            mensaje: resultado.resultado,
            traceId: idRequest
        });
    }
} 
