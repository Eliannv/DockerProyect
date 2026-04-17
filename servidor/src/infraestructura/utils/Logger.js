export const log = (level, traceId, message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] [${traceId}] ${message}`);
    //Ejemplo de salida:
    // [2024-06-01T12:00:00.000Z] [INFO] [12345] Usuario creado exitosamente
};