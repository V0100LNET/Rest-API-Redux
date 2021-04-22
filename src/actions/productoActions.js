import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    // PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try{
            //insertar en la api
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualiza el state
           dispatch(agregarProductoExito(producto));
           //alerta
           Swal.fire(
               'Correcto',
               'El producto se agregó correctamente',
               'success'
           )
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: 'Ocurrió un error, intentalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hbi un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//funcion que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
       dispatch(descargarProductos());

       try {
           const respuesta = await clienteAxios.get('/productos');
           dispatch(descargarProductosExitosa(respuesta.data));
       } catch (error) {
           console.log(error);
           dispatch(descargarProductosError());
       }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGAR_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y eleminar el producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(abtenerProductoEliminar(id));

        try {
            const resultado = await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito(resultado));

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Producto Eliminado',
                'El Producto Se Ha Eliminado Correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const abtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoAction(producto));
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita uin registro en la api y state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());

        try{
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(resultado));
        } catch (error) {
            console.log(error);  
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})