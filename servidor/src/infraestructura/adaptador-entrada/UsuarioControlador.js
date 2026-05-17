import UsuarioEntradaPuerto from "../../aplicacion/puertos/entrada/UsuarioEntradaPuerto.js";
import { UsuarioDTO } from "../../aplicacion/dto/UsuarioDTO.js";
import { Buffer } from "buffer";
import Zlib from "zlib";

export class UsuarioControlador extends UsuarioEntradaPuerto {
  constructor(casoUsoCommandUsuario, casoUsoQueryUsuario) {
    super();
    this.casoUsoCommandUsuario = casoUsoCommandUsuario;
    this.casoUsoQueryUsuario = casoUsoQueryUsuario;
  }

  crear = async (req, res) => {
    const idRequest = req.traceId;
    const datos = req.body;

    const dtoUsu = new UsuarioDTO(datos);

    const resultado = await this.casoUsoCommandUsuario.crear(dtoUsu, datos);

    const resultadoJSON = JSON.stringify(resultado);
    const compresion = Zlib.gzipSync(resultadoJSON);

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      traceId: idRequest,
      resultado,
      tamaño: {
        json: Buffer.byteLength(resultadoJSON),
        comprimido: Buffer.byteLength(compresion)
      }
    });
  };

  listar = async (req, res) => {
    const idRequest = req.traceId;
    const resultado = await this.casoUsoQueryUsuario.listar();

    const resultadoJSON = JSON.stringify(resultado);
    const compresion = Zlib.gzipSync(resultadoJSON);

    res.status(200).json({
      mensaje: "Usuarios obtenidos correctamente",
      traceId: idRequest,
      resultado,
      tamaño: {
        json: Buffer.byteLength(resultadoJSON),
        comprimido: Buffer.byteLength(compresion)
      }
    });
  };

  listarById = async (req, res) => {
    const idRequest = req.traceId;
    const { id } = req.params;

    const resultado = await this.casoUsoQueryUsuario.listarById(id);

    const resultadoJSON = JSON.stringify(resultado);
    const compresion = Zlib.gzipSync(resultadoJSON);

    res.status(200).json({
      mensaje: "Usuario obtenido correctamente",
      traceId: idRequest,
      resultado,
      tamaño: {
        json: Buffer.byteLength(resultadoJSON),
        comprimido: Buffer.byteLength(compresion)
      }
    });
  };

  eliminar = async (req, res) => {
    const idRequest = req.traceId;
    const { id } = req.params;

    const resultado = await this.casoUsoCommandUsuario.eliminar(id);

    const resultadoJSON = JSON.stringify(resultado);
    const compresion = Zlib.gzipSync(resultadoJSON);

    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
      traceId: idRequest,
      resultado,
      tamaño: {
        json: Buffer.byteLength(resultadoJSON),
        comprimido: Buffer.byteLength(compresion)
      }
    });
  };

  editar = async (req, res) => {
    const idRequest = req.traceId;
    const { id } = req.params;
    const datos = req.body;

    const dtoUsu = new UsuarioDTO(datos);

    const resultado = await this.casoUsoCommandUsuario.editar(id, dtoUsu, datos);

    const resultadoJSON = JSON.stringify(resultado);
    const compresion = Zlib.gzipSync(resultadoJSON);

    res.status(200).json({
      mensaje: "Usuario editado correctamente",
      traceId: idRequest,
      resultado,
      tamaño: {
        json: Buffer.byteLength(resultadoJSON),
        comprimido: Buffer.byteLength(compresion)
      }
    });
  };
}

